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
    accommodationId,
    phone,
    admissionCost
  } = data

  const result = await db.query(
    'INSERT INTO subscription (name, "lastName", address, "numberAddress", "addOnAddress", city, uf, "postalCode", gender, "accommodationId", phone, "admissionCost", "userId", cpf) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *',
    [name, lastName, address, numberAddress, addOnAddress, city, uf.toUpperCase(), postalCode, gender, parseInt(accommodationId), phone, admissionCost, userId, cpf]
  )

  await db.query('UPDATE users SET "completeRegistration"=true')
  return result.rows[0]
}

async function changeInformationUser(userId,oldData, data) {
  const name = data.name || oldData.name;
  const lastName = data.lastName || oldData.lastName;
  const address = data.address || oldData.address;
  const numberAddress = data.numberAddress || oldData.numberAddress;
  const addOnAddress = data.addOnAddress || oldData.addOnAddress;
  const city = data.city || oldData.city;
  const uf = data.uf || oldData.uf;
  const postalCode = data.postalCode || oldData.postalCode;
  const gender = data.gender || oldData.gender;
  const accommodationId = parseInt(data.accommodationId) || oldData.accommodationId;
  const phone = data.phone || oldData.phone;
  const admissionCost = data.admissionCost || oldData.admissionCost;

  const result = await db.query(
    'UPDATE subscription SET name=$2, "lastName"=$3, address=$4, "numberAddress"=$5, "addOnAddress"=$6, city=$7, uf=$8, "postalCode"=$9, gender=$10, "accommodationId"=$11, phone=$12, "admissionCost"=$13 WHERE "userId"=$1 RETURNING *',
    [userId, name, lastName, address, numberAddress, addOnAddress, city, uf.toUpperCase(), postalCode, gender, accommodationId, phone, admissionCost]
  )
  return result.rows[0];
}

async function findByUserId(userId) {
  const result = await db.query(
    'SELECT * FROM subscription WHERE "userId"=$1',
    [userId]
  )
  return result.rows[0]
}

module.exports = {
  create,
  findByUserId,
  changeInformationUser,
}