<template>
  <div class="home-page min-h-screen text-zinc-900" :lang="language === 'mm' ? 'my' : 'en'">
    <header class="sticky top-0 z-20 border-b border-[#dcece4] bg-[#fffcf1]/92 px-4 py-3 backdrop-blur-md sm:px-8">
      <div class="site-header mx-auto max-w-7xl">
        <RouterLink class="flex items-center gap-3" to="/" aria-label="Sone Dauk Lay home">
          <span class="sdl-logo sdl-logo-sm" aria-hidden="true">
            <img :src="siteLogo" alt="" />
          </span>
          <span>
            <span class="block text-base text-[#052f29]">Sone Dauk Lay</span>
            <span class="site-brand-subtitle block text-xs text-zinc-500">{{ t.brandMm }}</span>
          </span>
        </RouterLink>

        <nav class="site-nav">
          <RouterLink class="site-nav-link text-zinc-600 hover:bg-white hover:text-[#052f29]" to="/">
            Home
          </RouterLink>
          <RouterLink class="site-nav-link bg-white text-[#052f29]" to="/about">
            {{ t.navAbout }}
          </RouterLink>
          <LanguageToggle />
          <RouterLink class="site-nav-link bg-[#0a5a4b] px-4 text-white hover:bg-[#073f35]" to="/login">
            {{ t.navLogin }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <section class="reveal-section px-4 py-8 sm:px-8 sm:py-14">
        <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p class="text-sm text-[#bf6b3d]">{{ t.navAbout }}</p>
            <h1 class="mt-3 text-3xl leading-tight text-[#052f29] sm:text-5xl">
              {{ t.heroTitle }}
            </h1>
            <p class="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
              {{ t.heroBody }}
            </p>
            <div class="mt-7 flex flex-wrap gap-3">
              <RouterLink class="rounded-full bg-[#0a5a4b] px-6 py-3 text-base text-white hover:bg-[#073f35]" :to="startPath">
                {{ startLabel }}
              </RouterLink>
              <RouterLink class="rounded-full border border-[#cfe4da] bg-white px-6 py-3 text-base text-[#0a5a4b] hover:bg-[#f5fbf7]" to="/#tools-section">
                {{ t.academyCta }}
              </RouterLink>
            </div>
          </div>

          <div class="rounded-2xl border border-[#dcece4] bg-white p-3 shadow-2xl shadow-zinc-900/8">
            <img class="aspect-[16/9] w-full rounded-xl object-cover sm:aspect-[4/3] sm:rounded-3xl" :src="aboutImage" alt="Myanmar learners using a community learning space" />
            <div class="mt-3 grid grid-cols-3 gap-2">
              <article v-for="metric in metrics" :key="metric.label" class="rounded-xl bg-[#f5fbf7] p-3">
                <p class="text-xl text-[#052f29] sm:text-2xl">{{ metric.value }}</p>
                <p class="mt-1 text-xs leading-5 text-zinc-500">{{ metric.label }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="reveal-section px-4 py-8 sm:px-8 sm:py-14" style="--reveal-delay: 80ms">
        <div class="mx-auto max-w-6xl">
          <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p class="text-sm text-[#bf6b3d]">{{ t.teamKicker }}</p>
              <h2 class="mt-3 text-3xl leading-tight text-[#052f29] sm:text-4xl">
                {{ t.teamTitle }}
              </h2>
              <p class="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
                {{ t.teamBody }}
              </p>
            </div>
            <div class="w-full rounded-2xl border border-[#dcece4] bg-white px-4 py-3 shadow-xl shadow-zinc-900/5 md:w-48">
              <p class="text-2xl text-[#052f29]">6</p>
              <p class="mt-1 text-xs leading-5 text-zinc-500">{{ t.teamCountLabel }}</p>
            </div>
          </div>

          <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="member in teamMembers"
              :key="member.name"
              class="premium-card rounded-2xl border border-[#dcece4] bg-white p-4 shadow-xl shadow-zinc-900/5"
            >
              <div class="flex items-start gap-4 sm:block">
                <img
                  class="size-24 shrink-0 rounded-2xl border border-[#dcece4] object-cover sm:size-28"
                  :class="member.imageClass"
                  :src="member.photo"
                  :alt="member.alt"
                />
                <div class="min-w-0 sm:mt-4">
                  <p class="text-[0.68rem] uppercase tracking-[0.14em] text-[#bf6b3d]">{{ member.role }}</p>
                  <h3 class="mt-2 text-lg leading-6 text-[#052f29]">{{ member.name }}</h3>
                </div>
              </div>
              <div class="mt-2">
                <p class="mt-2 text-xs leading-6 text-zinc-600">{{ member.bio }}</p>
              </div>
            </article>
          </div>

          <div class="mt-4 rounded-2xl border border-dashed border-[#cfe4da] bg-white/70 p-4">
            <p class="text-xs leading-6 text-zinc-600 sm:text-sm">{{ t.moreTeamNote }}</p>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import LanguageToggle from '../components/LanguageToggle.vue'
import aboutImage from '../assets/myanmar-community.jpg'
import siteLogo from '../assets/little-detective-logo-myanmar.png'
import kayKhaingWinPhoto from '../assets/team-kay-khaing-win.jpg'
import khinMyatThuPhoto from '../assets/team-khin-myat-thu.jpg'
import linLaePhyuPhoto from '../assets/team-lin-lae-phyu.jpg'
import minBhoneSanPhoto from '../assets/team-min-bhone-san.jpg'
import saiBhoneMyatMinPhoto from '../assets/team-sai-bhone-myat-min.jpg'
import tunAungLwinPhoto from '../assets/team-tun-aung-lwin.jpg'
import truthCheckIcon from '../assets/truth-check-icon.svg'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const language = computed(() => userStore.siteLanguage)
const t = computed(() => aboutCopy[language.value])
const startPath = computed(() => (userStore.token ? '/dashboard' : '/login'))
const startLabel = computed(() => (userStore.token ? t.value.dashboardCta : t.value.startCta))

const metrics = computed(() => t.value.metrics)

const pillars = computed(() => t.value.pillars)

const projectTools = computed(() => [
  { code: 'DA', icon: siteLogo, title: t.value.navAcademy, description: t.value.academyTool },
  { code: 'TC', icon: truthCheckIcon, title: t.value.truthToolTitle, description: t.value.truthTool },
])

const audience = computed(() => t.value.audience)

const teamMembers = computed(() => [
  { ...t.value.teamMembers[0], photo: tunAungLwinPhoto, imageClass: 'object-[52%_50%]' },
  { ...t.value.teamMembers[1], photo: khinMyatThuPhoto, imageClass: 'object-[42%_50%]' },
  { ...t.value.teamMembers[2], photo: linLaePhyuPhoto, imageClass: 'object-[50%_34%]' },
  { ...t.value.teamMembers[3], photo: kayKhaingWinPhoto, imageClass: 'object-[50%_50%]' },
  { ...t.value.teamMembers[4], photo: minBhoneSanPhoto, imageClass: 'object-[50%_28%]' },
  { ...t.value.teamMembers[5], photo: saiBhoneMyatMinPhoto, imageClass: 'object-[55%_42%]' },
])

const aboutCopy = {
  mm: {
    brandMm: 'စုံထောက်လေး',
    navAcademy: 'Detective Academy',
    navAbout: 'About us',
    navLogin: 'Login',
    startCta: 'စတင်ဝင်မည်',
    dashboardCta: 'Dashboard သို့',
    academyCta: 'Academy ကြည့်ရန်',
    heroTitle: 'မြန်မာလူငယ်တွေ အချင်းချင်းမမျှဝေခင် သတင်းအမှန်စစ်နိုင်ဖို့ တည်ဆောက်ထားတဲ့ ဝက်ဘ်ဆိုဒ်ဖြစ်ပါတယ်။',
    heroBody: 'Sone Dauk Lay သည် ပို့စ်နှင့် စာတိုများကို စိတ်အေးအေးနဲ့ စစ်ဆေးနိုင်အောင် သင်ခန်းစာတိုများနှင့် လေ့ကျင့်ခန်းများ ပေါင်းစပ်ထားသော လေ့လာရေးဝက်ဘ်ဆိုဒ်ဖြစ်ပါတယ်',
    flowKicker: 'Project flow',
    flowTitle: 'လေ့လာသင်ယူပြီးတာများကို လက်တွေ့ချက်ချင်းအသုံးချနိုင်အောင်လုပ်ဆောင်ထားပါသည်။',
    flowBody: 'ကျောင်းသား၊ မိသားစု၊ community chat ထဲမှာတွေ့ရတဲ့ သတင်းအကြောင်းအရာတွေကို source, date, evidence, emotion, action အဆင့်လိုက်စစ်နိုင်ရန် ဦးတည်ထားသည်။',
    teamKicker: 'Our team',
    teamTitle: 'လူငယ်တွေအတွက် လူငယ်တွေက တည်ဆောက်ထားပါတယ်။',
    teamBody: 'ကျွန်တော်တို့အဖွဲ့ သည် သတင်းမှားစစ်ဆေးနည်းကို နားလည်လွယ်၊ အသုံးပြုလွယ်အောင် တည်ဆောက်ပေးထားပါတယ်။',
    teamCountLabel: 'အဖွဲ့ဝင်များ',
    moreTeamNote: 'အဖွဲ့ဝင် ၆ ဦးလုံးကSone Dauk Lay ကို ပူးပေါင်းတည်ဆောက်ထားပါတယ်။',
    whyKicker: 'Why it matters',
    whyTitle: 'လူကိုအရှက်မပေးဘဲ အချက်အလက်ကိုစစ်ဆေးတက်တဲ့အကျင့်တည်ဆောက်ရန်။',
    whyBody: 'သတင်းမှားကိုမြန်မြန်ပြန်ပြင်ရန်ထက် မျှဝေမည့်အချိန်မှာ ခဏရပ်ပြီးမေးခွန်းကောင်းမေးတတ်လာခြင်းက ပိုအသုံးဝင်သည်။ ဒီ project က အဲ့ဒီ habit ကို mobile မှာလည်းအသုံးပြုလွယ်အောင် ဒီဇိုင်းလုပ်ထားသည်။',
    metrics: [
      { value: '3', label: 'လေ့လာရေး အခန်းများ' },
      { value: '60', label: 'သင်ခန်းစာနှင့် လေ့ကျင့်ခန်းများ' },
      { value: '2', label: 'အဓိက module များ' },
    ],
    pillars: [
      { code: '01', title: 'Learn first', description: 'သတင်းမှားအကြောင်းကို စာအရှည်ကြီးမဟုတ်ဘဲ lesson သေးသေးများဖြင့်နားလည်စေသည်။' },
      { code: '02', title: 'Check calmly', description: 'source, date, evidence, location, emotion ကို အဆင့်လိုက်မေးပြီး မမျှဝေခင်စစ်စေသည်။' },
      { code: '03', title: 'Respond kindly', description: 'မှားနေတဲ့ post တွေ့လျှင် လူကိုမတိုက်ခိုက်ဘဲ ယဉ်ကျေးစွာပြန်ရှင်းနိုင်အောင်ကူညီသည်။' },
    ],
    teamMembers: [
      {
        name: 'Tun Aung Lwin',
        alt: 'Tun Aung Lwin',
        bio: 'Sone Dauk Lay ၏ အကြံဉာဏ်၊ ဝက်ဘ်ဆိုဒ်တည်ဆောက်မှုနှင့် လေ့လာရေးအတွေ့အကြုံကို လုပ်ဆောင်လျက်',
      },
      {
        name: 'Khin Myat Thu',
        alt: 'Khin Myat Thu',
        bio: 'MIIT နောက်ဆုံးနှစ်ကျောင်းသူဖြစ်ပြီး သင်ခန်းစာစာသားများကို ကျောင်းသားများအတွက် ပိုနားလည်လွယ်အောင် ကူညီပါတယ်။',
      },
      {
        name: 'Lin Lae Phyu',
        role: 'Final-year MIIT Student',
        alt: 'Lin Lae Phyu',
        bio: 'MIIT နောက်ဆုံးနှစ်ကျောင်းသူဖြစ်ပြီး သုတေသန၊ စာသားစီစဉ်မှုနှင့် မျက်နှာပြင်အသုံးပြုမှုအကြံပြုချက်များ ကူညီပါတယ်။',
      },
      {
        name: 'Kay Khaing Win',
        role: 'Final-year MIIT Student',
        alt: 'Kay Khaing Win',
        bio: 'MIIT နောက်ဆုံးနှစ်ကျောင်းသူဖြစ်ပြီး သင်ခန်းစာအစီအစဉ်၊ လူထုအသိပညာပေးအကြံများနှင့် စမ်းသပ်အသုံးပြုမှုအကြံပြုချက်များ ကူညီပါတယ်။',
      },
      {
        name: 'Min Bhone San',
        role: 'MTU IT Major',
        alt: 'Min Bhone San',
        bio: 'MTU မှ IT major ကျောင်းသားဖြစ်ပြီး ဝက်ဘ်ဆိုဒ်အတွေ့အကြုံ၊ နည်းပညာစမ်းသပ်မှုနှင့် လူငယ်များအတွက် အသုံးပြုရလွယ်သော feature များကို ကူညီတည်ဆောက်ပါတယ်။',
      },
      {
        name: 'Sai Bhone Myat Min',
        role: 'Fourth-year Law Student',
        alt: 'Sai Bhone Myat Min',
        bio: 'Mandalay University မှ ဥပဒေ စတုတ္ထနှစ်ကျောင်းသားဖြစ်ပြီး သတင်းမှား၊ တာဝန်ရှိစွာမျှဝေခြင်းနှင့် community response အပိုင်းတွင် ဥပဒေ/လူမှုရေးအမြင်များဖြင့် ကူညီပါတယ်။',
      },
    ],
    academyTool: '3 chapters, 60 lessons ဖြင့် misinformation clue များကို step-by-step သင်ယူသည်။',
    truthToolTitle: 'အမှန်စစ်',
    truthTool: 'Post/message တစ်ခုကို source, date, evidence checklist ဖြင့်စစ်ဆေးသည်။',
    audience: [
      'ကျောင်းသားများအတွက်: lesson တိုတို + practice ဖြင့် media literacy ကိုနေ့စဉ်လေ့ကျင့်နိုင်သည်။',
      'မိသားစုများအတွက်: group chat ထဲက post များကို မျှဝေမီအတူစစ်နိုင်သည်။',
      'Community အတွက်: rumor ကိုအရှက်ခွဲခြင်းမရှိဘဲ အထောက်အထားအခြေခံ၍ပြန်ရှင်းနိုင်သည်။',
    ],
  },
  en: {
    brandMm: 'Little Detective',
    navAcademy: 'Detective Academy',
    navAbout: 'About us',
    navLogin: 'Login',
    startCta: 'Start learning',
    dashboardCta: 'Go to dashboard',
    academyCta: 'View Academy',
    heroTitle: 'A learning website that helps Myanmar youth check before they share.',
    heroBody: 'Sone Dauk Lay brings short lessons, practice games, and checking tools into one calm misinformation literacy space for posts and chat messages.',
    flowKicker: 'Project flow',
    flowTitle: 'Lessons become actions immediately.',
    flowBody: 'The platform helps students, families, and community chats review source, date, evidence, emotion, and next action step by step.',
    teamKicker: 'Our team',
    teamTitle: 'Built by young people for young people.',
    teamBody: 'Our team brings together MIIT students and supporting teammates who care about making misinformation literacy practical, friendly, and easy to use for Myanmar youth.',
    teamCountLabel: 'team members working together',
    moreTeamNote: 'All six teammates contribute across technology, law, research, content review, and testing to make Sone Dauk Lay useful for Myanmar youth.',
    whyKicker: 'Why it matters',
    whyTitle: 'Build the habit of checking facts without shaming people.',
    whyBody: 'The strongest habit is pausing before sharing and asking better questions. This project is designed to make that habit simple, friendly, and usable on mobile.',
    metrics: [
      { value: '3', label: 'Academy chapters' },
      { value: '60', label: 'Study + practice lessons' },
      { value: '2', label: 'Core modules' },
    ],
    pillars: [
      { code: '01', title: 'Learn first', description: 'Short lessons explain misinformation without making students read long textbook pages.' },
      { code: '02', title: 'Check calmly', description: 'Guided questions help learners review source, date, evidence, location, and emotion before sharing.' },
      { code: '03', title: 'Respond kindly', description: 'Learners practice correcting false posts without attacking or embarrassing people.' },
    ],
    teamMembers: [
      {
        name: 'Tun Aung Lwin',
        role: 'Project Lead',
        alt: 'Tun Aung Lwin',
        bio: 'Tun leads the idea, product direction, and website development for Sone Dauk Lay, shaping a learning experience that helps young people pause, check, and share responsibly.',
      },
      {
        name: 'Khin Myat Thu',
        role: 'Final-year MIIT Student',
        alt: 'Khin Myat Thu',
        bio: 'Khin Myat Thu is a final-year student at MIIT who helps make the learning content clearer, friendlier, and closer to how students actually learn online.',
      },
      {
        name: 'Lin Lae Phyu',
        role: 'Final-year MIIT Student',
        alt: 'Lin Lae Phyu',
        bio: 'Lin Lae Phyu is a final-year student at MIIT who supports research, content organization, and interface feedback so the platform feels simple and useful.',
      },
      {
        name: 'Kay Khaing Win',
        role: 'Final-year MIIT Student',
        alt: 'Kay Khaing Win',
        bio: 'Kay Khaing Win is a final-year student at MIIT who contributes to lesson flow, community awareness ideas, and testing feedback with the team.',
      },
      {
        name: 'Min Bhone San',
        role: 'MTU IT Major',
        alt: 'Min Bhone San',
        bio: 'Min Bhone San is an IT major from MTU who supports website experience, technical testing, and practical features that young learners can use easily.',
      },
      {
        name: 'Sai Bhone Myat Min',
        role: 'Fourth-year Law Student at Mandalay University',
        alt: 'Sai Bhone Myat Min',
        bio: 'Sai Bhone Myat Min is a fourth-year law student at Mandalay University who brings legal and community perspectives to misinformation, responsible sharing, and response guidance.',
      },
    ],
    academyTool: 'Learn misinformation clues step by step through three chapters and sixty lessons.',
    truthToolTitle: 'Truth Check',
    truthTool: 'Use a checklist for source, date, and evidence before sharing.',
    audience: [
      'For students: practice media literacy through short lessons and games.',
      'For families: check group chat posts together before forwarding.',
      'For communities: respond to rumors with evidence and care.',
    ],
  },
}
</script>
