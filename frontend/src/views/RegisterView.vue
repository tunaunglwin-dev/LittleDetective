<template>
  <div class="auth-page min-h-screen text-zinc-900" :lang="language === 'mm' ? 'my' : 'en'">
    <header class="site-header mx-auto w-full max-w-7xl px-4 py-4 sm:px-8 sm:py-5">
      <RouterLink to="/" class="flex items-center gap-3" aria-label="Sone Dauk Lay home">
        <span class="sdl-logo" aria-hidden="true">
          <img :src="siteLogo" alt="" />
        </span>
        <span>
          <span class="block text-base">Sone Dauk Lay</span>
          <span class="site-brand-subtitle block text-sm text-zinc-500">{{ t.brandMm }}</span>
        </span>
      </RouterLink>

      <nav class="site-nav">
        <RouterLink class="site-nav-link text-zinc-600 hover:bg-white/70 hover:text-zinc-900" to="/">
          Home
        </RouterLink>
        <RouterLink class="site-nav-link text-zinc-600 hover:bg-white/70 hover:text-zinc-900" to="/about">
          {{ t.navAbout }}
        </RouterLink>
        <LanguageToggle />
        <RouterLink class="site-nav-link bg-[#355e54] px-4 text-white hover:bg-[#28483f]" to="/login">
          {{ t.login }}
        </RouterLink>
      </nav>
    </header>

    <main class="mx-auto grid min-h-[calc(100vh-5.5rem)] w-full max-w-7xl gap-5 px-4 pb-8 sm:px-8 lg:grid-cols-[0.95fr_0.72fr] lg:items-center">
      <section class="auth-photo-panel">
        <div class="auth-visual-grid" aria-hidden="true">
          <img class="size-24 rounded-full border border-white/24 bg-white object-cover shadow-2xl shadow-black/20" :src="siteLogo" alt="" />
          <div class="mt-6 grid gap-3">
            <span v-for="item in authPreview" :key="item" class="rounded-2xl border border-white/18 bg-white/12 px-4 py-3 text-sm text-white/84">{{ item }}</span>
          </div>
        </div>
        <div class="auth-photo-shade" aria-hidden="true" />
        <div class="relative z-10 max-w-lg p-5 text-white sm:p-7">
          <p class="text-sm text-white/76">{{ t.kicker }}</p>
          <h1 class="mt-3 text-3xl leading-tight sm:text-4xl">
            {{ t.visualTitle }}
          </h1>
          <p class="mt-4 hidden text-base leading-7 text-white/80 sm:block">
            {{ t.visualBody }}
          </p>
        </div>
      </section>

      <section class="w-full max-w-md justify-self-center rounded-[1.5rem] border border-white/70 bg-white/86 p-5 shadow-2xl shadow-zinc-900/8 backdrop-blur-md lg:justify-self-end">
        <div>
          <p class="text-sm text-[#7a5f2f]">{{ t.formKicker }}</p>
          <h2 class="mt-1.5 text-2xl leading-tight text-zinc-950">{{ t.formTitle }}</h2>
          <p class="mt-2 text-sm leading-6 text-zinc-600">
            {{ t.formBody }}
          </p>
        </div>

        <form class="mt-5 space-y-4" @submit.prevent="handleRegister">
          <label class="block">
            <span class="mb-2 block text-sm text-zinc-700">{{ t.name }}</span>
            <input
              v-model="name"
              class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#355e54]"
              :placeholder="t.namePlaceholder"
              required
            />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm text-zinc-700">Email</span>
            <input
              v-model="email"
              class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#355e54]"
              type="email"
              placeholder="name@example.com"
              required
            />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm text-zinc-700">Password</span>
            <input
              v-model="password"
              class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#355e54]"
              type="password"
              :placeholder="t.passwordPlaceholder"
              required
            />
          </label>

          <button
            class="w-full rounded-full bg-[#355e54] px-5 py-2.5 text-base text-white hover:bg-[#28483f] disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            :disabled="userStore.loading"
          >
            {{ userStore.loading ? t.loading : t.register }}
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-zinc-500">
          {{ t.hasAccount }}
          <RouterLink class="text-[#355e54] hover:text-[#28483f]" to="/login">{{ t.login }}</RouterLink>
        </p>

        <p v-if="error" class="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm leading-6 text-rose-700">
          {{ error }}
        </p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import LanguageToggle from '../components/LanguageToggle.vue'
import siteLogo from '../assets/little-detective-logo-myanmar.png'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const language = computed(() => userStore.siteLanguage)
const t = computed(() => registerCopy[language.value])
const authPreview = computed(() => t.value.preview)

async function handleRegister() {
  error.value = ''
  try {
    await userStore.register(name.value, email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = e.response?.data?.errors?.email?.[0] || t.value.error
  }
}

const registerCopy = {
  mm: {
    brandMm: 'စုံထောက်လေး',
    navAcademy: 'Detective Academy',
    navAbout: 'About us',
    login: 'Login',
    kicker: 'စုံထောက်လေး လေ့လာရေးနေရာ',
    visualTitle: 'သင်ခန်းစာ၊ လေ့ကျင့်ခန်း၊ အမှန်စစ်ကိရိယာများကို တစ်နေရာတည်းမှာ စတင်ပါ။',
    visualBody: 'မမျှဝေခင် ရင်းမြစ်၊ ရက်စွဲ၊ အထောက်အထားကို စစ်နိုင်တဲ့အလေ့အကျင့်ကို တဖြည်းဖြည်းတည်ဆောက်ပါ။',
    formKicker: 'အကောင့်အသစ်',
    formTitle: 'သင့်လေ့လာရေးအကောင့် ဖန်တီးပါ',
    formBody: 'စုံထောက်သင်ခန်းစာများကို လေ့လာပြီး အမှန်စစ်ကိရိယာများနှင့် လက်တွေ့စစ်ဆေးနိုင်ပါသည်။',
    name: 'နာမည်',
    namePlaceholder: 'သင့်နာမည်',
    passwordPlaceholder: 'အနည်းဆုံး ၈ လုံး',
    loading: 'အကောင့်ဖန်တီးနေသည်...',
    register: 'Register',
    hasAccount: 'အကောင့်ရှိပြီးသားလား?',
    error: 'အကောင့်ဖွင့်မှုမအောင်မြင်ပါ',
    preview: ['Detective Academy', 'Study + practice game', 'EXP rank တက်မယ်'],
  },
  en: {
    brandMm: 'Little Detective',
    navAcademy: 'Detective Academy',
    navAbout: 'About us',
    login: 'Login',
    kicker: 'Sone Dauk Lay learning space',
    visualTitle: 'Start lessons, practice games, and truth-checking tools in one place.',
    visualBody: 'Build the habit of checking source, date, and evidence before sharing.',
    formKicker: 'New account',
    formTitle: 'Create your learning workspace',
    formBody: 'Study in Detective Academy, then use dashboard tools for real checking practice.',
    name: 'Name',
    namePlaceholder: 'Your name',
    passwordPlaceholder: 'Minimum 8 characters',
    loading: 'Creating account...',
    register: 'Register',
    hasAccount: 'Already have an account?',
    error: 'Registration failed',
    preview: ['Detective Academy', 'Study + practice game', 'Earn EXP rank'],
  },
}
</script>
