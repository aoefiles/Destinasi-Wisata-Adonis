// start/app.ts

import { IgnitorFactory } from '@adonisjs/core/factories'

/**
 * The URL to the frontend serving the assets. This is useful when
 * your backend and frontend are running on different domains and
 * you want to connect them to allow cookies/sessions.
 */
const appUrl = new URL(process.env.APP_URL || 'http://localhost:3333')

/**
 * The application entrypoint. The AdonisJS application gets booted
 * by calling the `boot` method and dear by listening for incoming
 * HTTP requests.
 */
export const app = new IgnitorFactory()
  .createApp('web')
  .listen(appUrl.host, (server) => {
    server.logger.info(`Server listening on ${appUrl.origin}`)
  })
