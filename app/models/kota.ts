// app/Models/Kota.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm' // PASTIKAN hasMany diimpor
import Wisata from '#models/wisata' // PASTIKAN alias #models/wisata

export default class Kota extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare namaKota: string

  @column()
  declare deskripsi: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Wisata)
  declare wisatas: HasMany<typeof Wisata> // PASTIKAN HasMany diimpor
}