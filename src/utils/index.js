const mapCultureDBToModel = ({
  id,
  nama,
  jenis,
  deskripsi,
  image_url,
}) => ({
  id,
  nama,
  jenis,
  deskripsi,
  imageUrl: image_url,
});

const mapDestinationDBToModel = ({
  id,
  nama,
  kota,
  alamat,
  deskripsi,
  image_url,
}) => ({
  id,
  nama,
  kota,
  alamat,
  deskripsi,
  imageUrl: image_url,
});

module.exports = { mapCultureDBToModel, mapDestinationDBToModel };
