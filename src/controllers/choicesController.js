const choicesRepository = require('../repository/choices')

async function getHotels(req, res) {
    let availableHotels;
    try {
        availableHotels = await choicesRepository.getHotelsData();
    }
    catch {
        return res.sendStatus(500);
    }
    
    return res.status(200).send(availableHotels);
}

async function getActivities(req, res) {
    const { day } = req.params;

    let availableActivities;
    try {
        availableActivities = await choicesRepository.getActivitiesData(day);
    }
    catch {
        return res.sendStatus(500);
    }
    
    return res.status(200).send(availableActivities);
}

module.exports = { getHotels, getActivities };