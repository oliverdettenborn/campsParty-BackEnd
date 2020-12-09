require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const SubscriptionController = require('./controllers/subscriptionController');
const AuthMiddleware = require('./middleware/authMiddleware');
const UsersControllers = require('./controllers/usersControllers');



//rotas do Gabriel

app.post('/api/users/sign-up', UsersControllers.postSignUp);
app.post('/api/users/sign-in', UsersControllers.postSignIn);
app.post('/api/users/sign-out', AuthMiddleware, usersControllers.postSignOut);





//rotas do Lucas







//rotas da Thalia
app.post('/api/user/subscription', AuthMiddleware, SubscriptionController.create)





module.exports = app;