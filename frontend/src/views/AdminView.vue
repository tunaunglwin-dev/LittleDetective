<template>
  <div class="dashboard-page min-h-screen text-zinc-900">
    <header class="sticky top-0 z-20 border-b border-[#e8decf] bg-[#fffaf0]/88 px-5 py-3 backdrop-blur sm:px-8">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <RouterLink class="flex items-center gap-3" to="/" aria-label="Sone Dauk Lay home">
          <span class="sdl-logo sdl-logo-sm" aria-hidden="true">
            <img :src="siteLogo" alt="" />
          </span>
          <span class="hidden sm:block">
            <span class="block text-base text-zinc-950">Sone Dauk Lay</span>
            <span class="block text-xs text-zinc-500">{{ text.adminPanel }}</span>
          </span>
        </RouterLink>

        <div class="flex min-w-0 flex-1 items-center justify-end gap-3">
          <RouterLink class="rounded-full px-3 py-2 text-sm text-zinc-600 hover:bg-white hover:text-zinc-950" to="/dashboard">
            {{ text.dashboard }}
          </RouterLink>

          <div class="flex rounded-full border border-[#dfd1bd] bg-white/70 p-1">
            <button
              v-for="option in languages"
              :key="option.id"
              class="rounded-full px-3 py-1.5 text-xs"
              :class="language === option.id ? 'bg-[#355e54] text-white' : 'text-zinc-600 hover:bg-white'"
              @click="userStore.setSiteLanguage(option.id)"
            >
              {{ option.label }}
            </button>
          </div>

          <div class="hidden min-w-0 text-right md:block">
            <p class="truncate text-sm text-zinc-950">{{ displayName }}</p>
            <p class="truncate text-xs text-zinc-500">{{ userEmail }}</p>
          </div>

          <RouterLink class="rounded-full border border-[#dfd1bd] bg-white/70 px-4 py-2 text-sm text-zinc-700 hover:bg-white" to="/profile">
            {{ text.profile }}
          </RouterLink>
          <button class="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700" @click="handleLogout">
            {{ text.logout }}
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8" :lang="language === 'mm' ? 'my' : 'en'">
      <div class="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-sm text-[#7a5f2f]">{{ text.control }}</p>
          <h1 class="mt-1 text-3xl leading-tight text-zinc-950">{{ text.overview }}</h1>
        </div>

        <form class="flex w-full gap-2 lg:w-auto" @submit.prevent="loadUsers(1)">
          <input
            v-model="search"
            class="min-w-0 flex-1 rounded-full border border-[#dfd1bd] bg-white px-4 py-2.5 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#355e54] lg:w-72"
            :placeholder="text.search"
          />
          <button class="rounded-full bg-[#355e54] px-5 py-2.5 text-sm text-white hover:bg-[#28483f]" type="submit">
            {{ text.searchButton }}
          </button>
        </form>
      </div>

      <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <article v-for="stat in stats" :key="stat.label" class="rounded-[1.35rem] border border-white/80 bg-white/84 p-4 shadow-lg shadow-zinc-900/5">
          <p class="text-xs text-zinc-500">{{ stat.label }}</p>
          <p class="mt-2 text-2xl text-zinc-950">{{ stat.value }}</p>
          <p class="mt-1 text-xs leading-5 text-zinc-500">{{ stat.helper }}</p>
        </article>
      </section>

      <p v-if="error" class="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {{ error }}
      </p>
      <p v-if="notice" class="mt-5 rounded-2xl border border-[#b8d5c8] bg-[#e7f0ea] px-4 py-3 text-sm text-[#355e54]">
        {{ notice }}
      </p>

      <section class="mt-6 grid gap-5 xl:grid-cols-[1fr_18rem]">
        <div class="rounded-[1.5rem] border border-white/80 bg-white/84 p-4 shadow-lg shadow-zinc-900/5">
          <div class="mb-4 flex items-center justify-between gap-3">
            <div>
              <p class="text-sm text-[#7a5f2f]">{{ text.users }}</p>
              <h2 class="mt-1 text-2xl text-zinc-950">{{ text.accounts }}</h2>
            </div>
            <span class="rounded-full bg-[#e7f0ea] px-3 py-1 text-xs text-[#355e54]">
              {{ text.live }}
            </span>
          </div>

          <div v-if="loading" class="rounded-2xl bg-[#f7f0e5] px-4 py-6 text-center text-sm text-zinc-600">
            {{ text.loading }}
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full min-w-[46rem] text-left text-sm">
              <thead class="border-b border-[#eadfce] text-xs text-zinc-500">
                <tr>
                  <th class="py-3 pr-4">{{ text.user }}</th>
                  <th class="py-3 pr-4">{{ text.provider }}</th>
                  <th class="py-3 pr-4">{{ text.joined }}</th>
                  <th class="py-3 pr-4">{{ text.role }}</th>
                  <th class="py-3 pr-4 text-right">{{ text.actions }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#eadfce]">
                <tr v-for="account in users" :key="account.id">
                  <td class="py-3 pr-4">
                    <p class="text-zinc-950">{{ account.name }}</p>
                    <p class="mt-1 text-xs text-zinc-500">{{ account.email }}</p>
                  </td>
                  <td class="py-3 pr-4 text-zinc-600">{{ account.provider || 'email' }}</td>
                  <td class="py-3 pr-4 text-zinc-600">{{ formatDate(account.created_at) }}</td>
                  <td class="py-3 pr-4">
                    <select
                      class="rounded-full border border-[#dfd1bd] bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-[#355e54]"
                      :disabled="savingId === account.id"
                      :value="account.role"
                      @change="changeRole(account, $event.target.value)"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td class="py-3 pr-4 text-right">
                    <button
                      class="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                      :disabled="savingId === account.id || account.id === userStore.user?.id"
                      @click="removeUser(account)"
                    >
                      {{ text.delete }}
                    </button>
                  </td>
                </tr>
                <tr v-if="users.length === 0">
                  <td class="py-8 text-center text-zinc-500" colspan="5">{{ text.noUsers }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p class="text-xs text-zinc-500">{{ text.page }} {{ pagination.current_page || 1 }} / {{ pagination.last_page || 1 }}</p>
            <div class="flex gap-2">
              <button class="rounded-full border border-[#dfd1bd] bg-white px-4 py-2 text-sm text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40" :disabled="!pagination.prev_page_url" @click="loadUsers((pagination.current_page || 1) - 1)">
                {{ text.previous }}
              </button>
              <button class="rounded-full border border-[#dfd1bd] bg-white px-4 py-2 text-sm text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40" :disabled="!pagination.next_page_url" @click="loadUsers((pagination.current_page || 1) + 1)">
                {{ text.next }}
              </button>
            </div>
          </div>
        </div>

        <aside class="rounded-[1.5rem] border border-white/80 bg-white/84 p-4 shadow-lg shadow-zinc-900/5">
          <p class="text-sm text-[#7a5f2f]">{{ text.recent }}</p>
          <div class="mt-4 grid gap-3">
            <article v-for="recentUser in recentUsers" :key="recentUser.id" class="rounded-2xl bg-[#f7f0e5] p-3">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="truncate text-sm text-zinc-950">{{ recentUser.name }}</p>
                  <p class="mt-1 truncate text-xs text-zinc-500">{{ recentUser.email }}</p>
                </div>
                <span class="shrink-0 rounded-full px-2.5 py-1 text-xs" :class="recentUser.role === 'admin' ? 'bg-[#355e54] text-white' : 'bg-white text-zinc-600'">
                  {{ recentUser.role }}
                </span>
              </div>
            </article>
          </div>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import siteLogo from '../assets/little-detective-logo-myanmar.png'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const overview = ref(null)
const users = ref([])
const pagination = ref({})
const search = ref('')
const error = ref('')
const notice = ref('')
const loading = ref(false)
const savingId = ref(null)
const language = computed(() => userStore.siteLanguage)

const languages = [
  { id: 'en', label: 'EN' },
  { id: 'mm', label: 'MM' },
]

const labels = {
  en: {
    adminPanel: 'Admin',
    dashboard: 'Dashboard',
    profile: 'Profile',
    logout: 'Logout',
    control: 'Admin control',
    overview: 'Platform overview',
    search: 'Search users',
    searchButton: 'Search',
    users: 'User management',
    accounts: 'Accounts',
    live: 'Live',
    loading: 'Loading users...',
    user: 'User',
    provider: 'Provider',
    joined: 'Joined',
    role: 'Role',
    actions: 'Actions',
    delete: 'Delete',
    noUsers: 'No users match this search.',
    page: 'Page',
    previous: 'Previous',
    next: 'Next',
    recent: 'Recent users',
  },
  mm: {
    adminPanel: 'စီမံခန့်ခွဲမှု',
    dashboard: 'ပင်မစာမျက်နှာ',
    profile: 'ကိုယ်ရေးစာမျက်နှာ',
    logout: 'ထွက်ရန်',
    control: 'စီမံခန့်ခွဲရေး',
    overview: 'စနစ်အကျဉ်းချုပ်',
    search: 'အသုံးပြုသူ ရှာရန်',
    searchButton: 'ရှာရန်',
    users: 'အသုံးပြုသူ စီမံရန်',
    accounts: 'အကောင့်များ',
    live: 'လက်ရှိ',
    loading: 'အသုံးပြုသူများ ဖွင့်နေသည်...',
    user: 'အသုံးပြုသူ',
    provider: 'ဝင်ရောက်နည်း',
    joined: 'စတင်သုံးသည့်နေ့',
    role: 'တာဝန်',
    actions: 'လုပ်ဆောင်ချက်',
    delete: 'Delete',
    noUsers: 'ဒီရှာဖွေမှုနဲ့ ကိုက်ညီတဲ့ အသုံးပြုသူ မရှိပါ။',
    page: 'စာမျက်နှာ',
    previous: 'နောက်ပြန်',
    next: 'ရှေ့သို့',
    recent: 'နောက်ဆုံးအသုံးပြုသူများ',
  },
}

const text = computed(() => labels[language.value])
const displayName = computed(() => userStore.user?.name || 'Admin')
const userEmail = computed(() => userStore.user?.email || 'No email')

const stats = computed(() => {
  const data = overview.value?.stats || {}

  const statText = language.value === 'mm'
    ? [
        { label: 'အသုံးပြုသူများ', helper: 'စုစုပေါင်း အကောင့်များ' },
        { label: 'စီမံသူများ', helper: 'စနစ်ကို စီမံနိုင်သူများ' },
        { label: 'Google', helper: 'Google ဖြင့်ဝင်ထားသူများ' },
        { label: 'Email', helper: 'Email ဖြင့်ဝင်ထားသူများ' },
        { label: 'ဒီအပတ်အသစ်', helper: 'နောက်ဆုံးတိုးတက်မှု' },
      ]
    : [
        { label: 'Users', helper: 'Total accounts' },
        { label: 'Admins', helper: 'Can manage platform' },
        { label: 'Google', helper: 'OAuth signups' },
        { label: 'Email', helper: 'Password signups' },
        { label: 'New Week', helper: 'Recent growth' },
      ]

  return [
    { ...statText[0], value: data.users ?? 0 },
    { ...statText[1], value: data.admins ?? 0 },
    { ...statText[2], value: data.googleUsers ?? 0 },
    { ...statText[3], value: data.emailUsers ?? 0 },
    { ...statText[4], value: data.newThisWeek ?? 0 },
  ]
})

const recentUsers = computed(() => overview.value?.recentUsers || [])

onMounted(async () => {
  await refreshAdminData()
})

async function refreshAdminData(page = 1) {
  error.value = ''
  await Promise.all([loadOverview(), loadUsers(page)])
}

async function loadOverview() {
  overview.value = await userStore.fetchAdminOverview()
}

async function loadUsers(page = 1) {
  loading.value = true
  error.value = ''
  try {
    const data = await userStore.fetchAdminUsers({ page, search: search.value })
    users.value = data.data || []
    pagination.value = data
  } catch (e) {
    error.value = e.response?.data?.message || 'Admin users could not be loaded.'
  } finally {
    loading.value = false
  }
}

async function changeRole(account, role) {
  if (role === account.role) return

  savingId.value = account.id
  notice.value = ''
  error.value = ''
  try {
    const updated = await userStore.updateAdminUser(account.id, { role })
    account.role = updated.role
    notice.value = `${account.name} is now ${updated.role}.`
    await loadOverview()
    if (account.id === userStore.user?.id) {
      await userStore.fetchUser()
    }
  } catch (e) {
    error.value = e.response?.data?.message || 'Role could not be updated.'
    await loadUsers(pagination.value.current_page || 1)
  } finally {
    savingId.value = null
  }
}

async function removeUser(account) {
  const confirmed = window.confirm(`Delete ${account.name}? This cannot be undone.`)
  if (!confirmed) return

  savingId.value = account.id
  notice.value = ''
  error.value = ''
  try {
    await userStore.deleteAdminUser(account.id)
    notice.value = `${account.name} was deleted.`
    await refreshAdminData(pagination.value.current_page || 1)
  } catch (e) {
    error.value = e.response?.data?.message || 'User could not be deleted.'
  } finally {
    savingId.value = null
  }
}

function formatDate(value) {
  if (!value) return 'Unknown'
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>
