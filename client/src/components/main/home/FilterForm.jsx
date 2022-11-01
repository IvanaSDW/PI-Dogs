import "./filterForm.css";

const FilterForm = () => {
  return (
    <div>
      <form action="submit" className="filter-form">
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
          defaultValue={0}
        >
          <option value="0" disabled="disabled">
            Select temperament
          </option>
          <option value="1">Select 1</option>
          <option value="2">Select 2</option>
          <option value="3">Select 3</option>
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
    </div>
  );
};

export default FilterForm;
