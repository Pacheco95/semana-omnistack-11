const request = require('supertest');
const app = require('../../src/app');
const dbconn = require('../../src/database/connection');

describe('ong', () => {

  beforeEach(async () => {
    await dbconn.migrate.rollback();
    await dbconn.migrate.latest();
  });

  afterAll(async () => {
    await dbconn.migrate.rollback();
    await dbconn.destroy()
  });

  it('should create a new ONG', async () => {
    const response = await request(app).post('/ongs').send({
      name: "APAD",
      email: "contato@apad.com.br",
      whatsapp: "31922224444",
      city: "São Paulo",
      uf: "SP"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
