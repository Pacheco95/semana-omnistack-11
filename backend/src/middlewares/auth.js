const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(HttpStatus.UNAUTHORIZED).json({
      error: 'No token provided'
    });
  }

  const parts = authHeader.split(' ');

  const [scheme, token] = parts;

  if (parts.length !== 2 || scheme !== 'Bearer') {
    return response.status(HttpStatus.UNAUTHORIZED).json({
      error: 'Malformed token'
    });
  }

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        error: 'Invalid token'
      });
    }

    request.ongId = decoded.id;
    return next();
  });
};