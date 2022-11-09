import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  GET_BREED_BY_ID_ERROR,
  GET_BREED_BY_ID_SUCCESS,
  LOADING_DB_BREEDS,
} from "../../../redux/types";

export const useBreed = (breedId) => {
  const [breedData, setBreedData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (breedId) {
      dispatch({
        type: LOADING_DB_BREEDS,
      });
      const fetchBreedData = async (id) => {
        try {
          const response = await axios.get(`http://localhost:3001/dogs/${id}`);
          return response.data;
        } catch (error) {
          dispatch({
            type: GET_BREED_BY_ID_ERROR,
            payload: {
              message: error.message,
              name: error.name,
              code: error.code,
            },
          });
        }
      };

      fetchBreedData(breedId).then((breedData) => {
        if (!breedData) return;
        dispatch({
          type: GET_BREED_BY_ID_SUCCESS,
        });
        let breedObj = {};
        if (breedId.slice(0, 3) === "api") {
          breedObj = {
            name: breedData.name,
            imageUrl: breedData.image.url,
            weight: breedData.weight.metric,
            height: breedData.height.metric,
            lifeSpan: breedData.life_span,
            temperament: breedData.temperament,
          };
        } else {
          const mappedTemps = breedData.temperaments.map((temp) => {
            return temp.name;
          });
          breedObj = {
            name: breedData.name,
            imageUrl: breedData.image_url,
            weight: `${breedData.min_weight} - ${breedData.max_weight} kgs`,
            height: `${breedData.min_height} - ${breedData.max_height} cms`,
            lifeSpan: `${breedData.min_years} - ${breedData.max_years} years`,
            temperament: mappedTemps.join(", "),
          };
        }
        setBreedData(breedObj);
      });
    }
  }, [breedId]);

  return breedData;
};
