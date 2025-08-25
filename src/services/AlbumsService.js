const { nanoid } = require('nanoid');
const Boom = require('@hapi/boom'); // Ditambahkan
const pool = require('./database');

class AlbumsService {
  static async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO albums (id, name, year) VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };
    const result = await pool.query(query);
    if (!result.rows[0].id) {
      // Diubah: Menggunakan Boom untuk kesalahan server
      throw Boom.badImplementation('Album gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  static async getAlbumWithSongs(id) {
    const albumQuery = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const songsQuery = {
      text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
      values: [id],
    };
    const albumResult = await pool.query(albumQuery);
    if (!albumResult.rows.length) {
      // Diubah: Menggunakan Boom untuk error 404
      throw Boom.notFound('Album tidak ditemukan');
    }
    const songsResult = await pool.query(songsQuery);
    return {
      ...albumResult.rows[0],
      songs: songsResult.rows,
    };
  }

  static async editAlbumById(id, { name, year }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = {
        text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
        values: [name, year, id],
      };
      const result = await client.query(query);
      if (!result.rows.length) {
        await client.query('ROLLBACK');
        // Diubah: Menggunakan Boom untuk error 404
        throw Boom.notFound('Gagal memperbarui album. Id tidak ditemukan');
      }
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await pool.query(query);
    if (!result.rows.length) {
      // Diubah: Menggunakan Boom untuk error 404
      throw Boom.notFound('Album gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;