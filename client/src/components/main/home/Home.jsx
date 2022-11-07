import Header from "../../header/Header.jsx";
import DogGrid from "./DogGrid";
import "./home.css";
import FilterForm from "./FilterForm";
import Footer from "../../footer/Footer.jsx";

const Home = () => {

  return (
    <div className="mainContainer">
      <div className="header">
        <Header />
      </div>
      <div className="hero">
        <div className="title">Dog Breeds</div>
        <div className="subtitle">
          Trying to decide what type of dog is right for you and your family?
          Browse through our list of dog breeds using our filter tool, and find
          the best dog for you.
        </div>
      </div>
      <div className="filter">
        <FilterForm />
      </div>
      <div className="gallery">
        <DogGrid />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
