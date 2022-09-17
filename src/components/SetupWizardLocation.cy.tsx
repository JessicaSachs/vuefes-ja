import SetupWizardLocation from './SetupWizardLocation.vue'

describe('<SetupWizardLocation />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(() => <SetupWizardLocation modelValue={ref('Hello')}/>)
  })
})
