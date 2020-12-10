const db = require('../database');
const bcrypt = require('bcrypt');

const isEmailOrCpfUnique = async (email, cpf) => {
    const queryString = 'SELECT * FROM users WHERE email = $1 OR cpf = $2';
    const isUnique = await db.query(queryString, [email, cpf]);

    return !isUnique.rows[0];
}

const create = async (userParams) => {
    const { email, password, cpf, ticketType } = userParams;
    const hashPassword = bcrypt.hashSync(password, 10);

    const queryString = 'INSERT INTO users (cpf, email, password, "ticketType") VALUES ($1, $2, $3,$4) RETURNING *';
    const result = await db.query(queryString, [cpf, email, hashPassword, ticketType]);
    return result.rows[0];
}

const findByEmailAndPassword = async (userParams) => {
    const { email, password } = userParams;
    const queryString = 'SELECT * FROM users WHERE email = $1';
    const userResults = await db.query(queryString, [email]);
    const user = userResults.rows[0];

    if (!user) return undefined;
    if (!bcrypt.compareSync(password, user.password)) return undefined;

    return user;
}

const findById = async (id) => {
    const queryString = 'SELECT * FROM users WHERE id = $1';
    const user = await db.query(queryString, [id]);

    return user.rows[0];
}

const changeTicketType = async (id, newType) => {
    const result = await db.query(
        'UPDATE users SET "ticketType"=$1 WHERE id=$2 RETURNING *',
        [newType, id]
    )
    return result.rows[0]
}

module.exports = {
    isEmailOrCpfUnique,
    create,
    findByEmailAndPassword,
    findById,
    changeTicketType
}