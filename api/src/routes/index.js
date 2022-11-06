const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getDogsRoute,
  getBreedRoute,
  postDogRoute,
} = require("./dog.routes.js");

// const postDog = require("./postDog.js");

const { getTemperamentsRoute, createTemperamentRoute } = require("./temperament.routes.js");

const router = Router();
getDogsRoute(router);
getBreedRoute(router);
postDogRoute(router);
getTemperamentsRoute(router);
createTemperamentRoute(router);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
