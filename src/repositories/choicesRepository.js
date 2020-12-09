const connection = require("../database/pool");

async function getHotelsData() {
    const response = await connection.query('SELECT * FROM hotels');
    return response.rows;
}

async function getActivitiesData() {
    const response = await connection.query('SELECT * FROM activities');
    return response.rows;
}

module.exports = { getHotelsData, getActivitiesData };