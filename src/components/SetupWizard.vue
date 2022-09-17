<script lang="ts" setup>
import type { ShallowReactive } from 'vue'
import SetupWizardEducation from './SetupWizardEducation.vue'
import SetupWizardLocation from './SetupWizardLocation.vue'
import SetupWizardAvailability from './SetupWizardAvailability.vue'
import type { CovidPreferences } from './SetupWizardCovidPreferences.vue'
import SetupWizardCovidPreferences from './SetupWizardCovidPreferences.vue'
import SetupWizardLoading from './SetupWizardLoading.vue'
import SetupWizardFinished from './SetupWizardFinished.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const {
  isCurrent,
  steps,
  index,
  current,
  goToNext,
  isLast,
  goToPrevious,
} = useStepper([
  'education',
  'location',
  'availability',
  'covid',
  'loading',
  'confirmation',
])

const { t } = useI18n()

const stepNameTitle = computed(() => {
  return t(`setupWizard.steps.${current.value}.title`)
})

const educationData = ref()
const locationData = ref({ value: 'Boston, MA, United States' })
const availabilityData = ref()

const covidData: ShallowReactive<CovidPreferences> = reactive({
  masksRequired: false,
  remote: true,
  inPerson: true,
})

const handleNext = () => {
  if (isLast.value)
    emit('close')

  goToNext()
}
</script>

<template>
  <SetupModal :progress="index / (steps.length - 1)" @next="handleNext" @prev="goToPrevious()">
    <template #header>
      {{ stepNameTitle }}
    </template>
    <template #content>
      <SetupWizardEducation v-if="isCurrent('education')" v-model="educationData" />
      <SetupWizardLocation v-else-if="isCurrent('location')" v-model="locationData" />
      <SetupWizardAvailability v-else-if="isCurrent('availability')" v-model="availabilityData" />
      <SetupWizardCovidPreferences v-else-if="isCurrent('covid')" v-model="covidData" />
      <SetupWizardLoading v-else-if="isCurrent('loading')" />
      <SetupWizardFinished v-else />
    </template>
  </SetupModal>
</template>
