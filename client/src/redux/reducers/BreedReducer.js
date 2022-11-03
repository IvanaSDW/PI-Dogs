import {
  CREATING_BREED,
  CREATE_BREED_DB_ERROR,
  CREATE_BREED_DB_SUCCESS,
  GET_ALL_BREEDS,
  GET_BREEDS_BY_NAME,
  GET_BREED_BY_ID,
} from "../types";

const initialState = {
  breeds: [],
  error: null,
  loading: false,
};

const breedReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATING_BREED: {
      console.log("called");
      return {
        ...state,
        loading: true,
      };
    }
    case CREATE_BREED_DB_SUCCESS: {
      console.log("called");
      return {
        ...state,
        loading: false,
        breeds: [...state.breeds, action.payload],
      };
    }
    case CREATE_BREED_DB_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default breedReducer;
