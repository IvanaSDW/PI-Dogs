import { applyFilters } from "../../utils/logic";
import {
  LOADING_DB_BREEDS,
  CREATE_BREED_DB_ERROR,
  CREATE_BREED_DB_SUCCESS,
  GET_ALL_BREEDS_SUCCESS,
  GET_ALL_BREEDS_ERROR,
  GET_BREEDS_BY_NAME_SUCCESS,
  GET_BREEDS_BY_NAME_ERROR,
  APPLY_USER_FILTERS,
  GET_BREED_BY_ID_ERROR,
  GET_BREED_BY_ID_SUCCESS,
  RESET_BREEDS_DB_ERROR,
  RESET_USER_FILTERS,
  UPDATE_USER_FILTERS,
  UPDATE_CURRENT_PAGE,
  SET_OPENED_DETAIL_TRUE,
  ALL_SOURCES,
  TEMPERAMENT_UNSELECTED,
  SET_OPENED_DETAIL_FALSE,
} from "../types";

const initialState = {
  breeds: [],
  breedsSearched: [],
  breedsToRender: [],
  breedDbError: null,
  breedDbloading: false,
  shallResetSearch: false,
  userSearchKey: false,
  userFilters: {
    source: ALL_SOURCES,
    filterTemp: TEMPERAMENT_UNSELECTED,
    sorting: false,
  },
  currentPage: 1,
  openedDetail: false,
};

const breedsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BREED_DB_ERROR:
    case GET_ALL_BREEDS_ERROR:
    case GET_BREEDS_BY_NAME_ERROR:
    case GET_BREED_BY_ID_ERROR:
      return {
        ...state,
        breedDbloading: false,
        breedDbError: action.payload,
        shallResetSearch: false,
      };

    case RESET_BREEDS_DB_ERROR:
      return {
        ...state,
        breedDbError: false,
      };

    case LOADING_DB_BREEDS:
      return {
        ...state,
        breedDbloading: true,
      };

    case CREATE_BREED_DB_SUCCESS:
      return {
        ...state,
        breedDbloading: false,
        breedDbError: false,
        shallResetSearch: true,
      };

    case GET_ALL_BREEDS_SUCCESS:
      return {
        ...state,
        breedDbloading: false,
        breedDbError: false,
        breeds: action.payload,
        userSearchKey: false,
        breedsSearched: action.payload,
        breedsToRender: action.payload,
        shallResetSearch: false,
        currentPage: 1,
      };
    case GET_BREEDS_BY_NAME_SUCCESS:
      return {
        ...state,
        breedDbloading: false,
        breedDbError: false,
        userSearchKey: action.payload.keyWord,
        breedsSearched: action.payload.data,
        breedsToRender: applyFilters(action.payload.data, state.userFilters),
        shallResetSearch: false,
        currentPage: 1,
      };

    case GET_BREED_BY_ID_SUCCESS:
      return {
        ...state,
        breedDbloading: false,
        breedDbError: false,
      };

    case APPLY_USER_FILTERS: {
      const newCurrentPage = state.openedDetail ? state.currentPage : 1;
      return {
        ...state,
        breedsToRender: applyFilters(state.breedsSearched, state.userFilters),
        currentPage: newCurrentPage,
        openedDetail: false,
      };
    }

    case RESET_USER_FILTERS:
      return {
        ...state,
        userFilters: {
          source: ALL_SOURCES,
          filterTemp: TEMPERAMENT_UNSELECTED,
          sortByName: false,
          sortByWeight: false,
        },
      };

    case UPDATE_USER_FILTERS:
      return {
        ...state,
        userFilters: {
          ...state.userFilters,
          ...action.payload,
        },
      };

    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case SET_OPENED_DETAIL_TRUE:
      return {
        ...state,
        openedDetail: true,
      };

    case SET_OPENED_DETAIL_FALSE:
      return {
        ...state,
        openedDetail: false,
      };

    default:
      return state;
  }
};

export default breedsReducer;
