<template>
  <div class="maze-game-page min-h-screen bg-[#eef6f0] px-3 py-3 text-zinc-900 sm:px-6 sm:py-4" :lang="language === 'mm' ? 'my' : 'en'">
    <header class="maze-game-header mx-auto flex max-w-7xl items-center justify-between gap-3">
      <RouterLink class="rounded-full border border-[#cfe4da] bg-white/86 px-3 py-1.5 text-xs text-[#0a4a3e]" to="/academy">
        {{ copy.back }}
      </RouterLink>
      <div class="flex items-center gap-2">
        <button class="rounded-full border border-[#dcece4] bg-white/86 px-3 py-1.5 text-xs text-[#0a4a3e]" type="button" @click="toggleSound">
          {{ soundEnabled ? copy.soundOn : copy.soundOff }}
        </button>
        <RouterLink class="min-w-36 rounded-2xl border border-[#cfe4da] bg-white/90 px-3 py-2 text-xs text-[#052f29]" to="/profile">
          <span class="flex items-center justify-between gap-2">
            <span>{{ rank.current.shortName }}</span>
            <span>{{ rank.progress }}%</span>
          </span>
          <span class="mt-1 block h-1.5 overflow-hidden rounded-full bg-[#e7f0ea]">
            <span class="block h-full rounded-full bg-[#0a5a4b]" :style="{ width: `${rank.progress}%` }" />
          </span>
        </RouterLink>
      </div>
    </header>

    <main class="mx-auto mt-4 max-w-7xl">
      <section v-if="screen === 'intro'" class="maze-intro-card relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-[#dfeee7] p-3 shadow-2xl shadow-emerald-950/8 sm:rounded-[2rem] sm:p-4 lg:min-h-[34rem] lg:p-6">
        <div class="absolute inset-0 opacity-70" aria-hidden="true">
          <div class="absolute left-8 top-10 h-80 w-10 rounded-full bg-[#cfe4da]" />
          <div class="absolute left-8 top-10 h-10 w-72 rounded-full bg-[#cfe4da]" />
          <div class="absolute bottom-14 right-12 h-10 w-80 rounded-full bg-[#cfe4da]" />
          <div class="absolute right-28 top-8 h-96 w-10 rounded-full bg-[#cfe4da]" />
        </div>
        <div class="relative mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div class="maze-intro-copy rounded-[1.25rem] border border-white/80 bg-white/90 p-4 shadow-xl shadow-emerald-950/8 sm:rounded-[1.75rem] sm:p-7">
            <p class="text-xs uppercase tracking-[0.18em] text-[#7a5f2f]">{{ copy.kicker }}</p>
            <h1 class="mt-2 text-[1.65rem] leading-tight text-[#052f29] sm:text-5xl">{{ copy.title }}</h1>
            <p class="mt-2 text-sm leading-6 text-zinc-600 sm:mt-3 sm:text-base sm:leading-7">{{ copy.intro }}</p>
            <div class="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row">
              <button class="rounded-full bg-[#0a5a4b] px-5 py-2.5 text-sm text-white hover:bg-[#073f35] sm:px-6 sm:py-3 sm:text-base" type="button" @click="startGame">
                {{ copy.start }}
              </button>
              <RouterLink class="rounded-full border border-[#dcece4] bg-white px-5 py-2.5 text-center text-sm text-[#0a4a3e] hover:bg-[#f5fbf7] sm:px-6 sm:py-3 sm:text-base" to="/academy">
                {{ copy.quit }}
              </RouterLink>
            </div>
            <div class="mt-4 grid gap-2 sm:mt-5">
              <div v-for="item in copy.rules" :key="item" class="rounded-2xl bg-[#f5fbf7] px-3 py-2 text-xs leading-5 text-[#0a4a3e] sm:px-4 sm:py-3 sm:text-sm sm:leading-6">
                {{ item }}
              </div>
            </div>
            <div class="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-3">
              <div class="rounded-2xl border border-[#cfe4da] bg-white px-3 py-2 sm:px-4 sm:py-3">
                <p class="text-sm text-[#052f29]">{{ copy.powerTitle }}</p>
                <p class="mt-1 text-xs leading-5 text-zinc-500">{{ copy.powerText }}</p>
              </div>
              <div class="rounded-2xl border border-[#eadfce] bg-white px-3 py-2 sm:px-4 sm:py-3">
                <p class="text-sm text-[#9d542f]">{{ copy.trapTitle }}</p>
                <p class="mt-1 text-xs leading-5 text-zinc-500">{{ copy.trapText }}</p>
              </div>
            </div>
          </div>

          <aside class="maze-enemy-guide rounded-[1.25rem] border border-[#dcece4] bg-[#fffdf8]/94 p-3 shadow-xl shadow-emerald-950/8 sm:rounded-[1.75rem] sm:p-4">
            <p class="text-sm text-[#7a5f2f]">{{ copy.enemiesTitle }}</p>
            <div class="mt-2 grid gap-2 sm:mt-3 sm:gap-3">
              <article v-for="enemy in enemies" :key="enemy.id" class="rounded-2xl border border-[#eadfce] bg-white p-2 sm:p-3">
                <div class="flex items-center gap-3">
                  <span class="enemy-token enemy-token-compact shrink-0" :style="{ '--enemy-color': enemy.color }">
                    <span class="enemy-eye left" />
                    <span class="enemy-eye right" />
                    <span class="enemy-mouth" />
                    <span class="enemy-mark">{{ enemy.mark }}</span>
                  </span>
                  <div>
                    <h2 class="text-sm text-[#052f29] sm:text-base">{{ enemy.name[language] }}</h2>
                    <p class="hidden text-xs leading-5 text-zinc-500 sm:block">{{ enemy.personality[language] }}</p>
                    <p class="mt-0.5 text-xs leading-5 text-[#9d542f] sm:mt-1">{{ enemy.behavior[language] }}</p>
                  </div>
                </div>
              </article>
            </div>
          </aside>
        </div>
      </section>

      <section v-else class="maze-game-layout grid gap-4 lg:grid-cols-[1fr_20rem]">
        <div class="maze-play-card rounded-[1.5rem] border border-white/80 bg-white p-3 shadow-2xl shadow-emerald-950/8">
          <div class="maze-canvas-frame relative overflow-hidden rounded-2xl border border-[#cfe4da] bg-[#e6f3ec]">
            <canvas
              ref="canvasRef"
              class="maze-board-canvas block aspect-[5/3] w-full touch-none"
              :width="BOARD_WIDTH"
              :height="BOARD_HEIGHT"
              tabindex="0"
              :aria-label="copy.canvasLabel"
              @pointerdown="focusGame"
            />
            <div class="maze-hud pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2">
              <span class="rounded-full bg-white/90 px-3 py-1 text-xs text-[#0a4a3e]">{{ copy.time }} {{ seconds }}s</span>
              <span class="rounded-full bg-white/90 px-3 py-1 text-xs text-[#0a4a3e]">{{ copy.clues }} {{ collected.length }}/{{ clues.length }}</span>
              <span class="rounded-full bg-white/90 px-3 py-1 text-xs text-[#9d542f]">{{ copy.hearts }} {{ hearts }}</span>
              <span v-if="gateSpawn" class="rounded-full bg-[#fff3df]/95 px-3 py-1 text-xs text-[#8a5a18]">{{ copy.gateReady }}</span>
              <span v-if="activePowerLabel" class="rounded-full bg-[#fff3df]/95 px-3 py-1 text-xs text-[#8a5a18]">{{ activePowerLabel }}</span>
              <span v-if="trapCooldown > performanceNow" class="rounded-full bg-[#e7eef3]/95 px-3 py-1 text-xs text-[#2f607a]">{{ copy.slowed }} {{ slowedLeft }}s</span>
              <span v-if="invincibleUntil > performanceNow" class="rounded-full bg-[#e7eef3]/95 px-3 py-1 text-xs text-[#2f607a]">{{ copy.safe }} {{ invincibleLeft }}s</span>
            </div>
            <div v-if="lost" class="absolute inset-0 grid place-items-center bg-white/75 p-4 backdrop-blur-sm">
              <div class="w-full max-w-sm rounded-[1.5rem] border border-[#eadfce] bg-[#fffdf8] p-5 text-center shadow-2xl shadow-emerald-950/16">
                <p class="text-xs uppercase tracking-[0.18em] text-[#9d542f]">{{ copy.gameOverKicker }}</p>
                <h2 class="mt-2 text-3xl text-[#052f29]">{{ copy.gameOver }}</h2>
                <p class="mt-2 text-sm leading-6 text-zinc-600">{{ copy.gameOverText }}</p>
                <button class="mt-5 rounded-full bg-[#0a5a4b] px-6 py-3 text-sm text-white" type="button" @click="resetGame">
                  {{ copy.startAgain }}
                </button>
              </div>
            </div>
          </div>

          <div class="maze-game-actions mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-xs leading-5 text-zinc-500">{{ copy.controls }}</p>
            <button class="rounded-full border border-[#dcece4] bg-white px-4 py-2 text-sm text-[#0a4a3e]" type="button" @click="resetGame">
              {{ copy.restart }}
            </button>
          </div>

          <div class="maze-control-picker mt-3 grid grid-cols-2 rounded-full border border-[#dcece4] bg-[#f5fbf7] p-1 sm:hidden">
            <button class="rounded-full px-3 py-2 text-xs" :class="controlMode === 'joystick' ? 'bg-[#0a5a4b] text-white' : 'text-[#0a4a3e]'" type="button" @click="controlMode = 'joystick'">
              {{ copy.joystick }}
            </button>
            <button class="rounded-full px-3 py-2 text-xs" :class="controlMode === 'arrows' ? 'bg-[#0a5a4b] text-white' : 'text-[#0a4a3e]'" type="button" @click="controlMode = 'arrows'">
              {{ copy.arrows }}
            </button>
          </div>

          <div v-if="controlMode === 'joystick'" class="maze-mobile-controls mx-auto mt-3 flex w-full max-w-xs items-center justify-center gap-4 sm:hidden" :aria-label="copy.mobileControls">
            <div
              class="relative size-36 rounded-full border border-[#cfe4da] bg-[#e9f7ef] shadow-inner shadow-emerald-950/10"
              @pointerdown="startJoystick"
              @pointermove="moveJoystick"
              @pointerup="endJoystick"
              @pointercancel="endJoystick"
              @pointerleave="endJoystick"
            >
              <div class="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b8d9ca]" />
              <div
                class="absolute left-1/2 top-1/2 grid size-16 place-items-center rounded-full bg-[#0a5a4b] text-xs text-white shadow-lg shadow-emerald-950/20"
                :style="{ transform: `translate(calc(-50% + ${joystick.x}px), calc(-50% + ${joystick.y}px))` }"
              >
                {{ copy.joy }}
              </div>
            </div>
            <button class="size-16 rounded-full border border-[#dcece4] bg-white text-xl text-[#0a4a3e] shadow-md shadow-emerald-950/10" type="button" @click="resetGame">↺</button>
          </div>

          <div v-else class="maze-arrow-controls mx-auto mt-3 grid w-full max-w-xs grid-cols-3 gap-2 sm:hidden" :aria-label="copy.arrowControls">
            <span />
            <button class="maze-arrow-button" type="button" @pointerdown.prevent="press('up')" @pointerup="release('up')" @pointercancel="release('up')" @pointerleave="release('up')">↑</button>
            <span />
            <button class="maze-arrow-button" type="button" @pointerdown.prevent="press('left')" @pointerup="release('left')" @pointercancel="release('left')" @pointerleave="release('left')">←</button>
            <button class="maze-arrow-button maze-arrow-reset" type="button" @click="resetGame">↺</button>
            <button class="maze-arrow-button" type="button" @pointerdown.prevent="press('right')" @pointerup="release('right')" @pointercancel="release('right')" @pointerleave="release('right')">→</button>
            <span />
            <button class="maze-arrow-button" type="button" @pointerdown.prevent="press('down')" @pointerup="release('down')" @pointercancel="release('down')" @pointerleave="release('down')">↓</button>
            <span />
          </div>
        </div>

        <aside class="maze-status-panel rounded-[1.5rem] border border-white/80 bg-white/88 p-4 shadow-xl shadow-emerald-950/6">
          <p class="text-sm text-[#7a5f2f]">{{ copy.mission }}</p>
          <h2 class="mt-1 text-2xl leading-tight text-[#052f29]">{{ statusTitle }}</h2>
          <p class="mt-2 text-sm leading-6 text-zinc-600">{{ statusText }}</p>
          <div class="mt-4 grid gap-2">
            <div v-for="clue in clues" :key="clue.id" class="rounded-xl border px-3 py-2 text-sm" :class="collected.includes(clue.id) ? 'border-[#cfe4da] bg-[#e9f7ef] text-[#0a4a3e]' : 'border-[#edf3ef] bg-[#f8faf9] text-zinc-500'">
              {{ clue.name[language] }}
            </div>
          </div>
          <button v-if="won || lost" class="mt-4 w-full rounded-full bg-[#0a5a4b] px-4 py-2.5 text-sm text-white" type="button" @click="resetGame">
            {{ copy.playAgain }}
          </button>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const language = computed(() => userStore.siteLanguage)
const rank = computed(() => userStore.rankInfo)
const canvasRef = ref(null)
const screen = ref('intro')
const collected = ref([])
const hearts = ref(4)
const seconds = ref(0)
const won = ref(false)
const lost = ref(false)
const soundEnabled = ref(true)
const joystick = ref({ active: false, x: 0, y: 0, dx: 0, dy: 0 })
const controlMode = ref('joystick')
const shieldUntil = ref(0)
const slowUntil = ref(0)
const trapCooldown = ref(0)
const invincibleUntil = ref(0)
const performanceNow = ref(0)
const gateSpawn = ref(null)
const randomWalls = ref([])
const keys = new Set()
const BOARD_WIDTH = 1500
const BOARD_HEIGHT = 900

let frame = 0
let last = 0
let started = 0
let audio = null
let ambience = null
let footstepTimer = 0
const START_POINT = { x: 76, y: 806 }
const SAFE_ZONE = { x: START_POINT.x, y: START_POINT.y, radius: 94 }
const PLAYER_COLLISION_RADIUS = 18
const ENEMY_DIRECTIONS = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
]
let player = { x: START_POINT.x, y: START_POINT.y, size: 52, face: 'right', moving: false, step: 0 }

const copyMap = {
  en: {
    back: 'Back to Academy',
    kicker: 'Practice game',
    title: 'Misinformation Maze',
    intro: 'Guide the little detective through a maze, collect every checking clue, and unlock the truth gate.',
    rules: ['Collect every checking clue first.', 'The start circle is safe, and enemies cannot enter it.', 'After all clues are collected, the truth gate appears in a random place.'],
    powerTitle: 'Power-ups',
    powerText: 'Shield blocks one hit. Slow makes all enemies weaker for a few seconds.',
    trapTitle: 'Traps',
    trapText: 'Orange traps only slow your movement for a few seconds. They never remove lives or restart the run.',
    start: 'Start game',
    quit: 'Quit',
    enemiesTitle: 'Watch out for',
    time: 'Time',
    clues: 'Clues',
    hearts: 'Hearts',
    controls: 'Move with arrow keys/WASD. On mobile, drag the joystick below the board.',
    mobileControls: 'Mobile joystick controls',
    joystick: 'Joystick',
    arrows: 'Arrows',
    arrowControls: 'Mobile arrow controls',
    joy: 'Move',
    canvasLabel: 'Misinformation Maze game board',
    restart: 'Restart',
    mission: 'Mission status',
    ready: 'Find the clues',
    readyText: 'Collect source, date, evidence, context, and location. Then find the truth gate.',
    gateReady: 'Truth gate open',
    win: 'Mission clear',
    winText: 'You collected enough clues and avoided misinformation pressure. +40 EXP saved once.',
    skinFound: 'Hidden skin unlocked: Golden Owl.',
    lose: 'Try again',
    loseText: 'The misinformation enemies caught you too many times. Restart and move calmly.',
    playAgain: 'Play again',
    soundOn: 'Sound on',
    soundOff: 'Sound off',
    shield: 'Shield',
    slow: 'Slow enemies',
    slowed: 'Slowed',
    safe: 'Safe',
    gameOverKicker: 'All lives lost',
    gameOver: 'Game over',
    gameOverText: 'The maze won this round. Start again from the safe zone and use the clues calmly.',
    startAgain: 'Start again',
  },
  mm: {
    back: 'Academy သို့ပြန်',
    kicker: 'လေ့ကျင့်ခန်းဂိမ်း',
    title: 'သတင်းမှားလမ်းကြောင်းဂိမ်း',
    intro: 'စုံထောက်လေးကိုထိန်းပြီး စစ်ဆေးရေးအချက်အားလုံးကိုစုပါ။ အချက်ပြည့်မှ အမှန်တံခါးပွင့်လာမည်။',
    rules: ['စစ်ဆေးရေးအချက်အားလုံးကို အရင်စုပါ။', 'စမှတ်စက်ဝိုင်းသည် လုံခြုံရာနေရာဖြစ်ပြီး ရန်သူများမဝင်နိုင်ပါ။', 'အချက်အားလုံးစုပြီးမှ အမှန်တံခါးသည် မြေပုံထဲတွင် ကျပန်းပေါ်လာမည်။'],
    powerTitle: 'Power-up များ',
    powerText: 'Shield သည် တစ်ကြိမ်ထိခိုက်မှုကိုကာကွယ်သည်။ Slow သည် ရန်သူအားလုံးကို ခဏနှေးစေသည်။',
    trapTitle: 'ထောင်ချောက်များ',
    trapText: 'လိမ္မော် trap များသည် ခဏနှေးစေပါသည်။ အသက်မလျော့စေသလို စမှတ်သို့လည်း မပြန်ပို့ပါ။',
    start: 'ဂိမ်းစမယ်',
    quit: 'ထွက်မယ်',
    enemiesTitle: 'ရန်သူများ',
    time: 'အချိန်',
    clues: 'အချက်',
    hearts: 'အသက်',
    controls: 'Computer တွင် arrow/WASD သုံးပါ။ Mobile တွင် အောက်က joystick ကိုဆွဲရွှေ့ပါ။',
    mobileControls: 'Mobile joystick ထိန်းချုပ်မှု',
    joystick: 'Joystick',
    arrows: 'Arrow',
    arrowControls: 'Mobile arrow ထိန်းချုပ်မှု',
    joy: 'ရွှေ့',
    canvasLabel: 'သတင်းမှားလမ်းကြောင်းဂိမ်းဘုတ်',
    restart: 'ပြန်စမယ်',
    mission: 'ဂိမ်းအခြေအနေ',
    ready: 'အချက်များရှာပါ',
    readyText: 'ရင်းမြစ်၊ ရက်စွဲ၊ အထောက်အထား၊ နောက်ခံအကြောင်းအရာနှင့် နေရာကိုစုပါ။ ပြီးမှ အမှန်တံခါးကိုရှာပါ။',
    gateReady: 'အမှန်တံခါးပွင့်ပြီ',
    win: 'အောင်မြင်ပြီ',
    winText: 'စစ်ဆေးရေးအချက်များစုပြီး သတင်းမှားဖိအားကိုရှောင်နိုင်ပါပြီ။ +40 EXP ကို တစ်ကြိမ်ရပါမည်။',
    skinFound: 'လျှို့ဝှက် skin ရပါပြီ: Golden Owl.',
    lose: 'ထပ်စမ်းပါ',
    loseText: 'သတင်းမှားရန်သူများထိမိတာများသွားပါပြီ။ စိတ်အေးအေးထားပြီး ပြန်စမ်းပါ။',
    playAgain: 'ထပ်ကစားမယ်',
    soundOn: 'အသံဖွင့်',
    soundOff: 'အသံပိတ်',
    shield: 'ကာကွယ်မှု',
    slow: 'ရန်သူနှေး',
    slowed: 'နှေးနေသည်',
    safe: 'လုံခြုံ',
    gameOverKicker: 'အသက်ကုန်သွားပြီ',
    gameOver: 'Game over',
    gameOverText: 'ဒီအကြိမ်မှာ လမ်းကြောင်းကနိုင်သွားပြီ။ လုံခြုံရာစမှတ်မှ ပြန်စပြီး အချက်များကိုစိတ်အေးအေးစုပါ။',
    startAgain: 'ပြန်စမယ်',
  },
}

const copy = computed(() => copyMap[language.value])
const statusTitle = computed(() => (won.value ? copy.value.win : lost.value ? copy.value.lose : copy.value.ready))
const statusText = computed(() => {
  if (won.value) return copy.value.winText
  if (lost.value) return copy.value.loseText
  if (userStore.learningProfile.unlockedSkins?.[easterEgg.id]) return `${copy.value.readyText} ${copy.value.skinFound}`
  return copy.value.readyText
})
const activePowerLabel = computed(() => {
  const now = performanceNow.value
  if (shieldUntil.value > now) return copy.value.shield
  if (slowUntil.value > now) return copy.value.slow
  return ''
})
const invincibleLeft = computed(() => Math.max(0, Math.ceil((invincibleUntil.value - performanceNow.value) / 1000)))
const slowedLeft = computed(() => Math.max(0, Math.ceil((trapCooldown.value - performanceNow.value) / 1000)))
const activeWalls = computed(() => [...walls, ...randomWalls.value])

const clues = [
  { id: 'source', x: 254, y: 128, radius: 23, label: 'SRC', kind: 'scroll', name: { en: 'Source', mm: 'ရင်းမြစ်' } },
  { id: 'date', x: 1018, y: 124, radius: 23, label: 'DATE', kind: 'calendar', name: { en: 'Date', mm: 'ရက်စွဲ' } },
  { id: 'evidence', x: 188, y: 566, radius: 23, label: 'LINK', kind: 'link', name: { en: 'Evidence', mm: 'အထောက်အထား' } },
  { id: 'context', x: 808, y: 628, radius: 23, label: 'CTX', kind: 'map', name: { en: 'Context', mm: 'နောက်ခံအကြောင်းအရာ' } },
  { id: 'origin', x: 1300, y: 474, radius: 23, label: 'LOC', kind: 'map', name: { en: 'Location', mm: 'နေရာ' } },
]

const enemies = [
  { id: 'chaser', role: 'chaser', x: 520, y: 92, width: 58, height: 58, axis: 'x', from: 500, to: 860, speed: 142, color: '#c2410c', mark: '!', aggro: 360, behavior: { en: 'Fast chaser: locks on when you are close.', mm: 'မြန်တဲ့လိုက်ဖမ်းသူ: နီးလာရင် တိုက်ရိုက်လိုက်သည်။' }, name: { en: 'Rush Rumor', mm: 'အမြန်သတင်းမှား' }, personality: { en: 'Pushes panic and speed before checking.', mm: 'မစစ်ဆေးခင် ထိတ်လန့်ပြီး အမြန်လုပ်စေသည်။' } },
  { id: 'ambusher', role: 'ambusher', x: 850, y: 250, width: 58, height: 58, axis: 'y', from: 160, to: 590, speed: 108, color: '#384b7a', mark: '?', aggro: 300, behavior: { en: 'Ambusher: aims ahead of your path.', mm: 'ချောင်းမြောင်းသူ: သင်သွားမည့်လမ်းရှေ့ကို ခန့်မှန်းတားသည်။' }, name: { en: 'Fake Caption', mm: 'စာတန်းမှား' }, personality: { en: 'Twists a real image with a false caption.', mm: 'ပုံအစစ်ကို စာတန်းမှားဖြင့်လှည့်စားသည်။' } },
  { id: 'guard', role: 'guard', x: 350, y: 500, width: 58, height: 58, axis: 'x', from: 320, to: 700, speed: 96, color: '#0f766e', mark: 'G', aggro: 220, behavior: { en: 'Guard: patrols clues and blocks safe routes.', mm: 'စောင့်ကြပ်သူ: clue နီးပါးနှင့် လမ်းကောင်းများကို စောင့်သည်။' }, name: { en: 'Source Guard', mm: 'ရင်းမြစ်စောင့်' }, personality: { en: 'Protects weak sources from being questioned.', mm: 'မခိုင်မာသောရင်းမြစ်များကို မေးခွန်းမထုတ်အောင်တားသည်။' } },
  { id: 'chaos', role: 'chaos', x: 1000, y: 730, width: 58, height: 58, axis: 'x', from: 860, to: 1320, speed: 118, color: '#991b1b', mark: 'X', aggro: 260, behavior: { en: 'Chaos: changes direction unpredictably.', mm: 'ရှုပ်ထွေးသူ: လမ်းကြောင်းကို မခန့်မှန်းနိုင်အောင်ပြောင်းသည်။' }, name: { en: 'Angry Share', mm: 'ဒေါသမျှဝေ' }, personality: { en: 'Uses emotion to break careful thinking.', mm: 'ဒေါသခံစားချက်ဖြင့် စဉ်းစားချိန်မပေးတတ်သည်။' } },
]

const walls = [
  { x: 130, y: 90, width: 36, height: 470 },
  { x: 130, y: 90, width: 270, height: 36 },
  { x: 270, y: 250, width: 36, height: 360 },
  { x: 270, y: 610, width: 330, height: 36 },
  { x: 450, y: 0, width: 36, height: 285 },
  { x: 450, y: 285, width: 300, height: 36 },
  { x: 625, y: 430, width: 36, height: 265 },
  { x: 625, y: 695, width: 245, height: 36 },
  { x: 750, y: 115, width: 36, height: 350 },
  { x: 750, y: 520, width: 265, height: 36 },
  { x: 940, y: 70, width: 36, height: 230 },
  { x: 1040, y: 285, width: 36, height: 235 },
  { x: 880, y: 645, width: 330, height: 36 },
  { x: 1218, y: 115, width: 36, height: 290 },
  { x: 1218, y: 115, width: 175, height: 36 },
  { x: 1348, y: 315, width: 36, height: 285 },
  { x: 140, y: 735, width: 320, height: 36 },
  { x: 0, y: 352, width: 150, height: 36 },
  { x: 455, y: 430, width: 170, height: 36 },
]

const gateSpots = [
  { x: 1418, y: 88, radius: 42 },
  { x: 1390, y: 810, radius: 42 },
  { x: 1030, y: 86, radius: 42 },
  { x: 1160, y: 574, radius: 42 },
]
const easterEgg = { id: 'golden-owl', x: 1160, y: 832, radius: 20 }
const powerUps = [
  { id: 'shield', x: 545, y: 112, radius: 20, kind: 'shield' },
  { id: 'slow', x: 842, y: 448, radius: 20, kind: 'slow' },
  { id: 'shield-2', x: 1320, y: 610, radius: 20, kind: 'shield' },
]
const traps = [
  { id: 'trap-1', x: 210, y: 386, radius: 24, kind: 'slow' },
  { id: 'trap-2', x: 560, y: 374, radius: 24, kind: 'slow' },
  { id: 'trap-3', x: 988, y: 254, radius: 24, kind: 'slow' },
  { id: 'trap-4', x: 762, y: 812, radius: 24, kind: 'slow' },
  { id: 'trap-5', x: 1326, y: 454, radius: 24, kind: 'slow' },
]
const collectedPowerUps = ref([])

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
})

onBeforeUnmount(() => {
  stopLoop()
  stopAmbience()
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
})

function startGame() {
  screen.value = 'game'
  nextTick(() => {
    resetGame()
    startLoop()
    ensureAudio()
    startAmbience()
  })
}

function resetGame() {
  player = { x: START_POINT.x, y: START_POINT.y, size: 52, face: 'right', moving: false, step: 0 }
  collected.value = []
  collectedPowerUps.value = []
  hearts.value = 4
  seconds.value = 0
  won.value = false
  lost.value = false
  shieldUntil.value = 0
  slowUntil.value = 0
  trapCooldown.value = 0
  invincibleUntil.value = 0
  gateSpawn.value = null
  randomWalls.value = generateRandomWalls()
  footstepTimer = 0
  started = performance.now()
  last = started
  enemies.forEach((enemy) => {
    enemy.startX ??= enemy.x
    enemy.startY ??= enemy.y
    enemy.x = enemy.startX
    enemy.y = enemy.startY
    enemy.direction = { x: enemy.axis === 'x' ? 1 : 0, y: enemy.axis === 'y' ? 1 : 0 }
    enemy.turnAt = 0
    enemy.cooldown = false
    enemy.homeX = enemy.x
    enemy.homeY = enemy.y
  })
  draw()
}

function startLoop() {
  stopLoop()
  frame = window.requestAnimationFrame(loop)
}

function stopLoop() {
  if (frame) window.cancelAnimationFrame(frame)
  frame = 0
  keys.clear()
}

function loop(now) {
  performanceNow.value = now
  const delta = Math.min(0.04, (now - last) / 1000)
  last = now
  if (!won.value && !lost.value) update(delta, now)
  draw()
  frame = window.requestAnimationFrame(loop)
}

function update(delta, now) {
  seconds.value = Math.floor((now - started) / 1000)
  updatePlayer(delta, now)
  updateEnemies(delta)
  collectClues()
  collectPowerUps()
  hitTraps(now)
  hitEnemies()
  finishMission()
}

function updatePlayer(delta, now) {
  const speed = performance.now() < trapCooldown.value ? 150 : 250
  let dx = 0
  let dy = 0
  if (keys.has('left')) dx -= 1
  if (keys.has('right')) dx += 1
  if (keys.has('up')) dy -= 1
  if (keys.has('down')) dy += 1
  dx += joystick.value.dx
  dy += joystick.value.dy
  player.moving = !!(dx || dy)
  if (!dx && !dy) return
  if (Math.abs(dx) > Math.abs(dy)) player.face = dx > 0 ? 'right' : 'left'
  player.step += delta * 10
  if (dx && dy) {
    dx *= 0.707
    dy *= 0.707
  }
  move(dx * speed * delta, 0)
  move(0, dy * speed * delta)
  if (player.moving && now > footstepTimer && !won.value && !lost.value) {
    footstepSound()
    footstepTimer = now + 230
  }
}

function move(dx, dy) {
  const next = {
    ...player,
    x: Math.max(player.size / 2, Math.min(BOARD_WIDTH - player.size / 2, player.x + dx)),
    y: Math.max(player.size / 2, Math.min(BOARD_HEIGHT - player.size / 2, player.y + dy)),
  }
  if (activeWalls.value.some((wall) => circleRect(next, wall, PLAYER_COLLISION_RADIUS))) return
  player = next
}

function updateEnemies(delta) {
  const slowFactor = performance.now() < slowUntil.value ? 0.48 : 1
  enemies.forEach((enemy) => {
    if (!enemy.direction || typeof enemy.direction === 'number') {
      enemy.direction = { x: enemy.axis === 'x' ? 1 : 0, y: enemy.axis === 'y' ? 1 : 0 }
    }
    const cx = enemy.x + enemy.width / 2
    const cy = enemy.y + enemy.height / 2
    const gap = distance(player.x, player.y, cx, cy)

    const chaseMode = shouldEnemyChase(enemy, gap) && !enemy.cooldown
    const shouldTurn = performance.now() > (enemy.turnAt || 0) || isEnemyBlocked(enemy, enemy.direction)
    if (shouldTurn) {
      enemy.direction = chooseEnemyDirection(enemy, chaseMode)
      enemy.turnAt = performance.now() + 520 + Math.random() * 520
    }

    const speed = enemy.speed * enemySpeedFactor(enemy, chaseMode) * slowFactor
    const moved = moveEnemy(enemy, enemy.direction.x * speed * delta, enemy.direction.y * speed * delta)
    if (!moved) {
      enemy.direction = chooseEnemyDirection(enemy, chaseMode, true)
      moveEnemy(enemy, enemy.direction.x * speed * delta, enemy.direction.y * speed * delta)
    }
  })
}

function moveEnemy(enemy, dx, dy) {
  if (tryMoveEnemy(enemy, dx, dy)) return true
  if (dx && tryMoveEnemy(enemy, dx, 0)) return true
  if (dy && tryMoveEnemy(enemy, 0, dy)) return true
  return false
}

function tryMoveEnemy(enemy, dx, dy) {
  const next = {
    ...enemy,
    x: Math.max(8, Math.min(BOARD_WIDTH - enemy.width - 8, enemy.x + dx)),
    y: Math.max(8, Math.min(BOARD_HEIGHT - enemy.height - 8, enemy.y + dy)),
  }
  const centerX = next.x + next.width / 2
  const centerY = next.y + next.height / 2
  if (distance(centerX, centerY, SAFE_ZONE.x, SAFE_ZONE.y) < SAFE_ZONE.radius + 30) return false
  if (activeWalls.value.some((wall) => rectsOverlap(next, wall))) return false
  enemy.x = next.x
  enemy.y = next.y
  return true
}

function chooseEnemyDirection(enemy, chaseMode, forceTurn = false) {
  const cx = enemy.x + enemy.width / 2
  const cy = enemy.y + enemy.height / 2
  const reverse = { x: -(enemy.direction?.x || 0), y: -(enemy.direction?.y || 0) }
  let options = ENEMY_DIRECTIONS.filter((direction) => {
    if (!forceTurn && direction.x === reverse.x && direction.y === reverse.y) return false
    return !isEnemyBlocked(enemy, direction)
  })
  if (options.length === 0) {
    options = ENEMY_DIRECTIONS.filter((direction) => !isEnemyBlocked(enemy, direction))
  }
  if (options.length === 0) return reverse.x || reverse.y ? reverse : { x: 1, y: 0 }

  const target = getEnemyTarget(enemy, chaseMode)

  const ranked = options
    .map((direction) => ({
      direction,
      score: distance(cx + direction.x * 90, cy + direction.y * 90, target.x, target.y) + Math.random() * (chaseMode ? 22 : 90),
    }))
    .sort((a, b) => a.score - b.score)

  if (!chaseMode && ranked.length > 1 && Math.random() < 0.28) return ranked[1].direction
  return ranked[0].direction
}

function shouldEnemyChase(enemy, gap) {
  if (enemy.role === 'chaser') return gap < enemy.aggro + collected.value.length * 22
  if (enemy.role === 'ambusher') return gap < enemy.aggro + collected.value.length * 14
  if (enemy.role === 'guard') return gap < enemy.aggro || collected.value.length >= 3
  if (enemy.role === 'chaos') return Math.sin(seconds.value * 1.7 + enemy.x) > -0.1 || gap < enemy.aggro
  return gap < enemy.aggro
}

function enemySpeedFactor(enemy, chaseMode) {
  if (enemy.role === 'chaser') return chaseMode ? 1.16 : 0.9
  if (enemy.role === 'ambusher') return chaseMode ? 1.02 : 0.86
  if (enemy.role === 'guard') return chaseMode ? 0.94 : 0.74
  if (enemy.role === 'chaos') return 0.8 + Math.abs(Math.sin(seconds.value * 2.2 + enemy.x)) * 0.5
  return chaseMode ? 1.08 : 0.92
}

function getEnemyTarget(enemy, chaseMode) {
  if (enemy.role === 'ambusher' && chaseMode) {
    const lead = player.face === 'right'
      ? { x: 190, y: 0 }
      : player.face === 'left'
        ? { x: -190, y: 0 }
        : { x: 0, y: 0 }
    return { x: player.x + lead.x, y: player.y + lead.y }
  }
  if (enemy.role === 'guard') {
    const remaining = clues.find((clue) => !collected.value.includes(clue.id)) || gateSpawn.value || clues[0]
    return chaseMode && distance(player.x, player.y, remaining.x, remaining.y) < 260
      ? { x: player.x, y: player.y }
      : { x: remaining.x, y: remaining.y }
  }
  if (enemy.role === 'chaos') {
    return {
      x: 180 + ((seconds.value * 173 + enemy.x * 3) % (BOARD_WIDTH - 360)),
      y: 120 + ((seconds.value * 127 + enemy.y * 2) % (BOARD_HEIGHT - 240)),
    }
  }
  if (chaseMode) return { x: player.x, y: player.y }
  return {
    x: enemy.homeX + enemy.width / 2 + Math.sin(seconds.value + enemy.from) * 180,
    y: enemy.homeY + enemy.height / 2 + Math.cos(seconds.value + enemy.to) * 140,
  }
}

function isEnemyBlocked(enemy, direction) {
  return !canEnemyMove(enemy, direction.x * 30, direction.y * 30)
}

function canEnemyMove(enemy, dx, dy) {
  const next = {
    ...enemy,
    x: Math.max(8, Math.min(BOARD_WIDTH - enemy.width - 8, enemy.x + dx)),
    y: Math.max(8, Math.min(BOARD_HEIGHT - enemy.height - 8, enemy.y + dy)),
  }
  const centerX = next.x + next.width / 2
  const centerY = next.y + next.height / 2
  if (distance(centerX, centerY, SAFE_ZONE.x, SAFE_ZONE.y) < SAFE_ZONE.radius + 30) return false
  return !activeWalls.value.some((wall) => rectsOverlap(next, wall))
}

function collectClues() {
  clues.forEach((clue) => {
    if (collected.value.includes(clue.id)) return
    if (distance(player.x, player.y, clue.x, clue.y) < player.size / 2 + clue.radius) {
      collected.value = [...collected.value, clue.id]
      clueSound()
      if (collected.value.length === clues.length && !gateSpawn.value) spawnTruthGate()
    }
  })

  if (!userStore.learningProfile.unlockedSkins?.[easterEgg.id] && distance(player.x, player.y, easterEgg.x, easterEgg.y) < player.size / 2 + easterEgg.radius) {
    const unlocked = userStore.unlockSkin(easterEgg.id)
    if (unlocked) {
      skinSound()
    }
  }
}

function collectPowerUps() {
  powerUps.forEach((power) => {
    if (collectedPowerUps.value.includes(power.id)) return
    if (distance(player.x, player.y, power.x, power.y) > player.size / 2 + power.radius) return
    collectedPowerUps.value = [...collectedPowerUps.value, power.id]
    if (power.kind === 'shield') {
      shieldUntil.value = performance.now() + 6500
      shieldSound()
    }
    if (power.kind === 'slow') {
      slowUntil.value = performance.now() + 6500
      slowPowerSound()
    }
  })
}

function hitTraps(now) {
  traps.forEach((trap) => {
    if (distance(player.x, player.y, trap.x, trap.y) > player.size / 2 + trap.radius) return
    if (trap.activeUntil && trap.activeUntil > now) return
    trap.activeUntil = now + 1500
    if (trap.kind === 'slow') {
      trapCooldown.value = now + 3800
      trapSlowSound()
      return
    }
  })
}

function hitEnemies() {
  const enemy = enemies.find((item) => circleRect(player, item, PLAYER_COLLISION_RADIUS + 4))
  if (!enemy || enemy.cooldown) return
  if (invincibleUntil.value > performance.now()) return
  if (isInSafeZone(player.x, player.y)) return
  enemy.cooldown = true
  if (shieldUntil.value > performance.now()) {
    shieldUntil.value = 0
    shieldBreakSound()
    window.setTimeout(() => {
      enemy.cooldown = false
    }, 900)
    return
  }
  hearts.value -= 1
  hitSound()
  handleDamage()
  window.setTimeout(() => {
    enemy.cooldown = false
  }, 900)
}

function handleDamage() {
  if (hearts.value <= 0) {
    gameOver()
    return
  }
  respawnAtHitSpot()
}

function respawnAtHitSpot() {
  player = { ...player, moving: false }
  invincibleUntil.value = performance.now() + 3000
  keys.clear()
  joystick.value = { active: false, x: 0, y: 0, dx: 0, dy: 0 }
}

function sendPlayerToStart() {
  player = { ...player, x: START_POINT.x, y: START_POINT.y, moving: false, face: 'right' }
  trapCooldown.value = performance.now() + 1200
  invincibleUntil.value = performance.now() + 1800
  keys.clear()
  joystick.value = { active: false, x: 0, y: 0, dx: 0, dy: 0 }
}

function gameOver() {
  lost.value = true
  keys.clear()
  joystick.value = { active: false, x: 0, y: 0, dx: 0, dy: 0 }
  gameOverSound()
}

function finishMission() {
  if (!gateSpawn.value) return
  if (distance(player.x, player.y, gateSpawn.value.x, gateSpawn.value.y) > player.size / 2 + gateSpawn.value.radius) return
  if (collected.value.length < clues.length) {
    beep(220, 0.12, 'triangle')
    sendPlayerToStart()
    return
  }
  won.value = true
  winSound()
  userStore.addLearningPoints('misinformation-maze:game', 40)
}

function spawnTruthGate() {
  const openSpots = gateSpots.filter((spot) => isReachablePoint(spot.x, spot.y, spot.radius))
  const choices = openSpots.length ? openSpots : gateSpots
  const spot = choices[Math.floor(Math.random() * choices.length)]
  gateSpawn.value = { ...spot }
  gateSound()
}

function generateRandomWalls() {
  return []
}

function isReachablePoint(targetX, targetY, targetRadius = 0) {
  const step = 32
  const start = snapPoint(START_POINT.x, START_POINT.y, step)
  const target = snapPoint(targetX, targetY, step)
  const queue = [start]
  const seen = new Set([`${start.x},${start.y}`])
  const directions = [
    { x: step, y: 0 },
    { x: -step, y: 0 },
    { x: 0, y: step },
    { x: 0, y: -step },
  ]

  while (queue.length) {
    const point = queue.shift()
    if (distance(point.x, point.y, target.x, target.y) <= step + targetRadius) return true

    directions.forEach((direction) => {
      const next = {
        x: point.x + direction.x,
        y: point.y + direction.y,
      }
      const key = `${next.x},${next.y}`
      if (seen.has(key) || !isWalkablePoint(next.x, next.y)) return
      seen.add(key)
      queue.push(next)
    })
  }

  return false
}

function snapPoint(x, y, step) {
  return {
    x: Math.round(x / step) * step,
    y: Math.round(y / step) * step,
  }
}

function isWalkablePoint(x, y) {
  if (x < PLAYER_COLLISION_RADIUS || x > BOARD_WIDTH - PLAYER_COLLISION_RADIUS) return false
  if (y < PLAYER_COLLISION_RADIUS || y > BOARD_HEIGHT - PLAYER_COLLISION_RADIUS) return false
  return !activeWalls.value.some((wall) => circleRect({ x, y }, wall, PLAYER_COLLISION_RADIUS))
}

function isInSafeZone(x, y) {
  return distance(x, y, SAFE_ZONE.x, SAFE_ZONE.y) < SAFE_ZONE.radius
}

function draw() {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!ctx) return
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)
  const camera = getCamera()
  ctx.save()
  ctx.setTransform(camera.scale, 0, 0, camera.scale, camera.x, camera.y)
  drawMap(ctx)

  drawSafeZone(ctx)
  activeWalls.value.forEach((wall) => drawRound(ctx, wall, '#bfd9cb'))
  traps.forEach((trap) => drawTrap(ctx, trap))
  powerUps.forEach((power) => {
    if (!collectedPowerUps.value.includes(power.id)) drawPowerUp(ctx, power)
  })
  clues.forEach((clue) => {
    const done = collected.value.includes(clue.id)
    drawClue(ctx, clue, done)
  })
  drawEasterEgg(ctx)
  enemies.forEach((enemy) => {
    drawEnemy(ctx, enemy)
  })
  if (gateSpawn.value) drawTruthGate(ctx, gateSpawn.value)
  drawPlayer(ctx)
  if (won.value || lost.value) drawOverlay(ctx)
  ctx.restore()
}

function getCamera() {
  const canvas = canvasRef.value
  const isCompact = (canvas?.clientWidth || 0) < 640
  if (!isCompact) return { scale: 1, x: 0, y: 0 }

  const scale = 1.44
  const viewWidth = BOARD_WIDTH / scale
  const viewHeight = BOARD_HEIGHT / scale
  const left = clamp(player.x - viewWidth * 0.5, 0, BOARD_WIDTH - viewWidth)
  const top = clamp(player.y - viewHeight * 0.52, 0, BOARD_HEIGHT - viewHeight)
  return { scale, x: -left * scale, y: -top * scale }
}

function drawMap(ctx) {
  const gradient = ctx.createLinearGradient(0, 0, BOARD_WIDTH, BOARD_HEIGHT)
  gradient.addColorStop(0, '#cfe8dc')
  gradient.addColorStop(0.48, '#f9fbf6')
  gradient.addColorStop(1, '#ffe9bf')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)

  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  for (let i = 0; i < 26; i += 1) {
    const x = (i * 107) % BOARD_WIDTH
    const y = (i * 67) % BOARD_HEIGHT
    drawCircle(ctx, x, y, 18 + (i % 3) * 7, 'rgba(255,255,255,0.34)')
  }

  ctx.strokeStyle = 'rgba(5, 47, 41, 0.12)'
  ctx.lineWidth = 2
  for (let x = -80; x < BOARD_WIDTH + 120; x += 76) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x - 110, BOARD_HEIGHT)
    ctx.stroke()
  }

  ctx.strokeStyle = 'rgba(240, 163, 38, 0.28)'
  ctx.lineWidth = 5
  ctx.setLineDash([10, 16])
  ctx.beginPath()
  ctx.moveTo(START_POINT.x, START_POINT.y)
  ctx.bezierCurveTo(170, 734, 178, 420, 254, 128)
  ctx.bezierCurveTo(420, 52, 712, 86, 1018, 124)
  ctx.bezierCurveTo(812, 260, 680, 478, 808, 628)
  ctx.bezierCurveTo(1040, 520, 1298, 420, 1300, 474)
  ctx.bezierCurveTo(1400, 352, 1434, 194, 1418, 88)
  ctx.stroke()
  ctx.setLineDash([])
}

function drawSafeZone(ctx) {
  const pulse = 1 + Math.sin(seconds.value * 3) * 0.025
  ctx.save()
  ctx.translate(SAFE_ZONE.x, SAFE_ZONE.y)
  ctx.scale(pulse, pulse)
  ctx.fillStyle = 'rgba(233, 247, 239, 0.86)'
  ctx.strokeStyle = 'rgba(10, 90, 75, 0.42)'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(0, 0, SAFE_ZONE.radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = '#0a5a4b'
  ctx.font = 'bold 12px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('SAFE', 0, -SAFE_ZONE.radius + 22)
  ctx.restore()
}

function drawTruthGate(ctx, gate) {
  const glow = 1 + Math.sin(seconds.value * 4.5) * 0.05
  ctx.save()
  ctx.translate(gate.x, gate.y)
  ctx.scale(glow, glow)
  ctx.shadowColor = 'rgba(10, 90, 75, 0.45)'
  ctx.shadowBlur = 22
  ctx.fillStyle = '#0a5a4b'
  ctx.beginPath()
  ctx.moveTo(-30, 28)
  ctx.lineTo(-30, -8)
  ctx.quadraticCurveTo(-30, -38, 0, -38)
  ctx.quadraticCurveTo(30, -38, 30, -8)
  ctx.lineTo(30, 28)
  ctx.closePath()
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.strokeStyle = '#fff8e8'
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(-16, 5)
  ctx.lineTo(-3, 18)
  ctx.lineTo(18, -12)
  ctx.stroke()
  ctx.fillStyle = '#fff8e8'
  ctx.font = 'bold 10px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('TRUTH', 0, 43)
  ctx.restore()
}

function drawClue(ctx, clue, done) {
  const float = Math.sin(seconds.value * 4 + clue.x) * 4
  const y = clue.y + float
  ctx.save()
  ctx.globalAlpha = done ? 0.45 : 1
  ctx.shadowColor = done ? 'transparent' : 'rgba(10, 90, 75, 0.28)'
  ctx.shadowBlur = done ? 0 : 14

  if (clue.kind === 'scroll') {
    drawRound(ctx, { x: clue.x - 22, y: y - 17, width: 44, height: 34 }, '#fff8e8')
    ctx.strokeStyle = '#0a5a4b'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.fillStyle = '#0a5a4b'
    ctx.fillRect(clue.x - 11, y - 5, 22, 3)
    ctx.fillRect(clue.x - 11, y + 4, 16, 3)
  } else if (clue.kind === 'calendar') {
    drawRound(ctx, { x: clue.x - 22, y: y - 20, width: 44, height: 40 }, '#ffffff')
    ctx.fillStyle = '#0a5a4b'
    ctx.fillRect(clue.x - 22, y - 20, 44, 11)
    ctx.fillStyle = '#f0a326'
    ctx.font = 'bold 14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('12', clue.x, y + 8)
  } else if (clue.kind === 'link') {
    ctx.strokeStyle = '#0a5a4b'
    ctx.lineWidth = 6
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.arc(clue.x - 8, y, 11, -0.8, 2.35)
    ctx.arc(clue.x + 8, y, 11, 2.35, -0.8)
    ctx.stroke()
  } else {
    drawCircle(ctx, clue.x, y, 22, '#0a5a4b')
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.moveTo(clue.x, y - 13)
    ctx.lineTo(clue.x + 12, y + 8)
    ctx.lineTo(clue.x - 12, y + 8)
    ctx.closePath()
    ctx.fill()
  }

  ctx.shadowBlur = 0
  ctx.fillStyle = done ? '#7f9289' : '#073f35'
  ctx.font = 'bold 10px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(clue.label, clue.x, y + 31)
  ctx.restore()
}

function drawPowerUp(ctx, power) {
  const pulse = 1 + Math.sin(seconds.value * 5 + power.x) * 0.08
  ctx.save()
  ctx.translate(power.x, power.y)
  ctx.scale(pulse, pulse)
  ctx.shadowColor = power.kind === 'shield' ? 'rgba(10, 90, 75, 0.35)' : 'rgba(47, 96, 122, 0.35)'
  ctx.shadowBlur = 18
  drawCircle(ctx, 0, 0, power.radius, power.kind === 'shield' ? '#0a5a4b' : '#2f607a')
  ctx.shadowBlur = 0
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 4
  ctx.beginPath()
  if (power.kind === 'shield') {
    ctx.moveTo(0, -12)
    ctx.lineTo(11, -6)
    ctx.lineTo(8, 10)
    ctx.lineTo(0, 15)
    ctx.lineTo(-8, 10)
    ctx.lineTo(-11, -6)
    ctx.closePath()
  } else {
    ctx.arc(0, 0, 10, 0.2, Math.PI * 1.55)
    ctx.moveTo(8, -9)
    ctx.lineTo(14, -13)
    ctx.lineTo(12, -5)
  }
  ctx.stroke()
  ctx.fillStyle = '#073f35'
  ctx.font = 'bold 10px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(power.kind.toUpperCase(), 0, 34)
  ctx.restore()
}

function drawTrap(ctx, trap) {
  const hot = trap.activeUntil && trap.activeUntil > performance.now()
  ctx.save()
  ctx.globalAlpha = hot ? 0.95 : 0.72
  ctx.translate(trap.x, trap.y)
  ctx.fillStyle = '#bf6b3d'
  ctx.beginPath()
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8
    const radius = i % 2 === 0 ? trap.radius : trap.radius * 0.55
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = '#fff8e8'
  ctx.font = 'bold 15px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('S', 0, 1)
  ctx.restore()
}

function drawPlayer(ctx) {
  const direction = player.face === 'left' ? -1 : 1
  const bob = player.moving ? Math.sin(player.step) * 2.6 : 0
  const wingSwing = player.moving ? Math.sin(player.step) * 0.18 : 0
  const skin = userStore.learningProfile.selectedSkin
  const skinPalette = {
    'golden-owl': ['#f7c948', '#d99a24', '#8a5a18'],
    'shadow-owl': ['#64748b', '#334155', '#0f172a'],
    'sky-owl': ['#7dd3fc', '#2f607a', '#164e63'],
  }[skin] || ['#2fb783', '#128061', '#0a5a4b']
  const [owlTop, owlMid, owlBase] = skinPalette
  const goldenSkin = skin === 'golden-owl'

  ctx.save()
  if (invincibleUntil.value > performanceNow.value && Math.floor(performanceNow.value / 180) % 2 === 0) {
    ctx.globalAlpha = 0.46
  }
  ctx.translate(player.x, player.y + bob)
  ctx.scale(direction, 1)

  if (trapCooldown.value > performanceNow.value) drawSlowAura(ctx)
  if (shieldUntil.value > performanceNow.value) drawShieldAura(ctx)

  ctx.shadowColor = 'rgba(5, 47, 41, 0.22)'
  ctx.shadowBlur = 12

  // Logo-like owl body
  const bodyGradient = ctx.createLinearGradient(0, -24, 0, 32)
  bodyGradient.addColorStop(0, owlTop)
  bodyGradient.addColorStop(0.55, owlMid)
  bodyGradient.addColorStop(1, owlBase)
  ctx.fillStyle = bodyGradient
  ctx.beginPath()
  ctx.ellipse(0, 6, 24, 29, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.shadowBlur = 0

  // Wing and detective arm
  ctx.save()
  ctx.rotate(-0.28 + wingSwing)
  ctx.fillStyle = skin === 'shadow-owl' ? '#1e293b' : goldenSkin ? '#b7791f' : skin === 'sky-owl' ? '#2f607a' : '#0b6f58'
  ctx.beginPath()
  ctx.ellipse(-17, 8, 8, 17, -0.45, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  ctx.save()
  ctx.rotate(0.36 - wingSwing)
  ctx.strokeStyle = '#073f35'
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(15, 8)
  ctx.lineTo(29, 20)
  ctx.stroke()
  ctx.strokeStyle = '#26312d'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(29, 20)
  ctx.lineTo(39, 30)
  ctx.stroke()
  ctx.strokeStyle = '#8fbfaf'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(26, 17, 9, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()

  // Face patch
  ctx.fillStyle = '#f6e7bd'
  ctx.beginPath()
  ctx.ellipse(0, 8, 16, 19, 0, 0, Math.PI * 2)
  ctx.fill()

  // Head tufts
  ctx.fillStyle = owlMid
  ctx.beginPath()
  ctx.moveTo(-18, -10)
  ctx.lineTo(-27, -24)
  ctx.lineTo(-8, -18)
  ctx.closePath()
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(18, -10)
  ctx.lineTo(27, -24)
  ctx.lineTo(8, -18)
  ctx.closePath()
  ctx.fill()

  // Hat
  ctx.fillStyle = '#2e5b4e'
  ctx.beginPath()
  ctx.ellipse(0, -19, 22, 5, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#173f37'
  roundRectPath(ctx, -12, -34, 24, 16, 6)
  ctx.fill()
  ctx.strokeStyle = '#f0a326'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(-11, -24)
  ctx.lineTo(11, -24)
  ctx.stroke()

  // Eyes and beak
  ctx.fillStyle = '#052f29'
  ctx.beginPath()
  ctx.arc(-6, 0, 3.3, 0, Math.PI * 2)
  ctx.arc(6, 0, 3.3, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(-7, -1, 1, 0, Math.PI * 2)
  ctx.arc(5, -1, 1, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#f0a326'
  ctx.beginPath()
  ctx.moveTo(0, 4)
  ctx.lineTo(-5, 10)
  ctx.lineTo(5, 10)
  ctx.closePath()
  ctx.fill()

  // Chest feathers
  ctx.strokeStyle = 'rgba(122,95,47,0.5)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(-6, 16, 5, 0, Math.PI)
  ctx.arc(6, 16, 5, 0, Math.PI)
  ctx.stroke()

  // Feet
  ctx.strokeStyle = '#f0a326'
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(-8, 30)
  ctx.lineTo(-14, 34)
  ctx.moveTo(8, 30)
  ctx.lineTo(14, 34)
  ctx.stroke()

  ctx.restore()
}

function drawEasterEgg(ctx) {
  if (userStore.learningProfile.unlockedSkins?.[easterEgg.id]) return
  const glow = 1 + Math.sin(seconds.value * 5) * 0.08
  ctx.save()
  ctx.translate(easterEgg.x, easterEgg.y)
  ctx.scale(glow, glow)
  ctx.shadowColor = 'rgba(240, 163, 38, 0.55)'
  ctx.shadowBlur = 18
  const eggGradient = ctx.createLinearGradient(0, -20, 0, 20)
  eggGradient.addColorStop(0, '#fff7c2')
  eggGradient.addColorStop(0.55, '#f0a326')
  eggGradient.addColorStop(1, '#b7791f')
  ctx.fillStyle = eggGradient
  ctx.beginPath()
  ctx.ellipse(0, 2, 16, 22, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.strokeStyle = '#fff8d6'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(-8, -1)
  ctx.lineTo(-2, 5)
  ctx.lineTo(4, -1)
  ctx.lineTo(10, 5)
  ctx.stroke()
  ctx.fillStyle = '#7a5f2f'
  ctx.font = 'bold 10px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('SKIN', 0, 34)
  ctx.restore()
}

function drawShieldAura(ctx) {
  const pulse = 1 + Math.sin(performanceNow.value / 110) * 0.06
  ctx.save()
  ctx.scale(pulse, pulse)
  ctx.strokeStyle = 'rgba(14, 165, 233, 0.78)'
  ctx.lineWidth = 5
  ctx.shadowColor = 'rgba(14, 165, 233, 0.42)'
  ctx.shadowBlur = 18
  ctx.beginPath()
  ctx.arc(0, 2, 38, 0, Math.PI * 2)
  ctx.stroke()
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.84)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(0, 2, 45, -0.6, Math.PI * 0.8)
  ctx.stroke()
  ctx.restore()
}

function drawSlowAura(ctx) {
  ctx.save()
  ctx.globalAlpha = 0.84
  ctx.strokeStyle = 'rgba(47, 96, 122, 0.72)'
  ctx.lineWidth = 4
  ctx.setLineDash([7, 8])
  ctx.beginPath()
  ctx.arc(0, 4, 42 + Math.sin(performanceNow.value / 140) * 3, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.fillStyle = 'rgba(47, 96, 122, 0.18)'
  ctx.beginPath()
  ctx.ellipse(0, 28, 34, 9, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#2f607a'
  ctx.font = 'bold 10px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('SLOW', 0, -44)
  ctx.restore()
}

function drawEnemy(ctx, enemy) {
  const cx = enemy.x + enemy.width / 2
  const cy = enemy.y + enemy.height / 2
  const pulse = enemy.cooldown ? 0.85 : 1 + Math.sin(seconds.value * (enemy.role === 'chaos' ? 7 : 4) + enemy.x) * 0.04

  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(pulse, pulse)
  ctx.shadowColor = 'rgba(80, 0, 0, 0.28)'
  ctx.shadowBlur = 16
  ctx.fillStyle = enemy.cooldown ? '#f3c6a8' : enemy.color
  ctx.beginPath()
  if (enemy.role === 'guard') {
    ctx.moveTo(0, -34)
    ctx.lineTo(28, -16)
    ctx.lineTo(22, 20)
    ctx.lineTo(0, 32)
    ctx.lineTo(-22, 20)
    ctx.lineTo(-28, -16)
  } else if (enemy.role === 'ambusher') {
    ctx.moveTo(-26, -6)
    ctx.quadraticCurveTo(-18, -32, 0, -24)
    ctx.quadraticCurveTo(18, -32, 26, -6)
    ctx.lineTo(16, 26)
    ctx.lineTo(0, 14)
    ctx.lineTo(-16, 26)
  } else {
    ctx.moveTo(-24, -10)
    ctx.quadraticCurveTo(-22, -28, -5, -24)
    ctx.lineTo(0, -35)
    ctx.lineTo(6, -24)
    ctx.quadraticCurveTo(24, -28, 26, -8)
    ctx.quadraticCurveTo(31, 20, 10, 25)
    ctx.lineTo(0, 16)
    ctx.lineTo(-10, 25)
    ctx.quadraticCurveTo(-31, 20, -24, -10)
  }
  ctx.closePath()
  ctx.fill()
  ctx.shadowBlur = 0

  ctx.fillStyle = '#fff7ed'
  ctx.beginPath()
  ctx.arc(-8, enemy.role === 'guard' ? -5 : -7, enemy.role === 'chaser' ? 6 : 5, 0, Math.PI * 2)
  ctx.arc(8, enemy.role === 'guard' ? -5 : -7, enemy.role === 'chaser' ? 6 : 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = enemy.role === 'chaser' ? '#111827' : '#3a2420'
  ctx.beginPath()
  ctx.arc(-8, enemy.role === 'guard' ? -5 : -7, enemy.role === 'ambusher' ? 1.7 : 2.2, 0, Math.PI * 2)
  ctx.arc(8, enemy.role === 'guard' ? -5 : -7, enemy.role === 'ambusher' ? 1.7 : 2.2, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = '#fff7ed'
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.beginPath()
  if (enemy.role === 'chaser') {
    ctx.moveTo(-10, 10)
    ctx.lineTo(10, 10)
    ctx.moveTo(-18, -18)
    ctx.lineTo(-5, -13)
    ctx.moveTo(18, -18)
    ctx.lineTo(5, -13)
  } else if (enemy.role === 'ambusher') {
    ctx.arc(0, 11, 7, Math.PI, 0)
    ctx.moveTo(-18, -28)
    ctx.lineTo(-28, -34)
    ctx.moveTo(18, -28)
    ctx.lineTo(28, -34)
  } else if (enemy.role === 'guard') {
    ctx.moveTo(-12, 12)
    ctx.lineTo(0, 20)
    ctx.lineTo(14, 4)
  } else {
    ctx.moveTo(-11, 13)
    ctx.lineTo(11, 8)
    ctx.moveTo(-18, -25)
    ctx.lineTo(18, 25)
  }
  ctx.stroke()

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 14px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(enemy.mark, 0, -27)
  ctx.font = 'bold 8px Arial'
  ctx.fillText(enemy.role.toUpperCase().slice(0, 5), 0, 36)
  ctx.restore()
}

function startJoystick(event) {
  joystick.value.active = true
  event.currentTarget.setPointerCapture?.(event.pointerId)
  updateJoystick(event)
  ensureAudio()
}

function moveJoystick(event) {
  if (!joystick.value.active) return
  updateJoystick(event)
}

function endJoystick() {
  joystick.value = { active: false, x: 0, y: 0, dx: 0, dy: 0 }
}

function updateJoystick(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const rawX = event.clientX - centerX
  const rawY = event.clientY - centerY
  const max = rect.width * 0.34
  const length = Math.hypot(rawX, rawY)
  const scale = length > max ? max / length : 1
  const x = rawX * scale
  const y = rawY * scale
  const deadZone = max * 0.14
  const strength = length < deadZone ? 0 : Math.min(1, (length - deadZone) / (max - deadZone))
  const unitX = length ? rawX / length : 0
  const unitY = length ? rawY / length : 0
  joystick.value = {
    active: true,
    x,
    y,
    dx: unitX * strength,
    dy: unitY * strength,
  }
}

function drawOverlay(ctx) {
  ctx.fillStyle = won.value ? 'rgba(255,255,255,0.76)' : 'rgba(255,255,255,0.34)'
  ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)
  if (lost.value) return
  drawText(ctx, won.value ? copy.value.win : copy.value.lose, BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 16, 40, '#052f29')
  drawText(ctx, won.value ? '+40 EXP' : copy.value.restart, BOARD_WIDTH / 2, BOARD_HEIGHT / 2 + 28, 20, '#0a5a4b')
}

function drawCircle(ctx, x, y, radius, color) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

function drawRound(ctx, rect, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  roundRectPath(ctx, rect.x, rect.y, rect.width, rect.height, 12)
  ctx.fill()
}

function roundRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + width, y, x + width, y + height, r)
  ctx.arcTo(x + width, y + height, x, y + height, r)
  ctx.arcTo(x, y + height, x, y, r)
  ctx.arcTo(x, y, x + width, y, r)
  ctx.closePath()
}

function drawText(ctx, text, x, y, size, color) {
  ctx.fillStyle = color
  ctx.font = `bold ${size}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x, y)
}

function press(direction) {
  ensureAudio()
  keys.add(direction)
}

function release(direction) {
  keys.delete(direction)
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function onKeyDown(event) {
  const direction = keyDirection(event.key)
  if (!direction || screen.value !== 'game') return
  event.preventDefault()
  ensureAudio()
  keys.add(direction)
}

function onKeyUp(event) {
  const direction = keyDirection(event.key)
  if (direction) keys.delete(direction)
}

function keyDirection(key) {
  return { ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down', ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' }[key]
}

function focusGame() {
  ensureAudio()
  startAmbience()
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value
  if (soundEnabled.value) {
    ensureAudio()
    startAmbience()
    uiSound()
  } else {
    stopAmbience()
  }
}

function ensureAudio() {
  if (!soundEnabled.value) return null
  if (!audio) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext
    if (!AudioCtor) return null
    audio = new AudioCtor()
  }
  if (audio.state === 'suspended') audio.resume().catch?.(() => {})
  return audio
}

function startAmbience() {
  const ctx = ensureAudio()
  if (!ctx || ambience) return

  const master = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  const low = ctx.createOscillator()
  const high = ctx.createOscillator()
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()

  master.gain.value = 0.018
  filter.type = 'lowpass'
  filter.frequency.value = 620
  filter.Q.value = 0.8

  low.type = 'sine'
  low.frequency.value = 92
  high.type = 'triangle'
  high.frequency.value = 184
  high.detune.value = 6
  lfo.type = 'sine'
  lfo.frequency.value = 0.08
  lfoGain.gain.value = 180

  lfo.connect(lfoGain)
  lfoGain.connect(filter.frequency)
  low.connect(filter)
  high.connect(filter)
  filter.connect(master)
  master.connect(ctx.destination)
  low.start()
  high.start()
  lfo.start()
  ambience = { master, low, high, lfo }
}

function stopAmbience() {
  if (!ambience) return
  const ctx = audio
  if (!ctx) {
    ambience = null
    return
  }
  const stopAt = ctx.currentTime + 0.08
  ambience.master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.025)
  ;[ambience.low, ambience.high, ambience.lfo].forEach((osc) => {
    try {
      osc.stop(stopAt)
    } catch {
      // Oscillator may already be stopped during hot reload.
    }
  })
  ambience = null
}

function beep(frequency, duration, type = 'sine', volume = 0.12, delay = 0) {
  playTone(frequency, duration, type, volume, delay)
}

function playTone(frequency, duration, type = 'sine', volume = 0.12, delay = 0, filterFrequency = 1200) {
  const ctx = ensureAudio()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  const start = ctx.currentTime + delay
  const stop = start + duration

  osc.type = type
  osc.frequency.setValueAtTime(frequency, start)
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(filterFrequency, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, stop)
  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  osc.start(start)
  osc.stop(stop + 0.03)
}

function playNoise(duration = 0.12, volume = 0.08, delay = 0, filterFrequency = 900) {
  const ctx = ensureAudio()
  if (!ctx) return
  const sampleCount = Math.max(1, Math.floor(ctx.sampleRate * duration))
  const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let index = 0; index < sampleCount; index += 1) {
    data[index] = (Math.random() * 2 - 1) * (1 - index / sampleCount)
  }

  const source = ctx.createBufferSource()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()
  const start = ctx.currentTime + delay
  source.buffer = buffer
  filter.type = 'bandpass'
  filter.frequency.value = filterFrequency
  filter.Q.value = 1.8
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start(start)
}

function chord(notes, duration, type = 'sine', volume = 0.07) {
  notes.forEach((note, index) => {
    playTone(note, duration + index * 0.02, type, volume, index * 0.035, 1800)
  })
}

function uiSound() {
  chord([520, 660], 0.12, 'triangle', 0.055)
}

function footstepSound() {
  playNoise(0.045, 0.014, 0, 260)
  playTone(95 + Math.random() * 25, 0.045, 'sine', 0.018, 0, 240)
}

function clueSound() {
  chord([760, 960, 1220], 0.16, 'sine', 0.06)
  playNoise(0.06, 0.012, 0.03, 1600)
}

function shieldSound() {
  chord([392, 523, 784], 0.22, 'triangle', 0.065)
  playTone(220, 0.28, 'sine', 0.04, 0, 620)
}

function slowPowerSound() {
  playTone(440, 0.22, 'sine', 0.055, 0, 900)
  playTone(330, 0.28, 'sine', 0.045, 0.08, 720)
}

function trapSlowSound() {
  playNoise(0.18, 0.055, 0, 360)
  playTone(230, 0.16, 'sawtooth', 0.05, 0, 480)
  playTone(160, 0.24, 'triangle', 0.04, 0.08, 420)
}

function shieldBreakSound() {
  playNoise(0.12, 0.065, 0, 1400)
  playTone(520, 0.07, 'square', 0.05, 0, 1000)
  playTone(280, 0.14, 'square', 0.045, 0.07, 800)
}

function hitSound() {
  playNoise(0.2, 0.075, 0, 260)
  playTone(140, 0.22, 'sawtooth', 0.055, 0, 360)
}

function gateSound() {
  chord([420, 560, 840], 0.3, 'triangle', 0.055)
  playTone(1260, 0.34, 'sine', 0.035, 0.12, 2200)
}

function skinSound() {
  chord([620, 820, 1240], 0.24, 'triangle', 0.06)
  playNoise(0.08, 0.02, 0.07, 2000)
}

function gameOverSound() {
  stopAmbience()
  playTone(190, 0.22, 'sawtooth', 0.055, 0, 520)
  playTone(130, 0.34, 'sawtooth', 0.05, 0.14, 420)
  playNoise(0.34, 0.045, 0.04, 220)
}

function winSound() {
  chord([523, 659, 784], 0.22, 'sine', 0.06)
  chord([659, 784, 1046], 0.34, 'triangle', 0.055)
  playNoise(0.18, 0.018, 0.18, 2400)
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2)
}

function circleRect(circle, rect, radius = circle.size / 2) {
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width))
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height))
  return distance(circle.x, circle.y, closestX, closestY) < radius
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}
</script>
