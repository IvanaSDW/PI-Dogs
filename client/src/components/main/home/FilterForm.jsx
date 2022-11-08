import "./filterForm.css";
import rightArrow from "../../../assets/right-arrow.png";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  applyUserFiltersAction,
  getAllBreedsAction,
} from "../../../redux/actions/breedActions";

const FilterForm = () => {
  const navigate = useHistory();
  const dispatch = useDispatch();

  // GLobal states
  const temperaments = useSelector((state) => state.temps.temperaments);
  const { breeds, breedsToRender } = useSelector((state) => state.breeds);

  //Local states
  const [filters, setFilters] = useState({
    source: "all",
    sourceApi: false,
    sourceLocal: false,
    filterTemp: "0",
    sortByName: false, //Filterstate
    sortByNameAsc: false, //Checkmarks states
    sortByNameDesc: false,
    sortByWeight: false, //Filter state
    sortByWeightAsc: false, // Checkmark states
    sortByWeightDesc: false,
  });

  useEffect(() => {
    if (filters.filterTemp !== "0")
      setFilters({
        ...filters,
        filterTemp: "0",
      });
  }, [breeds]);

  useEffect(() => {
    dispatch(applyUserFiltersAction(filters));
  }, [
    filters.source,
    filters.filterTemp,
    filters.sortByName,
    filters.sortByWeight,
  ]);

  const onCreateBreedClicked = () => {
    navigate.push("/home/newBreed");
  };

  const onUserCreatedChecked = (e) => {
    if (e.target.checked) {
      setFilters({
        ...filters,
        source: "local",
        sourceLocal: true,
        sourceApi: false,
      });
    } else {
      setFilters({
        ...filters,
        source: "all",
        sourceLocal: false,
        sourceApi: false,
      });
    }
  };

  const onApiChecked = (e) => {
    if (e.target.checked) {
      setFilters({
        ...filters,
        source: "api",
        sourceLocal: false,
        sourceApi: true,
      });
    } else {
      setFilters({
        ...filters,
        source: "all",
        sourceLocal: false,
        sourceApi: false,
      });
    }
  };

  const onSortByName = (e, order) => {
    if (e.target.checked) {
      if (order === "ASC") {
        setFilters({
          ...filters,
          sortByName: "ASC",
          sortByNameAsc: true,
          sortByNameDesc: false,
        });
      } else {
        setFilters({
          ...filters,
          sortByName: "DESC",
          sortByNameAsc: false,
          sortByNameDesc: true,
        });
      }
    } else {
      setFilters({
        ...filters,
        sortByName: false,
        sortByNameAsc: false,
        sortByNameDesc: false,
      });
    }
  };

  const onSortByWeight = (e, order) => {
    if (e.target.checked) {
      if (order === "ASC") {
        setFilters({
          ...filters,
          sortByWeight: "ASC",
          sortByWeightAsc: true,
          sortByWeightDesc: false,
        });
      } else {
        setFilters({
          ...filters,
          sortByWeight: "DESC",
          sortByWeightAsc: false,
          sortByWeightDesc: true,
        });
      }
    } else {
      setFilters({
        ...filters,
        sortByWeight: false,
        sortByWeightAsc: false,
        sortByWeightDesc: false,
      });
    }
  };

  const onFilterTempSelected = (e) => {
    setFilters({
      ...filters,
      filterTemp: e.target.value,
    });
  };

  const onClearFilters = () => {
    console.log("clearing filters");
    setFilters({
      source: "all",
      sourceApi: false,
      sourceLocal: false,
      filterTemp: "0",
      sort: {
        orderBy: "name",
        order: "ASC",
      },
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
          value={filters.filterTemp}
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
            onChange={onApiChecked}
            checked={filters.sourceApi}
          />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          User created
          <input
            type="checkbox"
            onChange={onUserCreatedChecked}
            checked={filters.sourceLocal}
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
            checked={filters.sortByNameAsc}
          />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          Breed name DESC
          <input
            type="checkbox"
            onChange={(e) => onSortByName(e, "DESC")}
            checked={filters.sortByNameDesc}
          />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          Average weight ASC
          <input
            type="checkbox"
            onChange={(e) => onSortByWeight(e, "ASC")}
            checked={filters.sortByWeightAsc}
          />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          Average weight DESC
          <input
            type="checkbox"
            onChange={(e) => onSortByWeight(e, "DESC")}
            checked={filters.sortByWeightDesc}
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
