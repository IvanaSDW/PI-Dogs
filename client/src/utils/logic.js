export const calcPageRange = (currentPage, pageQty) => {
  let pageRange = [];

  if (pageQty < 10) {
    pageRange = [...Array(pageQty).keys()].map((i) => i + 1);
    return pageRange;
  }

  const pagesLeft = pageQty - currentPage;

  if (pagesLeft < 4) {
    pageRange = [...Array(9).keys()].map((i) => i + pageQty - 8);
    return pageRange;
  }

  if (currentPage > 4) {
    pageRange = [...Array(9).keys()].map((i) => i + currentPage - 4);
  } else {
    pageRange = [...Array(pageQty < 9 ? pageQty : 9).keys()].map((i) => i + 1);
  }

  return pageRange;
};

export const calcBreedsToShowRange = (currentPage, cardsQty) => {
  const firstBreedToShow = currentPage * 8 - 8;
  const lastBreedToshow =
    currentPage * 8 > cardsQty ? cardsQty : currentPage * 8;
    return {first: firstBreedToShow, last: lastBreedToshow}
};

export const applyFilters = (breedsToFilter, userFilters) => {
  console.log("apply filters called");
      const { source, filterTemp, sortByName, sortByWeight } =
        userFilters;
      let filtered = [];
      switch (source) {
        case "all":
          filtered = breedsToFilter;
          break;
        case "local":
          filtered = breedsToFilter.filter((breed) => breed.is_local);
          break;
        case "api":
          filtered = breedsToFilter.filter((breed) => !breed.is_local);
          break;
        default:
          filtered = breedsToFilter;
          break;
      }

      if (filterTemp !== "0") {
        filtered = filtered.filter((breed) =>
          breed.temperaments.includes(filterTemp)
        );
      }

      if (sortByName === "ASC") {
        filtered = filtered.sort((a, b) => {
          if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
          if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
          return 0;
        });
      }

      if (sortByName === "DESC") {
        filtered = filtered.sort((a, b) => {
          if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
          if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
          return 0;
        });
      }

      if (sortByWeight === "ASC") {
        filtered = filtered.sort((a, b) => {
          if (
            (a.min_weight + a.max_weight) / 2 >
            (b.min_weight + b.max_weight) / 2
          )
            return 1;
          if (
            (b.min_weight + b.max_weight) / 2 >
            (a.min_weight + a.max_weight) / 2
          )
            return -1;
          return 0;
        });
      }

      if (sortByWeight === "DESC") {
        filtered = filtered.sort((a, b) => {
          if (
            (a.min_weight + a.max_weight) / 2 >
            (b.min_weight + b.max_weight) / 2
          )
            return -1;
          if (
            (b.min_weight + b.max_weight) / 2 >
            (a.min_weight + a.max_weight) / 2
          )
            return 1;
          return 0;
        });
      }

      return filtered.map((e) => e);
}
