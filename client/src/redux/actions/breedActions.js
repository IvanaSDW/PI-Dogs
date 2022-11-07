import {
  LOADING_DB_BREEDS,
  CREATE_BREED_DB_ERROR,
  CREATE_BREED_DB_SUCCESS,
  GET_ALL_BREEDS_SUCCESS,
  GET_ALL_BREEDS_ERROR,
  GET_BREED_BY_ID_SUCCESS,
  GET_BREED_BY_ID_ERROR,
  GET_BREEDS_BY_NAME_ERROR,
  GET_BREEDS_BY_NAME_SUCCESS,
} from "../types";
import axiosClient from "../../config/axios.js";

export const createBreedAction = (newBreedObj) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_DB_BREEDS,
    });
    try {
      const response = await axiosClient.post("/dogs", newBreedObj);
      dispatch({
        type: CREATE_BREED_DB_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BREED_DB_ERROR,
        payload: { message: error.message, name: error.name, code: error.code },
      });
    }
  };
};

export const getAllBreedsAction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_DB_BREEDS,
    });
    try {
      const response = await axiosClient.get("/dogs");
      dispatch({
        type: GET_ALL_BREEDS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_BREEDS_ERROR,
        payload: { message: error.message, name: error.name, code: error.code },
      });
    }
  };
};

export const getBreedByIdAction = (breedId) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_DB_BREEDS,
    });
    try {
      const response = await axiosClient.get(`/dogs/${breedId}`);
      dispatch({
        type: GET_BREED_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_BREED_BY_ID_ERROR,
        payload: { message: error.message, name: error.name, code: error.code },
      });
    }
  };
};

export const getBreedsByNameAction = (name) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_DB_BREEDS
    })
    try {
      const response = await axiosClient.get('/dogs', {params: {name: name}});
      dispatch({
        type: GET_BREEDS_BY_NAME_SUCCESS,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: GET_BREEDS_BY_NAME_ERROR,
        payload: { message: error.message, name: error.name, code: error.code },
      })
    }
  }
}
