The assignment is to build a simple Producer/Consumer system. In this system the Generator will send a series of random arithmetic expressions, while the Evaluator will accept these expressions, compute the result and then report the solution to the Generator.


Requirements:
===================

At a minimum, we would like to see the following implemented:

*The Producer and Consumer as separate NodeJS services.
*The Producer generating random addition expressions of two positive integers, e.g. "2+3="
*The Consumer computing and returning the correct mathematical result for the each expression it receives
*The Consumer successfully processing requests from two Producers concurrently at a rate of at least 1 req/sec from each Producer (2 req/sec in aggregate)
*The Consumer and Producer should log all messages they generate and receive.

You are free to support more than simple addition, but it is not required.


The end product should:
===================

*Be built in strict JavaScript and run with NodeJS
*NOT rely on any external services like Redis, ZeroMQ or similar technologies
*NOT use Express (Connect is Ok)
*Include UML Activity Diagram and UML Sequence Diagram documenting the business logic
*Include Unit tests


To Run:
==========

1. Run `npm install` 
2. Run `node start.js`. By the default config, this will initiate the consumer and 2 producers as well as start triggering looping requests to demonstrate producer/consumer interactions (sending and receiving data)
3. optionally: may also manually GET `http://localhost:8080/produce` and `http://localhost:8081/produce`


To Test: 
===========
1. Run `mocha` This creates 2 producers and by default runs through 10 requests each, testing for requests processing time average of at minimum 1 sec per producer


UML Diagrams: 
===========

![UML Sequence Diagram](/images/sequence-diagram.jpg?raw=true "UML Sequence Diagram")

![UML Activity Diagram](/images/activity-diagram.jpg?raw=true "UML Activity Diagram")