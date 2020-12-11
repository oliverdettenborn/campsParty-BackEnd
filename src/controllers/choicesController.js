const choicesRepository = require('../repository/choices')

async function getHotels(req, res) {
    try {
        const availableHotels = await choicesRepository.getHotelsData();
        return res.status(200).send(availableHotels);
    }
    catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

async function getActivities(req, res) {
    try {
        const { day } = req.params;
        if (day !== 'friday' && day !== 'saturday' && day !== 'sunday') {
            return res.sendStatus(400);
        }

        let availableActivities = await choicesRepository.getActivitiesData(day);
        return res.status(200).send(availableActivities);
    }
    catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

async function postFormActivities(req, res) {
    try {
        const userActivities = req.body;
        if (Object.keys(userActivities).length === 0) return res.sendStatus(400);

        const { id } = req.user;

        await choicesRepository.postChosenActivities(userActivities, id);
        
        return res.sendStatus(201);
    }
    catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

async function editFormActivities(req, res) {
    try {
        const newUserActivities = req.body;
        if (Object.keys(newUserActivities).length === 0) return res.sendStatus(400);
        
        const { id } = req.user;

        await choicesRepository.updateChosenActivities(newUserActivities, id);

        return res.sendStatus(200);
    }
    catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

async function getNotHotelsData(req, res) {
    try {
        const availableHotels = await choicesRepository.getNotHotelsData();
        return res.status(200).send(availableHotels);
    }catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}


module.exports = { 
    getHotels, 
    getActivities, 
    postFormActivities, 
    editFormActivities, 
    getNotHotelsData 
};
