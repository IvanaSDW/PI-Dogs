import './tempCard.css';

const TempCard = ({temperament, onRemoveTemp}) => {

  return (
    <div className="temp-card-wrapper">
      <p className="temp-name">{temperament}</p>
      <p className="remove-temp" onClick={() => onRemoveTemp(temperament)}>X</p>
    </div>
  );
};

export default TempCard;
