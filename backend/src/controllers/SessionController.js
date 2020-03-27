const dbconn = require('../database/connection');
const HttpStatus = require('http-status-codes');

module.exports = {
  async create (request, response) {
    const ong_id = request.body.id;

    const ong = await dbconn('ongs')
      .where('id', ong_id)
      .select('name')
      .first();

    if (!ong) {
      const errorMessage = { error: `ONG '${ong_id}' not found`};
      return response.status(HttpStatus.NOT_FOUND).json(errorMessage);
    }

    return response.json(ong);
  }
};
