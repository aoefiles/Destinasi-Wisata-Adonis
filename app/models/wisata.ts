// app/Models/Wisata.ts
import { DateTime } from 'luxon'
// PASTIKAN Anda mengimpor virtual, belongsTo, dan hasMany dari @adonisjs/lucid/orm
import { BaseModel, column, belongsTo, hasMany, virtual } from '@adonisjs/lucid/orm'
import Kategori from '#models/kategori' // PASTIKAN alias
import Kota from '#models/kota'         // PASTIKAN alias
import Ulasan from '#models/ulasan'     // PASTIKAN alias
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations' // Pastikan ini juga diimpor

export default class Wisata extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare namaWisata: string

  @column()
  declare deskripsi: string | null

  @column()
  declare alamat: string | null

  @column()
  declare hargaTiket: number

  @column()
  declare gambarUrl: string | null

  @column()
  declare kategoriId: number

  @column()
  declare kotaId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Kategori)
  declare kategori: BelongsTo<typeof Kategori> // PASTIKAN BelongsTo diimpor

  @belongsTo(() => Kota)
  declare kota: BelongsTo<typeof Kota> // PASTIKAN BelongsTo diimpor

  @hasMany(() => Ulasan)
  declare ulasans: HasMany<typeof Ulasan> // PASTIKAN HasMany diimpor

  @virtual() // PASTIKAN ini adalah @virtual()
  get averageRating() {
    if (this.ulasans && this.ulasans.length > 0) {
      const totalRating = this.ulasans.reduce((sum, ulasan) => sum + ulasan.rating, 0)
      return (totalRating / this.ulasans.length).toFixed(1)
    }
    return '0.0'
  }
}