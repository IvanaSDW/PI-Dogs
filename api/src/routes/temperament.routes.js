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
    console.log("received in boody: ", req.body);
    const { name } = req.body;
    try {
      console.log("Router about to create: ", name);
      const response = await createTemperament(name);
      console.log('resp received in createTemperamentRoute: ', response instanceof Error)
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
