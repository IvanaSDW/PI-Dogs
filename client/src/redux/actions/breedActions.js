import {
  CREATING_BREED,
  CREATE_BREED_DB_ERROR,
  CREATE_BREED_DB_SUCCESS,
  GET_ALL_BREEDS,
  GET_BREEDS_BY_NAME,
  GET_BREED_BY_ID,
} from "../types";
import axiosClient from "../../config/axios.js";
// import axios from "axios";

export const createBreedAction = (newBreedObj) => {
  return async (dispatch) => {
    dispatch({
      type: CREATING_BREED,
    });
    try {
      const response = await axiosClient.post("/dogs", newBreedObj);
      dispatch({
        type: CREATE_BREED_DB_SUCCESS,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: CREATE_BREED_DB_ERROR,
        payload: {message: error.message, name: error.name, code: error.code}
      })
    }
    
  };
};
