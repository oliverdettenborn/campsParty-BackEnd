const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods : '*'
}
app.use(cors(corsOptions));
app.use(express.json());

const authMiddleware = require('./middleware/authMiddleware');
const subscriptionController = require('./controllers/subscriptionController');
const usersControllers = require('./controllers/usersControllers');
const choicesController = require('./controllers/choicesController');

//users
app.post('/api/users/sign-up', usersControllers.postSignUp);
app.post('/api/users/sign-in', usersControllers.postSignIn);
app.post('/api/users/sign-out', authMiddleware, usersControllers.postSignOut);
app.put('/api/users/ticketType', authMiddleware, usersControllers.putTicketType);

//choices
app.get('/api/event/activities/:day', authMiddleware, choicesController.getActivities);
app.post('/api/event/users/activities', authMiddleware, choicesController.postFormActivities);
app.put('/api/event/users/activities', authMiddleware, choicesController.editFormActivities);
app.get('/api/event/activities/user', authMiddleware, choicesController.getActivitiesByUserId);

//rotas não autenticadas para conseguir carregar a informação do hotel no context
app.get('/api/partners/hotels', choicesController.getHotels);
app.get('/api/partners/not-hotels', choicesController.getNotHotelsData);

//subscription
app.post('/api/user/subscription', authMiddleware, subscriptionController.create);
app.put('/api/user/subscription', authMiddleware, subscriptionController.changeData);
app.get('/api/user/subscription', authMiddleware, subscriptionController.getSubscription);


module.exports = app;