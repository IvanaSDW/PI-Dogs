import "./dogCard.css";
import rightArrow from "../../../assets/right-arrow.png";
import { useHistory } from "react-router-dom";

const DogCard = (props) => {

  const navigate = useHistory();

  const onShowDetail = () => {
    navigate.push("/home/breeds/breedId");
  };

  return (
    <div className="dog-card">
      <img
        className="dog-image"
        src="https://placedog.net/300/340?r"
        alt="breed"
      />
      <h4 className="breed-name">Breed Name</h4>
      <div className="breed-temperament">
        <p>Outgoing, Friendly, Alert, Confident, Intelligent, Courageous</p>
      </div>
      <div className="caption-line">
        <p className="weight">8-28 kgs</p>
        <button className="breed-detail-button">
          <img
            className="arrow"
            src={rightArrow}
            alt="arrow"
            onClick={() => onShowDetail()}
          />
        </button>
      </div>
    </div>
  );
};

export default DogCard;
