#!/usr/bin/env node

const debug = require('debug')('localapp:server')

const defaultPort = 3579

let port = defaultPort
let server = {}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const result = parseInt(val, 10);

  if (isNaN(result)) {
    // named pipe
    return val;
  }

  if (result >= 0) {
    // port number
    return result;
  }

  return false;
}


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


/**
 * Create HTTP server.
*/

function initialize() {
  /**
   * Module dependencies.
   */
  
  const app = require('./app');
  const http = require('http');
  
  
  /**
   * Get port from environment and store in Express.
   */
  
  port = normalizePort(process.env.PORT || defaultPort)
  app.set('port', port)
  
  server = http.createServer(app)
  
  
  /**
   * Listen on provided port, on all network interfaces.
  */

  debug('STARTING SERVER ' + port)
  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
  
  
  return server
}


module.exports = initialize