const dbconn = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async index (request, response) {
    const ongs = await dbconn('ongs').select('*');
    return response.json(ongs);
  },

  async create (request, response) {
    const ong = ({name, email, whatsapp, city, uf} = request.body);
  
    ong.id = generateUniqueId();
  
    await dbconn('ongs').insert(ong);
  
    return response.json({ 'id': ong.id });
  }
};
