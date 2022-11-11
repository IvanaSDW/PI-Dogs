import "./filterForm.css";
import rightArrow from "../../../assets/right-arrow.png";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  applyUserFiltersAction,
  getAllBreedsAction,
} from "../../../redux/actions/breedActions";
import {
  ALL_SOURCES,
  DOGS_API,
  NAME_ASCENDING,
  NAME_DESCENDING,
  RESET_USER_FILTERS,
  SET_OPENED_DETAIL_TRUE,
  TEMPERAMENT_UNSELECTED,
  UPDATE_USER_FILTERS,
  USER_CREATED,
  WEIGHT_ASCENDING,
  WEIGHT_DESCENDING,
} from "../../../redux/types";

const FilterForm = () => {
  const navigate = useHistory();
  const dispatch = useDispatch();

  // GLobal states
  const { breedsToRender, userFilters, userSearchKey } = useSelector(
    (state) => state.breeds
  );

  //Local states
  const [filterControls, setFilterControls] = useState({
    sourceApi: userFilters.source === DOGS_API ? true : false,
    sourceLocal: userFilters.source === USER_CREATED ? true : false,
    filterTemp: userFilters.filterTemp,
    sortByName: false,
    sortByWeight: false,
  });

  let temperamentsOnRenderedBreeds = new Set();

  breedsToRender.map(
    (breed) =>
      (temperamentsOnRenderedBreeds = new Set([
        ...temperamentsOnRenderedBreeds,
        ...breed.temperaments,
      ]))
  );

  useEffect(() => {
    dispatch(applyUserFiltersAction());
  }, [filterControls, dispatch]);

  const onCreateBreedClicked = () => {
    dispatch({
      type: SET_OPENED_DETAIL_TRUE,
    })
    navigate.push("/home/newBreed");
  };

  const onToggleOnlyLocals = (e) => {
    if (e.target.checked) {
      dispatch({
        type: UPDATE_USER_FILTERS,
        payload: {
          source: USER_CREATED,
        },
      });

      setFilterControls({
        ...filterControls,
        sourceLocal: true,
        sourceApi: false,
      });
    } else {
      dispatch({
        type: UPDATE_USER_FILTERS,
        payload: {
          source: ALL_SOURCES,
        },
      });
      setFilterControls({
        ...filterControls,
        sourceLocal: false,
        sourceApi: false,
      });
    }
  };

  const onToggleOnlyApi = (e) => {
    if (e.target.checked) {
      dispatch({
        type: UPDATE_USER_FILTERS,
        payload: {
          source: DOGS_API,
        },
      });

      setFilterControls({
        ...filterControls,
        sourceLocal: false,
        sourceApi: true,
      });
    } else {
      dispatch({
        type: UPDATE_USER_FILTERS,
        payload: {
          source: ALL_SOURCES,
        },
      });
      setFilterControls({
        ...filterControls,
        sourceLocal: false,
        sourceApi: false,
      });
    }
  };

  const onSortChanged = (e, criteria) => {
    let sortString = userFilters.sorting ? userFilters.sorting : "";
    if (e.target.checked) {
      const indexOfExistingCriteria = sortString.indexOf(criteria.slice(0, -2));
      if (indexOfExistingCriteria >= 0) {
        sortString =
          sortString.substring(0, indexOfExistingCriteria) +
          criteria +
          sortString.substring(indexOfExistingCriteria + criteria.length);
      } else {
        sortString = sortString + criteria;
      }

      setFilterControls({
        ...filterControls,
        [e.target.name]: criteria,
      });
    } else {
      sortString = sortString.replace(criteria, "");
      setFilterControls({
        ...filterControls,
        [e.target.name]: false,
      });
    }
    if (sortString === "") sortString = false;
    dispatch({
      type: UPDATE_USER_FILTERS,
      payload: {
        sorting: sortString,
      },
    });
  };

  const onFilterTempSelected = (e) => {
    dispatch({
      type: UPDATE_USER_FILTERS,
      payload: {
        filterTemp: e.target.value,
      },
    });
    setFilterControls({
      ...filterControls,
      filterTemp: e.target.value,
    });
  };

  const onClearFilters = () => {
    dispatch({
      type: RESET_USER_FILTERS,
    });
    setFilterControls({
      sourceApi: false,
      sourceLocal: false,
      filterTemp: TEMPERAMENT_UNSELECTED,
      sortByName: false,
      sortByWeight: false,
    });
    dispatch(getAllBreedsAction());
  };

  return (
    <div>
      <form className="filter-form">
        <h3 className="form-title">Filters</h3>
        <div className="results-line">
          <p className="results">{`${breedsToRender.length} results`}</p>
          <button
            className="clear-button"
            type="button"
            onClick={onClearFilters}
          >
            Clear all
          </button>
        </div>
        <div className="current-filters-tags">
          {`${userFilters.source + " >"} ${
            userSearchKey ? userSearchKey.toLowerCase() + " >" : ""
          } ${
            userFilters.filterTemp !== TEMPERAMENT_UNSELECTED
              ? userFilters.filterTemp.toLowerCase() + " >"
              : ""
          }`}
        </div>
        <div className="form-divider"></div>
        <h4 htmlFor="input-temperament" className="form-label">
          TEMPERAMENT
        </h4>
        <select
          name="temperament"
          id="input-temperament"
          className="temperament-select"
          value={userFilters.filterTemp}
          onChange={onFilterTempSelected}
        >
          <option key={TEMPERAMENT_UNSELECTED} value={TEMPERAMENT_UNSELECTED}>
            All temperaments
          </option>
          {[...temperamentsOnRenderedBreeds].sort().map((temp) => {
            return (
              // <option key={temp.id} value={temp.name}>
              <option key={temp} value={temp}>
                {/* {temp.name} */}
                {temp}
              </option>
            );
          })}
        </select>
        {/* <div className="form-divider"></div> */}
        <h4 htmlFor="input-source" className="form-label">
          SOURCE
        </h4>
        <label className="check-item">
          Breed database
          <input
            type="checkbox"
            onChange={onToggleOnlyApi}
            checked={filterControls.sourceApi}
          />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          User created
          <input
            type="checkbox"
            onChange={onToggleOnlyLocals}
            checked={filterControls.sourceLocal}
          />
          <span className="checkmark"></span>
        </label>
        <div className="form-divider"></div>
        {/* <h4 htmlFor="input-source" className="form-label sort-label">
          SORT BY
        </h4> */}
        <div className="spacer"></div>
        <h3 className="form-title">Sorting</h3>

        <div className="current-filters-tags">
          {`${
            userFilters.sorting
              ? userFilters.sorting
                  .replace("\u2191", "\u2191 \u203A ")
                  .replace("\u2193", "\u2193 \u203A ")
              : "unordered"
          } `}
        </div>
        <div className="form-divider"></div>
        <label className="check-item">
          {"Breed name \u2191"}
          <input
            type="checkbox"
            // name="sortByNameAsc"
            name="sortByName"
            // onChange={(e) => onSortByName(e, NAME_ASCENDING)}
            onChange={(e) => onSortChanged(e, NAME_ASCENDING)}
            checked={userFilters.sorting && userFilters.sorting.includes(NAME_ASCENDING)}
          />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          {"Breed name \u2193"}
          <input
            type="checkbox"
            // name="sortByNameDesc"
            name="sortByName"
            // onChange={(e) => onSortByName(e, NAME_DESCENDING)}
            onChange={(e) => onSortChanged(e, NAME_DESCENDING)}
            checked={userFilters.sorting && userFilters.sorting.includes(NAME_DESCENDING)}
          />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          {"Average weight \u2191"}
          <input
            type="checkbox"
            // name="sortByWeightAsc"
            name="sortByWeight"
            // onChange={(e) => onSortByWeight(e, WEIGHT_ASCENDING)}
            onChange={(e) => onSortChanged(e, WEIGHT_ASCENDING)}
            checked={userFilters.sorting && userFilters.sorting.includes(WEIGHT_ASCENDING)}
          />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          {"Average weight \u2193"}
          <input
            type="checkbox"
            // name="sortByWeightDesc"
            name="sortByWeight"
            // onChange={(e) => onSortByWeight(e, WEIGHT_DESCENDING)}
            onChange={(e) => onSortChanged(e, WEIGHT_DESCENDING)}
            checked={userFilters.sorting && userFilters.sorting.includes(WEIGHT_DESCENDING)}
          />
          <span className="checkmark"></span>
        </label>
      </form>
      <button
        className="create-breed-button"
        onClick={() => onCreateBreedClicked()}
      >
        <p>Create Breed</p>
        <img className="right-arrow" src={rightArrow} alt="arrow" />
      </button>
    </div>
  );
};

export default FilterForm;
