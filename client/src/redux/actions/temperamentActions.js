import axiosClient from "../../config/axios";
import {
  CREATE_TEMP_DB_ERROR,
  CREATE_TEMP_DB_SUCCESS,
  GET_ALL_TEMPS_ERROR,
  GET_ALL_TEMPS_SUCESS,
  LOADING_DB_TEMPS,
} from "../types";

export const getAllTemperamentsAction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_DB_TEMPS,
    });

    try {
      const response = await axiosClient.get("/temperaments");
      dispatch({
        type: GET_ALL_TEMPS_SUCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_TEMPS_ERROR,
        payload: { message: error.message, name: error.name, code: error.code },
      });
    }
  };
};

export const createTemperamentAction = (temperament) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_DB_TEMPS,
    });

    try {
      const response = await axiosClient.post("/temperaments", {
        name: temperament,
      });
      dispatch({
        type: CREATE_TEMP_DB_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_TEMP_DB_ERROR,
        payload: { message: error.message, name: error.name, code: error.code },
      });
    }
  };
};
