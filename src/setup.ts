import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

export const createRoutes = () => setupLayouts(generatedRoutes)
export const base = import.meta.env.BASE_URL
export const installModules = (ctx) => {
  // install all modules under `modules/`
  Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(ctx))
}

// https://github.com/antfu/vite-ssg
export const createApp = (rootComponent = App) => ViteSSG(
  rootComponent,
  { routes: createRoutes(), base },
  installModules,
)
