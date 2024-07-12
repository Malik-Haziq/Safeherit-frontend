import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'https://testing-safeherit.web.app',
    specPattern: 'cypress/integration/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    retries: 3,
    viewportWidth: 1920,
    viewportHeight: 1080
  }
})
