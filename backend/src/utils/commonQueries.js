const dbconn = require('../database/connection');

module.exports = {

  async findOngByEmail(ongEmail, projection='*') {
    return await dbconn('ongs')
      .where('email', ongEmail)
      .select(projection)
      .first();
  },

  async findOngById(ongId, projection='*') {
    return await dbconn('ongs')
      .where('if', ongId)
      .select(projection)
      .first();
  }

};
