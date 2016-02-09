'use strict';

var net = require('net');
var config = require('./config');
var queue = require('./libs/queue');
var math = require('./libs/math');

var consumer = function(done){
    var server = net.createServer(function(socket) {

      console.log('Socket Connected:', socket.remoteAddress + ":" + socket.remotePort);
      setInterval(function () {
        if (queue.size() > 0) {
          var expressions = queue.get()
            , solutions = [];
            
          expressions.split(",").forEach(function(expression){
            if (expression) {
              var solution = math.resolve(expression);
              var msg = expression + " = " + solution + ";";
              console.log('Consumer SOLVED:', msg);
              socket.write(msg, 'utf8');
            }
          });
        }
      }, 10);

      socket.on('data', function (data) {
        console.log('Consumer RECEIVED:', data.toString());
        queue.add(data.toString());
      });

      socket.on('end', function () {
        console.log('Socket DATA END');
      });

    });

    console.log('Server listening on', config.consumer.host + ':' + config.consumer.port);
    server.listen(config.consumer.port, config.consumer.host);
    done();
}

module.exports = consumer;