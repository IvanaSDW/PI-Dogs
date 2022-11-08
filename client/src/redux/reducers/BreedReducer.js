import {
  LOADING_DB_BREEDS,
  CREATE_BREED_DB_ERROR,
  CREATE_BREED_DB_SUCCESS,
  GET_ALL_BREEDS_SUCCESS,
  GET_ALL_BREEDS_ERROR,
  GET_BREEDS_BY_NAME_SUCCESS,
  GET_BREEDS_BY_NAME_ERROR,
  FILTER_BY_SOURCE,
  FILTER_BY_TEMP,
  APPLY_USER_FILTERS,
} from "../types";

const initialState = {
  breeds: [],
  breedsToRender: [],
  breedDbError: null,
  breedDbloading: false,
  shallResetSearch: false,
};

const breedsReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case CREATE_BREED_DB_ERROR:
    case GET_ALL_BREEDS_ERROR:
    case GET_BREEDS_BY_NAME_ERROR:
      return {
        ...state,
        breedDbloading: false,
        breedDbError: action.payload,
        shallResetSearch: false,
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

    // case FILTER_BY_SOURCE:
    //   const filterBy = action.payload;
    //   switch (filterBy) {
    //     case "all":
    //       return {
    //         ...state,
    //         breedsToRender: state.breeds,
    //       };
    //     case "local":
    //       const locals = state.breeds.filter((breed) => breed.is_local);
    //       return {
    //         ...state,
    //         breedsToRender: locals,
    //       };
    //     case "api":
    //       const fromApi = state.breeds.filter((breed) => !breed.is_local);
    //       return {
    //         ...state,
    //         breedsToRender: fromApi,
    //       };
    //     default:
    //       return state;
    //   }

    // case FILTER_BY_TEMP:
    //   if (action.payload === "0") {
    //     return {
    //       ...state,
    //       breedsToRender: state.breeds,
    //     };
    //   } else {
    //     const byTemp = state.breeds.filter((breed) =>
    //       breed.temperaments.includes(action.payload)
    //     );
    //     return {
    //       ...state,
    //       breedsToRender: byTemp,
    //     };
    //   }

    case APPLY_USER_FILTERS: {
      console.log('apply filters called with filters: ', action.payload)
      const { source, filterTemp, sortByName, sortByWeight } = action.payload;
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
        breedsToRender: filtered.map(e => e),
      };
    }
    default:
      return state;
  }
};

export default breedsReducer;
