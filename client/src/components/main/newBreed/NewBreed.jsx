import "./newBreed.css";
import Footer from "../../footer/Footer";
import NavBar from "../../header/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { createBreedAction } from "../../../redux/actions/breedActions";
import { useState } from "react";

const NewBreed = () => {
  //Redux state
  const { loading, error } = useSelector((state) => state.breed);

  //Local state
  const [newBreedObj, setNewBreedObj] = useState({
    is_local: true,
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_years: "",
    max_years: "",
  });

  const dispatch = useDispatch();

  const createBreed = () => dispatch(createBreedAction(newBreedObj));

  const handleInput = (e) => {
    let inputField = e.target.name;
    let inputValue;

    if (e.target.type === "number" && e.target.value.length > 0)
      inputValue = Number(e.target.value);
    else inputValue = e.target.value;

    if (inputField === "min_years" || inputField === "max_years") {
      setNewBreedObj((prevObj) => {
        return {
          ...prevObj,
          [inputField]: inputValue,
        };
      });
    } else {
      setNewBreedObj((prevObj) => {
        return { ...prevObj, [inputField]: inputValue };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form

    //If no errors
    createBreed();
  };
  return (
    <div>
      <NavBar />
      <div className="new-breed-screen">
        <div className="form-card">
          <h2 className="card-title">Create new breed</h2>
          <div className="card-body">
            <img
              src="https://placedog.net/300/340?r"
              alt="new breed"
              className="new-breed-image"
            />
            <form onSubmit={handleSubmit} className="breed-form">
              <div className="form-group">
                <label htmlFor="inputName" className="name-group">
                  Breed Name
                </label>
                <input
                  type="text"
                  className="form-control name-input"
                  placeholder="Breed name"
                  name="name"
                  onChange={handleInput}
                  value={newBreedObj.name}
                />
              </div>
              <div className="form-group">
                <label>Height (cm)</label>
                <div className="double-input">
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="min_height">
                      Min
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="height min"
                      name="min_height"
                      onChange={handleInput}
                      value={newBreedObj.min_height}
                    />
                  </div>
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="max_height">
                      Max
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="height max"
                      name="max_height"
                      onChange={handleInput}
                      value={newBreedObj.max_height}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <div className="double-input">
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="min_weight">
                      Min
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="height min"
                      name="min_weight"
                      onChange={handleInput}
                      value={newBreedObj.min_weight}
                    />
                  </div>
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="max_weight">
                      Max
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="height max"
                      name="max_weight"
                      onChange={handleInput}
                      value={newBreedObj.max_weight}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Life span (years)</label>
                <div className="double-input">
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="min_years">
                      Min
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="years min"
                      name="min_years"
                      onChange={handleInput}
                      value={newBreedObj.min_years}
                    />
                  </div>
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="max_years">
                      Max
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="years max"
                      name="max_years"
                      onChange={handleInput}
                      value={newBreedObj.max_years}
                    />
                  </div>
                </div>
              </div>
              <button className="btn-create" type="submit">
                Create
              </button>
              <div
                className={`${loading ? "loading" : ""} ${
                  error ? "error" : ""
                }`}
              >
                {loading ? "L O A D I N G ..." : null}
                {error ? <p>{error.message}</p> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default NewBreed;
