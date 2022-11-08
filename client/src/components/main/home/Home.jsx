import Header from "../../header/Header.jsx";
import DogGrid from "./DogGrid";
import "./home.css";
import FilterForm from "./FilterForm";
import Footer from "../../footer/Footer.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBreedsAction } from "../../../redux/actions/breedActions.js";

const Home = () => {

  const dispatch = useDispatch();
  //globalState
  const { breedsToRender, breedDbError, breedDbloading } = useSelector(
    (state) => state.breeds
  );

  // local state
  const [shallResetSearch, setShallResetSearch] = useState(false);

  const onResetSearch = (val) => {
    console.log('time to reset search: ', val)
      setShallResetSearch(val)
  }
  
  useEffect(() => {
    if (shallResetSearch) {
      setShallResetSearch(false);
      dispatch(getAllBreedsAction());
    }
  }, [shallResetSearch])


  return (
    <div className="mainContainer">
      <div className="header">
        <Header />
      </div>
      <div className="hero">
        <div className="title">Dog Breeds</div>
        <div className="subtitle">
          Trying to decide what type of dog is right for you and your family?
          Browse through our list of dog breeds using our filter tool, and find
          the best dog for you.
        </div>
      </div>
      <div className="filter">
        <FilterForm onResetSearch={onResetSearch}/>
      </div>
      <div className="gallery">
        <DogGrid breedsToRender={breedsToRender} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
