const bcrypt = require('bcrypt');

const dbconn = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const { generateJWTToken } = require('./AuthController');
const { findOngByEmail } = require('../utils/commonQueries');
const { mailAlreadyRegisteredResponse } = require('../utils/commonResponses');


module.exports = {
  async index(request, response) {
    const ongs = await dbconn('ongs')
      .select(["id", "name", "email", "whatsapp", "city", "uf"]);
    return response.json(ongs);
  },

  async create(request, response) {
    const ong = ({ name, password, email, whatsapp, city, uf } = request.body);

    const registeredOng = await findOngByEmail(email);

    if (registeredOng) {
      return mailAlreadyRegisteredResponse(request, response);
    }

    ong.id = generateUniqueId();

    const encryptedPassword = bcrypt.hashSync(password, 10);

    ong.password = encryptedPassword;

    await dbconn('ongs').insert(ong);

    const token = await generateJWTToken({ id: ong.id });

    return response.json({ 'id': ong.id, token });
  }
};
