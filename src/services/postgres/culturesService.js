const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapCultureDBToModel } = require('../../utils');

class CulturesService {
  constructor() {
    this._pool = new Pool();
  }

  async addCulture({
    nama,
    jenis,
    deskripsi,
    imageUrl,
  }) {
    const id = `budaya-${nanoid(8)}`;

    const query = {
      text: 'INSERT INTO cultures VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, nama, jenis, deskripsi, imageUrl],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Budaya gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getCultures() {
    const result = await this._pool.query('SELECT id, nama, image_url FROM cultures');
    return result.rows.map(mapCultureDBToModel);
  }

  async getCultureById(id) {
    const query = {
      text: 'SELECT * FROM cultures WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Budaya tidak ditemukan');
    }

    return result.rows.map(mapCultureDBToModel)[0];
  }

  async editCultureById(id, {
    nama,
    jenis,
    deskripsi,
    imageUrl,
  }) {
    const query = {
      text: 'UPDATE cultures SET nama = $1, jenis = $2, deskripsi = $3, image_url = $4 WHERE id = $5 RETURNING id',
      values: [nama, jenis, deskripsi, imageUrl, id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui budaya. Id tidak ditemukan');
    }
  }

  async deleteBudayaById(id) {
    const query = {
      text: 'DELETE FROM cultures WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Budaya gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = CulturesService;
