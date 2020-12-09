const db = require('../database');

async function create(userId, cpf, data){
  const { 
    name,
    lastName,
    address,
    numberAddress,
    addOnAddress,
    city,
    uf,
    postalCode,
    gender,
    ticketType,
    accommodationId,
    phone,
    admissionCost
  } = data

  const result = await db.query(
    'INSERT INTO subscription (name, "lastName", address, "numberAddress", "addOnAddress", city, uf, "postalCode", gender, "ticketType", "accommodationId", phone, "admissionCost", "userId", cpf) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *',
    [name, lastName, address, numberAddress, addOnAddress, city, uf, postalCode, gender, ticketType, parseInt(accommodationId), phone, admissionCost, userId, cpf]
  )

  return result.rows[0]
}

module.exports = {
  create,
}