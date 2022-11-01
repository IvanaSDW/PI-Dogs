import "./searchBar.css";

const SearchBar = () => {
  return (
    <div className="searchContainer">
      <input className="searchInput" placeholder="Search for breed" type='text'/>
      <button className="searchButton">SEARCH BREED</button>
    </div>
  );
};

export default SearchBar;
