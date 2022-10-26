const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getDogsRoute,
  getBreedRoute,
  postDogRoute,
} = require(".//dog.routes.js");
const { getTemperamentsRoute } = require("./temperament.routes.js");

const router = Router();
getDogsRoute(router);
getBreedRoute(router);
postDogRoute(router);
getTemperamentsRoute(router);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(getDogsRoute);
router.use(getBreedRoute);
router.use(postDogRoute);
router.use(getTemperamentsRoute);

module.exports = router;
