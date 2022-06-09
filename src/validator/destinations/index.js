const DestinationPayloadSchema = require('./schema');

const DestinationsValidator = {
  validateDestinationPayload: (payload) => {
    const validationResult = DestinationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = DestinationsValidator;
