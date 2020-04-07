const HttpStatus = require('http-status-codes');

module.exports = {
  mailAlreadyRegisteredResponse(request, response) {
    return response.status(HttpStatus.CONFLICT).json({
      error: 'E-mail já cadastrado'
    });
  },

  invalidLogin(request, response) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      error: 'Login inválido'
    });
  }
};
