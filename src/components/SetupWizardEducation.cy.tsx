import SetupWizardEducation from './SetupWizardEducation.vue'

describe('<SetupWizardEducation />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    const education = ref({
      key: 'high-school',
      value: 'High School',
    })

    cy.mount(() => <SetupWizardEducation onUpdate:modelValue={(newValue) => { education.value = newValue }} modelValue={education.value} />)
  })
})
