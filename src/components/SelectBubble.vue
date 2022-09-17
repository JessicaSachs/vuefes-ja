<script lang="ts" setup>
import type { MaybeRef } from '@vueuse/core'

withDefaults(defineProps<{
  modelValue?: MaybeRef<boolean>
}>(), { modelValue: false })

defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
</script>

<template>
  <div
    class="inline-flex justify-center h-full p-1 font-medium text-center transition-all rounded-full cursor-pointer select-none w-140px active:outline-none focus:outline-none focus-within:outline-none border-1 aspect-square place-items-center "
    :class="{
      'bg-purple-500 text-white border-purple-500 ring-10px ring-purple-500': modelValue,
      'hover:border-purple-500 hover:ring-10px hover:ring-purple-200 bg-transparent text-gray-400 ring-2px ring-purple-100': !modelValue,
    }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <slot />
  </div>
</template>
