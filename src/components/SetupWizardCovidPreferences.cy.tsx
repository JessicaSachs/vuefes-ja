import SetupWizardCovidPreferences from './SetupWizardCovidPreferences.vue'

describe('<SetupWizardCovidPreferences />', { viewportHeight: 800, viewportWidth: 1400 }, () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    const preferences = reactive({
      masksRequired: false,
      inPerson: true,
      remote: false,
    })

    cy.mount(() => <SetupWizardCovidPreferences modelValue={preferences} onUpdate:modelValue={cy.spy()}/>)
  })
})
