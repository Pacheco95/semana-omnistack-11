const dbconn = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async index (request, response) {
    const ongs = await dbconn('ongs').select('*');
    return response.json(ongs);
  },

  async create (request, response) {
    const ong = ({name, email, whatsapp, city, uf} = request.body);
  
    ong.id = crypto.randomBytes(4).toString('HEX');
  
    await dbconn('ongs').insert(ong);
  
    return response.json({ 'id': ong.id });
  }
};
