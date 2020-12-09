const supertest = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

const cleanDatabase = async () => {
  await db.query('DELETE FROM subscription');
  await db.query('DELETE FROM sessions');
  await db.query('DELETE FROM users');
}

beforeAll(cleanDatabase);

afterAll(async () => {
  await cleanDatabase();
  db.end();
});

let token, userId;

describe('POST /sign-up', () => {
  it ('should return status 201 -> success with valid params', async () => {
      const body = {
          cpf: '111.111.111-11',
          email: 'teste@gmail.com',
          password: '1234567',
          passwordConfirmation: '1234567'
      }

      const response = await supertest(app).post('/api/users/sign-up').send(body);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
          cpf: '111.111.111-11',
          email: 'teste@gmail.com',
      });

      expect(response.body).toHaveProperty('id');
      userId = response.body.id;
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

describe('POST /user/subscription', () => {
  it('should return status 201 when sucess to finish addmission', async () => {
    const body = {
      name: 'Teste',
      lastName: 'da Siva',
      address: 'R. do teste',
      numberAddress: '150',
      addOnAddress: 'apto 001',
      city: 'Testelândia',
      uf: 'TT',
      postalCode: '90000-000',
      gender: 'NI',
      ticketType: 'none',
      accommodationId: "6",
      phone: '(99) 12345-6789',
      admissionCost: '0,00',
    }

    const objresponse = {
      name: 'Teste',
      lastName: 'da Siva',
      address: 'R. do teste',
      numberAddress: "150",
      addOnAddress: 'apto 001',
      city: 'Testelândia',
      uf: 'TT',
      postalCode: '90000-000',
      gender: 'NI',
      ticketType: 'none',
      accommodationId: 6,
      phone: '(99) 12345-6789',
      admissionCost: 'R$ 0,00',
    }

    const response = await supertest(app).post('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(objresponse);
    expect(response.body).toHaveProperty('id');
  });

  it('should return status 401 when dont send token', async () => {
    const body = {
      name: 'Teste',
      lastName: 'da Siva',
      address: 'R. do teste',
      numberAddress: 150,
      addOnAdress: 'apto 001',
      city: 'Testelândia',
      uf: 'TT',
      postalCode: '90000-000',
      gender: 'NI',
      ticketType: 'none',
      accommodationId: 6,
      phone: '(99) 12345-6789',
      admissionCost: '0,00',
    }

    const response = await supertest(app).post('/api/user/subscription').send(body);
    expect(response.status).toBe(401);
  });

  it('should return status 422 when missing atribute', async () => {
    const body = {
      name: 'Teste',
      lastName: 'da Siva',
    }

    const response = await supertest(app).post('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);;
    expect(response.status).toBe(422);
  });

  it('should return status 422 when send data with wrong format UF', async () => {
    const body = {
      name: 'Teste',
      lastName: 'da Siva',
      address: 'R. do teste',
      numberAddress: 150,
      addOnAdress: '001',
      city: 'Testelândia',
      uf: 'TTTTTTT',
      postalCode: '90000000',
      gender: 'NI',
      ticketType: 'none',
      accommodationId: 6,
      phone: '99123456789',
      admissionCost: '0.00',
    }
    const response = await supertest(app).post('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);;
    expect(response.status).toBe(422);
  });

  it('should return status 422 when send data with wrong format postalCode', async () => {
    const body = {
      name: 'Teste',
      lastName: 'da Siva',
      address: 'R. do teste',
      numberAddress: 150,
      addOnAdress: '001',
      city: 'Testelândia',
      uf: 'TT',
      postalCode: '90000000',
      gender: 'F',
      ticketType: 'none',
      accommodationId: 6,
      phone: '99123456789',
      admissionCost: '0.00',
    }
    const response = await supertest(app).post('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);;
    expect(response.status).toBe(422);
  });

  it('should return status 422 when send data with wrong format phone', async () => {
    const body = {
      name: 'Teste',
      lastName: 'da Siva',
      address: 'R. do teste',
      numberAddress: 150,
      addOnAdress: '001',
      city: 'Testelândia',
      uf: 'TT',
      postalCode: '90000-000',
      gender: 'M',
      ticketType: 'none',
      accommodationId: 6,
      phone: '99123456789',
      admissionCost: '0.00',
    }
    const response = await supertest(app).post('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);;
    expect(response.status).toBe(422);
  });
  
  it('should return status 422 when send data with wrong format adissionCost', async () => {
    const body = {
      name: 'Teste',
      lastName: 'da Siva',
      address: 'R. do teste',
      numberAddress: 150,
      addOnAdress: '001',
      city: 'Testelândia',
      uf: 'TT',
      postalCode: '90000-000',
      gender: 'M',
      ticketType: 'none',
      accommodationId: 6,
      phone: '(99) 12345-6789',
      admissionCost: '0.00',
    }
    const response = await supertest(app).post('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);;
    expect(response.status).toBe(422);
  });
})

describe('PUT /user/subscription', () => {
  it('should return status 201 when sucess to change addmission', async () => {
    const body = {
      name: 'Alteração',
      lastName: 'da Siva',
      address: 'R. da alteração',
      numberAddress: '150',
      addOnAddress: 'apto 002',
      city: 'Alterolândia',
      uf: 'Al',
      postalCode: '90000-000',
      gender: 'NI',
      ticketType: 'hotel',
      accommodationId: "2",
      phone: '(99) 12345-6789',
      admissionCost: '220,00',
    }

    const objresponse = {
      name: 'Alteração',
      lastName: 'da Siva',
      address: 'R. da alteração',
      numberAddress: '150',
      addOnAddress: 'apto 002',
      city: 'Alterolândia',
      uf: 'AL',
      postalCode: '90000-000',
      gender: 'NI',
      ticketType: 'hotel',
      accommodationId: 2,
      phone: '(99) 12345-6789',
      admissionCost: 'R$ 220,00',
    }

    const response = await supertest(app).put('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(objresponse);
    expect(response.body).toHaveProperty('id');
  });

  it('should return status 401 when dont send token', async () => {
    const body = {
      name: 'Alteração',
      lastName: 'da Siva',
      address: 'R. da alteração',
      numberAddress: '150',
      addOnAddress: 'apto 002',
      city: 'Alterolândia',
      uf: 'AL',
      postalCode: '90000-000',
      gender: 'NI',
      ticketType: 'hotel',
      accommodationId: "2",
      phone: '(99) 12345-6789',
      admissionCost: '220,00',
    }

    const response = await supertest(app).put('/api/user/subscription').send(body);
    expect(response.status).toBe(401);
  });

  it('should return status 422 when missing atribute', async () => {
    const body = {
      name: 'Alteração',
      lastName: 'da Siva',
    }

    const response = await supertest(app).put('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);;
    expect(response.status).toBe(422);
  });

  it('should return status 422 when send data with wrong format UF', async () => {
    const body = {
      name: 'Alteração',
      lastName: 'da Siva',
      address: 'R. da alteração',
      numberAddress: '150',
      addOnAddress: 'apto 002',
      city: 'Alterolândia',
      uf: 'ALLLLLL',
      postalCode: '90000-000',
      gender: 'NI',
      ticketType: 'hotel',
      accommodationId: "2",
      phone: '(99) 12345-6789',
      admissionCost: '220,00',
    }
    const response = await supertest(app).put('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);;
    expect(response.status).toBe(422);
  });

  it('should return status 422 when send data with wrong format postalCode', async () => {
    const body = {
      name: 'Alteração',
      lastName: 'da Siva',
      address: 'R. da alteração',
      numberAddress: '150',
      addOnAddress: 'apto 002',
      city: 'Alterolândia',
      uf: 'ALLLLLL',
      postalCode: '9-000',
      gender: 'NI',
      ticketType: 'hotel',
      accommodationId: "2",
      phone: '(99) 12345-6789',
      admissionCost: '220,00',
    }
    const response = await supertest(app).put('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);;
    expect(response.status).toBe(422);
  });

  it('should return status 422 when send data with wrong format phone', async () => {
    const body = {
      name: 'Alteração',
      lastName: 'da Siva',
      address: 'R. da alteração',
      numberAddress: '150',
      addOnAddress: 'apto 002',
      city: 'Alterolândia',
      uf: 'ALLLLLL',
      postalCode: '90000-000',
      gender: 'NI',
      ticketType: 'hotel',
      accommodationId: "2",
      phone: '12345-6789',
      admissionCost: '220,00',
    }
    const response = await supertest(app).put('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);;
    expect(response.status).toBe(422);
  });
  
  it('should return status 422 when send data with wrong format adissionCost', async () => {
    const body = {
      name: 'Alteração',
      lastName: 'da Siva',
      address: 'R. da alteração',
      numberAddress: '150',
      addOnAddress: 'apto 002',
      city: 'Alterolândia',
      uf: 'ALLLLLL',
      postalCode: '90000-000',
      gender: 'NI',
      ticketType: 'hotel',
      accommodationId: "2",
      phone: '(99) 12345-6789',
      admissionCost: '220.00',
    }
    const response = await supertest(app).put('/api/user/subscription').send(body).set('Authorization',`Bearer ${token}`);;
    expect(response.status).toBe(422);
  });
})