const routes = (handler) => [
  {
    method: 'POST',
    path: '/destinations',
    handler: handler.postDestinationHandler,
  },
  {
    method: 'GET',
    path: '/destinations',
    handler: handler.getDestinationsHandler,
  },
  {
    method: 'GET',
    path: '/destinations/{id}',
    handler: handler.getDestinationByIdHandler,
  },
  {
    method: 'PUT',
    path: '/destinations/{id}',
    handler: handler.putDestinationByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/destinations/{id}',
    handler: handler.deleteDestinationByIdHandler,
  },
];

module.exports = routes;
