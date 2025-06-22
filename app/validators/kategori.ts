// app/validators/kategori.ts
import vine from '@vinejs/vine'

export const createKategoriValidator = vine.compile(
  vine.object({
    namaKategori: vine.string().trim().minLength(3).maxLength(255),
    deskripsi: vine.string().trim().optional(),
  })
)

export const updateKategoriValidator = vine.compile(
  vine.object({
    namaKategori: vine.string().trim().minLength(3).maxLength(255),
    deskripsi: vine.string().trim().optional(),
  })
)
