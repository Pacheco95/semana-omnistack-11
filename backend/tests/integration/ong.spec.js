const request = require('supertest');
const HttpStatus = require('http-status-codes');

const app = require('../../src/app');
const dbconn = require('../../src/database/connection');

describe('ong', () => {

  beforeEach(async () => {
    await dbconn.migrate.latest();
  });

  afterEach(async () => {
    await dbconn.migrate.rollback();
  });

  afterAll(async () => {
    await dbconn.destroy();
  });

  it('should create a new ONG', async () => {
    const response = await request(app).post('/ongs').send({
      name: 'APAD',
      email: 'contato@apad.com.br',
      password: 'testpassword',
      whatsapp: '31922224444',
      city: 'São Paulo',
      uf: 'SP'
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('should throw duplicated mail error', async () => {
    const newOng = {
      name: 'APAD',
      email: 'contato@apad.com.br',
      password: 'testpassword',
      whatsapp: '31922224444',
      city: 'São Paulo',
      uf: 'SP'
    };

    await request(app).post('/ongs').send(newOng);
    const response = await request(app).post('/ongs').send(newOng);

    expect(response.status).toBe(HttpStatus.CONFLICT);
  });
});
