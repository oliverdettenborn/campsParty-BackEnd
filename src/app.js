const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

//importações de repositorio
const authMiddleware = require('./middleware/authMiddleware');
const { choicesController } = require('./controllers');






//rotas do Gabriel







//rotas do Lucas
app.get('/partners/hotels', authMiddleware, choicesController.getHotels);
app.get('/event/activities', authMiddleware, choicesController.getActivites);






//rotas da Thalia






module.exports = app;