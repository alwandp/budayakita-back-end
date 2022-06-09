const ClientError = require('../../exceptions/ClientError');

class CulturesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postCultureHandler = this.postCultureHandler.bind(this);
    this.getCulturesHandler = this.getCulturesHandler.bind(this);
    this.getCultureByIdHandler = this.getCultureByIdHandler.bind(this);
    this.putCultureByIdHandler = this.putCultureByIdHandler.bind(this);
    this.deleteCultureByIdHandler = this.putCultureByIdHandler.bind(this);
  }

  async postCultureHandler(request, h) {
    try {
      this._validator.validateCulturePayload(request.payload);
      const {
        nama,
        jenis,
        deskripsi,
        imageUrl,
      } = request.payload;

      const cultureId = await this._service.addCulture({
        nama,
        jenis,
        deskripsi,
        imageUrl,
      });

      const response = h.response({
        status: 'success',
        message: 'Budaya berhasil ditambahkan',
        data: {
          cultureId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getCulturesHandler() {
    const cultures = await this._service.getCultures();
    return {
      status: 'success',
      data: {
        cultures,
      },
    };
  }

  async getCultureByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const culture = await this._service.getCultureById(id);
      return {
        status: 'success',
        data: {
          culture,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async putCultureByIdHandler(request, h) {
    try {
      this._validator.validateCulturePayload(request.payload);
      const {
        nama,
        jenis,
        deskripsi,
        imageUrl,
      } = request.payload;
      const { id } = request.params;

      await this._service.editCultureById(id, {
        nama,
        jenis,
        deskripsi,
        imageUrl,
      });

      return {
        status: 'success',
        message: 'Budaya berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteCultureByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteCultureById(id);

      return {
        status: 'success',
        message: 'Budaya berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = CulturesHandler;
