import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./fabAddTemp.css";

const FabAddTemp = ({ onAdd }) => {
  const Cycle = {
    READY: "READY",
    SET: "SET",
    LOADING: "LOADING",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
  };

  const [newTemp, setNewTemp] = useState("");
  const [cycleState, setCycleState] = useState(Cycle.READY);

  const { tempsDbError, tempsDbloading } = useSelector((state) => state.temps);

  useEffect(() => {
    if (tempsDbError) {
      setCycleState(Cycle.ERROR);
    } else {
      if (cycleState === Cycle.LOADING) {
        setCycleState(Cycle.SUCCESS);
      }
    }
    if (tempsDbloading) {
      if (cycleState === Cycle.SET) setCycleState(Cycle.LOADING);
    }
  }, [tempsDbError, tempsDbloading]);

  const takeInput = (e) => {
    setNewTemp(e.target.value);
    resetMessage();
  };

  const handleSubmit = async (newTemp) => {
    await onAdd(newTemp);
  };

  const resetMessage = () => {
    setCycleState(Cycle.SET);
  };

  const renderMessage = (cycleState) => {
    switch (cycleState) {
      case Cycle.READY:
        return "";
      case Cycle.LOADING:
        return "Loading";
      case Cycle.ERROR:
        return tempsDbError.message;
      case Cycle.SUCCESS:
        return `"${newTemp}" succesfully added!`;
      default:
        return "";
    }
  };

  return (
    <div className="fab">
      <div className="fab-pop-up">
        <div className="fab-input">
          <input
            className="control"
            placeholder="Type new temperament"
            type="text"
            value={newTemp}
            onChange={takeInput}
          />
          <button className="submit-temp" onClick={() => handleSubmit(newTemp)}>
            ADD
          </button>
        </div>
        <div
          className={`field-error ${
            tempsDbError ? "add-temp-error" : "add-temp-success"
          }`}
        >
          <p className="error-text">{renderMessage(cycleState)}</p>
        </div>
      </div>
      <div className="fab-action-button">+</div>
    </div>
  );
};

export default FabAddTemp;
