<script setup lang="ts">
import type { ComputedRef } from 'vue'

interface Education {
  key: 'elementary' | 'middle-school' | 'high-school' | 'undergraduate' | 'post-graduate'
  value: string
}

const props = defineProps<{
  modelValue: Education
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Education): void
}>()

const { t } = useI18n()
const values: ComputedRef<Education[]> = computed(() => ([
  { key: 'elementary', value: t('setupWizard.steps.education.elementary') },
  { key: 'middle-school', value: t('setupWizard.steps.education.middle-school') },
  { key: 'high-school', value: t('setupWizard.steps.education.high-school') },
  { key: 'undergraduate', value: t('setupWizard.steps.education.undergraduate') },
  { key: 'post-graduate', value: t('setupWizard.steps.education.post-graduate') },
]))

const { next, prev, index: currentIndex, state } = useCycleList(values.value, { initialValue: props.modelValue })

const styles = computed(() => ({
  gridTemplateColumns: 'repeat( auto-fit, minmax(120px, 1fr) )',
}))

const updateCurrentIndex = (idx) => {
  currentIndex.value = idx
  emit('update:modelValue', state.value)
}

watch(currentIndex, (newIdx) => {
  updateCurrentIndex(newIdx)
})
</script>

<template>
  <div
    :style="styles"
    class="grid gap-24px p-12px"
  >
    <SelectBubble
      v-for="{ key, value }, index in values"
      :key="key"
      :model-value="modelValue?.value === value"
      :tabindex="index === currentIndex ? 0 : -1"
      class="flex justify-center h-full p-1 font-medium text-center transition-all rounded-full active:outline-none focus:outline-none focus-within:outline-none border-1 aspect-square place-items-center"
      @keydown.enter.prevent @click="updateCurrentIndex(index)" @keydown.right="next()" @keydown.left="prev()"
    >
      {{ value }}
    </SelectBubble>
  </div>
</template>
