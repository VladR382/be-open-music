const AlbumsService = require('../services/AlbumsService');
const AlbumsValidator = require('../validator/albums');

const routes = [
  {
    method: 'POST',
    path: '/albums',
    handler: async (request, h) => {
      AlbumsValidator.validateAlbumPayload(request.payload);
      const { name, year } = request.payload;
      const albumId = await AlbumsService.addAlbum({ name, year });
      return h.response({ status: 'success', data: { albumId } }).code(201);
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: async (request) => {
      const { id } = request.params;
      const album = await AlbumsService.getAlbumWithSongs(id);
      return { status: 'success', data: { album } };
    },
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: async (request) => {
      AlbumsValidator.validateAlbumPayload(request.payload);
      const { id } = request.params;
      await AlbumsService.editAlbumById(id, request.payload);
      return { status: 'success', message: 'Album berhasil diperbarui' };
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: async (request) => {
      const { id } = request.params;
      await AlbumsService.deleteAlbumById(id);
      return { status: 'success', message: 'Album berhasil dihapus' };
    },
  },
];

module.exports = routes;
