const errorHandler = {
  name: 'errorHandler',
  version: '1.0.0',
  register: async (server) => {
    server.ext('onPreResponse', (request, h) => {
      const { response } = request;

      // Cek jika respons adalah error dari Boom
      if (response.isBoom) {
        // Tangani client error (400, 404, dll.)
        if (response.output.statusCode >= 400 && response.output.statusCode < 500) {
          return h
            .response({
              status: 'fail',
              message: response.message,
            })
            .code(response.output.statusCode);
        }

        // Tangani server error (500)
        const serverError = h.response({
          status: 'error',
          message: 'Terjadi kegagalan pada server kami',
        });
        serverError.code(500);
        console.error(response); // Tampilkan log error di server
        return serverError;
      }

      // Lanjutkan respons jika bukan error
      return response.continue || response;
    });
  },
};

module.exports = errorHandler;
