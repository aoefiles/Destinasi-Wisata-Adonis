import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wisatas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama_wisata', 255).notNullable()
      table.text('deskripsi').nullable()
      table.string('alamat').nullable()
      table.decimal('harga_tiket', 10, 2).defaultTo(0)
      table.string('gambar_url').nullable() // Untuk menyimpan URL gambar
      table.integer('kategori_id').unsigned().references('id').inTable('kategoris').onDelete('CASCADE')
      table.integer('kota_id').unsigned().references('id').inTable('kotas').onDelete('CASCADE')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

