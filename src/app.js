require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const subscriptionController = require('./controllers/subscriptionController');
const authMiddleware = require('./middleware/authMiddleware');
const usersControllers = require('./controllers/usersControllers');



//rotas do Gabriel

app.post('/api/users/sign-up', usersControllers.postSignUp);
app.post('/api/users/sign-in', usersControllers.postSignIn);
app.post('/api/users/sign-out', authMiddleware, usersControllers.postSignOut);





//rotas do Lucas







//rotas da Thalia
app.post('/api/user/subscription', authMiddleware, subscriptionController.create)





module.exports = app;