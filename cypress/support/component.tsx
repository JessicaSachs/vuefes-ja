// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { mount } from 'cypress/vue'
import { createHead } from '@vueuse/head'
import { provide } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import type { MountingOptions } from 'cypress/vue/dist/@vue/test-utils'
import { faker } from '@faker-js/faker'
import { createRoutes } from '../../src/setup'

import type { UserModule } from '~/types'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

// Example use:
// cy.mount(MyComponent)

faker.seed(1)

function toggleLocales(availableLocales, locale) {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  // import('@faker-js/faker/locale/es')
  console.log('locale.value', locale.value)
  try {
    faker.setLocale(locale.value)
  }
  catch (e) {}
}

Cypress.Commands.add('mount', (rootComponent, options: MountingOptions<any>) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: createRoutes(),
  })

  const plugins = Object.values(import.meta.glob<{ install: UserModule }>('../../src/modules/*.ts', { eager: true }))

  mount({
    name: rootComponent.__name || window.Cypress.spec.fileName,
    setup: () => {
      provide('usehead', createHead())
      const { availableLocales, locale } = useI18n()
      // Not in React :smile:
      // eslint-disable-next-line react/display-name
      return () => <>
        <rootComponent />
        <button onClick={() => toggleLocales(availableLocales, locale)} className="fixed text-2xl z-9999 bottom-2 right-2 icon-btn i-carbon-language"></button>
      </>
    },
  }, {
    ...options,
    global: {
      plugins: [router, ...plugins.map(({ install }) => (app: any) => {
        return install({
          app,
          router,
          isClient: true,
          initialState: {},
          routes: [],
          head: undefined,
          onSSRAppRendered(): void {
            throw new Error('Function not implemented.')
          },
          triggerOnSSRAppRendered() {
            throw new Error('Function not implemented.')
          },
        })
      })],
      ...(options?.global ?? {}),
    },
  }).get('body', { log: false })
})

