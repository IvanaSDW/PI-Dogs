const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db.js");


const getAllLocalDogs = async () => {
  return await Dog.findAll({
    include: Temperament,
    attributes: [
      "id",
      "image_url",
      "name",
      "min_weight",
      "max_weight",
      "is_local",
    ],
  });
};

const getAllApiDogs = async () => {
  try {
    const apiDogs = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
    );
    const mappedDogs = apiDogs.data.map((breed) => {
      const min_weight = Number(breed.weight.imperial.split("-")[0].trim());
      const max_weight = breed.weight.imperial.split("-")[1]
        ? Number(breed.weight.imperial.split("-")[1].trim())
        : min_weight;
      let temperaments = breed.temperament ? breed.temperament.split(",") : [];
      temperaments = temperaments.map((temperament) => {
        Temperament.findOrCreate({
          where: { name: temperament.trim() },
        });
        return temperament.trim();
      });
      newDog = {
        id: `api${breed.id}`,
        name: breed.name,
        min_weight: min_weight,
        max_weight: max_weight,
        image_url: breed.image.url,
        temperaments: temperaments,
        is_local: false,
      };
      return newDog;
    });
    return mappedDogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllDogs = async () => {
  const localDogs = await getAllLocalDogs();
  const apiDogs = await getAllApiDogs();
  const allDogs = [...localDogs, ...apiDogs];
  return allDogs;
};

const getLocalDogsByBreed = async (breed) => {
  return await Dog.findAll({
    include: Temperament,
    attributes: [
      "id",
      "image_url",
      "name",
      "min_weight",
      "max_weight",
      "is_local",
    ],
    where: {
      name: { [Op.iLike]: `%${breed}%` },
    },
  });
};

const getApiDogsByBreed = async (breed) => {
  try {
    const apiDogs = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${breed}&api_key=${process.env.API_KEY}`
    );
    const mappedDogs = apiDogs.data.map((breed) => {
      const min_weight = Number(breed.weight.imperial.split("-")[0].trim());
      const max_weight = breed.weight.imperial.split("-")[1]
        ? Number(breed.weight.imperial.split("-")[1].trim())
        : min_weight;
      let temperaments = breed.temperament ? breed.temperament.split(",") : [];
      temperaments = temperaments.map((temperament) => {
        Temperament.findOrCreate({
          where: { name: temperament.trim() },
        });
        return temperament.trim();
      });
      newDog = {
        id: `api${breed.id}`,
        name: breed.name,
        min_weight: min_weight,
        max_weight: max_weight,
        is_local: false,
        image_url: `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`,
        temperaments: temperaments,
      };
      return newDog;
    });
    return mappedDogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDogsByBreed = async (breed) => {
  const localDogs = await getLocalDogsByBreed(breed);
  const apiDogs = await getApiDogsByBreed(breed);
  const allDogs = [...localDogs, ...apiDogs];
  if (!allDogs.length) {
    throw new Error(`No breed found for ${breed}`);
  } else return allDogs;
};

const getBreedDetailFromLocal = async (breedId) => {
  return await Dog.findByPk(breedId, {
    include: Temperament,
  });
};

const getAllApiBreedsFullDetail = async () => {
  try {
    const apiDogs = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
    );
    return apiDogs.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getBreedFromApi = async (breedId) => {
  try {
    const allApiBreeds = await getAllApiBreedsFullDetail();
    return allApiBreeds.find((breed) => breed.id == breedId);
  } catch (error) {
    console.log("api error: ", error);
  }
};

const getBreedDetails = async (breedId) => {
  if (breedId.slice(0, 3) === "api") {
    id = breedId.slice(3);
    const breedObj = await getBreedFromApi(id);
    if (!breedObj) {
      console.log("not breed object found");
      throw new Error(`No breed found with id = ${breedId}`);
    } else return breedObj;
  } else {
    return await getBreedDetailFromLocal(breedId);
  }
};

// const getDogs = async (req, res) => {
//   const { breed: breedQ } = req.query;
//   let localDogs = [];
//   try {
//     localDogs = breedQ
//       ? await Dog.findAll({
//           include: Temperament,
//           attributes: [
//             "id",
//             "image_url",
//             "name",
//             "min_weight",
//             "max_weight",
//             "is_local",
//           ],
//           where: {
//             name: { [Op.iLike]: `%${breedQ}%` },
//           },
//         })
//       : await Dog.findAll({
//           include: Temperament,
//           attributes: [
//             "id",
//             "image_url",
//             "name",
//             "min_weight",
//             "max_weight",
//             "is_local",
//           ],
//         });
//   } catch (error) {
//     return res.status(500).json({ fromLocalDb: error.message });
//   }
//   const allDogs = [...localDogs];

//   try {
//     const apiDogs = breedQ
//       ? await axios.get(
//           `https://api.thedogapi.com/v1/breeds/search?q=${breedQ}&api_key=${process.env.API_KEY}`
//         )
//       : await axios.get(
//           `https://api.thedogapi.com/v1/breeds?limit=5&api_key=${process.env.API_KEY}`
//         );
//     apiDogs.data.map((breed) => {
//       // let min_height = Number(breed.height.imperial.split("-")[0].trim());
//       // let max_height = breed.height.imperial.split("-")[1]
//       //   ? Number(breed.height.imperial.split("-")[1].trim())
//       //   : min_height;
//       const min_weight = Number(breed.weight.imperial.split("-")[0].trim());
//       const max_weight = breed.weight.imperial.split("-")[1]
//         ? Number(breed.weight.imperial.split("-")[1].trim())
//         : min_weight;
//       let temperaments = breed.temperament ? breed.temperament.split(",") : [];
//       temperaments = temperaments.map((temperament) => {
//         Temperament.findOrCreate({
//           where: { name: temperament.trim() },
//         });
//         return temperament.trim();
//       });
//       newDog = {
//         id: `api${breed.id}`,
//         name: breed.name,
//         min_weight: min_weight,
//         max_weight: max_weight,
//         is_local: false,
//         image_url: breedQ
//           ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
//           : breed.image.url,
//         temperaments: temperaments,
//         // min_height: min_height,
//         // max_height: max_height,
//         // life_span: breed.life_span,
//       };
//       allDogs.push(newDog);
//     });
//   } catch (error) {
//     return res.status(500).json({ fromDogApi: error.message });
//   }

//   res.status(200).json(allDogs);
// };

const createDog = async (reqBody) => {
  console.log("body:", reqBody);
  const {
    name,
    min_height,
    max_height,
    min_weight,
    max_weight,
    life_span,
    is_local,
    image_url,
    temperaments,
  } = reqBody;

  const [newDog, created] = await Dog.findOrCreate({
    where: {
      name: name,
    },
    defaults: {
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      life_span,
      is_local,
      image_url,
    },
  });

  if (created) {
    if (temperaments) {
      temperaments.map(async (temperament) => {
        const [temp, _] = await Temperament.findOrCreate({
          where: { name: temperament },
        });
        newDog.addTemperaments(temp);
      });
    }
    return newDog;
  } else {
    throw new Error(`A breed named ${name} aleady exists. Nothing was created.`);
  }

};

module.exports = {
  // getDogs,
  getAllDogs,
  getDogsByBreed,
  getBreedDetails,
  createDog,
};
