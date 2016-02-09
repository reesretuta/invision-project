'use strict';

var request = require('supertest');
var http = require('http');
var net = require('net');
var assert = require('assert');
var async = require('async');
var consumer = require('./../consumer');
var producer = require('./../producer');
var config = require('./../config');
var math = require('./../libs/math');

describe('Consumer Service', function() {
	var socketOne, socketTwo, iterations = 10;
	before(function(done){
		consumer(function(){
			socketOne = producer(config.producers[0]);
			socketTwo = producer(config.producers[1]);
			done();
		});
	});

	after(function(done){
		socketOne.destroy();
		socketTwo.destroy();
		done();
	});

	it('should process simulatneous requests at avg. 1 request per sec', function(done) {
		var asyncTasks = [];
		config.producers.forEach(function(producer){
			//create X requests per server
			for (var i = 0; i < iterations; i++) {
				asyncTasks.push(function(requestDone){
					var url = 'http://'+producer.host+':'+producer.port+'/produce/';
					var req = http.get(url, function(res){
						res.on('data',function(chunk){
							requestDone();
						});
					});
				});
			};
		});

		var timeStart = new Date().getTime();
		async.parallel(asyncTasks, function(err, results){
			if (err) {
				done(err);
				throw err;
			}
			var timeEnd = new Date().getTime();
			var oneRequestPerSecond = 2 * 1000 * iterations;
			assert.equal((timeEnd - timeStart) < oneRequestPerSecond, true);
			
			//ensure consumer can respond before socket is destroyed after unit test
			setTimeout(function () {
		        done();
		    }, 500);
		});
	});

	it('should correctly commpute math results', function(done){
		assert.equal(math.resolve("2 * 2"), 4);
		assert.equal(math.resolve("2 - 1"), 1);
		assert.equal(math.resolve("20 / 10"), 2);
		assert.equal(math.resolve("20 + 10"), 30);
		done();
	});


});
