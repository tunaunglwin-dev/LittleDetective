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
      </nav>
    </header>

    <main class="mx-auto grid min-h-[calc(100vh-5.5rem)] w-full max-w-7xl gap-5 px-4 pb-8 sm:px-8 lg:grid-cols-[0.95fr_0.72fr] lg:items-center">
      <section class="auth-photo-panel">
        <img class="auth-photo" :src="loginPhoto" alt="Myanmar students learning together" />
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

        <button
          class="mt-5 flex w-full items-center justify-center gap-3 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm text-zinc-800 hover:border-[#d5b16f] hover:bg-[#fffaf0]"
          type="button"
          @click="handleGoogleLogin"
        >
          <span class="grid size-7 place-items-center rounded-full bg-[#f1d8a7] text-sm text-[#173f37]">G</span>
          {{ t.google }}
        </button>

        <div class="my-4 flex items-center gap-3">
          <span class="h-px flex-1 bg-zinc-200" />
          <span class="text-xs uppercase text-zinc-400">{{ t.orEmail }}</span>
          <span class="h-px flex-1 bg-zinc-200" />
        </div>

        <form class="space-y-4" @submit.prevent="handleLogin">
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
            {{ userStore.loading ? t.loading : t.submit }}
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-zinc-500">
          {{ t.newUser }}
          <RouterLink class="text-[#355e54] hover:text-[#28483f]" to="/register">{{ t.register }}</RouterLink>
        </p>

        <p class="mt-3 rounded-2xl bg-[#f7f0e5] px-4 py-2.5 text-xs leading-5 text-[#7a5f2f]">
          Demo email: <span class="text-zinc-800">student@littledetective.test</span> / <span class="text-zinc-800">password</span>
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
import loginPhoto from '../assets/login-learning-photo.jpg'
import siteLogo from '../assets/little-detective-logo-myanmar.png'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const language = computed(() => userStore.siteLanguage)
const t = computed(() => loginCopy[language.value])
const authPreview = computed(() => t.value.preview)

async function handleLogin() {
  error.value = ''
  try {
    await userStore.login(email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    if (!e.response) {
      error.value = t.value.backendError
      return
    }

    error.value = e.response?.data?.message || e.response?.data?.errors?.email?.[0] || t.value.error
  }
}

function handleGoogleLogin() {
  error.value = ''
  userStore.loginWithGoogle()
}

const loginCopy = {
  mm: {
    brandMm: 'စုံထောက်လေး',
    navAcademy: 'Detective Academy',
    navAbout: 'About us',
    kicker: 'သတင်းမှန် စစ်ဆေးရေး လေ့လာမှု',
    visualTitle: 'မမျှဝေခင် စိတ်အေးအေးနဲ့ စစ်ပါ။',
    visualBody: 'စုံထောက်လေးက ပျံ့နှံ့နေသော ပို့စ်တွေကို ခဏရပ်ပြီး စစ်ဆေးနိုင်အောင် ကူညီပေးပါတယ်။',
    formKicker: 'ပြန်လည်ဝင်ရောက်ရန်',
    formTitle: 'သင့်လေ့လာရေးနေရာသို့ ဝင်ပါ',
    formBody: 'ပို့စ်စစ်ခြင်း၊ အကြောင်းအရာကြည့်ခြင်း၊ ယဉ်ကျေးစွာ ပြန်ရှင်းခြင်းများကို ဆက်လေ့ကျင့်ပါ။',
    google: 'Google ဖြင့်ဝင်မည်',
    orEmail: 'သို့မဟုတ် email',
    passwordPlaceholder: 'Password ထည့်ပါ',
    loading: 'ဝင်နေသည်...',
    submit: 'ဝင်မည်',
    newUser: 'Sone Dauk Lay အသစ်လား?',
    register: 'အကောင့်ဖွင့်ပါ',
    backendError: 'Backend မ run သေးပါ။ Laravel ကို http://localhost:8000 မှာ start လုပ်ပြီး ပြန်စမ်းပါ။',
    error: 'ဝင်ရောက်မှုမအောင်မြင်ပါ',
    preview: ['Source ကိုအရင်စစ်ပါ', 'Evidence ရှိ/မရှိကြည့်ပါ', 'မမျှဝေခင်ခဏရပ်ပါ'],
  },
  en: {
    brandMm: 'Little Detective',
    navAcademy: 'Detective Academy',
    navAbout: 'About us',
    kicker: 'Media literacy for Myanmar communities',
    visualTitle: 'Pause calmly before fear makes you share.',
    visualBody: 'Sone Dauk Lay helps learners slow down viral posts and protect community trust.',
    formKicker: 'Welcome back',
    formTitle: 'Enter your learning space',
    formBody: 'Continue practicing post checks, context review, and careful corrections.',
    google: 'Continue with Google',
    orEmail: 'or email',
    passwordPlaceholder: 'Enter password',
    loading: 'Signing in...',
    submit: 'Login',
    newUser: 'New to Sone Dauk Lay?',
    register: 'Create an account',
    backendError: 'Backend is not running. Start Laravel at http://localhost:8000 and try again.',
    error: 'Login failed',
    preview: ['Check the source first', 'Look for evidence', 'Pause before sharing'],
  },
}
</script>
