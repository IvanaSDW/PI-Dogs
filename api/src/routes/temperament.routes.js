const { getAllTemperaments } = require("../controllers/temperament.controllers");

const getTemperamentsRoute = (router) => {
    router.get('/temperaments', async (req, res) => {
        const allTemps = await getAllTemperaments();
        res.status(200).json(allTemps);
    });
}

module.exports = {
    getTemperamentsRoute,
}