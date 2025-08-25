const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Tambahkan ini untuk tes koneksi langsung
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err);
  } else {
    console.log('Berhasil terhubung ke database. Waktu saat ini:', res.rows[0].now);
  }
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

module.exports = pool;
