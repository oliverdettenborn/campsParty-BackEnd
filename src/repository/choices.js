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

async function postChosenActivities(userActivities, userId) {
    const days = ['friday', 'saturday', 'sunday'];
    const momentsOfTheDay = ['morning', 'afternoon', 'night'];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const weekDay = days[i];
            const hourOfTheDay = momentsOfTheDay[j];

            const toDB = [userId, hourOfTheDay, userActivities[weekDay][hourOfTheDay], weekDay];
            await connection.query(
                'INSERT INTO choices ("userId", "hourOfTheDay", activity, day) VALUES ($1, $2, $3, $4)',
                toDB
            );
            await db.query('UPDATE users SET "choosedActivities"=true');
        }
    }
}

async function updateChosenActivities(newActivities, userId) {
    const days = ['friday', 'saturday', 'sunday'];
    const momentsOfTheDay = ['morning', 'afternoon', 'night'];

    await connection.query('DELETE FROM choices WHERE "userId" = $1', [userId]);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const weekDay = days[i];
            const hourOfTheDay = momentsOfTheDay[j];

            const toDB = [userId, hourOfTheDay, newActivities[weekDay][hourOfTheDay], weekDay];
            await connection.query(
                'INSERT INTO choices ("userId", "hourOfTheDay", activity, day) VALUES ($1, $2, $3, $4)',
                toDB
            );
        }
    }
}

async function getActivitiesDataById(id) {
    const response = await connection.query(`SELECT * FROM choices WHERE userId = $1`, [id]);
    return response.rows;
}


module.exports = {
    getHotelsData,
    getActivitiesData,
    postChosenActivities,
    getNotHotelsData,
    updateChosenActivities,
    getActivitiesDataById
};