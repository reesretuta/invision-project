'use strict';

var path = require('path');

module.exports = {
  consumer: {
    port: 3000,
    host: 'localhost',
  },
  producers: [
    {host: 'localhost', port: 8080},
    {host: 'localhost', port: 8081}
  ]
};