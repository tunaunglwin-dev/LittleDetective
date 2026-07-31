<template>
  <div class="dashboard-page min-h-screen text-zinc-900">
    <header class="sticky top-0 z-20 border-b border-[#dcece4] bg-[#fffcf1]/90 px-4 py-3 backdrop-blur sm:px-8">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <RouterLink class="flex items-center gap-3" to="/" aria-label="Sone Dauk Lay home">
          <span class="sdl-logo sdl-logo-sm" aria-hidden="true">
            <img :src="siteLogo" alt="" />
          </span>
          <span class="hidden sm:block">
            <span class="block text-base text-zinc-950">Sone Dauk Lay</span>
            <span class="block text-xs text-zinc-500">Profile</span>
          </span>
        </RouterLink>

        <div class="flex items-center gap-2">
          <RouterLink class="rounded-full border border-[#cfe4da] bg-white/80 px-3 py-2 text-xs text-zinc-700 hover:bg-white" to="/dashboard">
            Dashboard
          </RouterLink>
          <button class="rounded-full bg-[#073f35] px-3 py-2 text-xs text-white hover:bg-[#052f29]" @click="handleLogout">
            Logout
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl px-4 py-5 sm:px-8 sm:py-8">
      <section class="rounded-[1.75rem] border border-white/80 bg-white/84 p-5 shadow-xl shadow-emerald-950/6 sm:p-6">
        <div class="grid gap-5 lg:grid-cols-[1fr_19rem] lg:items-center">
          <div class="flex min-w-0 items-center gap-4">
            <img v-if="avatarUrl" class="size-16 rounded-2xl object-cover shadow-md shadow-emerald-950/10" :src="avatarUrl" alt="" />
            <div v-else class="grid size-16 place-items-center rounded-2xl bg-[#0a5a4b] text-xl text-white shadow-md shadow-emerald-950/10">
              {{ initials }}
            </div>
            <div class="min-w-0">
              <p class="text-sm text-[#7a5f2f]">Profile</p>
              <h1 class="truncate text-3xl leading-tight text-[#052f29] sm:text-4xl">{{ displayName }}</h1>
              <p class="mt-1 truncate text-sm text-zinc-500">{{ userStore.user?.email || 'Email not available' }}</p>
            </div>
          </div>

          <div class="rounded-2xl border border-[#dcece4] bg-[#f5fbf7] p-4">
            <div class="flex items-center gap-3">
              <span class="grid size-12 place-items-center rounded-xl text-sm" :class="rank.current.tone">
                {{ rank.current.badge }}
              </span>
              <div>
                <p class="text-xs text-[#7a5f2f]">Current rank</p>
                <p class="text-base text-[#052f29]">{{ rank.current.shortName }}</p>
                <p class="text-xs text-zinc-500">{{ rank.current.mmName }}</p>
              </div>
            </div>
          </div>
        </div>

        <dl class="mt-6 grid gap-3 sm:grid-cols-3">
          <div class="rounded-2xl border border-[#dcece4] bg-white px-4 py-3">
            <dt class="text-xs text-zinc-500">EXP</dt>
            <dd class="mt-1 text-base text-[#355e54]">{{ rank.points }} EXP</dd>
          </div>
          <div class="rounded-2xl border border-[#eadfce] bg-white px-4 py-3">
            <dt class="text-xs text-zinc-500">Completed lessons</dt>
            <dd class="mt-1 text-base text-zinc-950">{{ userStore.completedLessonCount }} / 60</dd>
          </div>
          <div class="rounded-2xl border border-[#eadfce] bg-white px-4 py-3">
            <dt class="text-xs text-zinc-500">Role</dt>
            <dd class="mt-1 text-base text-zinc-950">{{ userStore.isAdmin ? 'Admin' : 'User' }}</dd>
          </div>
        </dl>

        <div class="mt-6 rounded-2xl border border-[#dcece4] bg-white p-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm text-[#052f29]">{{ rank.next ? `${rank.toNext} EXP to ${rank.next.shortName}` : 'Highest rank reached' }}</p>
              <p class="mt-1 text-xs text-zinc-500">{{ rank.next ? `${rank.current.shortName} → ${rank.next.shortName}` : 'You completed every current rank.' }}</p>
            </div>
            <span class="rounded-full bg-[#073f35] px-3 py-1.5 text-xs text-white">{{ rank.progress }}%</span>
          </div>
          <div class="mt-4 h-3 overflow-hidden rounded-full bg-[#e7f0ea]">
            <div class="h-full rounded-full bg-[#0a5a4b]" :style="{ width: `${rank.progress}%` }" />
          </div>
        </div>

        <div class="mt-6 grid gap-3 sm:grid-cols-5">
          <article
            v-for="item in userStore.detectiveRanks"
            :key="item.id"
            class="rounded-2xl border bg-white p-3"
            :class="rank.current.id === item.id ? 'border-[#0a5a4b] bg-[#e9f7ef]' : 'border-[#edf3ef] bg-white'"
          >
            <span class="grid size-10 place-items-center rounded-xl text-xs" :class="item.tone">{{ item.badge }}</span>
            <p class="mt-3 text-sm text-[#052f29]">{{ item.shortName }}</p>
            <p class="mt-1 text-xs text-zinc-500">{{ item.min }} EXP</p>
          </article>
        </div>

        <div class="mt-6 overflow-hidden rounded-[1.5rem] border border-[#dcece4] bg-white">
          <div class="flex items-center justify-between gap-3 bg-[#f5fbf7] px-4 py-4">
            <div>
              <p class="text-sm text-[#7a5f2f]">Owl skins</p>
              <h2 class="mt-1 text-xl text-zinc-950">Game character rewards</h2>
            </div>
            <span class="rounded-full bg-[#e7f0ea] px-3 py-1.5 text-xs text-[#355e54]">{{ selectedSkinName }}</span>
          </div>
          <div class="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <button
              v-for="skin in skins"
              :key="skin.id"
              class="rounded-2xl border p-3 text-left transition"
              :class="skinCardClass(skin)"
              type="button"
              :disabled="!skin.unlocked"
              @click="selectSkin(skin)"
            >
              <span class="flex items-start gap-3">
                <span class="grid size-14 shrink-0 place-items-center rounded-2xl text-xs shadow-sm" :class="skin.tone">{{ skin.badge }}</span>
                <span>
                  <span class="block text-sm text-[#052f29]">{{ skin.name }}</span>
                  <span class="mt-1 block text-xs text-zinc-500">{{ skin.description }}</span>
                  <span class="mt-2 inline-flex rounded-full px-2.5 py-1 text-[0.68rem]" :class="skin.unlocked ? 'bg-[#e9f7ef] text-[#0a5a4b]' : 'bg-[#f7f0e5] text-zinc-500'">
                    {{ skin.unlocked ? 'Unlocked' : 'Locked' }}
                  </span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      <section class="mt-5 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <article class="rounded-[1.5rem] border border-white/80 bg-white/84 p-5 shadow-xl shadow-emerald-950/6">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm text-[#7a5f2f]">Recent activity</p>
              <h2 class="mt-1 text-2xl text-zinc-950">Learning timeline</h2>
            </div>
            <span class="rounded-full bg-[#e7f0ea] px-3 py-1.5 text-xs text-[#355e54]">{{ recentActivity.length }}</span>
          </div>

          <div class="mt-4 grid gap-3">
            <div v-if="recentActivity.length === 0" class="rounded-2xl bg-[#f7f0e5] p-4 text-sm leading-6 text-zinc-600">
              Start a lesson or finish a Truth Check to build your activity timeline.
            </div>
            <div v-for="activity in recentActivity" :key="activity.id" class="flex gap-3 rounded-2xl border border-[#edf3ef] bg-white p-3">
              <span class="grid size-10 shrink-0 place-items-center rounded-xl text-xs" :class="activity.type === 'truth-check' ? 'bg-[#e7eef3] text-[#2f607a]' : 'bg-[#e9f7ef] text-[#355e54]'">
                {{ activity.type === 'truth-check' ? 'TC' : activity.type === 'practice' ? 'PX' : 'SX' }}
              </span>
              <div class="min-w-0">
                <p class="truncate text-sm text-[#052f29]">{{ activity.title }}</p>
                <p class="mt-1 text-xs leading-5 text-zinc-500">{{ activity.detail }} <span v-if="activity.points">· +{{ activity.points }} EXP</span></p>
              </div>
            </div>
          </div>
        </article>

        <article class="rounded-[1.5rem] border border-white/80 bg-white/84 p-5 shadow-xl shadow-emerald-950/6">
          <p class="text-sm text-[#7a5f2f]">Truth Check history</p>
          <h2 class="mt-1 text-2xl text-zinc-950">Last checks</h2>

          <div class="mt-4 grid gap-3">
            <div v-if="truthChecks.length === 0" class="rounded-2xl bg-[#f7f0e5] p-4 text-sm leading-6 text-zinc-600">
              No saved checks yet.
            </div>
            <div v-for="check in truthChecks" :key="check.id" class="rounded-2xl border border-[#edf3ef] bg-white p-3">
              <div class="flex items-start justify-between gap-3">
                <p class="text-sm text-[#052f29]">{{ check.title }}</p>
                <span class="rounded-full bg-[#e9f7ef] px-2.5 py-1 text-xs text-[#355e54]">{{ check.riskScore }}</span>
              </div>
              <p class="mt-2 line-clamp-2 text-xs leading-5 text-zinc-500">{{ check.detail }}</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import siteLogo from '../assets/little-detective-logo-myanmar.png'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const router = useRouter()
userStore.syncRankRewards()

const displayName = computed(() => userStore.user?.name || 'Detective')
const avatarUrl = computed(() => userStore.user?.avatar || userStore.user?.picture || userStore.user?.google_avatar)
const initials = computed(() => displayName.value.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase())
const rank = computed(() => userStore.rankInfo)
const recentActivity = computed(() => userStore.learningProfile.recentActivity || [])
const truthChecks = computed(() => userStore.learningProfile.truthChecks || [])
const skins = computed(() => [
  {
    id: 'classic',
    name: 'Classic Owl',
    description: 'Default detective academy character.',
    badge: 'OWL',
    tone: 'bg-[#e9f7ef] text-[#355e54]',
    unlocked: true,
  },
  {
    id: 'golden-owl',
    name: 'Golden Owl',
    description: 'Hidden maze easter egg reward.',
    badge: 'GOLD',
    tone: 'bg-[#fff3df] text-[#8a5a18]',
    unlocked: !!userStore.learningProfile.unlockedSkins?.['golden-owl'],
  },
  {
    id: 'shadow-owl',
    name: 'Shadow Owl',
    description: 'Reach Senior Detective to unlock.',
    badge: 'SHD',
    tone: 'bg-[#e7eef3] text-[#334155]',
    unlocked: !!userStore.learningProfile.unlockedSkins?.['shadow-owl'],
  },
  {
    id: 'sky-owl',
    name: 'Sky Owl',
    description: 'Reach Professional Detective to unlock.',
    badge: 'SKY',
    tone: 'bg-[#e0f2fe] text-[#164e63]',
    unlocked: !!userStore.learningProfile.unlockedSkins?.['sky-owl'],
  },
])
const selectedSkinName = computed(() => skins.value.find((skin) => skin.id === userStore.learningProfile.selectedSkin)?.name || 'Classic Owl')

function skinCardClass(skin) {
  if (!skin.unlocked) return 'cursor-not-allowed border-[#edf3ef] bg-[#f8faf9] opacity-60'
  return userStore.learningProfile.selectedSkin === skin.id
    ? 'border-[#0a5a4b] bg-[#e9f7ef]'
    : 'border-[#edf3ef] bg-white hover:border-[#0a5a4b]'
}

function selectSkin(skin) {
  if (!skin.unlocked) return
  userStore.selectSkin(skin.id)
}

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>
