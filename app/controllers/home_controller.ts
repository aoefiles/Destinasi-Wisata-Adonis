// app/controllers/home_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Wisata from '#models/wisata'
import Kota from '#models/kota'
import db from '@adonisjs/lucid/services/db'

export default class HomeController {
  async index({ request, view }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10
    const searchKota = request.input('kota', '')
    const maxHarga = request.input('harga_max', '')

    let wisatasQuery = Wisata.query()
      .preload('kategori')
      .preload('kota')
      .preload('ulasans') // Pastikan ulasan ter-preload untuk perhitungan rating
      .withAggregate('ulasans', (query) => {
        query.avg('rating').as('average_rating')
      })
      .orderBy(db.raw('average_rating DESC NULLS LAST')) // Urutkan rating tertinggi, nulls terakhir
      .if(searchKota, (query) => {
        query.whereHas('kota', (kotaQuery) => {
          kotaQuery.where('nama_kota', 'like', `%${searchKota}%`)
        })
      })
      .if(maxHarga, (query) => {
        query.where('harga_tiket', '<=', parseFloat(maxHarga))
      })

    const wisatas = await wisatasQuery.paginate(page, limit)
    const kotas = await Kota.all() // Untuk filter kota

    return view.render('home', {
      wisatas,
      kotas,
      searchKota,
      maxHarga,
    })
  }
}
