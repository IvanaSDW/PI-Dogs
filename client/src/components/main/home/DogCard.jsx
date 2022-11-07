import "./dogCard.css";
import rightArrow from "../../../assets/right-arrow.png";
import { useHistory } from "react-router-dom";

const DogCard = (props) => {

  const { breed } = props;

  const navigate = useHistory();

  const onShowDetail = (id) => {
    navigate.push(`/home/breeds/${id}`);
  };

  return (
    <div className="dog-card">
      <img
        className="dog-image"
        src={breed.image_url}
        alt="breed"
      />
      <h4 className="breed-name">{breed.name}</h4>
      <div className="breed-temperament">
        <p>{breed.temperaments.join(', ')}</p>
      </div>
      <div className="caption-line">
        <p className="weight">{`${breed.min_weight}-${breed.max_weight} kgs`}</p>
        <button className="breed-detail-button">
          <img
            className="arrow"
            src={rightArrow}
            alt="arrow"
            onClick={() => onShowDetail(breed.id)}
          />
        </button>
      </div>
    </div>
  );
};

export default DogCard;
