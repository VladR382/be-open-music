const AlbumsService = require("../services/AlbumsService")
const AlbumsValidator = require("../validator/albums")

const albumsService = new AlbumsService()

const routes = [
  {
    method: "POST",
    path: "/albums",
    handler: async (request, h) => {
      try {
        AlbumsValidator.validateAlbumPayload(request.payload)
        const { name, year } = request.payload
        const albumId = await albumsService.addAlbum({ name, year })

        const response = h.response({
          status: "success",
          data: {
            albumId,
          },
        })
        response.code(201)
        return response
      } catch (error) {
        console.error("Album POST error:", error)
        const response = h.response({
          status: "fail",
          message: error.message,
        })
        response.code(400)
        return response
      }
    },
  },
  {
    method: "GET",
    path: "/albums/{id}",
    handler: async (request, h) => {
      try {
        const { id } = request.params

        // Check if songs should be included (optional criteria 1)
        const album = await albumsService.getAlbumWithSongs(id)

        return {
          status: "success",
          data: {
            album,
          },
        }
      } catch (error) {
        console.error("Album GET error:", error)
        const response = h.response({
          status: "fail",
          message: error.message,
        })
        response.code(404)
        return response
      }
    },
  },
  {
    method: "PUT",
    path: "/albums/{id}",
    handler: async (request, h) => {
      try {
        AlbumsValidator.validateAlbumPayload(request.payload)
        const { id } = request.params
        const { name, year } = request.payload

        await albumsService.editAlbumById(id, { name, year })

        return {
          status: "success",
          message: "Album berhasil diperbarui",
        }
      } catch (error) {
        console.error("Album PUT error:", error)
        if (error.message.includes("tidak ditemukan")) {
          const response = h.response({
            status: "fail",
            message: error.message,
          })
          response.code(404)
          return response
        }

        const response = h.response({
          status: "fail",
          message: error.message,
        })
        response.code(400)
        return response
      }
    },
  },
  {
    method: "DELETE",
    path: "/albums/{id}",
    handler: async (request, h) => {
      try {
        const { id } = request.params
        await albumsService.deleteAlbumById(id)

        return {
          status: "success",
          message: "Album berhasil dihapus",
        }
      } catch (error) {
        console.error("Album DELETE error:", error)
        const response = h.response({
          status: "fail",
          message: error.message,
        })
        response.code(404)
        return response
      }
    },
  },
]

module.exports = routes