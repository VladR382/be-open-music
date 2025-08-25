const SongsService = require('../services/SongsService');
const SongsValidator = require('../validator/songs');

const songsService = new SongsService();

const routes = [
  {
    method: 'POST',
    path: '/songs',
    handler: async (request, h) => {
      SongsValidator.validateSongPayload(request.payload);
      const songId = await SongsService.addSong(request.payload);
      return h.response({ status: 'success', data: { songId } }).code(201);
    },
  },
  {
    method: 'GET',
    path: '/songs',
    handler: async (request) => {
      const { title, performer } = request.query;
      const songs = await songsService.getSongs(title, performer);
      return { status: 'success', data: { songs } };
    },
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: async (request) => {
      const { id } = request.params;
      const song = await SongsService.getSongById(id);
      return { status: 'success', data: { song } };
    },
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: async (request) => {
      SongsValidator.validateSongPayload(request.payload);
      const { id } = request.params;
      await SongsService.editSongById(id, request.payload);
      return { status: 'success', message: 'Lagu berhasil diperbarui' };
    },
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: async (request) => {
      const { id } = request.params;
      await SongsService.deleteSongById(id);
      return { status: 'success', message: 'Lagu berhasil dihapus' };
    },
  },
];

module.exports = routes;
