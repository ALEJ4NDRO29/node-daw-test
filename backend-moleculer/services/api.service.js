'use strict'

const ApiGateway = require('moleculer-web')

module.exports = {
  name: 'api',
  mixins: [ApiGateway],

  // More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
  settings: {
    port: 3500,

    routes: [
      {
        path: '/api',
        whitelist: [
          // Access to any actions in all services under "/api" URL
          '**'
        ],
        aliases: {
          'GET events': 'events.getall',
        },
        cors: true,
      }
    ],

    // Serve assets from "public" folder
    assets: {
      folder: 'public'
    }
  }
}
