var winston = require('winston');

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            handleExceptions: false,
            json: false,
            colorize: true
        })
    ],
    exitOnError: true
});

module.exports = logger;