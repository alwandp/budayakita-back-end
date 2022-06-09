const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/images',
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'images'),
      },
    },
  },
];

module.exports = routes;
