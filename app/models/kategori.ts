// app/Models/Kategori.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm' // PASTIKAN hasMany diimpor
import Wisata from '#models/wisata' // PASTIKAN alias #models/wisata

export default class Kategori extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare namaKategori: string

  @column()
  declare deskripsi: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Wisata)
  declare wisatas: HasMany<typeof Wisata> // PASTIKAN HasMany diimpor
}