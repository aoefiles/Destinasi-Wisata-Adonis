/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
// --- PERUBAHAN DI SINI ---
// Kita tidak lagi mengimpor 'middleware' dari kernel.js secara langsung
// tapi kita akan mengaksesnya melalui objek HttpContext
// ATAU, jika Anda ingin mengimpornya untuk kemudahan penulisan:
import { httpMiddleware } from '#start/kernel' // Import httpMiddleware

// Import Controllers
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const HomeController = () => import('#controllers/home_controller')
const KategoriController = () => import('#controllers/kategoris_controller')
const KotaController = () => import('#controllers/kotas_controller')
const WisataController = () => import('#controllers/wisatas_controller')
const UlasanController = () => import('#controllers/ulasans_controller')

// Redirect root to home page
router.get('/', [HomeController, 'index']).as('home')


// Guest routes (only accessible when not authenticated)
router.group(() => {
  router.get('/login', [AuthController, 'showLogin']).as('login')
  router.post('/login', [AuthController, 'login']).as('check')
  router.get('/register', [AuthController, 'showRegister']).as('register')
  router.post('/register', [AuthController, 'register']).as('checkRegister')
// --- PERUBAHAN DI SINI ---
}).as('auth').middleware(httpMiddleware.named.guest()) // Akses guest dari httpMiddleware.named

// Authenticated routes
router.group(() => {
  router.post('/logout', [AuthController, 'logout']).as('logout')
  router.get('/dashboard', [DashboardController, 'index']).as('dashboard')

  // Routes untuk CRUD Kategori
  router.group(() => {
    router.get('/', [KategoriController, 'index']).as('index')
    router.get('/create', [KategoriController, 'create']).as('create')
    router.post('/', [KategoriController, 'store']).as('store')
    router.get('/:id', [KategoriController, 'show']).as('show')
    router.get('/:id/edit', [KategoriController, 'edit']).as('edit')
    router.put('/:id', [KategoriController, 'update']).as('update')
    router.delete('/:id', [KategoriController, 'destroy']).as('destroy')
  }).prefix('/kategori').as('kategori')

  // Routes untuk CRUD Kota
  router.group(() => {
    router.get('/', [KotaController, 'index']).as('index')
    router.get('/create', [KotaController, 'create']).as('create')
    router.post('/', [KotaController, 'store']).as('store')
    router.get('/:id', [KotaController, 'show']).as('show')
    router.get('/:id/edit', [KotaController, 'edit']).as('edit')
    router.put('/:id', [KotaController, 'update']).as('update')
    router.delete('/:id', [KotaController, 'destroy']).as('destroy')
  }).prefix('/kota').as('kota')

  // Routes untuk CRUD Wisata
  router.group(() => {
    router.get('/', [WisataController, 'index']).as('index')
    router.get('/create', [WisataController, 'create']).as('create')
    router.post('/', [WisataController, 'store']).as('store')
    router.get('/:id', [WisataController, 'show']).as('show')
    router.get('/:id/edit', [WisataController, 'edit']).as('edit')
    router.put('/:id', [WisataController, 'update']).as('update')
    router.delete('/:id', [WisataController, 'destroy']).as('destroy')
  }).prefix('/wisata').as('wisata')

  // Routes untuk Ulasan (nested under wisata detail atau terpisah)
  router.post('/wisata/:wisataId/ulasan', [UlasanController, 'store']).as('ulasan.store')
  router.delete('/ulasan/:id', [UlasanController, 'destroy']).as('ulasan.destroy')

// --- PERUBAHAN DI SINI ---
}).middleware(httpMiddleware.named.auth()) // Akses auth dari httpMiddleware.named

// // Mengatur rute untuk form update dan delete agar bisa menerima PUT dan DELETE
// router.on('/kategori/:id').as('kategori.update').put([KategoriController, 'update'])
// router.on('/kategori/:id').as('kategori.destroy').delete([KategoriController, 'destroy'])

// router.on('/kota/:id').as('kota.update').put([KotaController, 'update'])
// router.on('/kota/:id').as('kota.destroy').delete([KotaController, 'destroy'])

// router.on('/wisata/:id').as('wisata.update').put([WisataController, 'update'])
// router.on('/wisata/:id').as('wisata.destroy').delete([WisataController, 'destroy'])