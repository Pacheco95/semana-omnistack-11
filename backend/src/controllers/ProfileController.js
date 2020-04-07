const dbconn = require('../database/connection');

module.exports = {
  async index (request, response) {
    const ongId = request.ongId;

    const incidents = await dbconn('incidents')
      .where('ongId', ongId)
      .select('*');
    
    return response.json(incidents);
  }
}