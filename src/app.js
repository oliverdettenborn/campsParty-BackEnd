require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

//importações de repositorio


const SubscriptionController = require('./controllers/subscriptionController');
const AuthMiddleware = require('./middleware/authMiddleware');




//rotas do Gabriel







//rotas do Lucas







//rotas da Thalia
app.post('/api/user/subscription', AuthMiddleware, SubscriptionController.create)





module.exports = app;