// start/kernel.ts

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/middleware'

/**
 * The `middleware` object holds an array of middleware that will be executed
 * on every request in the order they are defined.
 */
router.use([
  // Middleware global yang diimpor dari start/middleware.ts
  middleware.bodyparser(),
  middleware.session(),
  middleware.flashMessages(),
  middleware.vinejsFlashErrors(),
])

/**
 * The `named` object holds a list of named middleware.
 * Use the `router.global` method to define global middleware.
 */
router.named(middleware.named)
