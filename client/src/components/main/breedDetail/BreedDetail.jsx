import { useHistory } from "react-router-dom";
import "./breedDetail.css";
import leftArrow from "../../../assets/left-arrow.png";
// import fav_on from "../../../assets/favorite_on.png";
import fav_off from "../../../assets/favorite_off.png";
import NavBar from "../../header/NavBar.jsx";
import Footer from "../../footer/Footer";
import { useBreed } from "./useBreedHook";
import { useDispatch, useSelector } from "react-redux";
import { deleteBreedByIdAction } from "../../../redux/actions/breedActions";
import { useEffect, useState } from "react";

const BreedDetail = (props) => {
  //Received by props
  const { breedId } = props.match.params;

  //Global state
  const { breedDbloading, breedDbError, workingOnDelete, deleteBreedError } =
    useSelector((state) => state.breeds);

  const currentBreed = useBreed(breedId);

  const navigate = useHistory();

  const dispatch = useDispatch();

  const onDeleteBreed = (breedId) => {
    dispatch(deleteBreedByIdAction(breedId));
  };

  const [isFirstRender, setFirstRender] = useState(true);
  const [isBreedDeleted, setBreedDeleted] = useState(false);

  useEffect(() => {
    if (workingOnDelete) {
      setFirstRender(false);
    } else {
      if (!isFirstRender) {
        if (deleteBreedError) {
          console.log('error deleting breed')
        } else {
          setBreedDeleted(true);
        }
      }
    }
  }, [workingOnDelete, deleteBreedError]);

  return (
    <>
      <NavBar />
      <div className="breed-detail-container">
        <div className="card-wrapper">
          {!breedDbError && !breedDbloading && !isBreedDeleted ? (
            <div className="detail-card">
              <img
                className="breed-image"
                src={currentBreed?.imageUrl}
                alt="breed"
              />
              <div className="detail-text">
                <button
                  className="back-button"
                  onClick={() => navigate.goBack()}
                >
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
                <div className="detail-footer">
                  {breedId.slice(0, 3) === "api" ? null : (
                    <button
                      className="delete-button"
                      onClick={() => onDeleteBreed(breedId)}
                    >
                      {workingOnDelete ? (
                        <p>w o r k i n g ...</p>
                      ) : deleteBreedError ? (
                        <p>{"Could not delete breed."}</p>
                      ) : (
                        <p>
                          Delete this breed{" "}
                          <span className="trash-can">{"\u{1F5D1}"}</span>
                        </p>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="error-card">
              {breedDbloading ? (
                <p>L O A D I N G . . . </p>
              ) : (
                <div>
                  <button
                    className="back-button"
                    onClick={() => navigate.goBack()}
                  >
                    <img className="arrow" src={leftArrow} alt="arrow" />
                    {"Back"}
                  </button>
                  <p>There is no information about this breed or could have been deleted.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default BreedDetail;
