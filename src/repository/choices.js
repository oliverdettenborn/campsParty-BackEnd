const connection = require("../database/index");

async function getHotelsData() {
    const response = await connection.query("SELECT * FROM hotels WHERE type = 'hotel'");
    return response.rows;
}

async function getNotHotelsData() {
    const response = await connection.query("SELECT * FROM hotels WHERE NOT type = 'hotel'");
    return response.rows;
}

async function getActivitiesData(day) {
    const response = await connection.query(`SELECT * FROM "activities-${day}"`);
    return response.rows;
}

module.exports = { getHotelsData, getActivitiesData, getNotHotelsData };