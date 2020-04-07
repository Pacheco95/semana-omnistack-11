const HttpStatus = require('http-status-codes');

module.exports = {
  mailAlreadyRegisteredResponse(request, response) {
    return response.status(HttpStatus.CONFLICT).json({
      error: 'E-mail já cadastrado'
    });
  },

  ongNotFoundResponse(request, response) {
    return response.status(HttpStatus.NOT_FOUND).json({
      error: 'ONG não cadastrada'
    });
  },

  invalidPasswordResponse(request, response) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      error: 'Senha inválida'
    });
  }
};
