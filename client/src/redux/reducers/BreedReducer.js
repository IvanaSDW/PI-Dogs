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
} from "../types";

const initialState = {
  breeds: [],
  breedsToRender: [],
  breedDbError: null,
  breedDbloading: false,
  shallResetSearch: false,
  userFilters: {
    source: "all",
    filterTemp: "0",
    sortByName: false,
    sortByWeight: false,
  },
  currentPage: 1,
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
    case GET_BREEDS_BY_NAME_SUCCESS:
      return {
        ...state,
        breedDbloading: false,
        breedDbError: false,
        breeds: action.payload,
        breedsToRender: action.payload,
        shallResetSearch: false,
      };

    case GET_BREED_BY_ID_SUCCESS:
      return {
        ...state,
        breedDbloading: false,
        breedDbError: false,
      };

    case APPLY_USER_FILTERS: {
      console.log("apply filters called with filters: ", action.payload);
      const { source, filterTemp, sortByName, sortByWeight } =
        state.userFilters;
      let filtered = [];
      switch (source) {
        case "all":
          filtered = state.breeds;
          break;
        case "local":
          filtered = state.breeds.filter((breed) => breed.is_local);
          break;
        case "api":
          filtered = state.breeds.filter((breed) => !breed.is_local);
          break;
        default:
          break;
      }

      if (filterTemp !== "0") {
        filtered = filtered.filter((breed) =>
          breed.temperaments.includes(filterTemp)
        );
      }

      if (sortByName === "ASC") {
        filtered = filtered.sort((a, b) => {
          if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
          if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
          return 0;
        });
      }

      if (sortByName === "DESC") {
        filtered = filtered.sort((a, b) => {
          if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
          if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
          return 0;
        });
      }

      if (sortByWeight === "ASC") {
        filtered = filtered.sort((a, b) => {
          if (
            (a.min_weight + a.max_weight) / 2 >
            (b.min_weight + b.max_weight) / 2
          )
            return 1;
          if (
            (b.min_weight + b.max_weight) / 2 >
            (a.min_weight + a.max_weight) / 2
          )
            return -1;
          return 0;
        });
      }

      if (sortByWeight === "DESC") {
        filtered = filtered.sort((a, b) => {
          if (
            (a.min_weight + a.max_weight) / 2 >
            (b.min_weight + b.max_weight) / 2
          )
            return -1;
          if (
            (b.min_weight + b.max_weight) / 2 >
            (a.min_weight + a.max_weight) / 2
          )
            return 1;
          return 0;
        });
      }

      if (!sortByName && !sortByWeight) {
        filtered = filtered.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (b.id > a.id) return -1;
          return 0;
        });
      }

      return {
        ...state,
        breedsToRender: filtered.map((e) => e),
      };
    }

    case RESET_USER_FILTERS:
      return {
        ...state,
        userFilters: {
          source: "all",
          filterTemp: "0",
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

    default:
      return state;
  }
};

export default breedsReducer;
