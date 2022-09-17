<script setup lang="ts">
defineEmits<{
  (e: 'next'): void
  (e: 'skip'): void
}>()
const { t } = useI18n()
</script>

<template>
  <div class="space-x-18px">
    <SetupModalButton @click="$emit('next')">
      {{ t('button.next') }}
    </SetupModalButton>
    <SetupModalButton type="secondary" @click="$emit('skip')">
      {{ t('button.skip') }}
    </SetupModalButton>
  </div>
</template>
