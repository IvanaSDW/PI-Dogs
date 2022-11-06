import "./filterForm.css";
import rightArrow from "../../../assets/right-arrow.png";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const FilterForm = () => {
  const navigate = useHistory();

  const temperaments = useSelector((state) => state.temps.temperaments);

  const onCreateBreedClicked = () => {
    navigate.push("/home/newBreed");
  };


  return (
    <div>
      <form className="filter-form">
        <h3 className="form-title">Filters</h3>
        <div className="results-line">
          <p className="results">129 results</p>
          <button className="clear-button">Clear all</button>
        </div>
        <div className="form-divider"></div>
        <h4 htmlFor="input-temperament" className="form-label">
          TEMPERAMENT
        </h4>
        <select
          name="temperament"
          id="input-temperament"
          className="temperament-select"
        >
          <option key='0' value={0}>Select temperament</option>
          {temperaments.map((temp) => {
            return <option key={temp.id} value={temp.id}>{temp.name}</option>;
          })}
        </select>
        <div className="form-divider"></div>
        <h4 htmlFor="input-source" className="form-label">
          SOURCE
        </h4>
        <label className="check-item">
          Breed database
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <label className="check-item">
          User created
          <input type="checkbox" />
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
