const connection = require("../database/index");

async function getHotelsData() {
    const response = await connection.query("SELECT * FROM hotels WHERE type = 'hotel'");
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
            console.log(toDB);
            const response = await connection.query(
                // 'INSERT INTO choices ("userId", "hourOfTheDay", activity, day) VALUES ($1, $2, $3, $4) RETURNING *',
                'SELECT * FROM choices',
                toDB
            );

            console.log(response.rows[0]);
        }
    }
}

module.exports = { getHotelsData, getActivitiesData, postChosenActivities };

// {
//     friday: {
//       morning: 'abc',
//       afternoon: 'bcd',
//       night: 'adf'
//     },
//     saturday: {
//       morning: 'ahj',
//       afternoon: 'sg',
//       night: 'dfhe'
//     },
//     sunday: {
//       morning: 'sfs',
//       afternoon: 'bsfgs',
//       night: 'bdsfbdf'
//     }
// }