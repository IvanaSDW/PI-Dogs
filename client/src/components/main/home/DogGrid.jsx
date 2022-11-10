import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CURRENT_PAGE } from "../../../redux/types/index.js";
import { calcBreedsToShowRange, calcPageRange } from "../../../utils/logic.js";
import DogCard from "../home/DogCard.jsx";
import "./dogGrid.css";

const DogGrid = () => {
  const dispatch = useDispatch();

  //Global States
  const { breedsToRender, currentPage } = useSelector((state) => state.breeds);

  const cardsQty = breedsToRender.length;
  const pageQty = Math.ceil(cardsQty / 8);

  // Local states
  const [pageRange, setPageRange] = useState(
    calcPageRange(currentPage, pageQty)
  );

  const [breedsToShowRange, setbreedsToShowRange] = useState(
    calcBreedsToShowRange(currentPage, cardsQty)
  );

  useEffect(() => {
    setPageRange(calcPageRange(currentPage, pageQty));

    setbreedsToShowRange(calcBreedsToShowRange(currentPage, cardsQty));
  }, [breedsToRender]);

  const onPageChange = (page) => {
    if (page < 1 || page > pageQty) return;
    dispatch({
      type: UPDATE_CURRENT_PAGE,
      payload: page,
    });

    setPageRange(calcPageRange(page, pageQty));

    setbreedsToShowRange(calcBreedsToShowRange(page, cardsQty));
  };

  return (
    <>
      <div className="gridContainer">
        {breedsToRender.length > 0 ? (
          breedsToRender
            .slice(breedsToShowRange.first, breedsToShowRange.last)
            .map((breed) => {
              return <DogCard key={breed.id} breed={breed} />;
            })
        ) : (
          <div className="no-breeds-message">
            <p>No breeds match current filters</p>
          </div>
        )}
      </div>
      <div className={`paginator-container ${pageQty < 2 ? "hidden" : ""}`}>
        <div className="pagination-divider"></div>
        <div className="pagination">
          <p className="first-last-button" onClick={() => onPageChange(1)}>
            {"<<"}
          </p>
          <p
            className="prev-next-button"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </p>
          {pageRange?.map((thisPage) => {
            return (
              <p
                className={`pageNum ${
                  thisPage === currentPage ? "current" : ""
                }`}
                key={thisPage}
                onClick={() => onPageChange(thisPage)}
              >
                {thisPage}
              </p>
            );
          })}
          <p
            className="prev-next-button"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </p>
          <p
            className="first-last-button"
            onClick={() => onPageChange(pageQty)}
          >
            {">>"}
          </p>
        </div>
      </div>
    </>
  );
};

export default DogGrid;
