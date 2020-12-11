const choicesRepository = require('../repository/choices')

async function getHotels(req, res) {
    try {
        const availableHotels = await choicesRepository.getHotelsData();
        return res.status(200).send(availableHotels);
    }
    catch {
        return res.sendStatus(500);
    }
}

async function getActivities(req, res) {
    const { day } = req.params;
    try {
        const availableActivities = await choicesRepository.getActivitiesData(day);
        return res.status(200).send(availableActivities);
    }
    catch {
        return res.sendStatus(500);
    }
}

async function getNotHotelsData(req, res) {
    try {
        const availableHotels = await choicesRepository.getNotHotelsData();
        return res.status(200).send(availableHotels);
    }
    catch {
        return res.sendStatus(500);
    }
}


module.exports = { getHotels, getActivities, getNotHotelsData };