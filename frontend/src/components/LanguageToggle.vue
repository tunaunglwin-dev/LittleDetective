<template>
  <div class="flex rounded-full border p-1 backdrop-blur-md" :class="light ? 'border-white/28 bg-white/14' : 'border-[#cfe4da] bg-white/72'">
    <button
      v-for="option in options"
      :key="option.id"
      class="rounded-full px-2.5 py-1 text-xs sm:px-3"
      :class="activeClass(option.id)"
      type="button"
      @click="userStore.setSiteLanguage(option.id)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user'

const props = defineProps({
  light: { type: Boolean, default: false },
})

const userStore = useUserStore()
const options = [
  { id: 'en', label: 'EN' },
  { id: 'mm', label: 'MM' },
]

const activeClass = computed(() => (id) => {
  if (id !== userStore.siteLanguage && props.light) return 'text-white/78 hover:bg-white/14 hover:text-white'
  if (id !== userStore.siteLanguage) return 'text-zinc-600 hover:bg-white/70'
  return 'bg-[#0a5a4b] text-white'
})
</script>
