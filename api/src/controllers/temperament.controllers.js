const axios = require("axios");
const { Temperament } = require("../db.js");

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
  await fetchApiTemperaments();
  try {
    return await Temperament.findAll();
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = {
  getAllTemperaments,
};
