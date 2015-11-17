'use strict';

module.exports = [

  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.view('index', {
      name: 'Cilia Vandenameele en Manon Kindt',
      title: 'Eindopdracht RMD3'
    })
  }

];
