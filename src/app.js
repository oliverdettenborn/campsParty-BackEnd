require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

//importações de repositorio

const authMiddleware = require('./middleware/authMiddleware');
const registerControllers = require('./controllers/usersControllers');





//rotas do Gabriel

app.post('/api/users/sign-up', registerControllers.postSignUp);
app.post('/api/users/sign-in', registerControllers.postSignIn);
app.post('/api/users/sign-out', authMiddleware, registerControllers.postSignOut);





//rotas do Lucas







//rotas da Thalia






module.exports = app;