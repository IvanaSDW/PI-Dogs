import "./dogCard.css";
import rightArrow from "../../../assets/right-arrow.png";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_OPENED_DETAIL_TRUE } from "../../../redux/constants";

const DogCard = (props) => {
  const { breed } = props;

  const navigate = useHistory();
  const dispatch = useDispatch();

  const onShowDetail = () => {
    dispatch({
      type: SET_OPENED_DETAIL_TRUE,
    })
    navigate.push(`/home/breeds/${breed.id}`);
  };


  return (
    <div className="dog-card">
      {breed.image_url.includes("undefined") ? (
        <h3 className="image-not-found">No image found</h3>
      ) : (
        <img className="dog-image" src={breed.image_url} alt="breed" />
      )}
      <h4 className="breed-name">{breed.name}</h4>
      <div className="breed-temperament">
        <p>{breed.temperaments.join(", ")}</p>
      </div>
      <div className="caption-line">
        <p className="weight">{`${breed.min_weight}-${breed.max_weight} kgs`}</p>
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
