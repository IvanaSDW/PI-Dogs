import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreedsByNameAction } from "../../../redux/actions/breedActions";
import { RESET_BREEDS_DB_ERROR } from "../../../redux/types";
import "./searchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  //global state
  const { breedsToRender, breedDbError } = useSelector((state) => state.breeds);

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [inputError, setInputError] = useState({ error: false, message: "" });

  const searchByName = (name) => {
    dispatch(getBreedsByNameAction(name));
  };

  useEffect(() => {
    setSearchTerm('')
  }, [breedsToRender])

  useEffect(() => {
    console.log('search term changed..');
    dispatch({type: RESET_BREEDS_DB_ERROR})
    setInputError((prevError) => {
      return {
        ...prevError,
        error: false,
        message: "",
      };
    });
  }, [searchTerm]);

  const handleInput = (e) => {
    const keyWord = e.target.value.trimStart();
    setSearchTerm((prevState) => {
      prevState = keyWord;
      return prevState;
    });
  };

  const handleSubmit = () => {
    const keyWord = searchTerm.trim();
    setSearchTerm((prevState) => {
      prevState = keyWord;
      return prevState;
    });
    if (keyWord.length >= 3) {
      setInputError((prevError) => {
        return {
          ...prevError,
          error: false,
          message: "",
        };
      });
      searchByName(keyWord);
    } else {
      setInputError((prevError) => {
        return {
          ...prevError,
          error: true,
          message: "Provide at least three characteres to search.",
        };
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  return (
    <div className="searchContainer">
      <div className="search-line">
        <input
          className="searchInput"
          placeholder="Search for breed"
          type="text"
          value={searchTerm}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        <button className="searchButton" onClick={handleSubmit}>
          SEARCH BREED
        </button>
      </div>
      <div
        className={`error-container ${
          inputError.error ? "error-visible" : "error-hidden"
        }`}
      >
        <p>{inputError.message}</p>
      </div>
      <div
        className={`network-error ${
          breedDbError ? "error-visible" : "error-hidden"
        }`}
      >
        {breedDbError ? <p>
          {breedDbError.message.includes("404")
            ? "No breeds found for " + searchTerm
            : "Error fetching data"}
        </p> : null}
      </div>
    </div>
  );
};

export default SearchBar;
