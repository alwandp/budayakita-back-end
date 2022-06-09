const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDestinationDBToModel } = require('../../utils');

class DestinationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addDestination({
    nama,
    kota,
    alamat,
    deskripsi,
    imageUrl,
  }) {
    const id = `destinasi-${nanoid(8)}`;

    const query = {
      text: 'INSERT INTO destinations VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, nama, kota, alamat, deskripsi, imageUrl],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Destinasi gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getDestinations() {
    const result = await this._pool.query('SELECT id, nama, image_url FROM destinations');
    return result.rows.map(mapDestinationDBToModel);
  }

  async getDestinationById(id) {
    const query = {
      text: 'SELECT * FROM destinations WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Destinasi tidak ditemukan');
    }

    return result.rows.map(mapDestinationDBToModel)[0];
  }

  async editDestinationById(id, {
    nama,
    kota,
    alamat,
    deskripsi,
    imageUrl,
  }) {
    const query = {
      text: 'UPDATE destinations SET nama = $1, kota = $2, alamat = $3, deskripsi = $4, image_url = $5 WHERE id = $6 RETURNING id',
      values: [nama, kota, alamat, deskripsi, imageUrl, id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui destinasi. Id tidak ditemukan');
    }
  }

  async deleteDestinationById(id) {
    const query = {
      text: 'DELETE FROM destinations WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Destinasi gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = DestinationsService;
