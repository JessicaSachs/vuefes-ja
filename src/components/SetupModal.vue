<script setup lang="ts">
import type { MaybeRef } from '@vueuse/core'
const props = withDefaults(defineProps<{
  progress?: MaybeRef<number>
}>(), {
  progress: 0,
})

defineEmits<{
  (e: 'next'): void
  (e: 'skip'): void
}>()

const progressStyles = computed(() => {
  const progress = unref(props.progress)
  return {
    transitionDuration: progress === 0 ? '1200ms' : '500ms',
    width: `${progress * 100}%`,
  }
})
</script>

<template>
  <div class="flex items-center justify-center bg-black bg-opacity-60 absolute top-0 left-0 w-[100vw] h-[100vh]">
    <div class="flex flex-col bg-white space-y-16px rounded-default p-50px xl:w-1100px xl:h-624px h-440px w-720px">
      <div v-if="progress !== null" data-testid="progress-selector" class="relative w-full children:rounded-30px children:h-full min-h-20px">
        <div
          data-testid="progress-indicator"
          class="absolute top-0 left-0 orange-gradient transition-all ease-out w-200px" :style="progressStyles"
        />
        <div class="bg-[#F5F5FF] w-full" />
      </div>
      <h1 class="text-4xl font-bold text-center">
        <slot name="header" />
      </h1>
      <slot name="content" />

      <slot name="footer">
        <footer class="relative flex flex-col self-end justify-end w-full h-full text-center grow-1">
          <SetupModalFooter @next="$emit('next')" @skip="$emit('skip')" />
        </footer>
      </slot>
    </div>
  </div>
</template>
