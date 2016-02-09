'use strict';

var queue = [];

function Queue () {}

Queue.prototype.size = function () {
  return queue.length;
};

Queue.prototype.add = function (data) {
  queue.push(data);
};

Queue.prototype.get = function () {
  return queue.shift();
}

Queue.prototype.clear = function () {
  queue = [];
}

module.exports = new Queue();