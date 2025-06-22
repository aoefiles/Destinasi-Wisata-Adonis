// start/middleware.ts

import { defineConfig } from '@adonisjs/core/types'

/**
 * The `middleware` object holds an array of middleware that will be executed
 * on every request in the order they are defined.
 */
const middleware = defineConfig({
  /**
   * The `global` middleware are executed on every HTTP request.
   * The members of the array should be unique to avoid duplicate calls.
   */
  global: [
    () => import('@adonisjs/core/middleware/bodyparser'),
    () => import('@adonisjs/session/middleware/session_middleware'), // Pastikan ini benar
    () => import('@adonisjs/core/middleware/flash_messages'),
    () => import('@adonisjs/core/middleware/vinejs_flash_errors'),
    // Tambahkan middleware global lain di sini jika dibutuhkan
  ],

  /**
   * The `named` middleware are ones that are assigned a unique name and
   * can be applied to individual routes or a group of routes.
   */
  named: {
    auth: () => import('@adonisjs/auth/middleware/auth_middleware'), // Middleware autentikasi
    // Tambahkan middleware bernama lain di sini jika dibutuhkan
  },
})

export default middleware
