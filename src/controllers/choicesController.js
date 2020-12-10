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

async function getActivites(req, res) {
    let availableActivities;
    try {
        availableActivities = await choicesRepository.getActivitiesData();
    }
    catch {
        return res.sendStatus(500);
    }
    
    return res.status(200).send(availableActivities);
}

module.exports = { getHotels, getActivites };