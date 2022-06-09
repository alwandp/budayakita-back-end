const CulturePayloadSchema = require('./schema');

const CulturesValidator = {
  validateCulturePayload: (payload) => {
    const validationResult = CulturePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = CulturesValidator;
