const dbconn = require('../database/connection');
const HttpStatus = require('http-status-codes');

const PAGE_SIZE = 5;

module.exports = {
  async index (request, response) {
    const {page = 1} = request.query;

    const [totalCount] = await dbconn('incidents').count();

    const incidents = await dbconn('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ongId')
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE)
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);


    return response
      .header('X-Total-Count', totalCount['count(*)'])
      .header('X-Page-Size', PAGE_SIZE)
      .json(incidents);
  },

  async create (request, response) {
    const ong = ({title, description, value} = request.body);

    ong.ongId = request.ongId;

    const [id] = await dbconn('incidents').insert(ong);

    return response.json({ id });
  },
  
  async delete (request, response) {
    const incidentIdToDelete = request.params.id;
    
    loggedOngId = request.ongId;

    const incident = await dbconn('incidents')
      .where('id', incidentIdToDelete)
      .select('ongId')
      .first();

    if (!incident) {
      const errorResponse = {
        error: `Incident with id '${incidentIdToDelete}' not found`
      }
      return response.status(HttpStatus.NOT_FOUND).json(errorResponse).send();
    }

    if (loggedOngId !== incident.ongId) {
      const errorResponse = {
        error: "You don't have permisson to delete this incident"
      }
      return response.status(HttpStatus.UNAUTHORIZED).json(errorResponse).send();
    }

    await dbconn('incidents').where('id', incidentIdToDelete).delete();

    return response.status(HttpStatus.NO_CONTENT).send();
  }
};
