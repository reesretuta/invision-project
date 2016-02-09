'use strict';

var net = require('net');
var config = require('./config');
var connect = require('connect');
var http = require('http');
var math = require('./libs/math');

var producer = function(producerConfig){
    var client = new net.Socket();

    client.on('data', function(data) {
      console.log('Producer RECEIVED:', data.toString());
    });

    client.connect(config.consumer.port, config.consumer.host, function () {
          console.info('TCP Connected.');
            var app = connect();
            app.use('/produce/', function (req, res, next) {
                var expression = math.produceExpression();
                res.writeHead(200, {
                  'Content-Type': 'text/plain'
                });
                res.end(expression);
                client.write(expression);
            });
              console.log('listening on', producerConfig.host + ':' + producerConfig.port);
              var server = app.listen(producerConfig.port, producerConfig.host);
    });
    
    return client;
}

module.exports = producer;