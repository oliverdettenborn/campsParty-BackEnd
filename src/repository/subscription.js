const db = require('../database');

async function create(userId, cpf, data){
  const { 
    name,
    lastName,
    address,
    numberAddress,
    addOnAdress,
    city,
    uf,
    postalCode,
    gender,
    ticketType,
    accommodationId,
    phone,
    admissionCost
  } = data

  const result = await(
    'INSERT INTO subscription (name, "lastName", address, "numberAddress", "addOnAdress", city, uf, "postalCode", gender, "ticketType", "accommodationId", phone, "admissionCost", "userId", cpf) RETURNING *',
    [name, lastName, address, numberAddress, addOnAdress, city, uf, postalCode, gender, ticketType, accommodationId, phone, admissionCost, userId, cpf]
  )

  return result.rows[0]
}

module.exports = {
  create,
}