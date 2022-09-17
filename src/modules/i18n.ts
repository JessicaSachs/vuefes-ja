import { createI18n } from 'vue-i18n'
import compiledMessages from '@intlify/vite-plugin-vue-i18n/messages'
import type enUS from '../../locales/en_US.json'
import { type UserModule } from '~/types'

export const defaultMessages: typeof enUS = compiledMessages.enUS
// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
export const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: typeof enUS }>('../../locales/*.json', { eager: true }))
    .map(([key, value]) => {
      const isJson = key.endsWith('.json')
      return [key.slice(14, isJson ? -5 : -4), value.default]
    }),
)

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en_US',
    messages,
  })

  if (app?.use)
    app.use(i18n)
  else return i18n
}
