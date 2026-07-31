<template>
  <div class="home-page min-h-screen overflow-hidden text-zinc-900" :lang="language === 'mm' ? 'my' : 'en'">
    <header class="site-header home-site-header absolute inset-x-0 top-0 z-20 mx-auto max-w-7xl px-4 py-4 text-white sm:px-8 sm:py-5">
      <RouterLink to="/" class="flex items-center gap-3" aria-label="Sone Dauk Lay home">
        <span class="sdl-logo sdl-logo-light" aria-hidden="true">
          <img :src="siteLogo" alt="" />
        </span>
        <span>
          <span class="block text-base">{{ t.brand }}</span>
          <span class="site-brand-subtitle block text-sm text-white/72">{{ t.brandMm }}</span>
        </span>
      </RouterLink>

      <button class="site-menu-button border-white/24 bg-white/14 text-white" type="button" :aria-expanded="mobileMenuOpen" @click="mobileMenuOpen = !mobileMenuOpen">
        {{ t.menu }}
      </button>

      <nav class="site-nav site-desktop-nav">
        <RouterLink class="site-nav-link text-white/82 hover:bg-white/14 hover:text-white" to="/" @click="mobileMenuOpen = false">
          Home
        </RouterLink>
        <RouterLink class="site-nav-link text-white/82 hover:bg-white/14 hover:text-white" to="/about" @click="mobileMenuOpen = false">
          {{ t.navAbout }}
        </RouterLink>
        <LanguageToggle light />
        <RouterLink class="site-nav-link bg-white/88 px-4 text-[#173f37] hover:bg-white" to="/login" @click="mobileMenuOpen = false">
          {{ t.navLogin }}
        </RouterLink>
      </nav>

      <nav v-if="mobileMenuOpen" class="site-mobile-menu border-white/20 bg-[#073f35]/94 text-white shadow-black/20">
        <RouterLink to="/" @click="mobileMenuOpen = false">Home</RouterLink>
        <RouterLink to="/about" @click="mobileMenuOpen = false">{{ t.navAbout }}</RouterLink>
        <RouterLink to="/login" @click="mobileMenuOpen = false">{{ t.navLogin }}</RouterLink>
        <div class="pt-1">
          <LanguageToggle light />
        </div>
      </nav>
    </header>

    <section class="home-hero relative flex min-h-screen flex-col justify-end overflow-hidden px-5 pb-24 pt-28 text-white sm:px-8">
      <img class="home-hero-image" :src="heroImage" alt="People walking together on a Myanmar bridge at sunset" />
      <div class="home-hero-shade" aria-hidden="true" />

      <div class="relative z-10 mx-auto w-full max-w-7xl">
        <p class="max-w-fit rounded-full border border-white/30 bg-white/16 px-4 py-2 text-xs text-white/84 backdrop-blur-sm sm:text-sm">
          {{ t.kicker }}
        </p>
        <h1 class="mt-5 max-w-4xl text-4xl leading-tight drop-shadow-lg sm:text-6xl">
          {{ t.brand }}
        </h1>
        <p class="mt-3 text-xl text-[#f1d8a7] drop-shadow sm:text-3xl">
          {{ t.brandMm }}
        </p>
        <p class="mt-6 max-w-xl text-base leading-7 text-white/90 drop-shadow sm:text-lg sm:leading-8">
          {{ t.heroBody }}
        </p>
        <div class="mt-7 flex flex-wrap gap-3">
          <RouterLink class="rounded-full bg-[#f1d8a7] px-5 py-3 text-sm text-[#173f37] hover:bg-[#ffe6b8] sm:text-base" :to="startPath">
            {{ startLabel }}
          </RouterLink>
          <a class="rounded-full border border-white/34 bg-white/14 px-5 py-3 text-sm text-white hover:bg-white/22 sm:text-base" href="#main-section">
            {{ t.secondaryCta }}
          </a>
        </div>
      </div>

      <a class="scroll-arrow" href="#main-section" aria-label="Scroll to main section">
        <span class="sr-only">Scroll to main section</span>
        <span />
      </a>
    </section>

    <main id="main-section" class="relative z-10 bg-[#fbf9f0]">
      <section id="problem-section" class="reveal-section px-4 py-10 sm:px-8 sm:py-14">
        <div class="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div class="lg:pr-8">
            <p class="text-sm text-[#7a5f2f]">{{ t.problemKicker }}</p>
            <h2 class="mt-3 text-2xl leading-tight text-zinc-950 sm:text-4xl">
              {{ t.problemTitle }}
            </h2>
            <p class="mt-4 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
              {{ t.problemBody }}
            </p>
            <div class="mt-5 grid grid-cols-3 gap-2 sm:max-w-xl">
              <article v-for="problem in problems" :key="problem.title" class="rounded-2xl border border-[#dcece4] bg-white p-3">
                <span class="text-xs text-[#bf6b3d]">{{ problem.code }}</span>
                <h3 class="mt-1 text-xs leading-5 text-[#052f29] sm:text-sm">{{ problem.title }}</h3>
              </article>
            </div>
          </div>

          <img class="aspect-[16/10] w-full rounded-2xl object-cover shadow-2xl shadow-zinc-900/10 sm:rounded-3xl lg:aspect-[4/3]" :src="communityImage" alt="Myanmar community learning together" />
        </div>
      </section>

      <section id="tools-section" class="reveal-section px-4 py-10 sm:px-8 sm:py-14" style="--reveal-delay: 80ms">
        <div class="mx-auto max-w-7xl">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm text-[#7a5f2f]">{{ t.navAcademy }}</p>
              <h2 class="mt-3 text-2xl leading-tight text-zinc-950 sm:text-4xl">
                {{ t.toolsTitle }}
              </h2>
            </div>
            <RouterLink class="w-fit rounded-full bg-[#0a5a4b] px-5 py-2.5 text-sm text-white hover:bg-[#073f35]" :to="startPath">
              {{ t.dashboardCta }}
            </RouterLink>
          </div>

          <div class="mt-6 grid gap-4 lg:grid-cols-2">
            <RouterLink
              v-for="tool in tools"
              :key="tool.title"
              class="module-preview-card premium-card group rounded-3xl border border-[#dcece4] bg-white p-5 shadow-xl shadow-zinc-900/6"
              :to="startPath"
            >
              <div class="flex items-start justify-between gap-4">
                <span class="grid size-16 shrink-0 place-items-center rounded-2xl" :class="tool.badgeClass">
                  <img class="size-12 object-contain" :src="tool.icon" alt="" />
                </span>
                <span class="rounded-full border border-[#dcece4] bg-[#f5fbf7] px-3 py-1 text-xs text-[#0a5a4b]">
                  {{ tool.badge }}
                </span>
              </div>

              <h3 class="mt-5 text-2xl leading-8 text-zinc-950">{{ tool.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-zinc-600">
                {{ tool.description }}
              </p>

              <div class="mt-5 grid gap-2">
                <div
                  v-for="item in tool.preview"
                  :key="item"
                  class="flex items-center gap-3 rounded-2xl border border-[#dcece4] bg-[#f8fcf9] px-3 py-2.5 text-sm text-[#052f29]"
                >
                  <span class="size-2 rounded-full bg-[#0a5a4b]" />
                  <span>{{ item }}</span>
                </div>
              </div>

              <span class="mt-6 inline-flex rounded-full bg-[#0a5a4b] px-5 py-2.5 text-sm text-white group-hover:bg-[#073f35]">
                {{ tool.cta }}
              </span>
            </RouterLink>
          </div>
        </div>
      </section>

      <section class="reveal-section px-4 py-10 sm:px-8 sm:py-14" style="--reveal-delay: 120ms">
        <div class="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-[#dcece4] bg-[#073f35] text-white shadow-2xl shadow-emerald-950/18 lg:grid-cols-[0.95fr_1.05fr]">
          <div class="p-5 sm:p-8 lg:p-10">
            <p class="text-sm text-[#f1d8a7]">{{ t.gameKicker }}</p>
            <h2 class="mt-3 text-3xl leading-tight sm:text-5xl">{{ t.gameTitle }}</h2>
            <p class="mt-4 max-w-xl text-sm leading-7 text-white/76 sm:text-base sm:leading-8">
              {{ t.gameBody }}
            </p>
            <div class="mt-5 grid gap-2 sm:grid-cols-3">
              <div v-for="feature in t.gameFeatures" :key="feature" class="rounded-2xl border border-white/12 bg-white/8 px-3 py-3 text-sm leading-6 text-white/86">
                {{ feature }}
              </div>
            </div>
            <RouterLink class="mt-6 inline-flex rounded-full bg-[#f1d8a7] px-6 py-3 text-sm text-[#173f37] hover:bg-[#ffe6b8] sm:text-base" :to="gamePath">
              {{ t.gameCta }}
            </RouterLink>
          </div>

          <RouterLink class="maze-promo-stage group relative min-h-72 overflow-hidden bg-[#e6f3ec] sm:min-h-96" :to="gamePath" aria-label="Play Misinformation Maze">
            <div class="maze-promo-path" aria-hidden="true" />
            <div class="maze-promo-wall wall-a" aria-hidden="true" />
            <div class="maze-promo-wall wall-b" aria-hidden="true" />
            <div class="maze-promo-wall wall-c" aria-hidden="true" />
            <div class="maze-promo-clue clue-a" aria-hidden="true">SRC</div>
            <div class="maze-promo-clue clue-b" aria-hidden="true">DATE</div>
            <div class="maze-promo-enemy enemy-a" aria-hidden="true">!</div>
            <div class="maze-promo-enemy enemy-b" aria-hidden="true">?</div>
            <div class="maze-promo-owl" aria-hidden="true">
              <span class="eye left" />
              <span class="eye right" />
              <span class="beak" />
            </div>
            <div class="maze-promo-gate" aria-hidden="true">✓</div>
          </RouterLink>
        </div>
      </section>

      <section class="reveal-section px-5 py-14 sm:px-8 sm:py-20" style="--reveal-delay: 180ms">
        <div class="relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-5 py-10 text-white shadow-2xl shadow-emerald-950/20 sm:px-8">
          <img class="absolute inset-0 size-full object-cover" :src="baganImage" alt="Bagan landscape" />
          <div class="absolute inset-0 bg-[#073f35]/78" aria-hidden="true" />
          <div class="relative max-w-3xl">
            <p class="text-sm text-[#f1d8a7]">{{ t.finalKicker }}</p>
            <h2 class="mt-3 text-3xl leading-tight sm:text-4xl">
              {{ t.finalTitle }}
            </h2>
            <p class="mt-4 text-base leading-8 text-white/76">
              {{ t.finalBody }}
            </p>
            <RouterLink class="mt-7 inline-flex rounded-full bg-[#f1d8a7] px-6 py-3 text-base text-[#173f37] hover:bg-[#ffe6b8]" :to="startPath">
              {{ startLabel }}
            </RouterLink>
          </div>
        </div>
      </section>

      <footer class="border-t border-[#dcece4] px-5 py-8 sm:px-8">
        <div class="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <RouterLink to="/" class="flex items-center gap-3">
            <span class="sdl-logo sdl-logo-sm" aria-hidden="true">
              <img :src="siteLogo" alt="" />
            </span>
            <span>
              <span class="block text-base text-zinc-950">Sone Dauk Lay</span>
              <span class="block text-sm text-zinc-500">စုံထောက်လေး</span>
            </span>
          </RouterLink>
          <p class="text-sm leading-6 text-zinc-500">
            Built for Myanmar misinformation literacy.
          </p>
          <nav class="flex flex-wrap gap-3 text-sm text-zinc-500">
            <RouterLink class="hover:text-[#0a5a4b]" to="/">Home</RouterLink>
            <RouterLink class="hover:text-[#0a5a4b]" to="/about">About us</RouterLink>
            <RouterLink class="hover:text-[#0a5a4b]" to="/login">Login</RouterLink>
          </nav>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import LanguageToggle from '../components/LanguageToggle.vue'
import heroImage from '../assets/myanmar-bridge.jpg'
import communityImage from '../assets/myanmar-community.jpg'
import baganImage from '../assets/bagan-hero.jpg'
import siteLogo from '../assets/little-detective-logo-myanmar.png'
import truthCheckIcon from '../assets/truth-check-icon.svg'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const mobileMenuOpen = ref(false)

const startPath = computed(() => (userStore.token ? '/dashboard' : '/login'))
const gamePath = computed(() => (userStore.token ? '/academy/maze' : '/login'))
const language = computed(() => userStore.siteLanguage)
const t = computed(() => homeCopy[language.value])
const startLabel = computed(() => (userStore.token ? t.value.dashboardCta : t.value.startCta))

const problems = computed(() => t.value.problems)
const tools = computed(() => [
  {
    icon: siteLogo,
    title: t.value.academyTitle,
    description: t.value.academyBody,
    badge: t.value.academyBadge,
    cta: t.value.academyCta,
    preview: t.value.academyPreview,
    badgeClass: 'bg-[#fff3df]',
  },
  {
    icon: truthCheckIcon,
    title: t.value.truthCheckTitle,
    description: t.value.truthCheckDescription,
    badge: t.value.truthCheckBadge,
    cta: t.value.truthCheckCta,
    preview: t.value.truthCheckPreview,
    badgeClass: 'bg-[#e9f7ef]',
  },
])

const homeCopy = {
  mm: {
    brand: 'Sone Dauk Lay',
    brandMm: 'စုံထောက်လေး',
    navAcademy: 'Detective Academy',
    navAbout: 'About us',
    navLogin: 'Login',
    menu: 'Menu',
    kicker: 'သတင်းမှန် စစ်ဆေးရေး လေ့လာမှု',
    heroBody: 'သံသယဖြစ်စရာ ပို့စ်၊ ဓာတ်ပုံ၊ ဗီဒီယိုတွေကို မမျှဝေခင် စိတ်အေးအေးနဲ့ စစ်ဆေးနိုင်အောင် ကူညီပေးတဲ့ လေ့လာရေးနေရာပါ။',
    startCta: 'စတင်လေ့လာရန်',
    secondaryCta: 'အောက်သို့ကြည့်ရန်',
    dashboardCta: 'စတင်အသုံးပြုရန်',
    problemKicker: 'ဘာကြောင့်လိုအပ်လဲ',
    problemTitle: 'မျှဝေဖို့လွယ်ပေမယ့် ပြန်ပြင်ဖို့ခက်ပါတယ်။',
    problemBody: 'ပို့စ်တစ်ခုက မိသားစု၊ ကျောင်း၊ သူငယ်ချင်းအဖွဲ့ထဲကို မြန်မြန်ပြန့်နိုင်ပါတယ်။ Sone Dauk Lay က မမျှဝေခင် ရင်းမြစ်၊ ရက်စွဲ၊ အထောက်အထားကို စစ်တဲ့အလေ့အကျင့်ကို လေ့ကျင့်ပေးပါတယ်။',
    aboutCta: 'အဖွဲ့အကြောင်း',
    flowKicker: 'အသုံးပြုပုံ',
    flowTitle: 'လေ့လာပါ၊ စစ်ပါ၊ ယဉ်ကျေးစွာ ပြန်ရှင်းပါ',
    toolsTitle: 'အဓိကလုပ်ဆောင်ချက်များ',
    gameKicker: 'Academy game',
    gameTitle: 'သတင်းမှားလမ်းကြောင်းဂိမ်းကို ကစားပါ။',
    gameBody: 'စုံထောက်ဇီးကွက်လေးနဲ့ maze ထဲဝင်ပြီး ရင်းမြစ်၊ ရက်စွဲ၊ အထောက်အထား clue များကိုစုပါ။ ရန်သူတွေကိုရှောင်ပြီး အမှန်တံခါးထိရောက်အောင်လုပ်ရမယ့် Academy ဂိမ်းပါ။',
    gameFeatures: ['Joystick ဖြင့် mobile မှာကစားနိုင်', 'ရန်သူများ၊ trap များနှင့် power-up များ', 'ပြီးမြောက်လျှင် EXP ရရှိ'],
    gameCta: 'ဂိမ်းကစားရန်',
    academyTitle: 'စုံထောက် သင်ခန်းစာများ',
    academyBody: 'အခန်း ၃ ခု၊ သင်ခန်းစာ ၆၀ ခုနဲ့ သတင်းမှားကို ရှာဖွေစစ်ဆေးနည်းတွေကို တဖြည်းဖြည်းလေ့လာနိုင်ပါတယ်။',
    academyBadge: 'သင်ခန်းစာ + ဂိမ်း',
    academyCta: 'Academy ဝင်ရန်',
    learningPath: 'လေ့လာရေးလမ်းကြောင်း',
    learningPathBody: 'သင်ခန်းစာတိုင်းမှာ လေ့ကျင့်ခန်းပါပါတယ်',
    finalKicker: 'Start now',
    finalTitle: 'စုံထောက်လေးနဲ့ မမျှဝေခင် အမှန်စစ်ပါ။',
    finalBody: 'သင်ခန်းစာများကို လေ့လာပြီး အမှန်စစ်ကိရိယာနဲ့ မမျှဝေခင် လက်တွေ့စမ်းပါ။',
    problems: [
      { code: '!', title: 'အမြန်ပျံ့နှံ့ခြင်း' },
      { code: '?', title: 'ရင်းမြစ်မရှင်းခြင်း' },
      { code: '✓', title: 'ယုံကြည်မှုထိခိုက်ခြင်း' },
    ],
    steps: [
      { code: '1', title: 'Learn', description: 'Detective Academy မှာ source, date, evidence, media clue များကိုတိုတိုလေ့လာပါ။' },
      { code: '2', title: 'Check', description: 'အမှန်စစ် tool နဲ့ post/message တစ်ခုကို မျှဝေခင်အဆင့်လိုက်စစ်ပါ။' },
      { code: '3', title: 'Respond', description: 'Rumor တွေ့လျှင် လူကိုအရှက်မပေးဘဲ အေးဆေး correction ရေးပါ။' },
    ],
    academyPreview: ['ရင်းမြစ်၊ ရက်စွဲ၊ ပေးပို့သူ စစ်ခြင်း', 'ဓာတ်ပုံ၊ ဗီဒီယို အထောက်အထားစစ်ခြင်း', 'Maze game ဖြင့် clue စုဆောင်းခြင်း'],
    truthCheckTitle: 'အမှန်စစ်',
    truthCheckDescription: 'ပို့စ်မမျှဝေခင် ရင်းမြစ်၊ ရက်စွဲ၊ အထောက်အထားကို စစ်ပါ။',
    truthCheckBadge: 'စစ်ဆေးရေး tool',
    truthCheckCta: 'အမှန်စစ်ရန်',
    truthCheckPreview: ['ပို့စ်/စာသား ထည့်ပြီးမှ စတင်နိုင်ခြင်း', 'source, date, evidence checklist', 'ယဉ်ကျေးတဲ့ response ကို copy ယူနိုင်ခြင်း'],
  },
  en: {
    brand: 'Sone Dauk Lay',
    brandMm: 'Little Detective',
    navAcademy: 'Detective Academy',
    navAbout: 'About us',
    navLogin: 'Login',
    menu: 'Menu',
    kicker: 'Myanmar misinformation literacy',
    heroBody: 'A practical learning space for checking suspicious posts, protecting community trust, and sharing information responsibly.',
    startCta: 'Start learning',
    secondaryCta: 'Explore website',
    dashboardCta: 'Go to dashboard',
    problemKicker: 'Problem',
    problemTitle: 'Sharing is easy. Repairing trust is hard.',
    problemBody: 'A viral post can reach families, schools, and community chats fast. Sone Dauk Lay builds the habit of checking source, date, and evidence before sharing.',
    aboutCta: 'Read about the project',
    flowKicker: 'How it works',
    flowTitle: 'Learn → Check → Respond',
    toolsTitle: 'Tools that turn lessons into action.',
    gameKicker: 'Academy game',
    gameTitle: 'Play the Misinformation Maze.',
    gameBody: 'Guide the detective owl through a maze, collect source/date/evidence clues, avoid misinformation enemies, and reach the truth gate.',
    gameFeatures: ['Mobile joystick support', 'Enemies, traps, and power-ups', 'Earn EXP after clearing'],
    gameCta: 'Play the game',
    academyTitle: 'Detective Academy',
    academyBody: 'Three chapters and sixty lessons combine short study pages with practice games for misinformation literacy.',
    academyBadge: 'Lessons + game',
    academyCta: 'Enter Academy',
    learningPath: 'Learning path',
    learningPathBody: 'Every lesson ends with practice',
    finalKicker: 'Start now',
    finalTitle: 'Check before you share with Sone Dauk Lay.',
    finalBody: 'Learn in the Academy, then practice checking before sharing with Truth Check.',
    problems: [
      { code: '!', title: 'Fast spread' },
      { code: '?', title: 'Unclear source' },
      { code: '✓', title: 'Damaged trust' },
    ],
    steps: [
      { code: '1', title: 'Learn', description: 'Study source, date, evidence, and media clues in short Academy lessons.' },
      { code: '2', title: 'Check', description: 'Use Truth Check to review a post or message before sharing.' },
      { code: '3', title: 'Respond', description: 'Write calm corrections that point back to evidence.' },
    ],
    academyPreview: ['Check source, date, and sender', 'Inspect photo and video evidence', 'Collect clues in the maze game'],
    truthCheckTitle: 'Truth Check',
    truthCheckDescription: 'Review source, date, and evidence before sharing a post.',
    truthCheckBadge: 'Checking tool',
    truthCheckCta: 'Check a post',
    truthCheckPreview: ['Input required before starting', 'Source, date, evidence checklist', 'Copy a calm safe response'],
  },
}
</script>
