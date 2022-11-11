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
  FILTER_BY_SOURCE,
  FILTER_BY_TEMP,
  APPLY_USER_FILTERS,
  DELETE_BREED_BY_ID_SUCCESS,
  WORKING_ON_DELETE,
  DELETE_BREED_BY_ID_ERROR,
} from "../constants";
import axiosClient from "../../utils/axios.js";

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
      type: LOADING_DB_BREEDS,
    });
    try {
      const response = await axiosClient.get("/dogs", {
        params: { name: name },
      });
      dispatch({
        type: GET_BREEDS_BY_NAME_SUCCESS,
        payload: { data: response.data, keyWord: name },
      });
    } catch (error) {
      dispatch({
        type: GET_BREEDS_BY_NAME_ERROR,
        payload: { message: error.message, name: error.name, code: error.code },
      });
    }
  };
};

export const filterBreedsBySource = (source) => {
  return (dispatch) => {
    dispatch({ type: FILTER_BY_SOURCE, payload: source });
  };
};

export const filterByTemperamentAction = (temperament) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_BY_TEMP,
      payload: temperament,
    });
  };
};

export const applyUserFiltersAction = () => {
  return (dispatch) => {
    dispatch({
      type: APPLY_USER_FILTERS,
    });
  };
};

export const deleteBreedByIdAction = (breedId) => {
  return async (dispatch) => {
    dispatch({
      type: WORKING_ON_DELETE,
    });

    try {
      await axiosClient.delete(`/dogs/${breedId}`);
      dispatch({
        type: DELETE_BREED_BY_ID_SUCCESS,
      });
      dispatch(getAllBreedsAction())
    } catch (error) {
      dispatch({
        type: DELETE_BREED_BY_ID_ERROR,
        payload: { message: error.message, name: error.name, code: error.code },
      });
    }
  };
};
