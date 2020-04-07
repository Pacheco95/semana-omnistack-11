const jwt = require('jsonwebtoken');
const { seconds, days } = require('time-convert')

const { findOngByEmail } = require('../utils/commonQueries');
const { ongNotFoundResponse, invalidPasswordResponse } = require('../utils/commonResponses');
const { validatePassword } = require('../utils/commonValidations');
const authConfig = require('../config/auth');

function generateJWTToken(payload = {}) {
  return jwt.sign(payload, authConfig.secret, {
    expiresIn: days.to(seconds)(1)[0]
  });
}

module.exports = {
  async authenticate(request, response) {
    const { email, password } = request.body;

    const ong = await findOngByEmail(email);

    if (!ong) {
      return ongNotFoundResponse(request, response);
    }
  
    if (!validatePassword(password, ong.password)) {
      return invalidPasswordResponse(request, response);
    }
  
    const token = generateJWTToken({ id: ong.id });

    return response.json({ ong, token });
  },

  generateJWTToken
}
