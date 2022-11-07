import { useEffect, useState } from "react";
import axios from "axios";

export const useBreed = (breedId) => {
  const [breedData, setBreedData] = useState();

  useEffect(() => {
    if (breedId) {
      const fetchBreedData = async (id) => {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);
        return response.data;
      };

      fetchBreedData(breedId).then(breedData => {
        let breedObj = {};
        console.log('prefix: ', breedId.slice(0,3));
        if (breedId.slice(0,3) === 'api') {
            breedObj = {
                name: breedData.name,
                imageUrl: breedData.image.url,
                weight: breedData.weight.metric,
                height: breedData.height.metric,
                lifeSpan: breedData.life_span,
                temperament: breedData.temperament,
            }
        } else {
            const mappedTemps = breedData.temperaments.map(temp => {
                return temp.name
            })
            breedObj = {
                name: breedData.name,
                imageUrl: breedData.image_url,
                weight: `${breedData.min_weight} - ${breedData.max_weight} kgs`,
                height: `${breedData.min_height} - ${breedData.max_height} cms`,
                lifeSpan: `${breedData.min_years} - ${breedData.max_years} years`,
                temperament: mappedTemps.join(', '),
            }
        }
        setBreedData(breedObj)
    })

    }
  }, [breedId]);

  return breedData;
};
