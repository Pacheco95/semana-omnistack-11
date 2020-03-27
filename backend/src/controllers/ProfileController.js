const dbconn = require('../database/connection');

module.exports = {
  async index (request, response) {
    const ongId = request.headers.authorization;

    const incidents = await dbconn('incidents')
      .where('ong_id', ongId)
      .select('*');
    
    return response.json(incidents);
  }
}