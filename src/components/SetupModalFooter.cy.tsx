import SetupModalFooter from './SetupModalFooter.vue'

describe('<SetupModalFooter />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(() => <SetupModalFooter></SetupModalFooter>)
  })
})
