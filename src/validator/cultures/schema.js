const Joi = require('joi');

const CulturePayloadSchema = Joi.object({
  nama: Joi.string().required(),
  jenis: Joi.string().required(),
  deskripsi: Joi.string().required(),
  imageUrl: Joi.string().required(),
});

module.exports = CulturePayloadSchema;
