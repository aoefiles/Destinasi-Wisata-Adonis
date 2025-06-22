// app/validators/ulasan.ts
import vine from '@vinejs/vine'

export const createUlasanValidator = vine.compile(
  vine.object({
    komentar: vine.string().trim().optional(),
    rating: vine.number().min(1).max(5),
  })
)
