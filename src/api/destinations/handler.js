const ClientError = require('../../exceptions/ClientError');

class DestinationsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postDestinationHandler = this.postDestinationHandler.bind(this);
    this.getDestinationsHandler = this.getDestinationsHandler.bind(this);
    this.getDestinationByIdHandler = this.getDestinationByIdHandler.bind(this);
    this.putDestinationByIdHandler = this.putDestinationByIdHandler.bind(this);
    this.deleteDestinationByIdHandler = this.putDestinationByIdHandler.bind(this);
  }

  async postDestinationHandler(request, h) {
    try {
      this._validator.validateDestinationPayload(request.payload);
      const {
        nama,
        kota,
        alamat,
        deskripsi,
        imageUrl,
      } = request.payload;

      const destinationId = await this._service.addDestination({
        nama,
        kota,
        alamat,
        deskripsi,
        imageUrl,
      });

      const response = h.response({
        status: 'success',
        message: 'Destinasi berhasil ditambahkan',
        data: {
          destinationId,
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

  async getDestinationsHandler() {
    const destinations = await this._service.getDestinations();
    return {
      status: 'success',
      data: {
        destinations,
      },
    };
  }

  async getDestinationByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const destination = await this._service.getDestinationById(id);
      return {
        status: 'success',
        data: {
          destination,
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

  async putDestinationByIdHandler(request, h) {
    try {
      this._validator.validateDestinationPayload(request.payload);
      const {
        nama,
        kota,
        alamat,
        deskripsi,
        imageUrl,
      } = request.payload;
      const { id } = request.params;

      await this._service.editDestinationById(id, {
        nama,
        kota,
        alamat,
        deskripsi,
        imageUrl,
      });

      return {
        status: 'success',
        message: 'Destinasi berhasil diperbarui',
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

  async deleteDestinationByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteDestinationById(id);

      return {
        status: 'success',
        message: 'Destinasi berhasil dihapus',
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

module.exports = DestinationsHandler;
