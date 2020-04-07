const request = require('supertest');
const HttpStatus = require('http-status-codes');

const app = require('../../src/app');
const dbconn = require('../../src/database/connection');

describe('incident', () => {

  beforeEach(async () => {
    await dbconn.migrate.latest();
  });

  afterEach(async () => {
    await dbconn.migrate.rollback();
  });

  afterAll(async () => {
    await dbconn.destroy();
  });

  it('should create a new incident', async () => {
    const createONGResponse = await request(app)
      .post('/ongs')
      .send({
        name: 'APAD',
        email: 'contato@apad.com.br',
        password: 'testpassword',
        whatsapp: '31922224444',
        city: 'São Paulo',
        uf: 'SP'
      });

    const createIncidentResponse = await request(app)
    .post('/incidents')
    .set('Authorization', `Bearer ${createONGResponse.body.token}`)
    .send({
      title: 'Test',
      description: 'Test',
      value: 150.99
    });

    expect(createIncidentResponse.body).toHaveProperty('id');
  });
});
