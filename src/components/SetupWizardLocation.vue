<script setup lang="ts">
import type { MaybeRef } from '@vueuse/core'

interface Location {
  value: string
}

const props = defineProps<{
  modelValue: MaybeRef<Location>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Location): void
}>()

const data = useVModel(props, 'modelValue', emit)

const { t } = useI18n()
</script>

<template>
  <div>
    <div class="space-x-16px border-b-1 flex items-center relative border-b-gray-300 w-80% mx-auto">
      <span class="inline-block text-4xl font-black i-carbon-search" /><input v-model="data.value" class="w-full text-2xl font-medium focus:outline-none h-46px" type="text">
      <div class="cursor-pointer hover:border-1 hover:ring-2 hover:ring-purple-300  transition-all hover:border-purple-600 border-1 border-transparent rounded-default px-1.5 py-0.5  hover:text-purple-600  text-black font-medium text-lg space-x-8px flex items-center">
        <span class="inline-block i-carbon-location " />{{ t('setupWizard.steps.location.detect') }}
      </div>
    </div>
  </div>
</template>
