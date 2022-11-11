const router = require(".");
const {
  getAllTemperaments,
  createTemperament,
} = require("../controllers/temperament.controllers");

const getTemperamentsRoute = (router) => {
  router.get("/temperaments", async (req, res) => {
    const allTemps = await getAllTemperaments();
    res.status(200).json(allTemps);
  });
};

const createTemperamentRoute = (router) => {
  router.post("/temperaments", async (req, res) => {
    const { name } = req.body;
    try {
      const response = await createTemperament(name);
      if (response instanceof Error) {
          return res.status(303).json({err: response.message , temperament: name});
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
    res.status();
  });
};

module.exports = {
  getTemperamentsRoute,
  createTemperamentRoute,
};
