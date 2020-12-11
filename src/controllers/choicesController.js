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

async function getActivitiesByUserId(req, res) {
    const { id } = req.user;

    let selectedActivities;
    try {
        selectedActivities = await choicesRepository.getActivitiesDataById(id);
    }
    catch {
        return res.sendStatus(500);
    }
    
    return res.status(200).send(selectedActivities);
}

module.exports = { getHotels, getActivities, getActivitiesByUserId };