const bcrypt = require('bcrypt');

module.exports = {
  validatePassword (unencriptedPassord, encryptedPassword) {
    return bcrypt.compareSync(unencriptedPassord, encryptedPassword);
  }
}