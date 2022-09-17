import { faker } from '@faker-js/faker'

import SetupModal from './SetupModal.vue'

const header = faker.lorem.sentence(1)
const content = faker.lorem.paragraphs(5)

const headerSelector = '[data-testid=header]'
const contentSelector = '[data-testid=content]'
const progressSelector = '[data-testid=progress-selector]'
const progressIndicator = '[data-testid=progress-indicator]'

let onSkipSpy: ReturnType<typeof cy.spy>
let onNextSpy: ReturnType<typeof cy.spy>

const slots = {
  header: () => <h1 data-testid="header">{header}</h1>,
  content: () => <p data-testid="content">{content}</p>,
}

beforeEach(() => {
  onSkipSpy = cy.spy().as('skipSpy')
  onNextSpy = cy.spy().as('nextSpy')
})

describe('<SetupModal />', { viewportHeight: 800, viewportWidth: 1440 }, () => {
  it('renders header and content slots', () => {
    cy.mount(() => <div>Hello world!<SetupModal vSlots={slots}/></div>)
      .get(headerSelector).should('be.visible')
      .get(contentSelector).should('be.visible')
  })

  it('does not render the progress slider if no number is passed in', () => {
    cy.mount(() => <SetupModal vSlots={slots}/>)
      .get(progressSelector).should('not.exist')
  })

  describe('events', () => {
    beforeEach(() => {
      cy.mount(() => <SetupModal vSlots={slots} onNext={onNextSpy} onSkip={onSkipSpy}/>)
    })

    it('has a next button', () => {
      cy.contains('Next').should('be.visible')
    })

    it('emits a next event', () => {
      cy.contains('Next').click().get('@nextSpy').should('have.been.called')
    })

    it('has a skip button', () => {
      cy.contains('Skip').should('be.visible')
    })

    it('emits a skip event', () => {
      cy.contains('Skip').click().get('@skipSpy').should('have.been.called')
    })
  })

  describe('progress', () => {
    it('renders the progress bar depending on how far you\'re through the wizard', () => {
      const progress = 0.5
      cy.mount(() => <SetupModal vSlots={slots} progress={progress}/>)
        .get(progressSelector)
        .should('be.visible')
        .then(($parent) => {
          cy.get(progressIndicator)
            .should(($indicator) => {
              expect($indicator.width()).to.be.approximately($parent.width() as number * progress, 0.01)
            })
        })
    })

    it.only('animates the progress bar', () => {
      const step = 0.25
      const { count, inc, dec, reset } = useCounter(step, { min: 0, max: 1 })
      cy.mount(() => <SetupModal
      progress={count}
      vSlots={{
        header: () => <h1>Header</h1>,
        content: () => <>
        <p>{ content }</p>
        <div className="items-center text-3xl">
          <p>{ count.value * 100 }%</p>
          <button onClick={() => reset(0)} className="icon-btn i-carbon-undo"></button>
          <button onClick={() => dec(step)} className="icon-btn i-carbon-subtract" />
          <button onClick={() => inc(step)} className="icon-btn i-carbon-add" />
        </div>
        </>,
      }}/>)
    })
  })
})
