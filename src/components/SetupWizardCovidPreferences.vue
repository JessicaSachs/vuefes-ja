<script setup lang="ts">
import type { MaybeRef } from '@vueuse/core'

const props = defineProps<{
  modelValue: CovidPreferences
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: CovidPreferences): void
}>()

const data = useVModel(props, 'modelValue', emit)

const { t } = useI18n()

watch(props.modelValue, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })
</script>

<script lang="ts">
export interface CovidPreferences {
  masksRequired: boolean
  remote: boolean
  inPerson: boolean
}
</script>

<template>
  <div class="relative w-full mx-auto text-center space-x-36px p-12px">
    <SelectBubble v-model="data.masksRequired">
      {{ t('setupWizard.steps.covid.masksRequired') }}
    </SelectBubble>
    <SelectBubble v-model="data.remote">
      {{ t('setupWizard.steps.covid.meetRemote') }}
    </SelectBubble>
    <SelectBubble v-model="data.inPerson">
      {{ t('setupWizard.steps.covid.meetInPerson') }}
    </SelectBubble>
  </div>
</template>
