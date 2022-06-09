require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const path = require('path');

const cultures = require('./api/cultures');
const CulturesService = require('./services/postgres/culturesService');
const CulturesValidator = require('./validator/cultures');

const destinations = require('./api/destinations');
const DestinationsService = require('./services/postgres/destinationsService');
const DestinationsValidator = require('./validator/destinations');

const uploads = require('./api/uploads');
const StorageService = require('./services/storage/StorageService');
const UploadsValidator = require('./validator/uploads');

const init = async () => {
  const culturesService = new CulturesService();
  const destinationsService = new DestinationsService();
  const storageService = new StorageService(path.resolve(__dirname, 'api/uploads/images'));

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Inert,
    },
  ]);

  await server.register([
    {
      plugin: cultures,
      options: {
        service: culturesService,
        validator: CulturesValidator,
      },
    },
    {
      plugin: destinations,
      options: {
        service: destinationsService,
        validator: DestinationsValidator,
      },
    },
    {
      plugin: uploads,
      options: {
        service: storageService,
        validator: UploadsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server is running in ${server.info.uri}`);
};

init();
