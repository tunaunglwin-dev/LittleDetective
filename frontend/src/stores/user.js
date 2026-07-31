import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '../services/api'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const learningProfile = ref(loadLearningProfile())
  const siteLanguage = ref(localStorage.getItem('sdl-site-language') || 'mm')
  const loading = ref(false)
  const socialAuthBaseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const detectiveRanks = [
    { id: 'entry', name: 'Entry Detective', mmName: 'အစပြု စုံထောက်', shortName: 'Entry', min: 0, badge: 'ED', tone: 'bg-[#e7f0ea] text-[#355e54]' },
    { id: 'junior', name: 'Junior Detective', mmName: 'လူငယ် စုံထောက်', shortName: 'Junior', min: 100, badge: 'JD', tone: 'bg-[#fff3df] text-[#8a5a18]' },
    { id: 'senior', name: 'Senior Detective', mmName: 'ကျွမ်းကျင် စုံထောက်', shortName: 'Senior', min: 300, badge: 'SD', tone: 'bg-[#e7eef3] text-[#2f607a]' },
    { id: 'professional', name: 'Professional Detective', mmName: 'ပရော်ဖက်ရှင်နယ် စုံထောက်', shortName: 'Professional', min: 700, badge: 'PD', tone: 'bg-[#f3e5df] text-[#8a4a3b]' },
    { id: 'master', name: 'Master Detective', mmName: 'မာစတာ စုံထောက်', shortName: 'Master', min: 1200, badge: 'MD', tone: 'bg-[#073f35] text-white' },
  ]
  const rankSkinRewards = [
    { rankId: 'senior', skinId: 'shadow-owl' },
    { rankId: 'professional', skinId: 'sky-owl' },
  ]

  const isAdmin = computed(() => {
    const roles = user.value?.roles || []
    return user.value?.role === 'admin' || roles.some((role) => role.name === 'admin' || role === 'admin')
  })

  const rankInfo = computed(() => getRankInfo(learningProfile.value.points, detectiveRanks))
  learningProfile.value = applyRankSkinRewards(learningProfile.value)

  async function login(email, password) {
    loading.value = true
    try {
      const { data } = await api.post('/login', { email, password })
      token.value = data.token
      user.value = data.user
      learningProfile.value = loadLearningProfile(data.user?.email)
      localStorage.setItem('token', data.token)
    } finally {
      loading.value = false
    }
  }

  async function register(name, email, password) {
    loading.value = true
    try {
      const { data } = await api.post('/register', { name, email, password })
      token.value = data.token
      user.value = data.user
      learningProfile.value = loadLearningProfile(data.user?.email)
      localStorage.setItem('token', data.token)
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      const { data } = await api.get('/user')
      user.value = data
      learningProfile.value = loadLearningProfile(data?.email)
    } catch {
      logout()
    }
  }

  async function fetchAdminOverview() {
    const { data } = await api.get('/admin/overview')
    return data
  }

  async function fetchAdminUsers(params = {}) {
    const { data } = await api.get('/admin/users', { params })
    return data
  }

  async function updateAdminUser(userId, payload) {
    const { data } = await api.patch(`/admin/users/${userId}`, payload)
    return data
  }

  async function deleteAdminUser(userId) {
    const { data } = await api.delete(`/admin/users/${userId}`)
    return data
  }

  function acceptToken(authToken) {
    token.value = authToken
    localStorage.setItem('token', authToken)
  }

  function loginWithGoogle() {
    const redirectUrl = new URL('/auth/google/redirect', socialAuthBaseUrl)
    redirectUrl.searchParams.set('frontend_url', window.location.origin)
    window.location.href = redirectUrl.toString()
  }

  function logout() {
    api.post('/logout').catch(() => {})
    token.value = null
    user.value = null
    learningProfile.value = loadLearningProfile()
    localStorage.removeItem('token')
  }

  function addLearningPoints(activityId, amount) {
    if (!activityId || amount <= 0) return false
    if (learningProfile.value.completedActivities?.[activityId]) return false

    const nextProfile = applyRankSkinRewards({
      ...learningProfile.value,
      points: learningProfile.value.points + amount,
      recentActivity: [
        makeActivity(activityId, amount),
        ...(learningProfile.value.recentActivity || []),
      ].slice(0, 12),
      completedActivities: {
        ...learningProfile.value.completedActivities,
        [activityId]: true,
      },
    })

    learningProfile.value = nextProfile
    saveLearningProfile(nextProfile, user.value?.email)
    return true
  }

  function completeActivity(activityId) {
    if (!activityId) return false
    if (learningProfile.value.completedActivities?.[activityId]) return false

    const nextProfile = {
      ...learningProfile.value,
      recentActivity: [
        makeActivity(activityId, 0),
        ...(learningProfile.value.recentActivity || []),
      ].slice(0, 12),
      completedActivities: {
        ...learningProfile.value.completedActivities,
        [activityId]: true,
      },
    }

    learningProfile.value = nextProfile
    saveLearningProfile(nextProfile, user.value?.email)
    return true
  }

  function hasCompletedActivity(activityId) {
    return !!learningProfile.value.completedActivities?.[activityId]
  }

  function markPracticeFailed(activityId) {
    if (!activityId) return
    const failedPractices = {
      ...(learningProfile.value.failedPractices || {}),
      [activityId]: true,
    }
    const nextProfile = {
      ...learningProfile.value,
      failedPractices,
    }
    learningProfile.value = nextProfile
    saveLearningProfile(nextProfile, user.value?.email)
  }

  function hasFailedPractice(activityId) {
    return !!learningProfile.value.failedPractices?.[activityId]
  }

  function unlockSkin(skinId) {
    if (!skinId) return false
    if (learningProfile.value.unlockedSkins?.[skinId]) return false
    const nextProfile = {
      ...learningProfile.value,
      selectedSkin: skinId,
      unlockedSkins: {
        ...learningProfile.value.unlockedSkins,
        [skinId]: true,
      },
    }
    learningProfile.value = nextProfile
    saveLearningProfile(nextProfile, user.value?.email)
    return true
  }

  function selectSkin(skinId) {
    syncRankRewards()
    if (skinId !== 'classic' && !learningProfile.value.unlockedSkins?.[skinId]) return false
    const nextProfile = {
      ...learningProfile.value,
      selectedSkin: skinId,
    }
    learningProfile.value = nextProfile
    saveLearningProfile(nextProfile, user.value?.email)
    return true
  }

  function syncRankRewards() {
    const nextProfile = applyRankSkinRewards(learningProfile.value)
    if (nextProfile === learningProfile.value) return false
    learningProfile.value = nextProfile
    saveLearningProfile(nextProfile, user.value?.email)
    return true
  }

  function applyRankSkinRewards(profile) {
    const unlockedSkins = { ...(profile.unlockedSkins || {}) }
    let changed = false
    rankSkinRewards.forEach((reward) => {
      const rewardRank = detectiveRanks.find((rank) => rank.id === reward.rankId)
      if (!rewardRank || profile.points < rewardRank.min || unlockedSkins[reward.skinId]) return
      unlockedSkins[reward.skinId] = true
      changed = true
    })
    if (!changed) return profile
    const latestReward = [...rankSkinRewards].reverse().find((reward) => unlockedSkins[reward.skinId] && !profile.unlockedSkins?.[reward.skinId])
    return {
      ...profile,
      selectedSkin: latestReward?.skinId || profile.selectedSkin,
      unlockedSkins,
    }
  }

  function saveTruthCheck(check) {
    const nextProfile = {
      ...learningProfile.value,
      truthChecks: [
        {
          id: `truth:${Date.now()}`,
          createdAt: new Date().toISOString(),
          ...check,
        },
        ...(learningProfile.value.truthChecks || []),
      ].slice(0, 8),
      recentActivity: [
        {
          id: `truth-activity:${Date.now()}`,
          type: 'truth-check',
          title: check.title || 'Truth Check',
          detail: check.detail || '',
          points: 0,
          createdAt: new Date().toISOString(),
        },
        ...(learningProfile.value.recentActivity || []),
      ].slice(0, 12),
    }

    learningProfile.value = nextProfile
    saveLearningProfile(nextProfile, user.value?.email)
  }

  const completedLessonCount = computed(() => {
    const activities = learningProfile.value.completedActivities || {}
    return Object.keys(activities).filter((key) => key.includes(':practice')).length
  })

  function setSiteLanguage(language) {
    siteLanguage.value = language === 'en' ? 'en' : 'mm'
    localStorage.setItem('sdl-site-language', siteLanguage.value)
  }

  return {
    user,
    token,
    learningProfile,
    detectiveRanks,
    rankInfo,
    completedLessonCount,
    siteLanguage,
    loading,
    isAdmin,
    login,
    register,
    loginWithGoogle,
    acceptToken,
    fetchUser,
    fetchAdminOverview,
    fetchAdminUsers,
    updateAdminUser,
    deleteAdminUser,
    addLearningPoints,
    completeActivity,
    hasCompletedActivity,
    markPracticeFailed,
    hasFailedPractice,
    unlockSkin,
    selectSkin,
    syncRankRewards,
    saveTruthCheck,
    setSiteLanguage,
    logout,
  }
})

function learningProfileKey(email) {
  return `sdl-learning-profile:${email || 'guest'}`
}

function loadLearningProfile(email = null) {
  try {
    const stored = localStorage.getItem(learningProfileKey(email))
    if (stored) {
      return { points: 0, completedActivities: {}, failedPractices: {}, unlockedSkins: {}, selectedSkin: 'classic', recentActivity: [], truthChecks: [], ...JSON.parse(stored) }
    }
  } catch {
    localStorage.removeItem(learningProfileKey(email))
  }

  return {
    points: 0,
    completedActivities: {},
    failedPractices: {},
    unlockedSkins: {},
    selectedSkin: 'classic',
    recentActivity: [],
    truthChecks: [],
  }
}

function saveLearningProfile(profile, email = null) {
  localStorage.setItem(learningProfileKey(email), JSON.stringify(profile))
}

function makeActivity(activityId, amount) {
  const [lessonId, kind] = activityId.split(':')
  const lessonMatch = lessonId.match(/chapter-(\d+)-lesson-(\d+)/)
  const chapter = lessonMatch?.[1]
  const lesson = lessonMatch?.[2]
  const title = chapter && lesson
    ? `Chapter ${chapter} · Lesson ${lesson}`
    : 'Learning activity'

  return {
    id: `${activityId}:${Date.now()}`,
    type: kind === 'practice' ? 'practice' : 'study',
    title,
    detail: kind === 'practice' ? 'Practice completed' : 'Study completed',
    points: amount,
    createdAt: new Date().toISOString(),
  }
}

function getRankInfo(points = 0, ranks = []) {
  const orderedRanks = [...ranks].sort((a, b) => a.min - b.min)
  const currentIndex = orderedRanks.reduce((match, rank, index) => (points >= rank.min ? index : match), 0)
  const current = orderedRanks[currentIndex] || orderedRanks[0]
  const next = orderedRanks[currentIndex + 1] || null
  const span = next ? next.min - current.min : 1
  const earnedInRank = Math.max(0, points - current.min)
  const progress = next ? Math.min(100, Math.round((earnedInRank / span) * 100)) : 100

  return {
    points,
    current,
    next,
    progress,
    toNext: next ? Math.max(0, next.min - points) : 0,
  }
}
