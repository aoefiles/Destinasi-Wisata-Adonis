// app/middleware/guest_middleware.ts
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class GuestMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.auth.user) {
      return ctx.response.redirect().toRoute('dashboard')
    }
    await next()
  }
}