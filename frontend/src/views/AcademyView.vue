<template>
  <div class="academy-page min-h-screen px-3 py-3 text-zinc-900 sm:px-6 sm:py-4" :lang="language === 'mm' ? 'my' : 'en'">
    <div class="mx-auto max-w-7xl">
      <header class="flex flex-wrap items-center justify-between gap-2">
        <RouterLink class="rounded-full border border-[#cfe4da] bg-white/80 px-3 py-1.5 text-xs text-[#0a4a3e] hover:bg-white" to="/dashboard">
          {{ copy.back }}
        </RouterLink>
        <div class="flex items-center gap-2">
          <RouterLink class="flex items-center gap-2 rounded-full bg-[#073f35] px-3 py-1.5 text-xs text-white" to="/profile">
            <span class="grid size-5 place-items-center rounded-full bg-white/16 text-[0.6rem]">{{ rank.current.badge }}</span>
            {{ rank.points }} EXP
          </RouterLink>
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
        </div>
      </header>

      <main class="mt-4" :lang="language === 'mm' ? 'my' : 'en'">
        <section v-if="!lessonOpen" class="mx-auto max-w-6xl">
          <div class="mb-4 flex items-center gap-3">
            <img class="size-14 rounded-2xl border border-[#cfe4da] bg-white object-cover shadow-md shadow-emerald-950/10 sm:size-16" :src="academyLogo" alt="" />
            <div class="min-w-0">
              <p class="text-xs text-[#7a5f2f]">{{ copy.missionMap }}</p>
              <h1 class="truncate text-xl leading-tight text-[#052f29] sm:text-3xl">{{ selectedChapter.title[language] }}</h1>
              <p class="mt-1 text-sm text-zinc-500">{{ copy.rookie }} · {{ chapterCompleted }} / {{ selectedChapter.lessons.length }}</p>
            </div>
          </div>

          <div class="mb-4 flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="chapter in chapters"
              :key="chapter.id"
              class="shrink-0 rounded-full border px-3 py-2 text-sm transition sm:px-4"
              :class="selectedChapter.id === chapter.id ? 'border-[#0a5a4b] bg-[#0a5a4b] text-white' : 'border-[#dcece4] bg-white/84 text-[#0a4a3e]'"
              @click="selectChapter(chapter)"
            >
              {{ copy.chapter }} {{ chapter.number }}
            </button>
          </div>

          <RouterLink class="mb-4 flex items-center gap-3 rounded-2xl border-2 border-[#0a5a4b] bg-[#f5fbf7] p-3 shadow-xl shadow-emerald-950/6 transition hover:-translate-y-0.5 hover:bg-white sm:p-4" to="/academy/maze">
            <span class="grid size-12 shrink-0 place-items-center rounded-xl border border-[#cfe4da] bg-white sm:size-16 sm:rounded-[1.25rem]">
              <img class="size-9 rounded-full object-cover sm:size-12" :src="academyLogo" alt="" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block text-xs text-[#7a5f2f]">{{ copy.specialMission }}</span>
              <span class="mt-1 block text-base leading-tight text-[#052f29] sm:text-xl">{{ copy.mazeTitle }}</span>
              <span class="mt-1 block text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">{{ copy.mazeIntro }}</span>
            </span>
            <span class="hidden rounded-full bg-[#0a5a4b] px-4 py-2 text-sm text-white sm:inline-flex">{{ copy.playMaze }}</span>
          </RouterLink>

          <section class="mission-map rounded-3xl border border-white/80 bg-white/72 p-4 shadow-xl shadow-emerald-950/6 sm:p-6">
            <div class="relative mx-auto grid max-w-3xl gap-5 before:absolute before:left-8 before:top-8 before:h-[calc(100%-4rem)] before:w-1 before:rounded-full before:bg-[#cfe4da] sm:before:left-1/2 sm:before:-translate-x-1/2">
              <button
                v-for="(lesson, index) in selectedChapter.lessons"
                :key="lesson.id"
                class="mission-card group relative rounded-[1.5rem] border bg-white/90 p-4 text-left transition hover:-translate-y-0.5 hover:border-[#0a5a4b] hover:bg-white sm:w-[82%]"
                :class="[lessonCardClass(lesson, index), index % 2 === 0 ? 'sm:justify-self-start' : 'sm:justify-self-end']"
                :disabled="!isLessonUnlocked(lesson)"
                @click="openLesson(lesson)"
              >
                <span class="absolute -left-2 -top-4 grid size-12 place-items-center rounded-full border-4 border-white text-xs shadow-lg shadow-emerald-950/10" :class="missionNodeClass(lesson, index)">
                  <img v-if="index % 5 === 0" class="size-8 rounded-full object-cover" :src="academyLogo" alt="" />
                  <span v-else>{{ lesson.number }}</span>
                </span>
                <span class="ml-9 flex flex-wrap items-start justify-between gap-3">
                  <span>
                    <span class="text-xs text-[#bf6b3d]">{{ copy.mission }} {{ lesson.number }}</span>
                    <span class="mt-1 block text-lg leading-7 text-[#052f29]">{{ lesson.title[language] }}</span>
                  </span>
                  <span class="rounded-full px-3 py-1 text-xs" :class="statusPillClass(lesson)">
                    {{ lessonStatus(lesson) }}
                  </span>
                </span>
                <span class="mt-2 hidden text-sm leading-6 text-zinc-600 sm:block">{{ lesson.study.objective[language] }}</span>
                <span class="mt-2 inline-flex text-sm sm:mt-3" :class="isLessonUnlocked(lesson) ? 'text-[#0a5a4b]' : 'text-zinc-400'">
                  {{ isLessonUnlocked(lesson) ? copy.startMission : copy.locked }}
                </span>
              </button>
            </div>
          </section>
        </section>

        <section v-else class="mx-auto max-w-5xl rounded-2xl border border-white/80 bg-white/90 p-3 shadow-xl shadow-emerald-950/6 sm:p-4">
          <div v-if="rewardNotice" class="reward-pop mb-3 rounded-2xl border border-[#cfe4da] bg-[#e9f7ef] p-4 text-[#0a4a3e]">
            <div class="flex items-center gap-3">
              <span class="grid size-11 place-items-center rounded-full bg-[#0a5a4b] text-sm text-white">+{{ rewardNotice.points }}</span>
              <div>
                <p class="text-sm text-[#052f29]">{{ rewardNotice.title }}</p>
                <p class="text-xs text-[#0a5a4b]">{{ copy.rankNow }} {{ rank.current.shortName }} · {{ rank.points }} EXP</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <button class="mb-2 rounded-full border border-[#dcece4] bg-white px-3 py-1.5 text-xs text-[#0a4a3e] hover:bg-[#f5fbf7] sm:text-sm" type="button" @click="backToLessons">
                {{ copy.backToLessons }}
              </button>
              <p class="text-xs text-[#bf6b3d]">{{ copy.chapter }} {{ selectedChapter.number }} · {{ copy.lesson }} {{ selectedLesson.number }}</p>
              <h2 class="mt-1 text-2xl leading-tight text-[#052f29] sm:text-3xl">{{ selectedLesson.title[language] }}</h2>
            </div>
            <span class="w-fit rounded-full bg-[#fff3df] px-3 py-1.5 text-xs text-[#9d542f]">
              {{ selectedLesson.habit[language] }}
            </span>
          </div>

          <div class="mt-3 grid grid-cols-2 gap-1.5 rounded-full border border-[#dcece4] bg-[#f5fbf7] p-1">
            <button
              class="rounded-full px-3 py-2 text-sm"
              :class="stage === 'study' ? 'bg-[#0a5a4b] text-white shadow-sm' : 'text-[#0a4a3e] hover:bg-white'"
              @click="stage = 'study'"
            >
              {{ copy.study }}
            </button>
            <button
              class="rounded-full px-3 py-2 text-sm"
              :class="stage === 'practice' ? 'bg-[#0a5a4b] text-white shadow-sm' : 'text-[#0a4a3e] hover:bg-white'"
              @click="stage = 'practice'"
            >
              {{ copy.practice }}
            </button>
          </div>

          <article v-if="stage === 'study'" class="mt-3 overflow-hidden rounded-2xl border border-[#dcece4] bg-[#fffdf8]">
            <div class="p-3 sm:p-4">
              <div class="mb-3 flex items-center justify-between gap-3">
                <p class="text-xs text-[#bf6b3d] sm:text-sm">{{ activeStudySlide.kicker }}</p>
                <div class="flex gap-1.5">
                  <button
                    v-for="(_, index) in studySlides"
                    :key="index"
                    class="size-2.5 rounded-full"
                    :class="studyPage === index ? 'bg-[#0a5a4b]' : 'bg-[#cfe4da]'"
                    type="button"
                    :aria-label="`Open study page ${index + 1}`"
                    @click="studyPage = index"
                  />
                </div>
              </div>

              <section v-if="activeStudySlide.id === 'intro'" class="grid gap-3">
                <div class="rounded-xl bg-white p-3 sm:p-4">
                  <p class="text-xs text-[#bf6b3d]">{{ copy.objective }}</p>
                  <p class="mt-1.5 text-sm leading-7 text-[#052f29] sm:text-base">{{ selectedLesson.study.objective[language] }}</p>
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                  <div class="rounded-xl border border-[#dcece4] bg-[#f5fbf7] p-3 sm:p-4">
                    <p class="text-xs text-[#0a5a4b]">{{ copy.caseStudy }}</p>
                    <p class="mt-1.5 text-sm leading-6 text-[#052f29]">{{ selectedLesson.study.caseStudy[language] }}</p>
                  </div>
                  <div class="rounded-xl border border-[#dcece4] bg-white p-3 sm:p-4">
                    <p class="text-xs text-[#bf6b3d]">{{ copy.why }}</p>
                    <p class="mt-1.5 text-sm leading-6 text-zinc-700">{{ selectedLesson.study.why[language] }}</p>
                  </div>
                </div>
              </section>

              <section v-else-if="activeStudySlide.id === 'steps'" class="rounded-xl bg-white p-3 sm:p-4">
                <p class="text-xs text-[#bf6b3d]">{{ copy.checkSteps }}</p>
                <ol class="mt-3 grid gap-2">
                  <li v-for="(step, index) in selectedLesson.study.steps" :key="step.en" class="flex gap-2.5 rounded-xl bg-[#f5fbf7] p-3 text-sm leading-6 text-zinc-700">
                    <span class="grid size-7 shrink-0 place-items-center rounded-full bg-[#0a5a4b] text-xs text-white">{{ index + 1 }}</span>
                    <span>{{ step[language] }}</span>
                  </li>
                </ol>
              </section>

              <section v-else class="grid gap-3 sm:grid-cols-3">
                <div class="rounded-xl bg-[#e9f7ef] p-3 sm:p-4">
                  <p class="text-xs text-[#0a5a4b]">{{ copy.example }}</p>
                  <p class="mt-1.5 text-sm leading-6 text-[#052f29]">{{ selectedLesson.study.exampleAnswer[language] }}</p>
                </div>
                <div class="rounded-xl bg-[#fff3df] p-3 sm:p-4">
                  <p class="text-xs text-[#9d542f]">{{ copy.mistake }}</p>
                  <p class="mt-1.5 text-sm leading-6 text-[#5b3825]">{{ selectedLesson.study.commonMistake[language] }}</p>
                </div>
                <div class="rounded-xl bg-white p-3 sm:p-4">
                  <p class="text-xs text-[#bf6b3d]">{{ copy.detectiveNote }}</p>
                  <p class="mt-1.5 text-sm leading-6 text-zinc-700">{{ selectedLesson.study.detectiveNote[language] }}</p>
                </div>
              </section>
            </div>
            <div class="flex flex-wrap items-center justify-between gap-2 border-t border-[#dcece4] bg-white/76 px-3 py-2.5 sm:px-4">
              <span class="text-xs text-zinc-500">+{{ selectedLesson.points }} EXP</span>
              <div class="flex gap-2">
                <button class="rounded-full border border-[#dcece4] bg-white px-4 py-2 text-sm text-[#0a4a3e] disabled:opacity-40" :disabled="studyPage === 0" @click="studyPage -= 1">
                  {{ copy.previous }}
                </button>
                <button class="rounded-full bg-[#0a5a4b] px-4 py-2 text-sm text-white hover:bg-[#073f35]" @click="finishStudy">
                  {{ studyButtonLabel }}
                </button>
              </div>
            </div>
          </article>

          <article v-else class="mt-3 rounded-2xl border border-[#dcece4] bg-[#fffdf8] p-3 sm:p-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-sm text-[#bf6b3d]">{{ selectedLesson.game.title[language] }}</p>
                <p class="mt-1 text-xs text-zinc-500">{{ gameTypeLabel(selectedLesson.gameType) }}</p>
              </div>
              <span class="rounded-full bg-white px-3 py-1 text-xs text-zinc-500">+20 EXP</span>
            </div>
            <p class="mt-3 rounded-xl bg-white p-3 text-sm leading-6 text-[#052f29] sm:text-base">{{ selectedLesson.game.scenario[language] }}</p>
            <p class="mt-3 text-sm leading-6 text-zinc-600">{{ selectedLesson.game.prompt[language] }}</p>

            <SignalSortGame
              v-if="selectedLesson.gameType === 'signal-sort'"
              :lesson="selectedLesson"
              :language="language"
              :locked="practiceDone"
              :key="`${selectedLesson.id}:signal:${practiceAttempt}`"
              @complete="finishPractice"
            />
            <TimelineFixGame
              v-else-if="selectedLesson.gameType === 'timeline-fix'"
              :lesson="selectedLesson"
              :language="language"
              :locked="practiceDone"
              :key="`${selectedLesson.id}:timeline:${practiceAttempt}`"
              @complete="finishPractice"
            />
            <ChoiceCheckGame
              v-else
              :lesson="selectedLesson"
              :language="language"
              :locked="practiceDone"
              :key="`${selectedLesson.id}:choice:${practiceAttempt}`"
              @complete="finishPractice"
            />

            <div v-if="practiceMessage" class="mt-4 rounded-xl p-4" :class="lastPracticeWon ? 'bg-[#e9f7ef] text-[#0a5a4b]' : 'bg-[#fff3df] text-[#9d542f]'">
              <p class="text-sm">{{ practiceMessage }}</p>
              <p v-if="lastPracticeWon" class="mt-1 text-xs">{{ practiceRewardText }}</p>
              <button v-if="!lastPracticeWon" class="mt-3 rounded-full bg-[#0a5a4b] px-3 py-1.5 text-xs text-white hover:bg-[#073f35]" type="button" @click="retryPractice">
                {{ copy.tryAgain }}
              </button>
              <RouterLink v-if="practiceDone" class="mt-3 inline-flex rounded-full bg-[#0a5a4b] px-3 py-1.5 text-xs text-white hover:bg-[#073f35]" :to="selectedChapter.connectedModule.path">
                {{ copy.open }} {{ selectedChapter.connectedModule.label }}
              </RouterLink>
            </div>
          </article>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, ref, watch } from 'vue'
import academyLogo from '../assets/little-detective-logo-myanmar.png'
import { chapters, gameTypes } from '../data/flashcards'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const language = computed(() => userStore.siteLanguage)
const selectedChapter = ref(chapters[0])
const selectedLesson = ref(chapters[0].lessons[0])
const lessonOpen = ref(false)
const stage = ref('study')
const studyPage = ref(0)
const lastPracticeWon = ref(false)
const practiceMessage = ref('')
const rewardNotice = ref(null)
const practiceAttempt = ref(0)

const languages = [
  { id: 'en', label: 'EN' },
  { id: 'mm', label: 'MM' },
]

const labels = {
  en: {
    back: 'Back',
    kicker: 'Learning path',
    title: 'Detective Academy',
    chapter: 'Chapter',
    lesson: 'Lesson',
    lessons: 'lessons',
    study: 'Study',
    practice: 'Practice',
    gotIt: 'I studied it',
    done: 'Completed',
    locked: 'Locked',
    progress: 'Chapter progress',
    open: 'Open',
    chooseLesson: 'Choose a lesson to open its study page.',
    backToLessons: 'Back to lessons',
    correct: 'Nice check. Practice reward saved.',
    retry: 'Almost. Re-read the clue and try again.',
    objective: 'Goal',
    caseStudy: 'Case',
    why: 'Why this matters',
    checkSteps: 'What to do',
    example: 'Good answer',
    mistake: 'Common mistake',
    detectiveNote: 'Detective note',
    previous: 'Back',
    next: 'Next',
    rankNow: 'Rank',
    studyReward: 'Study reward saved',
    practiceReward: 'Practice reward saved',
    practiceSaved: 'EXP saved once for this practice.',
    practiceAgain: 'Already completed. EXP is saved once.',
    practiceNoExp: 'You passed after a retry, so this lesson is unlocked but no EXP is added.',
    tryAgain: 'Try again',
    missionMap: 'Mission map',
    rookie: 'Detective Rookie',
    mission: 'Mission',
    startMission: 'Start mission',
    specialMission: 'Special mission',
    mazeTitle: 'Misinformation Maze',
    mazeIntro: 'Move the owl detective, collect checking clues, avoid rumor traps, and reach the truth badge.',
    playMaze: 'Play maze',
    closeMaze: 'Close maze',
    mazeGoal: 'Clues collected',
    mazeGoalText: 'Collect at least 3 clues before stepping on the truth badge.',
    resetMission: 'Restart mission',
    mazeStart: 'Collect source, date, evidence, and context before the final truth badge.',
    mazeTrap: 'Trap touched. Pause and move toward evidence.',
    mazeNeedMore: 'Need more clues before the truth badge.',
    mazeWin: 'Mission clear. EXP reward saved.',
    mazeWinAgain: 'Mission clear. EXP already saved once.',
    mazeHud: 'Time',
    mazeControls: 'Desktop: arrow keys or WASD. Mobile: use the controls below.',
    soundOn: 'Sound on',
    soundOff: 'Sound off',
  },
  mm: {
    back: 'နောက်သို့',
    kicker: 'လေ့လာရေးလမ်းကြောင်း',
    title: 'စုံထောက် Academy',
    chapter: 'အခန်း',
    lesson: 'သင်ခန်းစာ',
    lessons: 'သင်ခန်းစာ',
    study: 'လေ့လာရန်',
    practice: 'လေ့ကျင့်ရန်',
    gotIt: 'လေ့လာပြီးပြီ',
    done: 'ပြီးပြီ',
    locked: 'ပိတ်ထားသည်',
    progress: 'အခန်းပြီးမြောက်မှု',
    open: 'ဖွင့်ရန်',
    chooseLesson: 'သင်ခန်းစာတစ်ခုကိုရွေးပြီး လေ့လာပါ။',
    backToLessons: 'သင်ခန်းစာများသို့ပြန်',
    correct: 'ကောင်းပါတယ်။ အရေးကြီးသောအချက်ကို မှန်ကန်စွာရွေးနိုင်ပါပြီ။',
    retry: 'နည်းနည်းလိုသေးတယ်။ သတိထားရမည့်အချက်ကို ပြန်ဖတ်ပြီး ထပ်စမ်းပါ။',
    objective: 'ရည်ရွယ်ချက်',
    caseStudy: 'ဥပမာအခြေအနေ',
    why: 'ဘာကြောင့်အရေးကြီးလဲ',
    checkSteps: 'လုပ်ရန်အဆင့်များ',
    example: 'ကောင်းသောအဖြေ',
    mistake: 'ဖြစ်တတ်သောအမှား',
    detectiveNote: 'စုံထောက်မှတ်ချက်',
    previous: 'နောက်ပြန်',
    next: 'ရှေ့သို့',
    rankNow: 'လက်ရှိအဆင့်',
    studyReward: 'လေ့လာမှုဆုရရှိပါပြီ',
    practiceReward: 'လေ့ကျင့်မှုဆုရရှိပါပြီ',
    practiceSaved: 'ဤလေ့ကျင့်ခန်းအတွက် EXP သိမ်းပြီးပါပြီ။',
    practiceAgain: 'ပြီးထားပြီးသားဖြစ်သောကြောင့် EXP ကို တစ်ကြိမ်သာရပါမည်။',
    practiceNoExp: 'ထပ်စမ်းပြီးမှအောင်သောကြောင့် သင်ခန်းစာပွင့်သွားမည်၊ EXP မရပါ။',
    tryAgain: 'ထပ်စမ်းမယ်',
    missionMap: 'လေ့လာရေးလမ်းကြောင်း',
    rookie: 'စုံထောက်အသစ်',
    mission: 'သင်ခန်းစာ',
    startMission: 'စတင်ရန်',
    specialMission: 'အထူးလေ့ကျင့်ခန်း',
    mazeTitle: 'သတင်းမှားလမ်းကြောင်းဂိမ်း',
    mazeIntro: 'စစ်ဆေးရေးအချက်များ စုဆောင်းပြီး ကောလာဟလထောင်ချောက်များကို ရှောင်ပါ။',
    playMaze: 'ဂိမ်းကစားမယ်',
    closeMaze: 'ပိတ်မယ်',
    mazeGoal: 'စုဆောင်းထားသော အချက်များ',
    mazeGoalText: 'နောက်ဆုံးအမှတ်ကို မထိမီ စစ်ဆေးရေးအချက် အနည်းဆုံး ၃ ခု စုဆောင်းပါ။',
    resetMission: 'ပြန်စမယ်',
    mazeStart: 'နောက်ဆုံးအမှတ်မရောက်ခင် ရင်းမြစ်၊ ရက်စွဲ၊ အထောက်အထား၊ အကြောင်းအရာတို့ကို စုဆောင်းပါ။',
    mazeTrap: 'ထောင်ချောက်ထိသွားပြီ။ ခဏရပ်ပြီး အထောက်အထားဆီရွှေ့ပါ။',
    mazeNeedMore: 'နောက်ဆုံးအမှတ်မရောက်ခင် အချက်အလက်ထပ်လိုသေးတယ်။',
    mazeWin: 'လေ့ကျင့်ခန်းအောင်မြင်ပါပြီ။ EXP သိမ်းပြီးပါပြီ။',
    mazeWinAgain: 'လေ့ကျင့်ခန်းအောင်မြင်ပြီးသားပါ။ EXP ကို တစ်ကြိမ်သာရပါမည်။',
    mazeHud: 'အချိန်',
    mazeControls: 'Desktop တွင် arrow key/WASD သုံးပါ။ Mobile တွင် အောက်က control ကိုသုံးပါ။',
    soundOn: 'အသံဖွင့်',
    soundOff: 'အသံပိတ်',
  },
}

const copy = computed(() => labels[language.value])
const rank = computed(() => userStore.rankInfo)
const studyDone = computed(() => userStore.hasCompletedActivity(studyKey(selectedLesson.value)))
const practiceDone = computed(() => userStore.hasCompletedActivity(practiceKey(selectedLesson.value)))
const practiceFailed = computed(() => userStore.hasFailedPractice(practiceKey(selectedLesson.value)))
const practiceRewardText = computed(() => {
  if (practiceFailed.value) return copy.value.practiceNoExp
  return practiceDone.value ? copy.value.practiceSaved : copy.value.practiceAgain
})
const chapterCompleted = computed(() => selectedChapter.value.lessons.filter((lesson) => userStore.hasCompletedActivity(studyKey(lesson)) && userStore.hasCompletedActivity(practiceKey(lesson))).length)
const studySlides = computed(() => [
  { id: 'intro', kicker: `${copy.value.study} 1 / 3` },
  { id: 'steps', kicker: `${copy.value.study} 2 / 3` },
  { id: 'answer', kicker: `${copy.value.study} 3 / 3` },
])
const activeStudySlide = computed(() => studySlides.value[studyPage.value] || studySlides.value[0])
const isLastStudyPage = computed(() => studyPage.value === studySlides.value.length - 1)
const studyButtonLabel = computed(() => {
  if (!isLastStudyPage.value) return copy.value.next
  return studyDone.value ? copy.value.done : copy.value.gotIt
})
watch(selectedLesson, () => {
  stage.value = 'study'
  studyPage.value = 0
  practiceMessage.value = ''
  lastPracticeWon.value = false
  rewardNotice.value = null
  practiceAttempt.value += 1
})

function selectChapter(chapter) {
  selectedChapter.value = chapter
  selectedLesson.value = chapter.lessons.find((lesson) => isLessonUnlocked(lesson)) || chapter.lessons[0]
  lessonOpen.value = false
}

function openLesson(lesson) {
  if (!isLessonUnlocked(lesson)) return
  selectedLesson.value = lesson
  lessonOpen.value = true
}

function backToLessons() {
  lessonOpen.value = false
}

function gameTypeLabel(gameType) {
  return gameTypes.find((type) => type.id === gameType)?.label[language.value] || gameType
}

function lessonStatus(lesson) {
  const study = userStore.hasCompletedActivity(studyKey(lesson))
  const practice = userStore.hasCompletedActivity(practiceKey(lesson))
  if (study && practice) return language.value === 'mm' ? 'ပြီးပြီ' : 'Done'
  if (study) return language.value === 'mm' ? 'လေ့ကျင့်ရန်' : 'Practice next'
  if (!isLessonUnlocked(lesson)) return language.value === 'mm' ? 'ပိတ်ထားသည်' : 'Locked'
  return language.value === 'mm' ? 'အသစ်' : 'New'
}

function lessonCardClass(lesson, index) {
  if (userStore.hasCompletedActivity(studyKey(lesson)) && userStore.hasCompletedActivity(practiceKey(lesson))) {
    return 'border-[#cfe4da]'
  }

  return isLessonUnlocked(lesson)
    ? 'border-[#dcece4]'
    : 'border-[#edf3ef] opacity-55 grayscale cursor-not-allowed hover:translate-y-0 hover:border-[#edf3ef]'
}

function missionNodeClass(lesson, index) {
  if (userStore.hasCompletedActivity(studyKey(lesson)) && userStore.hasCompletedActivity(practiceKey(lesson))) {
    return 'border-[#0a5a4b] bg-[#0a5a4b] text-white'
  }

  return isLessonUnlocked(lesson)
    ? 'border-[#cfe4da] bg-[#e9f7ef] text-[#0a4a3e]'
    : 'border-[#dcece4] bg-[#f5fbf7] text-zinc-400'
}

function statusPillClass(lesson) {
  const study = userStore.hasCompletedActivity(studyKey(lesson))
  const practice = userStore.hasCompletedActivity(practiceKey(lesson))
  if (study && practice) return 'bg-[#e9f7ef] text-[#0a5a4b]'
  if (study) return 'bg-[#fff3df] text-[#9d542f]'
  return 'bg-[#f5fbf7] text-zinc-500'
}

function finishStudy() {
  if (!isLastStudyPage.value) {
    studyPage.value += 1
    return
  }

  const saved = userStore.addLearningPoints(studyKey(selectedLesson.value), selectedLesson.value.points)
  if (saved) showReward(copy.value.studyReward, selectedLesson.value.points)
  stage.value = 'practice'
}

function finishPractice(success) {
  lastPracticeWon.value = success
  practiceMessage.value = success ? copy.value.correct : copy.value.retry
  if (!success) {
    userStore.markPracticeFailed(practiceKey(selectedLesson.value))
    return
  }
  if (practiceFailed.value) {
    userStore.completeActivity(practiceKey(selectedLesson.value))
    return
  }
  const saved = userStore.addLearningPoints(practiceKey(selectedLesson.value), 20)
  if (saved) showReward(copy.value.practiceReward, 20)
}

function retryPractice() {
  practiceMessage.value = ''
  lastPracticeWon.value = false
  practiceAttempt.value += 1
}

function isLessonUnlocked(lesson) {
  const allLessons = chapters.flatMap((chapter) => chapter.lessons)
  const index = allLessons.findIndex((item) => item.id === lesson.id)
  if (index <= 0) return true
  return userStore.hasCompletedActivity(practiceKey(allLessons[index - 1]))
}

function studyKey(lesson) {
  return `${lesson.id}:study`
}

function practiceKey(lesson) {
  return `${lesson.id}:practice`
}

function showReward(title, points) {
  rewardNotice.value = { title, points }
  window.setTimeout(() => {
    rewardNotice.value = null
  }, 3200)
}

function localized(node, languageValue) {
  return node?.[languageValue] || ''
}

const SignalSortGame = defineComponent({
  props: {
    lesson: { type: Object, required: true },
    language: { type: String, required: true },
    locked: { type: Boolean, default: false },
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const picked = ref('')
    const submitted = ref(false)
    const options = computed(() => props.lesson.game.items.map((item, index) => ({
      id: item.id,
      label: item.label,
      letter: String.fromCharCode(65 + index),
      correct: !!item.risky,
    })))
    const choose = (id) => {
      if (props.locked || submitted.value) return
      picked.value = id
    }
    const check = () => {
      const selected = options.value.find((item) => item.id === picked.value)
      submitted.value = true
      emit('complete', !!selected?.correct)
    }
    return () => renderMultipleChoice({ props, picked, submitted, options: options.value, choose, check })
  },
})

const TimelineFixGame = defineComponent({
  props: {
    lesson: { type: Object, required: true },
    language: { type: String, required: true },
    locked: { type: Boolean, default: false },
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const picked = ref('')
    const submitted = ref(false)
    const optionSets = computed(() => buildTimelineOptions(props.lesson, props.language))
    const choose = (id) => {
      if (props.locked || submitted.value) return
      picked.value = id
    }
    const check = () => {
      submitted.value = true
      emit('complete', picked.value === 'correct')
    }
    return () => renderMultipleChoice({ props, picked, submitted, options: optionSets.value, choose, check })
  },
})

const ChoiceCheckGame = defineComponent({
  props: {
    lesson: { type: Object, required: true },
    language: { type: String, required: true },
    locked: { type: Boolean, default: false },
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const picked = ref('')
    const submitted = ref(false)
    const options = computed(() => props.lesson.game.options.map((option, index) => ({
      id: option.id,
      label: option.label,
      letter: String.fromCharCode(65 + index),
      correct: option.id === props.lesson.game.correct,
    })))
    const choose = (id) => {
      if (props.locked || submitted.value) return
      picked.value = id
    }
    const check = () => {
      submitted.value = true
      emit('complete', picked.value === props.lesson.game.correct)
    }
    return () => renderMultipleChoice({ props, picked, submitted, options: options.value, choose, check })
  },
})

function renderMultipleChoice({ props, picked, submitted, options, choose, check }) {
  return h('div', { class: 'mt-4' }, [
    h('fieldset', { class: 'grid gap-3' }, options.map((option) => (
      h('label', {
        class: `flex cursor-pointer items-start gap-3 rounded-2xl border bg-white p-4 text-sm leading-6 transition ${picked.value === option.id ? 'border-[#0a5a4b] bg-[#e9f7ef]' : 'border-[#dcece4] hover:border-[#0a5a4b] hover:bg-[#f8fcf9]'} ${props.locked || submitted.value ? 'cursor-default' : ''}`,
      }, [
        h('input', {
          class: 'mt-1 size-4 accent-[#0a5a4b]',
          type: 'radio',
          name: `practice-${props.lesson.id}`,
          value: option.id,
          checked: picked.value === option.id,
          disabled: props.locked || submitted.value,
          onChange: () => choose(option.id),
        }),
        h('span', { class: 'grid size-8 shrink-0 place-items-center rounded-full bg-[#f5fbf7] text-xs text-[#0a4a3e]' }, option.letter),
        h('span', { class: 'text-[#052f29]' }, localized(option.label, props.language)),
      ])
    ))),
    h('button', {
      class: 'mt-4 rounded-full bg-[#0a5a4b] px-5 py-2.5 text-sm text-white disabled:opacity-45',
      disabled: props.locked || submitted.value || !picked.value,
      onClick: check,
    }, submitted.value ? (props.language === 'mm' ? 'တင်ပြီးပြီ' : 'Submitted') : (props.language === 'mm' ? 'အဖြေတင်မယ်' : 'Submit answer')),
  ])
}

function buildTimelineOptions(lesson, languageValue) {
  const labelFor = (id) => lesson.game.items.find((item) => item.id === id)?.label?.[languageValue] || id
  const format = (ids) => ids.map(labelFor).join(' -> ')
  const correct = lesson.game.order
  const reversed = [...correct].reverse()
  const shifted = [...correct.slice(1), correct[0]]
  const original = lesson.game.items.map((item) => item.id)
  return [
    { id: 'correct', letter: 'A', label: { [languageValue]: format(correct) }, correct: true },
    { id: 'reverse', letter: 'B', label: { [languageValue]: format(reversed) }, correct: false },
    { id: 'shifted', letter: 'C', label: { [languageValue]: format(shifted) }, correct: false },
    { id: 'original', letter: 'D', label: { [languageValue]: format(original) }, correct: false },
  ]
}
</script>
