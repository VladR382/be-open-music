# Open Music API

Open Music API v1 adalah sebuah layanan web API untuk mengelola koleksi musik. Proyek ini dibangun menggunakan Hapi sebagai *framework* utama dan PostgreSQL sebagai basis datanya.

## Fitur

  * **Manajemen Album**: Menambah, melihat, mengubah, dan menghapus data album.
  * **Manajemen Lagu**: Menambah, melihat, mengubah, dan menghapus data lagu.
  * **Validasi Data**: Setiap data yang masuk divalidasi untuk memastikan integritas data.
  * **Penanganan Kesalahan**: Penanganan kesalahan yang informatif untuk setiap kemungkinan kegagalan.

## Teknologi yang Digunakan

  * **@hapi/hapi**: *Framework* untuk membangun aplikasi web.
  * **@hapi/joi**: Validasi skema data.
  * **dotenv**: Untuk memuat variabel lingkungan dari *file* `.env`.
  * **nanoid**: Untuk menghasilkan ID yang unik.
  * **node-pg-migrate**: Untuk migrasi basis data PostgreSQL.
  * **pg**: *Driver* PostgreSQL untuk Node.js.
  * **nodemon**: Untuk pengembangan yang lebih mudah dengan me-*restart* *server* secara otomatis.

## Persiapan

### Prasyarat

  * Node.js
  * PostgreSQL

### Instalasi

1.  *Clone* repositori ini:
    ```sh
    git clone https://github.com/vladr382/be-open-music.git
    ```
2.  Masuk ke direktori proyek:
    ```sh
    cd be-open-music
    ```
3.  Pasang dependensi:
    ```sh
    npm install
    ```
4.  Buat *file* `.env` di direktori *root* proyek dan isi dengan konfigurasi basis data Anda:
    ```env
    PGUSER=user_database_anda
    PGHOST=host_database_anda
    PGDATABASE=nama_database_anda
    PGPASSWORD=kata_sandi_database_anda
    PGPORT=port_database_anda
    ```
5.  Jalankan migrasi untuk membuat tabel yang diperlukan:
    ```sh
    npm run migrate:up
    ```
6.  Jalankan *server*:
    ```sh
    npm run start
    ```
    Atau untuk mode pengembangan:
    ```sh
    npm run dev
    ```

## Endpoint API

### Album

  * `POST /albums`: Menambahkan album baru.
  * `GET /albums/{id}`: Mendapatkan detail album berdasarkan ID.
  * `PUT /albums/{id}`: Memperbarui album berdasarkan ID.
  * `DELETE /albums/{id}`: Menghapus album berdasarkan ID.

### Lagu

  * `POST /songs`: Menambahkan lagu baru.
  * `GET /songs`: Mendapatkan semua lagu. Dapat disaring berdasarkan judul dan penyanyi.
  * `GET /songs/{id}`: Mendapatkan detail lagu berdasarkan ID.
  * `PUT /songs/{id}`: Memperbarui lagu berdasarkan ID.
  * `DELETE /songs/{id}`: Menghapus lagu berdasarkan ID.

## Struktur Proyek

```
.
├── migrations/
│   ├── ..._create-table-albums.js
│   └── ..._create-table-songs.js
├── src/
│   ├── routes/
│   │   ├── albums.js
│   │   └── songs.js
│   ├── services/
│   │   ├── AlbumsService.js
│   │   ├── SongsService.js
│   │   └── database.js
│   ├── validator/
│   │   ├── albums/
│   │   │   ├── index.js
│   │   │   └── schema.js
│   │   └── songs/
│   │       ├── index.js
│   │       └── schema.js
│   ├── server.js
├── .env.example
├── .gitignore
├── package-lock.json
└── package.json
```
