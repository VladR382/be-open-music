require('dotenv').config();
const Hapi = require('@hapi/hapi');
const albumsRoutes = require('./routes/albums');
const songsRoutes = require('./routes/songs');
const errorHandler = require('./plugins/errorHandler'); // 1. Impor plugin

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // 2. Daftarkan plugin dan rute
  await server.register([
    {
      plugin: errorHandler,
    },
  ]);

  server.route(albumsRoutes);
  server.route(songsRoutes);

  // 3. Logika error handling lama sudah dihapus dari sini

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
