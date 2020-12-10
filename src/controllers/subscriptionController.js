const subspriptionSchema = require('../schemas/subscription');
const subscriptionRepository = require('../repository/subscription');
const usersRepository = require('../repository/users');
const { stripHtml, filterObject } = require('../utils/helpers');

async function create(req,res){
  try{
    const { error } = subspriptionSchema.validate(req.body);
    if (error){
      return res.status(422).send({ error: error.details[0].message });
    }
    const data = stripHtml(req.body);
    const { id, cpf } = req.user;

    const newSubscription = await subscriptionRepository.create(id, cpf, data);
    const updateUser = await usersRepository.findById(id);
    const userData = filterObject(updateUser, ['password']);

    res.status(201).send({
      user: userData,
      subscription: newSubscription
    });

  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

async function changeData(req,res){
  try{
    const { error } = subspriptionSchema.validate(req.body);
    if (error){
      return res.status(422).send({ error: error.details[0].message });
    }
    const data = stripHtml(req.body);
    const { id } = req.user;

    const oldSubscription = await subscriptionRepository.findByUserId(id);
    if(!oldSubscription){
      return res.status(404).send({ error: 'Subscription not found' })
    }
    const refreshSubscription = await subscriptionRepository.changeInformationUser(id, oldSubscription, data);
    const updateUser = await usersRepository.findById(id);
    const userData = filterObject(updateUser, ['password']);
    
    res.status(201).send({
      user: userData,
      subscription: refreshSubscription
    });

  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = {
  create,
  changeData
};