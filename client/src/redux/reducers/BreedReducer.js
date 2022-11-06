import {
  LOADING_DB_BREEDS,
  CREATE_BREED_DB_ERROR,
  CREATE_BREED_DB_SUCCESS,
  GET_BREEDS_BY_NAME,
  GET_BREED_BY_ID,
  GET_ALL_BREEDS_SUCCESS,
  GET_ALL_BREEDS_ERROR,
} from "../types";

const initialState = {
  breeds: [],
  breedDbError: null,
  breedDbloading: false,
};

const breedsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DB_BREEDS:
      return {
        ...state,
        breedDbloading: true,
      };

    case CREATE_BREED_DB_SUCCESS: {
      return {
        ...state,
        breedDbloading: false,
        breeds: [...state.breeds, action.payload],
        breedDbError: false,
      };
    }
    case CREATE_BREED_DB_ERROR: {
      return {
        ...state,
        breedDbloading: false,
        breedDbError: action.payload,
      };
    }
    case GET_ALL_BREEDS_SUCCESS:
      return {
        ...state,
        breedDbloading: false,
        breedDbError: false,
        breeds: action.payload,
      }
      case GET_ALL_BREEDS_ERROR:
        return {
          ...state,
          breedDbloading: false,
          breedDbError: action.payload,
        }

    default:
      return state;
  }
};

export default breedsReducer;
