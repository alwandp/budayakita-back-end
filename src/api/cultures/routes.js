const routes = (handler) => [
  {
    method: 'POST',
    path: '/cultures',
    handler: handler.postCultureHandler,
  },
  {
    method: 'GET',
    path: '/cultures',
    handler: handler.getCulturesHandler,
  },
  {
    method: 'GET',
    path: '/cultures/{id}',
    handler: handler.getCultureByIdHandler,
  },
  {
    method: 'PUT',
    path: '/cultures/{id}',
    handler: handler.putCultureByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/cultures/{id}',
    handler: handler.deleteCultureByIdHandler,
  },
];

module.exports = routes;
