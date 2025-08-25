# OpenMusic API v1

Ini adalah layanan web untuk mengelola koleksi musik.

-----

## Fitur

  * **Manajemen Album**:
      * Menambah album baru.
      * Melihat detail album beserta lagu-lagunya.
      * Mengubah informasi album.
      * Menghapus album.
  * **Manajemen Lagu**:
      * Menambah lagu baru.
      * Melihat daftar lagu dengan filter berdasarkan judul dan penyanyi.
      * Melihat detail lagu.
      * Mengubah informasi lagu.
      * Menghapus lagu.
  * **Penanganan Error**: Menggunakan plugin kustom untuk menangani *client error* (4xx) dan *server error* (5xx) dengan respons yang terstruktur.

-----

## Persyaratan

  * Node.js
  * PostgreSQL
  * NPM (Node Package Manager)

-----

## Instalasi

1.  **Clone repositori ini:**

    ```bash
    git clone [URL_REPOSITORI](https://github.com/VladR382/be-open-music)
    cd be-open-music
    ```

2.  **Instal dependensi:**

    ```bash
    npm install
    ```

    Dependensi yang digunakan antara lain `@hapi/hapi` untuk server, `pg` untuk koneksi database PostgreSQL, `nanoid` untuk generate ID unik, dan `@hapi/boom` untuk penanganan error.

-----

## Konfigurasi

1.  **Buat file `.env` di root direktori proyek.**
2.  **Isi file `.env` dengan konfigurasi database Anda:**
    ```
    PGUSER=<user_database>
    PGHOST=<host_database>
    PGDATABASE=<nama_database>
    PGPASSWORD=<password_database>
    PGPORT=<port_database>
    ```
    Pastikan file `.env` sudah ditambahkan ke `.gitignore` agar tidak ter-upload ke repositori.

-----

## Menjalankan Aplikasi

  * **Mode Produksi:**

    ```bash
    npm start
    ```

  * **Mode Pengembangan (dengan Nodemon):**

    ```bash
    npm run dev
    ```

    Server akan berjalan pada `host` dan `port` yang ditentukan di file `.env` atau defaultnya di `localhost:5000`.

-----

## API Endpoints

### Albums

  * `POST /albums`: Menambah album baru.
  * `GET /albums/{id}`: Mendapatkan detail album berdasarkan ID.
  * `PUT /albums/{id}`: Memperbarui album berdasarkan ID.
  * `DELETE /albums/{id}`: Menghapus album berdasarkan ID.

### Songs

  * `POST /songs`: Menambah lagu baru.
  * `GET /songs`: Mendapatkan daftar lagu (bisa difilter dengan query `title` dan `performer`).
  * `GET /songs/{id}`: Mendapatkan detail lagu berdasarkan ID.
  * `PUT /songs/{id}`: Memperbarui lagu berdasarkan ID.
  * `DELETE /songs/{id}`: Menghapus lagu berdasarkan ID.

-----

## Migrasi Database

Proyek ini menggunakan `node-pg-migrate` untuk mengelola skema database.

  * **Menjalankan migrasi (up):**

    ```bash
    npm run migrate:up
    ```

  * **Mengembalikan migrasi (down):**

    ```bash
    npm run migrate:down
    ```

    Terdapat dua file migrasi untuk membuat tabel `albums` dan `songs`.

-----

## Linting

Proyek ini menggunakan ESLint dengan konfigurasi `airbnb-base` untuk menjaga kualitas kode.

  * **Menjalankan linting:**

    ```bash
    npm run lint
    ```

  * **Memperbaiki masalah linting secara otomatis:**

    ```bash
    npm run lint:fix
    ```

    Beberapa aturan seperti `no-console`, `no-underscore-dangle`, dan `class-methods-use-this` dinonaktifkan.
