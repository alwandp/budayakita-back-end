/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('destinations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    nama: {
      type: 'TEXT',
      notNull: true,
    },
    kota: {
      type: 'TEXT',
      notNull: true,
    },
    alamat: {
      type: 'TEXT',
      notNull: true,
    },
    deskripsi: {
      type: 'TEXT',
      notNull: true,
    },
    image_url: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('destinations');
};
