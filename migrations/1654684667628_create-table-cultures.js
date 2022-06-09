exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('cultures', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    nama: {
      type: 'TEXT',
      notNull: true,
    },
    jenis: {
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
  pgm.dropTable('cultures');
};
