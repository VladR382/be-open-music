require("dotenv").config()
const Hapi = require("@hapi/hapi")
const albumsRoutes = require("./routes/albums")
const songsRoutes = require("./routes/songs")

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  })

  // Register routes
  server.route(albumsRoutes)
  server.route(songsRoutes)

  // Global error handling
  server.ext("onPreResponse", (request, h) => {
    const { response } = request

    if (response.isBoom) {
      if (response.output.statusCode === 400) {
        return h
          .response({
            status: "fail",
            message: response.message,
          })
          .code(400)
      }

      if (response.output.statusCode === 404) {
        return h
          .response({
            status: "fail",
            message: response.message,
          })
          .code(404)
      }

      // Server error (500)
      return h
        .response({
          status: "error",
          message: "Terjadi kegagalan pada server kami",
        })
        .code(500)
    }

    return response.continue || response
  })

  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init()