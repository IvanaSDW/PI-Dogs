import "./newBreed.css";
import leftArrow from "../../../assets/left-arrow.png";
import Footer from "../../footer/Footer";
import NavBar from "../../header/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { createBreedAction } from "../../../redux/actions/breedActions";
import { useEffect, useState } from "react";
import {
  validateHeight,
  validateName,
  validateWeight,
  validateYears,
  validateTemperaments,
  validateAll,
} from "./formValidators";
import TempCard from "./TempCard";
import FabAddTemp from "./FabAddTemp";
import { createTemperamentAction } from "../../../redux/actions/temperamentActions";

const NewBreed = ({ history }) => {
  //Redux state
  const { breedDbloading, breedDbError: networkError } = useSelector(
    (state) => state.breeds
  );

  const { temperaments, tempDbLoading, tempsDbError } = useSelector(
    (state) => state.temps
  );

  //Local states
  const [newBreedObj, setNewBreedObj] = useState({
    is_local: true,
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_years: "",
    max_years: "",
    temperaments: [],
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: { touched: false, error: false, message: "" },
    min_height: { touched: false, error: false, message: "" },
    max_height: { touched: false, error: false, message: "" },
    min_weight: { touched: false, error: false, message: "" },
    max_weight: { touched: false, error: false, message: "" },
    min_years: { touched: false, error: false, message: "" },
    max_years: { touched: false, error: false, message: "" },
    temperaments: { touched: false, error: false, message: "" },
  });

  const [formValidate, setFormValidate] = useState(false);

  /* */

  const forbiddenChars = ["e", "-", "+", "."]; // Avoid in numeric fields

  useEffect(() => {
    console.log("newBreedObj changed");
    validateAll(newBreedObj, fieldErrors, setFieldErrors);
  }, [newBreedObj]);

  useEffect(() => {
    console.log("newBreedObj changed");
    let allTouched = true;
    let someError = false;
    console.log('Temp error is currently: ', fieldErrors.temperaments.error);
    console.log('Name error is currently: ', fieldErrors.name.error);
    for (const field in fieldErrors) {
      if (fieldErrors[field].error) someError = true;
      if (!fieldErrors[field].touched) allTouched = false;
    }
    console.log("AllTouched: ", allTouched);
    console.log("SomeError: ", someError);
    if (allTouched) {
      setFormValidate(prevValidate => {
        return !someError;})
    }
  }, [fieldErrors])

  // Reset form after sucessfully created new breed
  useEffect(() => {
    if (!networkError && !breedDbloading) {
      setNewBreedObj((prevObj) => {
        return {
          ...prevObj,
          name: "",
          min_height: "",
          max_height: "",
          min_weight: "",
          max_weight: "",
          min_years: "",
          max_years: "",
          temperaments: [],
        };
      });
      setFieldErrors((prevErr) => {
        return {
          ...prevErr,
          name: { touched: false, error: false, message: "" },
          min_height: { touched: false, error: false, message: "" },
          max_height: { touched: false, error: false, message: "" },
          min_weight: { touched: false, error: false, message: "" },
          max_weight: { touched: false, error: false, message: "" },
          min_years: { touched: false, error: false, message: "" },
          max_years: { touched: false, error: false, message: "" },
          temperaments: { touched: false, error: false, message: "" },
        };
      });
    }
  }, [networkError, breedDbloading]);

  const dispatch = useDispatch();
  const createBreed = () => dispatch(createBreedAction(newBreedObj));

  const onTemperamentSelected = (e) => {
    console.log('OnChange called in select temp');
    setFieldErrors((prevErr) => {
      return {
        ...prevErr,
        temperaments: {
          ...prevErr.temperaments,
          touched: true,
        },
      };
    });
    setNewBreedObj((prevObj) => {
      return {
        ...prevObj,
        temperaments: [...prevObj.temperaments, e.target.value],
      };
    });
  };

  const onRemoveTemp = (temp) => {
    const indexToremove = newBreedObj.temperaments.indexOf(temp);
    console.log("temp to remove: ", indexToremove);
    setNewBreedObj((prevObj) => {
      return {
        ...prevObj,
        temperaments: prevObj.temperaments.filter((item) => item !== temp),
      };
    });
  };

  const onCreateNewTemperament = (temperament) =>
    dispatch(createTemperamentAction(temperament));

  const handleInput = (e) => {
    let inputField = e.target.name;
    let inputValue;
    if (e.target.type === "number" && e.target.value.length > 0)
      inputValue = Number(e.target.value);
    else inputValue = e.target.value;

    setNewBreedObj((prevObj) => {
      return { ...prevObj, [inputField]: inputValue };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValidate && createBreed();
  };

  return (
    <div>
      <NavBar />
      <div className="new-breed-screen">
        <div className="form-card">
          <div className="card-header">
            <button className="back-btn" onClick={() => history.goBack()}>
              <img className="arrow" src={leftArrow} alt="arrow" />
              {"Back"}
            </button>
            <h2 className="card-title">Create new breed</h2>
          </div>

          <div className="card-body">
            <img
              src="https://placedog.net/600/600?r"
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
                  value={newBreedObj.name}
                  onChange={handleInput}
                  // onBlur={(e) => validateName(e.target.value, setFieldErrors)}
                  onBlur={(e) =>
                    setFieldErrors((prevErr) => {
                      return {
                        ...prevErr,
                        name: {
                          ...prevErr.name,
                          touched: true,
                        },
                      };
                    })
                  }
                />
                <div className="field-error">
                  <p className="error-text">{fieldErrors.name.message}</p>
                </div>
              </div>
              <div className="middle-body">
                <div className="left-col">
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
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          onKeyDown={(e) =>
                            forbiddenChars.includes(e.key) && e.preventDefault()
                          }
                          onChange={handleInput}
                          value={newBreedObj.min_height}
                          // onBlur={() =>
                          //   validateHeight(
                          //     newBreedObj.min_height,
                          //     newBreedObj.max_height,
                          //     setFieldErrors,
                          //     true,
                          //     fieldErrors.max_height.touched
                          //   )
                          // }
                          onBlur={(e) =>
                            setFieldErrors((prevErr) => {
                              return {
                                ...prevErr,
                                min_height: {
                                  ...prevErr.min_height,
                                  touched: true,
                                },
                              };
                            })
                          }
                        />
                        <div className="field-error">
                          <p className="error-text">
                            {fieldErrors.min_height.message}
                          </p>
                        </div>
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
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          value={newBreedObj.max_height}
                          onKeyDown={(e) =>
                            forbiddenChars.includes(e.key) && e.preventDefault()
                          }
                          onChange={handleInput}
                          // onBlur={(e) =>
                          //   validateHeight(
                          //     newBreedObj.min_height,
                          //     newBreedObj.max_height,
                          //     setFieldErrors,
                          //     fieldErrors.min_height.touched,
                          //     true
                          //   )
                          // }
                          onBlur={(e) =>
                            setFieldErrors((prevErr) => {
                              return {
                                ...prevErr,
                                max_height: {
                                  ...prevErr.max_height,
                                  touched: true,
                                },
                              };
                            })
                          }
                        />
                        <div className="field-error">
                          <p className="error-text">
                            {fieldErrors.max_height.message}
                          </p>
                        </div>
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
                          placeholder="weight min"
                          name="min_weight"
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          onKeyDown={(e) =>
                            forbiddenChars.includes(e.key) && e.preventDefault()
                          }
                          onChange={handleInput}
                          value={newBreedObj.min_weight}
                          // onBlur={(e) =>
                          //   validateWeight(
                          //     newBreedObj.min_weight,
                          //     newBreedObj.max_weight,
                          //     setFieldErrors,
                          //     true,
                          //     fieldErrors.max_weight.touched
                          //   )
                          // }
                          onBlur={(e) =>
                            setFieldErrors((prevErr) => {
                              return {
                                ...prevErr,
                                min_weight: {
                                  ...prevErr.min_weight,
                                  touched: true,
                                },
                              };
                            })
                          }
                        />
                        <div className="field-error">
                          <p className="error-text">
                            {fieldErrors.min_weight.message}
                          </p>
                        </div>
                      </div>
                      <div className="sub-input">
                        <label className="sub-label" htmlFor="max_weight">
                          Max
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="weight max"
                          name="max_weight"
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          onKeyDown={(e) =>
                            forbiddenChars.includes(e.key) && e.preventDefault()
                          }
                          onChange={handleInput}
                          value={newBreedObj.max_weight}
                          // onBlur={(e) =>
                          //   validateWeight(
                          //     newBreedObj.min_weight,
                          //     newBreedObj.max_weight,
                          //     setFieldErrors,
                          //     fieldErrors.min_weight.touched,
                          //     true
                          //   )
                          // }
                          onBlur={(e) =>
                            setFieldErrors((prevErr) => {
                              return {
                                ...prevErr,
                                max_weight: {
                                  ...prevErr.max_weight,
                                  touched: true,
                                },
                              };
                            })
                          }
                        />
                        <div className="field-error">
                          <p className="error-text">
                            {fieldErrors.max_weight.message}
                          </p>
                        </div>
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
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          onKeyDown={(e) =>
                            forbiddenChars.includes(e.key) && e.preventDefault()
                          }
                          onChange={handleInput}
                          value={newBreedObj.min_years}
                          // onBlur={(e) =>
                          //   validateYears(
                          //     newBreedObj.min_years,
                          //     newBreedObj.max_years,
                          //     setFieldErrors,
                          //     true,
                          //     fieldErrors.max_years.touched
                          //   )
                          // }
                          onBlur={(e) =>
                            setFieldErrors((prevErr) => {
                              return {
                                ...prevErr,
                                min_years: {
                                  ...prevErr.min_years,
                                  touched: true,
                                },
                              };
                            })
                          }
                        />
                        <div className="field-error">
                          <p className="error-text">
                            {fieldErrors.min_years.message}
                          </p>
                        </div>
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
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          onKeyDown={(e) =>
                            forbiddenChars.includes(e.key) && e.preventDefault()
                          }
                          onChange={handleInput}
                          value={newBreedObj.max_years}
                          // onBlur={(e) =>
                          //   validateYears(
                          //     newBreedObj.min_years,
                          //     newBreedObj.max_years,
                          //     setFieldErrors,
                          //     fieldErrors.min_years.touched,
                          //     true
                          //   )
                          // }
                          onBlur={(e) =>
                            setFieldErrors((prevErr) => {
                              return {
                                ...prevErr,
                                max_years: {
                                  ...prevErr.max_years,
                                  touched: true,
                                },
                              };
                            })
                          }
                        />
                        <div className="field-error">
                          <p className="error-text">
                            {fieldErrors.max_years.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-col">
                  <FabAddTemp onAdd={onCreateNewTemperament} />
                  <div className="form-group">
                    <label htmlFor="temperaments" className="temperament-group">
                      Temperaments
                    </label>

                    <div className="field-error">
                      <p className="error-text">
                        {fieldErrors.temperaments.message}
                      </p>
                    </div>
                    <select
                      name="temperaments"
                      id="select-temps"
                      className="temp-select form-control"
                      value={""}
                      onChange={onTemperamentSelected}
                      onBlur={(e) => {
                        console.log('onblur in select called');
                        setFieldErrors((prevErr) => {
                          return {
                            ...prevErr,
                            temperaments: {
                              ...prevErr.temperaments,
                              touched: true,
                            },
                          };
                        });
                      }}
                    >
                      <option key={0} value={""}>
                        --select temperaments--
                      </option>
                      {temperaments.map((temp) => {
                        return (
                          <option key={temp.id} value={temp.name}>
                            {temp.name}
                          </option>
                        );
                      })}
                    </select>
                    <div className="temps-list">
                      {newBreedObj.temperaments.map((temp) => {
                        return (
                          <TempCard
                            key={temp}
                            temperament={temp}
                            onRemoveTemp={onRemoveTemp}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <button
                disabled={!formValidate}
                className={`btn-create ${
                  formValidate ? "enabled" : "disabled"
                }`}
                type="submit"
              >
                Create
              </button>
              <div
                className={`${breedDbloading ? "loading" : ""} ${
                  networkError ? "error" : ""
                }`}
              >
                {breedDbloading ? <p>L O A D I N G . . .</p> : null}
                {networkError ? <p>{networkError.message}</p> : null}
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
