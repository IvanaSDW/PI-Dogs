const {
  createDog,
  getAllDogs,
  getDogsByBreed,
  getBreedDetails,
  deleteBreedFromLocal,
} = require("../controllers/dog.controllers.js");
// const router = require("./index.js");

const getDogsRoute = (router) => {
  router.get("/dogs", async (req, res) => {
    const { name } = req.query;
    try {
      const dogs = name ? await getDogsByBreed(name) : await getAllDogs();
      return res.status(200).json(dogs);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  });
};

const getBreedRoute = (router) => {
  router.get("/dogs/:idBreed", async (req, res) => {
    const { idBreed } = req.params;
    try {
      const breedDetails = await getBreedDetails(idBreed);
      res.status(200).json(breedDetails);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  });
};

const postDogRoute = (router) => {
  router.post("/dogs", async (req, res) => {

    try {
      const newDog = await createDog(req.body);
      return res.status(200).json(newDog);
    } catch (error) {
      return res.status(409).send(error.message);
    }
  });
};


const deleteDogRoute = (router) => {
  router.delete('/dogs/:idBreed', async (req, res) => {
    const { idBreed } = req.params;
    try {
      await deleteBreedFromLocal(idBreed)
      return res.status(200).send('Breed succesfully deleted!')
    } catch (error) {
      return res.status(404).send(error.message);
    }
  });
}



module.exports = {
  getDogsRoute,
  getBreedRoute,
  postDogRoute,
  deleteDogRoute,
};
