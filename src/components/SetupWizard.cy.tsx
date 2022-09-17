import SetupWizard from './SetupWizard.vue'

describe('<SetupWizard />', () => {
  it('renders', { viewportHeight: 800, viewportWidth: 1440 }, () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(SetupWizard)
  })
})
