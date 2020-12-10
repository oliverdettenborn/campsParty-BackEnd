const supertest = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

const cleanDatabase = async () => {
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
    it ('should return status 422 -> with invalid params', async () => {
        const body = {
            cpf: '45',
            email: '123',
            password: '57',
            passwordConfirmation: '', 
        }

        const response = await supertest(app).post('/api/users/sign-up').send(body);

        expect(response.status).toBe(422);
    });

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

    it ('should return status 409 -> email is already users', async () => {
        const body = {
            cpf: '222.222.222-22',
            email: 'teste@gmail.com',
            password: '1234567',
            passwordConfirmation: '1234567'
        }

        const response = await supertest(app).post('/api/users/sign-up').send(body);

        expect(response.status).toBe(409);
    });

    it ('should return status 409 -> cpf is already users', async () => {
        const body = {
            cpf: '111.111.111-11',
            email: 'teste2@gmail.com',
            password: '1234567',
            passwordConfirmation: '1234567'
        }

        const response = await supertest(app).post('/api/users/sign-up').send(body);

        expect(response.status).toBe(409);
    });

    it ('should return status 200 -> test stripHtml function', async () => {
        const body = {
            cpf: '222.222.222-22',
            email: '  <h1> teste5@gmail.com </h1>  ',
            password: '1234567   ',
            passwordConfirmation: '   1234567'
        }

        const response = await supertest(app).post('/api/users/sign-up').send(body);

        expect(response.status).toBe(201);
    });
});

describe('POST /sign-in', () => {
    it ('should return status 422 -> invalid params', async () => {
        const body = {
            email: '123.com',
            password: ''
        }

        const response = await supertest(app).post('/api/users/sign-in').send(body);

        expect(response.status).toBe(422);
    });

    it ('should return status 401 -> Wrong email', async () => {
        const body = {
            email: 'aaaaaa@gmail.com',
            password: '1234567'
        }

        const response = await supertest(app).post('/api/users/sign-in').send(body);

        expect(response.status).toBe(401);
    });

    it ('should return status 401 -> Wrong password', async () => {
        const body = {
            email: 'teste@gmail.com',
            password: '9999999'
        }

        const response = await supertest(app).post('/api/users/sign-in').send(body);

        expect(response.status).toBe(401);
    });

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

describe('POST /sign-out', () => {
    it ('should return status 401 -> auth header not found', async () => {
        const response = await supertest(app).post('/api/users/sign-out');

        expect(response.status).toBe(401);
    });

    it ('should return status 401 -> wrong token', async () => {
        const response = await supertest(app)
            .post('/api/users/sign-out')
            .set('Authorization', `Bearer teste`);

        expect(response.status).toBe(401);
    });

    it('should return 401 on wrong structure token', async () => {
        const response = await supertest(app)
            .post('/api/users/sign-out')
            .set('Authorization',` ${token}`);

        expect(response.status).toBe(401);
    });

    it ('should return status 200 -> success sing-out', async () => {

        const response = await supertest(app)
            .post('/api/users/sign-out')
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
    });

    it('should return 401 after user sucess sign-out', async () => {
        const response = await supertest(app)
            .post('/api/users/sign-out')
            .set('Authorization',`Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });
});