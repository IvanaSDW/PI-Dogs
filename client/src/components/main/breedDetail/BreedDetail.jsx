import { useHistory } from "react-router-dom";
import "./breedDetail.css";
import leftArrow from "../../../assets/left-arrow.png";
import fav_on from "../../../assets/favorite_on.png";
import fav_off from "../../../assets/favorite_off.png";
import NavBar from "../../header/NavBar.jsx";
import Footer from "../../footer/Footer";
import { useBreed } from "./useBreedHook";
import { useSelector } from "react-redux";

const BreedDetail = (props) => {

  //Received by props
  const { breedId } = props.match.params;

  //Global state
  const { breedDbloading, breedDbError } = useSelector(state => state.breeds)

  const currentBreed = useBreed(breedId);

  const navigate = useHistory();

  return (
    <>
      <NavBar />
      <div className="breed-detail-container">
        {currentBreed ? (
          <div className="detail-card">
            <img
              className="breed-image"
              src={currentBreed?.imageUrl}
              alt="breed"
            />
            <div className="detail-text">
              <button className="back-button" onClick={() => navigate.goBack()}>
                <img className="arrow" src={leftArrow} alt="arrow" />
                {"Back"}
              </button>
              <div className="detail-header">
                <p className="label">Breed</p>
                <h4 className="detail-title">{currentBreed?.name}</h4>
                <div className="favs">
                  <img
                    className="fav"
                    src={fav_off}
                    alt="arrow"
                    onClick={() => {}}
                  />
                  <p>5</p>
                </div>
              </div>
              <div className="detail-body">
                <div className="weigth">
                  <h6>Weight</h6>
                  <p>{currentBreed?.weight}</p>
                </div>
                <div className="heigth">
                  <h6>Height</h6>
                  <p>{currentBreed?.height}</p>
                </div>
                <div className="life-span">
                  <h6>Life span</h6>
                  <p>{currentBreed?.lifeSpan}</p>
                </div>
                <div className="temperament">
                  <h6>Temperament</h6>
                  <p>{currentBreed?.temperament}</p>
                </div>
              </div>
              <div className="detail-footer"></div>
            </div>
          </div>
        ) : (
          <p>L O A D I N G . . . </p>
        )}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default BreedDetail;
