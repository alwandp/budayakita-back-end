const DestinationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'destinations',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const destinationsHandler = new DestinationsHandler(service, validator);
    server.route(routes(destinationsHandler));
  },
};
