<script setup lang="ts">
import type { MaybeRef } from '@vueuse/core'

interface Availability {
  value: string
}

const props = defineProps<{
  modelValue: MaybeRef<Availability>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Availability): void
}>()

const data = useVModel(props, 'modelValue', emit)

const { t } = useI18n()
</script>

<template>
  <div>
    Choose your availability!
  </div>
</template>
