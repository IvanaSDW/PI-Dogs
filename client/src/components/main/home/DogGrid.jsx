import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DogCard from "../home/DogCard.jsx";
import "./dogGrid.css";

const DogGrid = (props) => {
  //Global State
  const { breeds, breedDbError, breedDbloading } = useSelector(
    (state) => state.breeds
  );

  const { breedsToRender } = props;

  return (
    <>
      <div className="gridContainer">
        {breedsToRender.map((breed) => {
          return <DogCard key={breed.id} breed={breed} />;
        })}
      </div>
      <div className="pagination-divider"></div>
      <div className="pagination">
        <p className="end-button'">{"<<"}</p>
        <p className="prevButton">Previous</p>
        <p className="pageNum">1</p>
        <p className="pageNum">2</p>
        <p className="pageNum">3</p>
        <p className="pageNum">4</p>
        <p className="pageNum">5</p>
        <p className="pageNum">6</p>
        <p className="pageNum">7</p>
        <p className="pageNum">8</p>
        <p className="prevNext">Next</p>
        <p className="end-button">{">>"}</p>
      </div>
    </>
  );
};

export default DogGrid;
