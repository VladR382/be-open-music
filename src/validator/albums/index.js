const Boom = require('@hapi/boom'); // 1. Import Boom
const { AlbumPayloadSchema } = require('./schema');

const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      // 2. Gunakan Boom untuk error 400
      throw Boom.badRequest(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;