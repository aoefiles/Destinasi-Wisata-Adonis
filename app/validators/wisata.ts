// app/validators/wisata.ts
import vine from '@vinejs/vine'

export const createWisataValidator = vine.compile(
  vine.object({
    namaWisata: vine.string().trim().minLength(3).maxLength(255),
    deskripsi: vine.string().trim().optional(),
    alamat: vine.string().trim().optional(),
    hargaTiket: vine.number().min(0),
    kategoriId: vine.number().positive(),
    kotaId: vine.number().positive(),
    gambar: vine.file().nullableAndOptional().dimensions({ maxWidth: 1920, maxHeight: 1080 }).size('2mb'),
  })
)

export const updateWisataValidator = vine.compile(
  vine.object({
    namaWisata: vine.string().trim().minLength(3).maxLength(255),
    deskripsi: vine.string().trim().optional(),
    alamat: vine.string().trim().optional(),
    hargaTiket: vine.number().min(0),
    kategoriId: vine.number().positive(),
    kotaId: vine.number().positive(),
    gambar: vine.file().nullableAndOptional().dimensions({ maxWidth: 1920, maxHeight: 1080 }).size('2mb'),
  })
)