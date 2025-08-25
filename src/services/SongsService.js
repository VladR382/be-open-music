const { nanoid } = require('nanoid');
const Boom = require('@hapi/boom'); // Ditambahkan
const pool = require('./database');

class SongsService {
  _buildGetSongsQuery(title, performer) {
    let query = 'SELECT id, title, performer FROM songs';
    const values = [];
    const conditions = [];

    if (title) {
      conditions.push(`title ILIKE $${conditions.length + 1}`);
      values.push(`%${title}%`);
    }

    if (performer) {
      conditions.push(`performer ILIKE $${conditions.length + 1}`);
      values.push(`%${performer}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    return { text: query, values };
  }

  static async addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO songs (id, title, year, genre, performer, duration, album_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId],
    };
    const result = await pool.query(query);
    if (!result.rows[0].id) {
      // Diubah: Menggunakan Boom untuk kesalahan server
      throw Boom.badImplementation('Lagu gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getSongs(title, performer) {
    const queryConfig = this._buildGetSongsQuery(title, performer);
    const result = await pool.query(queryConfig);
    return result.rows;
  }

  static async getSongById(id) {
    const query = { text: 'SELECT * FROM songs WHERE id = $1', values: [id] };
    const result = await pool.query(query);
    if (!result.rows.length) {
      // Diubah: Menggunakan Boom untuk error 404
      throw Boom.notFound('Lagu tidak ditemukan');
    }
    const song = result.rows[0];
    return {
      id: song.id,
      title: song.title,
      year: song.year,
      performer: song.performer,
      genre: song.genre,
      duration: song.duration,
      albumId: song.album_id,
    };
  }

  static async editSongById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, id],
    };
    const result = await pool.query(query);
    if (!result.rows.length) {
      // Diubah: Menggunakan Boom untuk error 404
      throw Boom.notFound('Gagal memperbarui lagu. Id tidak ditemukan');
    }
  }

  static async deleteSongById(id) {
    const query = { text: 'DELETE FROM songs WHERE id = $1 RETURNING id', values: [id] };
    const result = await pool.query(query);
    if (!result.rows.length) {
      // Diubah: Menggunakan Boom untuk error 404
      throw Boom.notFound('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = SongsService;