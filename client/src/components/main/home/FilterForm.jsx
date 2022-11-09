import "./filterForm.css";
import rightArrow from "../../../assets/right-arrow.png";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  applyUserFiltersAction,
  getAllBreedsAction,
} from "../../../redux/actions/breedActions";
import { RESET_USER_FILTERS, UPDATE_USER_FILTERS } from "../../../redux/types";

const FilterForm = () => {
  const navigate = useHistory();
  const dispatch = useDispatch();

  // GLobal states
  const temperaments = useSelector((state) => state.temps.temperaments);
  const { breeds, breedsToRender, userFilters } = useSelector(
    (state) => state.breeds
  );

  //Local states
  const [filterControls, setFilterControls] = useState({
    sourceApi: userFilters.source === 'api' ? true : false,
    sourceLocal: userFilters.source === 'local' ? true : false,
    filterTemp: userFilters.filterTemp,
    sortByNameAsc: userFilters.sortByName === 'ASC' ? true : false,
    sortByNameDesc: userFilters.sortByName === 'DESC' ? true : false,
    sortByWeightAsc: userFilters.sortByWeight === 'ASC' ? true : false,
    sortByWeightDesc: userFilters.sortByWeight === 'DESC' ? true : false,
  });

  useEffect(() => {
    console.log("filters changed...");
    dispatch(applyUserFiltersAction());
  }, [userFilters]);

  const onCreateBreedClicked = () => {
    navigate.push("/home/newBreed");
  };

  const onToggleOnlyLocals = (e) => {
    if (e.target.checked) {
      dispatch({
        type: UPDATE_USER_FILTERS,
        payload: {
          source: "local",
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
          source: "all",
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
          source: "api",
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
          source: "all",
        },
      });
      setFilterControls({
        ...filterControls,
        sourceLocal: false,
        sourceApi: false,
      });
    }
  };

  const onSortByName = (e, order) => {
    if (e.target.checked) {
      if (order === "ASC") {
        dispatch({
          type: UPDATE_USER_FILTERS,
          payload: {
            sortByName: "ASC",
          },
        });
        setFilterControls({
          ...filterControls,
          sortByNameAsc: true,
          sortByNameDesc: false,
        });
      } else {
        dispatch({
          type: UPDATE_USER_FILTERS,
          payload: {
            sortByName: "DESC",
          },
        });
        setFilterControls({
          ...filterControls,
          sortByNameAsc: false,
          sortByNameDesc: true,
        });
      }
    } else {
      dispatch({
        type: UPDATE_USER_FILTERS,
        payload: {
          sortByName: false,
        },
      });
      setFilterControls({
        ...filterControls,
        sortByNameAsc: false,
        sortByNameDesc: false,
      });
    }
  };

  const onSortByWeight = (e, order) => {
    if (e.target.checked) {
      if (order === "ASC") {
        dispatch({
          type: UPDATE_USER_FILTERS,
          payload: {
            sortByWeight: "ASC",
          },
        });
        setFilterControls({
          ...filterControls,
          sortByWeightAsc: true,
          sortByWeightDesc: false,
        });
      } else {
        dispatch({
          type: UPDATE_USER_FILTERS,
          payload: {
            sortByWeight: "DESC",
          },
        });
        setFilterControls({
          ...filterControls,
          sortByWeightAsc: false,
          sortByWeightDesc: true,
        });
      }
    } else {
      dispatch({
        type: UPDATE_USER_FILTERS,
        payload: {
          sortByWeight: false,
        },
      });
      setFilterControls({
        ...filterControls,
        sortByWeightAsc: false,
        sortByWeightDesc: false,
      });
    }
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
    console.log('Clear filters called');
    dispatch({
      type: RESET_USER_FILTERS,
    });
    setFilterControls({
      sourceApi: false,
      sourceLocal: false,
      filterTemp: "0",
      sortByNameAsc: false,
      sortByNameDesc: false,
      sortByWeightAsc: false,
      sortByWeightDesc: false,
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
        <div className="form-divider"></div>
        <h4 htmlFor="input-temperament" className="form-label">
          TEMPERAMENT
        </h4>
        <select
          name="temperament"
          id="input-temperament"
          className="temperament-select"
          value={filterControls.filterTemp}
          onChange={onFilterTempSelected}
        >
          <option key="0" value={"0"}>
            Select temperament
          </option>
          {temperaments.map((temp) => {
            return (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            );
          })}
        </select>
        <div className="form-divider"></div>
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
        <h4 htmlFor="input-source" className="form-label">
          SORT BY
        </h4>
        <label className="check-item">
          Breed name ASC
          <input
            type="checkbox"
            onChange={(e) => onSortByName(e, "ASC")}
            checked={filterControls.sortByNameAsc}
          />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          Breed name DESC
          <input
            type="checkbox"
            onChange={(e) => onSortByName(e, "DESC")}
            checked={filterControls.sortByNameDesc}
          />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          Average weight ASC
          <input
            type="checkbox"
            onChange={(e) => onSortByWeight(e, "ASC")}
            checked={filterControls.sortByWeightAsc}
          />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          Average weight DESC
          <input
            type="checkbox"
            onChange={(e) => onSortByWeight(e, "DESC")}
            checked={filterControls.sortByWeightDesc}
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
