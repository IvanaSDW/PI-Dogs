import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CURRENT_PAGE } from "../../../redux/types/index.js";
import DogCard from "../home/DogCard.jsx";
import "./dogGrid.css";

const DogGrid = () => {
  const dispatch = useDispatch();

  //Global States
  const { breedsToRender, currentPage } = useSelector((state) => state.breeds);

  console.log("Dog grid rendered on page: ", currentPage);
  // Local states
  // const [currentPage, setCurrentPage] = useState(1);
  const [breedsThisPage, setBreedsThisPage] = useState();
  const [pageRange, setPageRange] = useState();

  const cardsQty = breedsToRender.length;
  const pageQty = Math.ceil(cardsQty / 8);

  useEffect(() => {
    console.log("breedsToRender changed ");

    //calc pagination state first time
    // setCurrentPage(1);
    if (pageQty > 9) {
      setPageRange([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    } else {
      setPageRange([...Array(pageQty).keys()].map((i) => i + 1));
    }

    // const firstBreedToShow = currentPage * 8 - 8;
    const firstBreedToShow = 0;
    const lastBreedToshow =
      // currentPage * 8 > breedsToRender.length
      8 > breedsToRender.length
        ? breedsToRender.length
        : 8;
        // : currentPage * 8;

    setBreedsThisPage(breedsToRender.slice(firstBreedToShow, lastBreedToshow));

    console.log("currentPage state: ", currentPage);
    console.log("page range: ", pageRange);
    console.log("page qty: ", pageQty);
    console.log("cards qty: ", cardsQty);
    console.log("firstBreedToShow: ", firstBreedToShow);
    console.log("lastBreedToshow: ", lastBreedToshow);
    console.log("breeds this page: ", breedsThisPage);
  }, [breedsToRender]);

  const onPageChange = (page) => {
    if (page < 1 || page > pageQty) return;
    dispatch({
      type: UPDATE_CURRENT_PAGE,
      payload: page,
    })

    const firstBreedToShow = page * 8 - 8;
    const lastBreedToshow = page * 8 > cardsQty ? cardsQty : page * 8;
    setBreedsThisPage(breedsToRender.slice(firstBreedToShow, lastBreedToshow));

    if (pageQty < 10) return;
    const pagesLeft = pageQty - page;
    if (pagesLeft < 4) {
      setPageRange([...Array(9).keys()].map((i) => i + pageQty - 8));
      return;
    }
    if (page > 4) {
      setPageRange([...Array(9).keys()].map((i) => i + page - 4));
    } else {
      setPageRange(
        [...Array(pageQty < 9 ? pageQty : 9).keys()].map((i) => i + 1)
      );
    }
    console.log("page range: ", pageRange);
    console.log("firstBreedToShow: ", firstBreedToShow);
    console.log("lastBreedToshow: ", lastBreedToshow);
    console.log("breedsNow: ", breedsThisPage);
  };

  return (
    <>
      <div className="gridContainer">
        {breedsThisPage?.map((breed) => {
          return <DogCard key={breed.id} breed={breed} />;
        })}
      </div>
      <div className={`paginator-container ${pageQty === 1 ? "hidden" : ""}`}>
        <div className="pagination-divider"></div>
        <div className="pagination">
          <p className="first-last-button" onClick={() => onPageChange(1)}>{"<<"}</p>
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
          <p className="first-last-button"onClick={() => onPageChange(pageQty)}>{">>"}</p>
        </div>
      </div>
    </>
  );
};

export default DogGrid;
