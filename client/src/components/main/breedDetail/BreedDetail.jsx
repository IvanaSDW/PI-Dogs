import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./breedDetail.css";
import leftArrow from "../../../assets/left-arrow.png";
import fav_on from "../../../assets/favorite_on.png";
import fav_off from "../../../assets/favorite_off.png";
import NavBar from "../../header/NavBar.jsx";
import Footer from "../../footer/Footer";

const BreedDetail = (props) => {
  const { breedObj } = props;

  const navigate = useHistory();
  useEffect(() => {
    document.body.addEventListener("keydown", onEscapeKeyDown);
    return function cleanUp() {
      document.body.removeEventListener("keydown", onEscapeKeyDown);
    };
  }, []);

  const { showingDetail, setShowDetail } = props;

  const onEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      setShowDetail(false);
    }
  };

  //   if (!showingDetail) return null;

  return (
    <>
      <NavBar />
      <div className="breed-detail-container">
        <div className="detail-card">
          <img
            className="breed-image"
            src="https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg"
            alt="breed"
          />
          <div className="detail-text">
            <button className="back-button" onClick={() => navigate.goBack()}>
              <img
                className="arrow"
                src={leftArrow}
                alt="arrow"
                onClick={() => setShowDetail(true)}
              />
              {"Back"}
            </button>
            <div className="detail-header">
              <p className="label">Breed</p>
              <h4 className="detail-title">{"Afghan Hound"}</h4>
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
                <p>23 - 27 kg</p>
              </div>
              <div className="heigth">
                <h6>Height</h6>
                <p>64 - 69 cm</p>
              </div>
              <div className="life-span">
                <h6>Life span</h6>
                <p>10 - 13 years</p>
              </div>
              <div className="temperament">
                <h6>Temperament</h6>
                <p>Aloof, Clownish, Dignified, Independent, Happy</p>
              </div>
            </div>
            <div className="detail-footer"></div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default BreedDetail;
