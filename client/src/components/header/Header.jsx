import "./header.css";
import NavBar from "./NavBar.jsx";
import SearchBar from "../main/home/SearchBar.jsx";

const Header = () => {
  return (
    <div className="headerContainer">
      <NavBar />
      <SearchBar />
    </div>
  );
};

export default Header;
