import {
  ALL_SOURCES,
  DOGS_API,
  NAME_ASCENDING,
  NAME_ASC_WEIGHT_ASC,
  NAME_ASC_WEIGHT_DESC,
  NAME_DESCENDING,
  NAME_DESC_WEIGHT_ASC,
  NAME_DESC_WEIGHT_DESC,
  TEMPERAMENT_UNSELECTED,
  USER_CREATED,
  WEIGHT_ASCENDING,
  WEIGHT_ASC_NAME_ASC,
  WEIGHT_ASC_NAME_DESC,
  WEIGHT_DESCENDING,
  WEIGHT_DESC_NAME_ASC,
  WEIGHT_DESC_NAME_DESC,
} from "../redux/types";

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
  return { first: firstBreedToShow, last: lastBreedToshow };
};

export const applyFilters = (breedsToFilter, userFilters) => {
  const { source, filterTemp, sorting } = userFilters;

  //Filters
  let filtered = [];
  switch (source) {
    case ALL_SOURCES:
      filtered = [...breedsToFilter];
      break;
    case USER_CREATED:
      filtered = breedsToFilter.filter((breed) => breed.is_local);
      break;
    case DOGS_API:
      filtered = breedsToFilter.filter((breed) => !breed.is_local);
      break;
    default:
      filtered = breedsToFilter;
      break;
  }

  if (filterTemp !== TEMPERAMENT_UNSELECTED) {
    filtered = filtered.filter((breed) =>
      breed.temperaments.includes(filterTemp)
    );
  }

  // Sortings

  switch (sorting) {
    case NAME_ASCENDING:
      filtered = filtered.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
        return 0;
      });
      break;
    case NAME_DESCENDING:
      filtered = filtered.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
        if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
        return 0;
      });
      break;
    case WEIGHT_ASCENDING:
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
      break;
    case WEIGHT_DESCENDING:
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
      break;
    case NAME_ASC_WEIGHT_ASC:
      filtered = filtered.sort(
        (a, b) => a.name.localeCompare(b.name.toUpperCase())
        //  || (a.min_weight + a.max_weight) / 2 - (b.min_weight + b.max_weight) / 2
      );
      break;
    case NAME_ASC_WEIGHT_DESC:
      filtered = filtered.sort(
        (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())
        // || (b.min_weight + b.max_weight) / 2 - (a.min_weight + a.max_weight) / 2
      );
      break;
    case NAME_DESC_WEIGHT_ASC:
      filtered = filtered.sort(
        (a, b) => b.name.toUpperCase().localeCompare(a.name.toUpperCase())
        // || (a.min_weight + a.max_weight) / 2 - (b.min_weight + b.max_weight) / 2
      );
      break;
    case NAME_DESC_WEIGHT_DESC:
      filtered = filtered.sort(
        (a, b) => b.name.toUpperCase().localeCompare(a.name.toUpperCase())
        //  || (b.min_weight + b.max_weight) / 2 - (a.min_weight + a.max_weight) / 2
      );
      break;
    case WEIGHT_ASC_NAME_ASC:
      console.log('Sortin weight desc - name asc');
      filtered = filtered.sort((a, b) => {
        if (
          (a.min_weight + a.max_weight) / 2 ===
          (b.min_weight + b.max_weight) / 2
        ) {
          return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
        }
        return (
          (a.min_weight + a.max_weight) / 2 - (b.min_weight + b.max_weight) / 2
        );
      });
      break;
    case WEIGHT_ASC_NAME_DESC:
      filtered = filtered.sort((a, b) => {
        if (
          (a.min_weight + a.max_weight) / 2 ===
          (b.min_weight + b.max_weight) / 2
        ) {
          return b.name.toUpperCase().localeCompare(a.name.toUpperCase());
        }
        return (
          (a.min_weight + a.max_weight) / 2 - (b.min_weight + b.max_weight) / 2
        );
      });
      break;
    case WEIGHT_DESC_NAME_ASC:
      filtered = filtered.sort(
        (a, b) =>
          (b.min_weight + b.max_weight) / 2 -
            (a.min_weight + a.max_weight) / 2 ||
          a.name.toUpperCase().localeCompare(b.name.toUpperCase())
      );
      break;
    case WEIGHT_DESC_NAME_DESC:
      filtered = filtered.sort(
        (a, b) =>
          (b.min_weight + b.max_weight) / 2 -
            (a.min_weight + a.max_weight) / 2 ||
          b.name.toUpperCase().localeCompare(a.name.toUpperCase())
      );
      break;
    default:
      break;
  }

  // return filtered.map((e) => e);
  return filtered;
};
