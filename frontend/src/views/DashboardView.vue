<template>
  <div class="dashboard-page min-h-screen text-zinc-900">
    <header class="sticky top-0 z-20 border-b border-[#dcece4] bg-[#fffcf1]/90 px-4 py-3 backdrop-blur sm:px-8">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
        <RouterLink class="flex min-w-0 items-center gap-3" to="/" aria-label="Sone Dauk Lay home">
          <span class="sdl-logo sdl-logo-sm shrink-0" aria-hidden="true">
            <img :src="siteLogo" alt="" />
          </span>
          <span class="hidden min-w-0 sm:block">
            <span class="block truncate text-base text-zinc-950">Sone Dauk Lay</span>
            <span class="block truncate text-xs text-zinc-500">{{ text.product }}</span>
          </span>
        </RouterLink>

        <div class="flex min-w-0 flex-1 items-center justify-end gap-2">
          <div class="relative">
            <button
              class="rounded-full border border-[#cfe4da] bg-white/80 px-3 py-2 text-xs text-[#355e54] hover:bg-white"
              type="button"
              :aria-expanded="showGuide"
              @click="showGuide = !showGuide"
            >
              {{ text.guide }}
            </button>
            <div
              v-if="showGuide"
              class="absolute right-0 top-10 z-30 w-[min(19rem,calc(100vw-2rem))] rounded-2xl border border-[#dcece4] bg-white p-4 text-left shadow-2xl shadow-zinc-900/12"
            >
              <p class="text-sm text-[#052f29]">{{ text.guideTitle }}</p>
              <ol class="mt-3 grid gap-2 text-xs leading-5 text-zinc-600">
                <li v-for="step in text.guideSteps" :key="step" class="flex gap-2">
                  <span class="mt-1 size-1.5 shrink-0 rounded-full bg-[#0a5a4b]" />
                  <span>{{ step }}</span>
                </li>
              </ol>
            </div>
          </div>

          <div class="flex rounded-full border border-[#cfe4da] bg-white/80 p-1">
            <button
              v-for="option in languages"
              :key="option.id"
              class="rounded-full px-3 py-1.5 text-xs"
              :class="language === option.id ? 'bg-[#0a5a4b] text-white' : 'text-zinc-600 hover:bg-white'"
              @click="userStore.setSiteLanguage(option.id)"
            >
              {{ option.label }}
            </button>
          </div>

          <RouterLink class="hidden items-center gap-2 rounded-full border border-[#cfe4da] bg-white/80 px-3 py-2 text-xs text-[#355e54] hover:bg-white sm:inline-flex" to="/profile">
            <span class="grid size-6 place-items-center rounded-full text-[0.65rem]" :class="rank.current.tone">{{ rank.current.badge }}</span>
            {{ rank.current.name }}
          </RouterLink>

          <span class="hidden rounded-full border border-[#eadfce] bg-white/80 px-3 py-2 text-xs text-[#7a5f2f] md:inline-flex">
            {{ userStore.completedLessonCount }}/60
          </span>

          <RouterLink class="hidden min-w-36 rounded-2xl border border-[#dcece4] bg-white/80 px-3 py-2 text-xs text-[#0a4a3e] md:block" to="/profile">
            <span class="flex items-center justify-between gap-2">
              <span>{{ text.exp }}</span>
              <span>{{ rank.progress }}%</span>
            </span>
            <span class="mt-1 block h-1.5 overflow-hidden rounded-full bg-[#e7f0ea]">
              <span class="block h-full rounded-full bg-[#0a5a4b]" :style="{ width: `${rank.progress}%` }" />
            </span>
          </RouterLink>

          <RouterLink class="rounded-full border border-[#cfe4da] bg-white/80 px-3 py-2 text-xs text-zinc-700 hover:bg-white" to="/profile">
            {{ text.profile }}
          </RouterLink>
          <button class="rounded-full bg-[#073f35] px-3 py-2 text-xs text-white hover:bg-[#052f29]" @click="handleLogout">
            {{ text.logout }}
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl px-4 py-5 sm:px-8 sm:py-8" :lang="language === 'mm' ? 'my' : 'en'">
      <section class="rounded-[1.75rem] border border-white/80 bg-white/84 p-5 shadow-xl shadow-emerald-950/6 sm:p-6">
        <div class="grid gap-5 lg:grid-cols-[1fr_18rem] lg:items-center">
          <div>
            <p class="text-sm text-[#7a5f2f]">{{ text.greeting }}, {{ firstName }}</p>
            <h1 class="mt-1 text-3xl leading-tight text-[#052f29] sm:text-4xl">{{ text.modules }}</h1>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">{{ text.subtitle }}</p>
          </div>

          <div class="rounded-2xl border border-[#dcece4] bg-[#f5fbf7] p-4">
            <div class="flex items-center gap-3">
              <span class="grid size-12 place-items-center rounded-xl text-xs" :class="rank.current.tone">{{ rank.current.badge }}</span>
              <div>
                <p class="text-xs text-[#7a5f2f]">{{ text.rank }}</p>
                <p class="text-base text-[#052f29]">{{ rank.current.name }}</p>
              </div>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-2">
              <div class="rounded-xl bg-white px-3 py-2">
                <p class="text-xs text-zinc-500">{{ text.completed }}</p>
                <p class="mt-1 text-sm text-[#052f29]">{{ userStore.completedLessonCount }}/60</p>
              </div>
              <div class="rounded-xl bg-white px-3 py-2">
                <p class="text-xs text-zinc-500">{{ text.exp }}</p>
                <div class="mt-2 h-2 overflow-hidden rounded-full bg-[#e7f0ea]">
                  <div class="h-full rounded-full bg-[#0a5a4b]" :style="{ width: `${rank.progress}%` }" />
                </div>
                <p class="mt-1 text-xs text-zinc-500">{{ rank.next ? `${rank.toNext} EXP` : text.maxRank }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 grid gap-4 lg:grid-cols-2">
          <RouterLink
            v-for="module in modules"
            :key="module.code"
            class="premium-card group flex min-h-60 flex-col rounded-[1.5rem] border border-[#dcece4] bg-white p-5 text-left shadow-lg shadow-zinc-900/5 lg:min-h-64"
            :to="module.path"
          >
            <span class="flex items-start justify-between gap-4">
              <span class="grid size-16 place-items-center rounded-2xl text-base" :class="module.badgeClass">
                <img v-if="module.icon" class="size-12" :src="module.icon" alt="" />
                <span v-else>{{ module.code }}</span>
              </span>
              <span class="rounded-full bg-[#f7f0e5] px-3 py-1 text-xs text-[#7a5f2f]">{{ module.status[language] }}</span>
            </span>
            <span class="mt-5 block text-2xl leading-8 text-zinc-950">{{ module.title[language] }}</span>
            <span class="mt-3 block flex-1 text-base leading-7 text-zinc-600">{{ module.description[language] }}</span>
            <span class="mt-5 inline-flex w-fit rounded-full bg-[#0a5a4b] px-4 py-2 text-sm text-white group-hover:bg-[#073f35]">
              {{ text.open }}
            </span>
          </RouterLink>
        </div>
      </section>

    </main>

    <div v-if="showOnboarding" class="fixed inset-0 z-50 grid place-items-center bg-[#052f29]/56 p-4 backdrop-blur-sm">
      <section class="w-full max-w-2xl rounded-[1.75rem] border border-white/70 bg-[#fffcf1] p-5 shadow-2xl shadow-zinc-950/25 sm:p-7" :lang="language === 'mm' ? 'my' : 'en'">
        <div class="flex items-start gap-4">
          <span class="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#e9f7ef]">
            <img class="size-11 object-contain" :src="siteLogo" alt="" />
          </span>
          <div>
            <p class="text-sm text-[#7a5f2f]">{{ text.onboardingKicker }}</p>
            <h2 class="mt-1 text-2xl leading-tight text-[#052f29] sm:text-3xl">{{ text.onboardingTitle }}</h2>
            <p class="mt-2 text-sm leading-7 text-zinc-600">{{ text.onboardingBody }}</p>
          </div>
        </div>

        <div class="mt-5 grid gap-3 sm:grid-cols-3">
          <article v-for="item in text.onboardingCards" :key="item.title" class="rounded-2xl border border-[#dcece4] bg-white p-4">
            <span class="grid size-9 place-items-center rounded-xl bg-[#f7f0e5] text-sm text-[#7a5f2f]">{{ item.step }}</span>
            <h3 class="mt-3 text-base text-[#052f29]">{{ item.title }}</h3>
            <p class="mt-2 text-xs leading-5 text-zinc-500">{{ item.body }}</p>
          </article>
        </div>

        <div class="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button class="rounded-full border border-[#cfe4da] bg-white px-5 py-2.5 text-sm text-[#0a4a3e]" type="button" @click="dismissOnboarding">
            {{ text.skip }}
          </button>
          <RouterLink class="rounded-full bg-[#0a5a4b] px-5 py-2.5 text-center text-sm text-white" to="/academy" @click="dismissOnboarding">
            {{ text.startAcademy }}
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import academyIcon from '../assets/little-detective-logo-myanmar.png'
import siteLogo from '../assets/little-detective-logo-myanmar.png'
import truthCheckIcon from '../assets/truth-check-icon.svg'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const router = useRouter()
const language = computed(() => userStore.siteLanguage)
const showGuide = ref(false)
const showOnboarding = ref(localStorage.getItem('sdl-dashboard-onboarding') !== 'done')

const languages = [
  { id: 'en', label: 'EN' },
  { id: 'mm', label: 'MM' },
]

const labels = {
  en: {
    product: 'Little Detective',
    workspace: 'Workspace',
    greeting: 'Welcome back',
    subtitle: 'Continue learning, check suspicious posts, and build your misinformation-detection rank.',
    continue: 'Continue',
    guide: 'Guide',
    guideTitle: 'How to use the dashboard',
    guideSteps: ['Start with Detective Academy.', 'Use Truth Check when you see a suspicious post.', 'Open Profile to see rank, badges, and EXP.'],
    rank: 'Current rank',
    toNext: 'to next rank',
    maxRank: 'Highest rank reached',
    completed: 'Completed lessons',
    completedHint: 'Practice wins count here',
    exp: 'Total EXP',
    expHint: 'Study and practice rewards',
    modulesKicker: 'Learning tools',
    modules: 'Choose your next action',
    pathHint: 'Learn → Check',
    profile: 'Profile',
    logout: 'Logout',
    admin: 'Admin',
    open: 'Open',
    recent: 'Recent activity',
    emptyActivity: 'Finish an Academy lesson or Truth Check to see activity here.',
    onboardingKicker: 'First time here?',
    onboardingTitle: 'Your dashboard is the mission hub.',
    onboardingBody: 'Use it to choose a learning module, track rank progress, and return to Profile when you want badges, skins, and activity history.',
    onboardingCards: [
      { step: '1', title: 'Learn', body: 'Open Detective Academy and finish lessons in order.' },
      { step: '2', title: 'Check', body: 'Use Truth Check when you see a suspicious post.' },
      { step: '3', title: 'Grow', body: 'Earn EXP, unlock ranks, and collect owl skins.' },
    ],
    skip: 'Got it',
    startAcademy: 'Start Academy',
  },
  mm: {
    product: 'စုံထောက်လေး',
    workspace: 'လေ့လာရေးနေရာ',
    greeting: 'ပြန်လာတာကြိုဆိုပါတယ်',
    subtitle: 'သင်ခန်းစာများကိုဆက်လေ့လာပြီး သတင်းအကြောင်းအရာများကို စစ်ဆေးကာ စုံထောက်အဆင့်တိုးအောင် လေ့ကျင့်ပါ။',
    continue: 'ဆက်သွားရန်',
    guide: 'လမ်းညွှန်',
    guideTitle: 'အသုံးပြုပုံ',
    guideSteps: ['စုံထောက်သင်ခန်းစာများကို အရင်လေ့လာပါ။', 'သံသယဖြစ်စရာ ပို့စ်တွေ့ရင် အမှန်စစ်ဖြင့် စစ်ပါ။', 'ကိုယ်ရေးစာမျက်နှာမှာ တိုးတက်မှုကို ကြည့်ပါ။'],
    rank: 'လက်ရှိအဆင့်',
    toNext: 'လိုသေးသည်',
    maxRank: 'အမြင့်ဆုံးအဆင့်ရောက်ပြီး',
    completed: 'ပြီးမြောက်သောသင်ခန်းစာ',
    completedHint: 'လေ့ကျင့်ခန်းအောင်မြင်မှုကို ရေတွက်သည်',
    exp: 'စုစုပေါင်း EXP',
    expHint: 'လေ့လာမှုနှင့်လေ့ကျင့်မှုဆု',
    modulesKicker: 'အသုံးပြုနိုင်သော ကိရိယာများ',
    modules: 'နောက်လုပ်မည့်အရာကိုရွေးပါ',
    pathHint: 'လေ့လာ → စစ်ဆေး',
    profile: 'ကိုယ်ရေးစာမျက်နှာ',
    logout: 'Logout',
    admin: 'Admin',
    open: 'ဖွင့်မည်',
    recent: 'လတ်တလောလုပ်ဆောင်မှု',
    emptyActivity: 'Academy သင်ခန်းစာ သို့မဟုတ် Truth Check တစ်ခုပြီးလျှင် ဒီနေရာမှာပြပါမယ်။',
    onboardingKicker: 'ပထမဆုံးဝင်တာလား',
    onboardingTitle: 'Dashboard သည် သင့် mission hub ပါ။',
    onboardingBody: 'ဒီနေရာကနေ သင်ခန်းစာရွေးနိုင်၊ အဆင့်တိုးတက်မှုကြည့်နိုင်ပြီး Profile မှာ badge၊ skin၊ လုပ်ဆောင်မှုမှတ်တမ်းများကြည့်နိုင်ပါတယ်။',
    onboardingCards: [
      { step: '1', title: 'လေ့လာ', body: 'Detective Academy ထဲဝင်ပြီး lesson များကို အစဉ်လိုက်ပြီးအောင်လုပ်ပါ။' },
      { step: '2', title: 'စစ်ဆေး', body: 'သံသယဖြစ်စရာ post တွေ့ပါက Truth Check ဖြင့်စစ်ပါ။' },
      { step: '3', title: 'တိုးတက်', body: 'EXP ရယူပြီး rank တက်ကာ owl skin များဖွင့်ပါ။' },
    ],
    skip: 'နားလည်ပြီ',
    startAcademy: 'Academy စမယ်',
  },
}

const text = computed(() => labels[language.value])
const displayName = computed(() => userStore.user?.name || 'Detective')
const firstName = computed(() => displayName.value.split(' ')[0] || displayName.value)
const rank = computed(() => userStore.rankInfo)
const modules = [
  {
    code: 'DA',
    icon: academyIcon,
    title: { en: 'Detective Academy', mm: 'စုံထောက်သင်ခန်းစာများ' },
    description: {
      en: 'Learn misinformation clues through short lessons and practice games.',
      mm: 'သတင်းမှားသတိထားရမည့်အချက်များကို သင်ခန်းစာတိုနှင့် လေ့ကျင့်ခန်းများဖြင့် လေ့လာပါ။',
    },
    path: '/academy',
    status: { en: 'Step 1 · Learn', mm: 'အဆင့် ၁ · လေ့လာရန်' },
    badgeClass: 'bg-[#f7ead0] text-[#7a5f2f]',
  },
  {
    code: 'TC',
    icon: truthCheckIcon,
    title: { en: 'Truth Check', mm: 'အမှန်စစ်' },
    description: {
      en: 'Paste a post, answer guided questions, and get a safe response.',
      mm: 'ပို့စ်တစ်ခုထည့်ပြီး မေးခွန်းများဖြေကာ မျှဝေသင့်/မသင့် စစ်ဆေးပါ။',
    },
    path: '/truth-check',
    status: { en: 'Step 2 · Check', mm: 'အဆင့် ၂ · စစ်ဆေးရန်' },
    badgeClass: 'bg-[#e7f0ea] text-[#355e54]',
  },
]

const nextModule = computed(() => {
  if (userStore.completedLessonCount === 0) return modules[0]
  return modules[1]
})

function handleLogout() {
  userStore.logout()
  router.push('/login')
}

function dismissOnboarding() {
  showOnboarding.value = false
  localStorage.setItem('sdl-dashboard-onboarding', 'done')
}
</script>
