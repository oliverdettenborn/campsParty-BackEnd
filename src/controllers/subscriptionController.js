const subspriptionSchema = require('../schemas/subscription');
const subscriptionRepository = require('../repository/subscription');
const { stripHtml } = require('../utils/helpers');

async function create(req,res){
  try{
    const { error } = subspriptionSchema.validate(req.body);
    if (error){
      return res.status(422).send({ error: error.details[0].message });
    }
    const data = stripHtml(req.body);
    const { id, cpf } = req.user;

    const newSubscription = await subscriptionRepository.create(id, cpf, data);
    res.status(201).send(newSubscription);

  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = {
  create
};