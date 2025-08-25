const Boom = require('@hapi/boom'); // Ditambahkan
const { SongPayloadSchema } = require('./schema');

const SongsValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    if (validationResult.error) {
      // Diubah: Menggunakan Boom untuk error 400
      throw Boom.badRequest(validationResult.error.message);
    }
  },
};

module.exports = SongsValidator;