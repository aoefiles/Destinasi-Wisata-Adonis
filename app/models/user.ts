// app/Models/User.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, beforeSave } from '@adonisjs/lucid/orm' // PASTIKAN beforeSave diimpor
import hash from '@adonisjs/core/services/hash'
import Ulasan from '#models/ulasan' // Pastikan ini juga menggunakan alias

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string // Ini sudah benar, pastikan nama kolom di DB adalah full_name

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Ulasan)
  declare ulasans: HasMany<typeof Ulasan> // Pastikan HasMany diimpor

  @beforeSave() // PASTIKAN ini ada dan benar
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}