// app/controllers/auth_controller.ts
import type { HttpContext } from '@adonisjs/core/http' // TETAPKAN INI
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  async showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }

  async login({ request, auth, response, session }: HttpContext) { // Deklarasi session di sini sudah benar
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      // GUNAKAN auth.use('web').attempt()
      await auth.use('web').attempt(email, password)
      const user = auth.user! // Pastikan user tersedia setelah attempt berhasil
      session.flash('notification', { type: 'success', message: `Selamat datang kembali, ${user.fullName}!` })
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      session.flash('notification', { type: 'danger', message: 'Email atau password salah!' })
      return response.redirect().back()
    }
  }

  async register({ request, auth, response, session }: HttpContext) { // Deklarasi session di sini sudah benar
    try {
      const data = await request.validateUsing(registerValidator)
      const existingUser = await User.findBy('email', data.email)
      if (existingUser) {
        session.flash('notification', { type: 'danger', message: 'Email sudah terdaftar!' })
        return response.redirect().back()
      }
      const user = await User.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      })
      await auth.use('web').login(user)
      session.flash('notification', { type: 'success', message: 'Registrasi berhasil! Selamat datang di Web Wisata!' })
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      session.flash('notification', { type: 'danger', message: 'Terjadi kesalahan saat registrasi!' })
      return response.redirect().back()
    }
  }

  async logout({ auth, response, session }: HttpContext) { // Deklarasi session di sini sudah benar
    await auth.use('web').logout()
    session.flash('notification', { type: 'success', message: 'Anda telah berhasil logout!' })
    return response.redirect().toRoute('auth.login')
  }
}