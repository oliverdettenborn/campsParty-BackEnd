const uuid = require('uuid');
const db = require('../database/pool');

const createByUserId = async (userId) => {
    const token = uuid.v4();
    const queryString = 'INSERT INTO sessions ("userId", token) VALUES ($1, $2) RETURNING *';
    const sessionResult = await db.query(queryString, [userId, token])

    return sessionResult.rows[0];
}

const findByToken = async (token) => {
    const queryString = 'SELECT * FROM sessions WHERE token = $1';
    const session = await db.query(queryString, [token]);

    return session.rows[0];
}

const destroyByUserId = async (userId) => {
    const queryString = 'DELETE FROM sessions WHERE "userId" = $1';
    await db.query(queryString, [userId]);
}

module.exports = {
    createByUserId,
    findByToken,
    destroyByUserId,
}