const supertest = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

const cleanDatabase = async () => {
  await db.query('DELETE FROM subscription');
  await db.query('DELETE FROM sessions');
  await db.query('DELETE FROM choices');
  await db.query('DELETE FROM users');
}

beforeAll(cleanDatabase);

afterAll(async () => {
  await cleanDatabase();
  db.end();
});

let token;

describe('POST /sign-up', () => {
  it ('should return status 201 -> success with valid params', async () => {
    const body = {
        cpf: '111.111.111-11',
        email: 'teste@gmail.com',
        password: '1234567',
        passwordConfirmation: '1234567',
        ticketType: 'hotel'
    }

    const response = await supertest(app).post('/api/users/sign-up').send(body);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
        cpf: '111.111.111-11',
        email: 'teste@gmail.com',
        ticketType: 'hotel',
        completeRegistration: false
    });

    expect(response.body).toHaveProperty('id');
  });
});

describe('POST /sign-in', () => {
  it ('should return status 200 -> success in sign-in', async () => {
      const body = {
          email: 'teste@gmail.com',
          password: '1234567'
      }
      const response = await supertest(app).post('/api/users/sign-in').send(body);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
          cpf: '111.111.111-11',
          email: 'teste@gmail.com',
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('token');
      token = response.body.token;
  });
});

describe('GET /partners/hotels', () => {
    it ('should return 200 if nothing goes wrong', async () => {
        const response = await supertest(app)
            .get('/api/partners/hotels');

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});

describe ('POST /api/event/users/activities', () => {
    it ('should return status 201 -> successful activities post', async () => {
        const body = {
            friday: {
                morning: 'activity1',
                afternoon: 'activity2',
                night: 'activity3'
            },
            saturday: {
                morning: 'activity4',
                afternoon: 'activity5',
                night: 'activity6'
            },
            sunday: {
                morning: 'activity7',
                afternoon: 'activity8',
                night: 'activity9'
            }
        };
        
        const response = await supertest(app)
            .post('/api/event/users/activities')
            .send(body)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);
    });

    it ('should return status 401 -> auth header not found', async () => {
        const response = await supertest(app).post('/api/event/users/activities');

        expect(response.status).toBe(401);
    });

    it ('should return status 401 -> wrong token', async () => {
        const response = await supertest(app)
            .post('/api/event/users/activities')
            .set('Authorization', `Bearer teste`);

        expect(response.status).toBe(401);
    });

    it ('should return 400 for incomplete requests', async () => {
        const body = {};

        const response = await supertest(app)
            .post('/api/event/users/activities')
            .send(body)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
    });
});

describe ('PUT /api/event/users/activities', () => {
    it ('should return status 200 -> successfully updates chosen activities', async () => {
        const body = {
            friday: {
                morning: 'activity10',
                afternoon: 'activity11',
                night: 'activity12'
            },
            saturday: {
                morning: 'activity13',
                afternoon: 'activity14',
                night: 'activity15'
            },
            sunday: {
                morning: 'activity16',
                afternoon: 'activity17',
                night: 'activity18'
            }
        };
        
        const response = await supertest(app)
            .put('/api/event/users/activities')
            .send(body)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    it ('should return status 401 -> auth header not found', async () => {
        const response = await supertest(app).post('/api/event/users/activities');

        expect(response.status).toBe(401);
    });

    it ('should return status 401 -> wrong token', async () => {
        const response = await supertest(app)
            .post('/api/event/users/activities')
            .set('Authorization', `Bearer teste`);

        expect(response.status).toBe(401);
    });

    it ('should return 400 for incomplete requests', async () => {
        const body = {};

        const response = await supertest(app)
            .post('/api/event/users/activities')
            .send(body)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
    });
});

describe ('GET /event/activities/:day', () => {
    it ('should return 200 if authorization headers are present and nothing goes wrong', async () => {
        const response = await supertest(app)
            .get('/api/event/activities/friday')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it ('should return status 401 -> auth header not found', async () => {
        const response = await supertest(app).get('/api/event/activities/friday');

        expect(response.status).toBe(401);
    });

    it ('should return status 401 -> wrong token', async () => {
        const response = await supertest(app)
            .get('/api/event/activities/friday')
            .set('Authorization', `Bearer teste`);

        expect(response.status).toBe(401);
    });

    it ('should return status 400 -> invalid params', async () => {
        const response = await supertest(app)
            .get('/api/event/activities/banana')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
    });
});