const CulturesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'cultures',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const culturesHandler = new CulturesHandler(service, validator);
    server.route(routes(culturesHandler));
  },
};
