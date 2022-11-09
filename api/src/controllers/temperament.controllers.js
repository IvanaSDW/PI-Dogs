const axios = require("axios");
const { Temperament } = require("../db.js");

const getAllApiBreedsFullDetail = async () => {
  try {
    const apiDogs = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
    );
    return apiDogs.data;
  } catch (error) {
    console.log("error getting all breeds from external api: ", error);
  }
};

const fetchApiTemperaments = async () => {
  const allApiData = await getAllApiBreedsFullDetail();
  allApiData.map((breed) => {
    let temperaments = breed.temperament ? breed.temperament.split(",") : [];
    temperaments = temperaments.map((temperament) => {
      Temperament.findOrCreate({
        where: { name: temperament.trim() },
      });
      return temperament.trim();
    });
  });
};

const getAllTemperaments = async () => {
  // await fetchApiTemperaments();
  try {
    return await Temperament.findAll({
      order: [
        ['name', 'ASC']
      ]
    });
  } catch (error) {
    console.log("error getting all temperaments from local db: ", error);
  }
};

const createTemperament = async (temperament) => {
  console.log("createTemperament called for: ", temperament);
  try {
    const [newTemp, created] = await Temperament.findOrCreate({
      where: {
        name: temperament,
      },
    });

    if (created) {
      return newTemp;
    } else {
      throw new Error(`${temperament} already exists. Nothing was created.`); //This error get catched in catch block
    }

  } catch (error) {
    console.log('error from createTemperament controller: ', error);
    return error;
  }
};

module.exports = {
  getAllTemperaments,
  createTemperament,
};
