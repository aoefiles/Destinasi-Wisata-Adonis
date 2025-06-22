// app/controllers/wisata_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Wisata from '#models/wisata'
import Kategori from '#models/kategori'
import Kota from '#models/kota'
import { createWisataValidator, updateWisataValidator } from '#validators/wisata' // Pastikan validator ini sudah Anda buat
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import Ulasan from '#models/ulasan'

export default class WisataController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search', '')
    const page = request.input('page', 1)
    const limit = 10
    const wisatas = await Wisata.query()
      .preload('kategori')
      .preload('kota')
      .if(search, (query) => {
        query.where('nama_wisata', 'like', `%${search}%`)
              .orWhere('deskripsi', 'like', `%${search}%`)
      })
      .orderBy('nama_wisata', 'asc')
      .paginate(page, limit)

    return view.render('wisata/index', { wisatas, search })
  }

  async create({ view }: HttpContext) {
    const kategoris = await Kategori.all()
    const kotas = await Kota.all()
    return view.render('wisata/create', { kategoris, kotas })
  }

  async store({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createWisataValidator)
      
      let gambarUrl: string | null = null;
      if (payload.gambar) {
        const imageName = `${cuid()}.${payload.gambar.extname}`
        await payload.gambar.move(app.publicPath('uploads'), {
          name: imageName,
          overwrite: true,
        })
        gambarUrl = `/uploads/${imageName}`
      }

      await Wisata.create({ ...payload, gambarUrl: gambarUrl })
      session.flash('notification', { type: 'success', message: 'Destinasi wisata berhasil ditambahkan!' })
      return response.redirect().toRoute('wisata.index')
    } catch (error) {
      if (error.messages) {
        session.flash('errors', error.messages.errors)
        session.flash('old', request.all())
      }
      return response.redirect().back()
    }
  }

  async show({ params, view }: HttpContext) {
    const wisata = await Wisata.query()
      .where('id', params.id)
      .preload('kategori')
      .preload('kota')
      .preload('ulasans', (ulasanQuery) => {
        ulasanQuery.preload('user').orderBy('created_at', 'desc')
      })
      .firstOrFail()
    
    // Hitung rata-rata rating secara manual jika virtual property belum terhitung
    let averageRating = '0.0';
    if (wisata.ulasans && wisata.ulasans.length > 0) {
      const totalRating = wisata.ulasans.reduce((sum, ulasan) => sum + ulasan.rating, 0);
      averageRating = (totalRating / wisata.ulasans.length).toFixed(1);
    }

    return view.render('wisata/show', { wisata, averageRating })
  }

  async edit({ params, view }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    const kategoris = await Kategori.all()
    const kotas = await Kota.all()
    return view.render('wisata/edit', { wisata, kategoris, kotas })
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const wisata = await Wisata.findOrFail(params.id)
      const payload = await request.validateUsing(updateWisataValidator)

      let gambarUrl: string | null = wisata.gambarUrl; // Pertahankan gambar lama jika tidak diupload
      if (payload.gambar) {
        const imageName = `${cuid()}.${payload.gambar.extname}`
        await payload.gambar.move(app.publicPath('uploads'), {
          name: imageName,
          overwrite: true,
        })
        gambarUrl = `/uploads/${imageName}`
      }

      await wisata.merge({ ...payload, gambarUrl: gambarUrl }).save()
      session.flash('notification', { type: 'success', message: 'Destinasi wisata berhasil diperbarui!' })
      return response.redirect().toRoute('wisata.index')
    } catch (error) {
      if (error.messages) {
        session.flash('errors', error.messages.errors)
        session.flash('old', request.all())
      }
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    try {
      const wisata = await Wisata.findOrFail(params.id)
      await wisata.delete()
      session.flash('notification', { type: 'success', message: 'Destinasi wisata berhasil dihapus!' })
      return response.redirect().toRoute('wisata.index')
    } catch (error) {
      session.flash('notification', { type: 'danger', message: 'Gagal menghapus destinasi wisata!' })
      return response.redirect().back()
    }
  }
}