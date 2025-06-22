// app/controllers/dashboard_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Wisata from '#models/wisata'
import Kategori from '#models/kategori'
import Kota from '#models/kota'
import Ulasan from '#models/ulasan'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  async index({ view, auth }: HttpContext) {
    const totalUsers = await User.query().count('* as total')
    const totalWisata = await Wisata.query().count('* as total')
    const totalKategori = await Kategori.query().count('* as total')
    const totalKota = await Kota.query().count('* as total')
    const totalUlasan = await Ulasan.query().count('* as total')

    // Menghitung rata-rata rating destinasi secara keseluruhan
    const averageRatingResult = await Ulasan.query()
      .select(db.raw('AVG(rating) as avg_rating'))
      .first()

    const averageRating = averageRatingResult?.$extras.avg_rating ? parseFloat(averageRatingResult.$extras.avg_rating).toFixed(1) : '0.0'

    return view.render('dashboard', {
      user: auth.user,
      totalUsers: totalUsers[0].$extras.total,
      totalWisata: totalWisata[0].$extras.total,
      totalKategori: totalKategori[0].$extras.total,
      totalKota: totalKota[0].$extras.total,
      totalUlasan: totalUlasan[0].$extras.total,
      averageRating: averageRating,
    })
  }
}