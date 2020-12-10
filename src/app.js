const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
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
app.get('/partners/hotels', authMiddleware, choicesController.getHotels);
//app.get('/partners/not-hotels', authMiddleware, choicesController.getNotHotelsData);
app.get('/event/activities/:day', authMiddleware, choicesController.getActivities);

//subscription
app.post('/api/user/subscription', authMiddleware, subscriptionController.create)
app.put('/api/user/subscription', authMiddleware, subscriptionController.changeData)
app.get('/api/user/subscription', authMiddleware, subscriptionController.getSubscription)





module.exports = app;