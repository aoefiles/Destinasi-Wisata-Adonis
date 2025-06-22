// app/validators/kota.ts
import vine from '@vinejs/vine'

export const createKotaValidator = vine.compile(
  vine.object({
    namaKota: vine.string().trim().minLength(3).maxLength(255),
    deskripsi: vine.string().trim().optional(),
  })
)

export const updateKotaValidator = vine.compile(
  vine.object({
    namaKota: vine.string().trim().minLength(3).maxLength(255),
    deskripsi: vine.string().trim().optional(),
  })
)
