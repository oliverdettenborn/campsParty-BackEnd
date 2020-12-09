const subspriptionSchema = require('../schemas/subscription');
const SubscriptionRepository = require('../repository/subscription');
const { stripHtml } = require('../utils/helpers');

async function create(req,res){
  try{
    if (subspriptionSchema.validate(req.body).error){
      return res.status(422).send({ error: error.details[0].message });
    }
    const data = stripHtml(req.body);
    const { userId, cpf } = req.user;

    const newSubscription = await SubscriptionRepository.create(userId, cpf, data);
    res.status(201).send(newSubscription);

  }catch(error){
    console.error(error);
    return res.sendStatus(500);
  }
}

module.exports = create;