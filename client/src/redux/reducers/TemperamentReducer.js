import {
  CREATE_TEMP_DB_ERROR,
  CREATE_TEMP_DB_SUCCESS,
  GET_ALL_TEMPS_ERROR,
  GET_ALL_TEMPS_SUCESS,
  LOADING_DB_TEMPS,
} from "../types";

const initialState = {
  temperaments: [],
  tempsDbError: null,
  tempsDbloading: false,
};

const tempsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DB_TEMPS:
      return {
        ...state,
        tempsDbloading: true,
      };

    case CREATE_TEMP_DB_SUCCESS:
      console.log("New temp added: ", action.payload);
      return {
        ...state,
        tempsDbloading: false,
        tempsDbError: false,
        temperaments: [...state.temperaments, action.payload]
      };

    case CREATE_TEMP_DB_ERROR:
      return {
        ...state,
        tempsDbError: action.payload,
        tempsDbloading: false,
      };

    case GET_ALL_TEMPS_SUCESS:
      return {
        ...state,
        tempsDbloading: false,
        tempsDbError: false,
        temperaments: action.payload,
      };

    case GET_ALL_TEMPS_ERROR:
      return {
        ...state,
        tempsDbloading: false,
        tempsDbError: action.payload,
      };

    default:
      return state;
  }
};

export default tempsReducer;
