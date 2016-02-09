var consumer = require('./consumer');
var producer = require('./producer');
var config = require('./config');
var http = require('http');

consumer(function(){
	config.producers.forEach(function(producerConfig){
		producer(producerConfig);
	});
});

config.producers.forEach(function(producer){
	setInterval(function(){
		var url = 'http://'+producer.host+':'+producer.port+'/produce/';
		http.get(url, function(res){});
	}, 1000);
});