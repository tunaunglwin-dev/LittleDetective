<template>
  <div class="academy-page min-h-screen px-3 py-3 text-zinc-900 sm:px-6 sm:py-4">
    <div class="mx-auto max-w-5xl">
      <header class="flex items-center justify-between gap-2">
        <RouterLink class="rounded-full border border-[#cfe4da] bg-white/80 px-3 py-1.5 text-xs text-[#0a4a3e] hover:bg-white" to="/dashboard">
          {{ text.back }}
        </RouterLink>
        <div class="flex items-center gap-2">
          <div class="flex rounded-full border border-[#cfe4da] bg-white/80 p-1">
            <button
              v-for="option in languages"
              :key="option.id"
              class="rounded-full px-2.5 py-1 text-xs"
              :class="language === option.id ? 'bg-[#0a5a4b] text-white' : 'text-zinc-600 hover:bg-white'"
              @click="userStore.setSiteLanguage(option.id)"
            >
              {{ option.label }}
            </button>
          </div>
          <RouterLink class="rounded-full bg-[#073f35] px-3 py-1.5 text-xs text-white hover:bg-[#0a5a4b]" to="/academy">
            {{ text.academy }}
          </RouterLink>
        </div>
      </header>

      <main class="mt-3 grid gap-3 lg:grid-cols-[1fr_18rem]" :lang="language === 'mm' ? 'my' : 'en'">
        <section class="rounded-2xl border border-white/80 bg-white/90 p-3 shadow-xl shadow-emerald-950/6 sm:p-4">
          <div class="flex items-center gap-3">
            <img class="size-14 rounded-2xl bg-[#e9f7ef] p-2" :src="truthIcon" alt="" />
            <div>
              <p class="text-xs text-[#bf6b3d]">{{ text.kicker }}</p>
              <h1 class="text-2xl leading-tight text-[#052f29] sm:text-3xl">{{ text.title }}</h1>
              <p class="mt-1 text-sm leading-6 text-zinc-600">{{ text.subtitle }}</p>
            </div>
          </div>

          <label class="mt-3 block">
            <span class="mb-1.5 block text-xs text-[#bf6b3d]">{{ text.postLabel }}</span>
            <textarea
              v-model="postText"
              class="min-h-20 w-full resize-none rounded-xl border border-[#dcece4] bg-[#fffdf8] px-3 py-2.5 text-sm leading-6 text-[#052f29] outline-none placeholder:text-zinc-400 focus:border-[#0a5a4b]"
              :placeholder="text.postPlaceholder"
            />
            <span v-if="!hasPost" class="mt-1.5 block text-xs leading-5 text-[#bf6b3d]">{{ text.needPost }}</span>
          </label>

          <article class="mt-3 rounded-2xl border border-[#dcece4] bg-[#fffdf8] p-3 sm:p-4" :class="!hasPost ? 'opacity-60' : ''">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs text-[#bf6b3d]">{{ currentQuestion.kicker }}</p>
                <h2 class="mt-1 text-lg leading-7 text-[#052f29]">{{ currentQuestion.title[language] }}</h2>
              </div>
              <span class="shrink-0 rounded-full bg-[#e9f7ef] px-2.5 py-1 text-xs text-[#0a5a4b]">
                {{ activeIndex + 1 }} / {{ questions.length }}
              </span>
            </div>

            <div class="mt-3 grid gap-2">
              <button
                v-for="option in currentQuestion.options"
                :key="option.id"
                class="rounded-xl border px-3 py-3 text-left text-sm leading-6 transition"
                :class="answers[currentQuestion.id] === option.id ? option.selectedClass : !hasPost ? 'cursor-not-allowed border-[#dcece4] bg-zinc-50 text-zinc-400' : 'border-[#dcece4] bg-white hover:bg-[#f5fbf7]'"
                type="button"
                :disabled="!hasPost"
                @click="pickAnswer(currentQuestion.id, option.id)"
              >
                {{ option.label[language] }}
              </button>
            </div>
          </article>

          <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div class="flex gap-1.5">
              <span
                v-for="question in questions"
                :key="question.id"
                class="size-2.5 rounded-full"
                :class="answers[question.id] ? 'bg-[#0a5a4b]' : 'bg-[#cfe4da]'"
              />
            </div>
            <div class="flex gap-2">
              <button class="rounded-full border border-[#dcece4] bg-white px-4 py-2 text-sm text-[#0a4a3e] disabled:opacity-40" type="button" :disabled="activeIndex === 0" @click="activeIndex -= 1">
                {{ text.previous }}
              </button>
              <button class="rounded-full bg-[#0a5a4b] px-4 py-2 text-sm text-white disabled:opacity-45" type="button" :disabled="!hasPost || !answers[currentQuestion.id]" @click="goNext">
                {{ activeIndex === questions.length - 1 ? text.checkResult : text.next }}
              </button>
            </div>
          </div>
        </section>

        <aside class="order-first rounded-2xl border border-white/80 bg-white/90 p-3 shadow-xl shadow-emerald-950/6 lg:order-none sm:p-4">
          <p class="text-xs text-[#bf6b3d]">{{ text.result }}</p>
          <div class="mt-2 rounded-2xl p-4" :class="result.panelClass">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-3xl text-[#052f29]">{{ riskScore }}</p>
                <p class="mt-1 text-base text-[#052f29]">{{ result.title[language] }}</p>
              </div>
              <span class="rounded-full bg-white/70 px-2.5 py-1 text-xs text-[#052f29]">{{ result.badge[language] }}</span>
            </div>
            <p class="mt-2 text-sm leading-6 text-zinc-700">{{ result.message[language] }}</p>
          </div>

          <div class="mt-3 rounded-xl bg-[#f5fbf7] p-3">
            <p class="text-xs text-[#0a5a4b]">{{ answeredCount }} / {{ questions.length }} {{ text.answered }}</p>
            <p class="mt-1 text-sm leading-6 text-[#052f29]">{{ selectedSummary }}</p>
          </div>

          <div v-if="isComplete" class="mt-3 rounded-xl border border-[#dcece4] bg-white p-3">
            <p class="text-xs text-[#bf6b3d]">{{ text.safeResponse }}</p>
            <p class="mt-1.5 text-sm leading-6 text-[#052f29]">{{ safeResponse }}</p>
            <button class="mt-3 w-full rounded-full bg-[#0a5a4b] px-4 py-2 text-sm text-white hover:bg-[#073f35]" type="button" @click="copySafeResponse">
              {{ copied ? text.copied : text.copyResponse }}
            </button>
          </div>

          <button class="mt-3 w-full rounded-full border border-[#dcece4] bg-white px-4 py-2 text-sm text-[#0a4a3e]" type="button" @click="reset">
            {{ text.reset }}
          </button>
        </aside>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import truthIcon from '../assets/truth-check-icon.svg'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const postText = ref('')
const language = computed(() => userStore.siteLanguage)
const activeIndex = ref(0)
const answers = reactive({})
const copied = ref(false)
const savedCheckId = ref('')

const languages = [
  { id: 'mm', label: 'MM' },
  { id: 'en', label: 'EN' },
]

const labels = {
  mm: {
    back: 'နောက်ပြန်',
    academy: 'စုံထောက်သင်ခန်းစာ',
    kicker: 'အဆင့် ၂ · မမျှဝေခင်စစ်',
    title: 'အမှန်စစ်',
    subtitle: 'ပို့စ် သို့မဟုတ် စာတိုတစ်ခုကို မမျှဝေခင် အဆင့်လိုက်စစ်ပါ။',
    postLabel: 'ပို့စ် / စာတို',
    postPlaceholder: 'ဥပမာ - ဆရာဝန်တွေ အတည်ပြုထားတဲ့ ကုသနည်းပါ။ အခုမျှဝေပါ!',
    needPost: 'အရင်ဆုံး စစ်ချင်တဲ့ ပို့စ် သို့မဟုတ် စာတိုကို ထည့်ပါ။',
    previous: 'နောက်ပြန်',
    next: 'ရှေ့သို့',
    checkResult: 'ရလဒ်ကြည့်မယ်',
    result: 'ရလဒ်',
    answered: 'ခု ဖြေပြီးပြီ',
    reset: 'ပြန်စ',
    noAnswer: 'အဖြေရွေးပြီးမှ ရလဒ်ထွက်ပါမယ်။',
    safeResponse: 'မျှဝေရန်သင့်သောတုံ့ပြန်ချက်',
    copyResponse: 'တုံ့ပြန်ချက် ကူးယူမယ်',
    copied: 'ကူးယူပြီးပါပြီ',
  },
  en: {
    back: 'Back',
    academy: 'Detective Academy',
    kicker: 'Step 2 · before sharing',
    title: 'Truth Check',
    subtitle: 'Check one post or message step by step before sharing.',
    postLabel: 'Post / message',
    postPlaceholder: 'Example: Doctors confirmed this cure. Share now!',
    needPost: 'Paste or type the post/message first to unlock the questions.',
    previous: 'Back',
    next: 'Next',
    checkResult: 'See result',
    result: 'Result',
    answered: 'answered',
    reset: 'Reset',
    noAnswer: 'Choose answers to get a result.',
    safeResponse: 'Safe response',
    copyResponse: 'Copy response',
    copied: 'Copied',
  },
}

const text = computed(() => labels[language.value])

const questions = [
  {
    id: 'source',
    kicker: '1 · Source',
    title: { mm: 'ဘယ်သူကပြောတာလဲ?', en: 'Who is saying it?' },
    options: [
      option('trusted', { mm: 'တရားဝင်အရင်းအမြစ် / သိထားသော page', en: 'Official source / known page' }, 0),
      option('repost', { mm: 'ထပ်ဆင့်မျှဝေထားသော message', en: 'Repost / forwarded message' }, 1),
      option('unknown', { mm: 'မသိသောအကောင့် / စခရင်ရှော့', en: 'Unknown account / screenshot' }, 2),
    ],
  },
  {
    id: 'time',
    kicker: '2 · Time',
    title: { mm: 'ရက်စွဲနဲ့အချိန်ရှင်းလား?', en: 'Is the date and time clear?' },
    options: [
      option('clear', { mm: 'ရှင်းပြီး လက်ရှိဖြစ်သည်', en: 'Clear and current' }, 0),
      option('unclear', { mm: 'ရက်စွဲမရှင်း', en: 'Date is unclear' }, 1),
      option('old', { mm: 'ဟောင်းနိုင် / crop လုပ်ထား', en: 'May be old or cropped' }, 2),
    ],
  },
  {
    id: 'proof',
    kicker: '3 · Evidence',
    title: { mm: 'အထောက်အထားပါလား?', en: 'Is there evidence?' },
    options: [
      option('strong', { mm: 'လင့်ခ် / အစီရင်ခံစာ / တရားဝင်မှတ်တမ်း ပါသည်', en: 'Link / report / official record' }, 0),
      option('weak', { mm: 'ဓာတ်ပုံ/quote သာပါသည်', en: 'Only photo or quote' }, 1),
      option('none', { mm: 'အထောက်အထားမပါ', en: 'No evidence' }, 2),
    ],
  },
  {
    id: 'place',
    kicker: '4 · Place',
    title: { mm: 'နေရာကိုစစ်လို့ရလား?', en: 'Can the place be checked?' },
    options: [
      option('clear', { mm: 'နေရာနာမည်ပါပြီး ကိုက်ညီသည်', en: 'Place is named and fits' }, 0),
      option('vague', { mm: 'နေရာမရှင်း', en: 'Place is vague' }, 1),
      option('mismatch', { mm: 'နေရာမကိုက်နိုင်', en: 'Place may not match' }, 2),
    ],
  },
  {
    id: 'pressure',
    kicker: '5 · Pressure',
    title: { mm: 'ချက်ချင်းမျှဝေခိုင်းလား?', en: 'Does it pressure people to share?' },
    options: [
      option('calm', { mm: 'အေးဆေးဖတ်ရန်သာ', en: 'Calm information' }, 0),
      option('emotion', { mm: 'ကြောက်/ဒေါသဖြစ်အောင်ရေးထား', en: 'Uses fear or anger' }, 1),
      option('urgent', { mm: 'အခုမျှဝေပါလို့ဖိအားပေး', en: 'Says share now' }, 2),
    ],
  },
  {
    id: 'action',
    kicker: '6 · Action',
    title: { mm: 'လူတွေကိုဘာလုပ်ခိုင်းလဲ?', en: 'What does it ask people to do?' },
    options: [
      option('check', { mm: 'အရင်းအမြစ်ကို ဖတ်ရန် / စစ်ရန်', en: 'Read or check source' }, 0),
      option('forward', { mm: 'ထပ်ဆင့်မျှဝေရန် / တုံ့ပြန်ရန်', en: 'Forward or react' }, 1),
      option('danger', { mm: 'ငွေ / OTP / ကိုယ်ရေးအချက်အလက် ပို့ရန်', en: 'Send money / OTP / private info' }, 3),
    ],
  },
]

const currentQuestion = computed(() => questions[activeIndex.value])
const hasPost = computed(() => postText.value.trim().length > 0)
const answeredQuestions = computed(() => questions.filter((question) => answers[question.id]))
const answeredCount = computed(() => answeredQuestions.value.length)
const isComplete = computed(() => hasPost.value && answeredCount.value === questions.length)
const riskScore = computed(() => questions.reduce((score, question) => {
  const selected = question.options.find((item) => item.id === answers[question.id])
  return score + (selected?.risk || 0)
}, 0))

const result = computed(() => {
  if (answeredCount.value < questions.length) {
    return {
      title: { mm: hasPost.value ? 'စစ်နေဆဲ' : 'စရန်အသင့်', en: hasPost.value ? 'Checking' : 'Ready to start' },
      badge: { mm: hasPost.value ? 'မပြီးသေး' : 'စရန်', en: hasPost.value ? 'In progress' : 'Start' },
      message: { mm: hasPost.value ? text.value.noAnswer : text.value.needPost, en: hasPost.value ? text.value.noAnswer : text.value.needPost },
      panelClass: 'bg-[#f5fbf7]',
    }
  }

  if (riskScore.value >= 7) {
    return {
      title: { mm: 'မမျှဝေပါနှင့်', en: 'Do not share' },
      badge: { mm: 'အန္တရာယ်မြင့်', en: 'High risk' },
      message: { mm: 'အန္တရာယ်မြင့်နိုင်သည်။ မူရင်းအရင်းအမြစ်ကို ထပ်ရှာပါ။ ငွေ၊ OTP သို့မဟုတ် ကိုယ်ရေးအချက်အလက်တောင်းပါက တိုင်ကြားပါ။', en: 'High risk. Find the original source and report it if it asks for money, OTP, or private info.' },
      panelClass: 'bg-rose-50',
    }
  }

  if (riskScore.value >= 3) {
    return {
      title: { mm: 'ထပ်စစ်ပါ', en: 'Check more' },
      badge: { mm: 'သတိထား', en: 'Needs care' },
      message: { mm: 'မပြည့်စုံသောအချက်များရှိသည်။ အရင်းအမြစ်၊ ရက်စွဲနှင့် အထောက်အထားကို ထပ်စစ်ပါ။', en: 'Some details are missing. Check source, date, and evidence again.' },
      panelClass: 'bg-[#fff3df]',
    }
  }

  return {
    title: { mm: 'အန္တရာယ်နည်း', en: 'Lower risk' },
    badge: { mm: 'အန္တရာယ်နည်း', en: 'Lower risk' },
    message: { mm: 'ကြီးမားသော သတိပေးလက္ခဏာ မတွေ့ပါ။ သို့သော် အရေးကြီးသော post များကို ယုံကြည်ရသောအရင်းအမြစ်ပါမှ မျှဝေပါ။', en: 'No major warning signs. Important posts should still be shared with the source.' },
    panelClass: 'bg-[#e9f7ef]',
  }
})

const selectedSummary = computed(() => {
  const latest = answeredQuestions.value.at(-1)
  if (!latest) return text.value.noAnswer
  return `${latest.title[language.value]}: ${selectedLabel(latest)}`
})

const safeResponse = computed(() => {
  if (riskScore.value >= 7) {
    return language.value === 'mm'
      ? 'ဒီအချက်အလက်က အန္တရာယ်မြင့်နိုင်လို့ မမျှဝေသေးပါနဲ့။ မူရင်းအရင်းအမြစ်ကို အရင်စစ်ကြရအောင်။'
      : 'This looks high risk, so please do not share it yet. Let’s check the original source first.'
  }

  if (riskScore.value >= 3) {
    return language.value === 'mm'
      ? 'ဒီ post မှာ မပြည့်စုံသေးတဲ့အချက်တွေရှိပါတယ်။ အရင်းအမြစ်၊ ရက်စွဲနဲ့ အထောက်အထားကို ထပ်စစ်ပြီးမှမျှဝေကြရအောင်။'
      : 'Some details are missing in this post. Let’s check the source, date, and evidence before sharing.'
  }

  return language.value === 'mm'
    ? 'ကြီးမားတဲ့သတိပေးလက္ခဏာ မတွေ့ပါဘူး။ ဒါပေမယ့် အရေးကြီးတဲ့အကြောင်းအရာဖြစ်ရင် အရင်းအမြစ်ပါမှ မျှဝေပါ။'
    : 'I do not see a major warning sign, but if this is important, share it only with a reliable source.'
})

function option(id, label, risk) {
  const selectedClass = risk >= 2
    ? 'border-rose-200 bg-rose-50 text-rose-800'
    : risk === 1
      ? 'border-[#f0d2a2] bg-[#fff3df] text-[#7a4a21]'
      : 'border-[#b8dfcf] bg-[#e9f7ef] text-[#0a4a3e]'

  return { id, label, risk, selectedClass }
}

function pickAnswer(questionId, optionId) {
  if (!hasPost.value) return
  answers[questionId] = optionId
}

function selectedLabel(question) {
  return question.options.find((item) => item.id === answers[question.id])?.label[language.value] || ''
}

function goNext() {
  if (!hasPost.value) return
  if (activeIndex.value < questions.length - 1) {
    activeIndex.value += 1
    copied.value = false
    return
  }

  saveCurrentCheck()
}

function reset() {
  postText.value = ''
  activeIndex.value = 0
  questions.forEach((question) => {
    delete answers[question.id]
  })
  copied.value = false
  savedCheckId.value = ''
}

watch(hasPost, (ready) => {
  if (ready) return
  activeIndex.value = 0
  questions.forEach((question) => {
    delete answers[question.id]
  })
  copied.value = false
  savedCheckId.value = ''
})

function saveCurrentCheck() {
  if (!isComplete.value) return
  const checkId = `${postText.value.trim()}:${riskScore.value}:${Object.values(answers).join('|')}`
  if (savedCheckId.value === checkId) return

  userStore.saveTruthCheck({
    title: result.value.title[language.value],
    detail: postText.value.trim().slice(0, 140),
    riskScore: riskScore.value,
    response: safeResponse.value,
  })
  savedCheckId.value = checkId
}

async function copySafeResponse() {
  try {
    await navigator.clipboard.writeText(safeResponse.value)
    copied.value = true
  } catch {
    copied.value = false
  }
}
</script>
