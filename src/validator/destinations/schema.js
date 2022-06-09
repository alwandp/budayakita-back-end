const Joi = require('joi');

const DestinationPayloadSchema = Joi.object({
  nama: Joi.string().required(),
  kota: Joi.string().required(),
  alamat: Joi.string().required(),
  deskripsi: Joi.string().required(),
  imageUrl: Joi.string().required(),
});

module.exports = DestinationPayloadSchema;
