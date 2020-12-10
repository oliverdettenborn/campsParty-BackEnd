const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const authMiddleware = require('./middleware/authMiddleware');
const subscriptionController = require('./controllers/subscriptionController');
const usersControllers = require('./controllers/usersControllers');
const choicesController = require('./controllers/choicesController');



//rotas do Gabriel

app.post('/api/users/sign-up', usersControllers.postSignUp);
app.post('/api/users/sign-in', usersControllers.postSignIn);
app.post('/api/users/sign-out', authMiddleware, usersControllers.postSignOut);





//rotas do Lucas
app.get('/partners/hotels', authMiddleware, choicesController.getHotels);
app.get('/event/activities/:day', choicesController.getActivities);
app.post('/event/activities', choicesController.postFormActivities);






//rotas da Thalia
app.post('/api/user/subscription', authMiddleware, subscriptionController.create)
app.put('/api/user/subscription', authMiddleware, subscriptionController.changeData)





module.exports = app;