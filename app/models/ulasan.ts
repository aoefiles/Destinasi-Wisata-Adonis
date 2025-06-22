// app/Models/Ulasan.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm' // PASTIKAN belongsTo diimpor
import User from '#models/user'     // PASTIKAN alias
import Wisata from '#models/wisata' // PASTIKAN alias
import type { BelongsTo } from '@adonisjs/lucid/types/relations' // Pastikan ini juga diimpor

export default class Ulasan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare wisataId: number

  @column()
  declare komentar: string | null

  @column()
  declare rating: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User> // PASTIKAN BelongsTo diimpor

  @belongsTo(() => Wisata)
  declare wisata: BelongsTo<typeof Wisata> // PASTIKAN BelongsTo diimpor
}