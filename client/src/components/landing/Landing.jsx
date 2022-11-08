import "./landing.css";
import GoHomeBtn from "./GoHomeBtn";

const Landing = () => {
  return (
    <div className="main-wrapper">
      <div className="landing-header">
        <div className="header-left-items">
          <p>About me</p>
          <p>More projects</p>
          <p>Contact</p>
        </div>
        <div className="landing-header-logo"></div>
        <div className="header-social-links">
        </div>
        </div>
      <div className="purple-circle">this is purple circle</div>
      <div className="turquoise-circle"></div>
      <div className="praga-image">

      </div>
      <div className="praga-badge">
        <h4 className="praga-title">Praga</h4>
        <h6 className="praga-life-span">2016 - 2022</h6>
      </div>
      <div className="landing-hero">
        <div className="hero-text">
          <h1 className="hero-title">My PI project - for dog lovers</h1>
          <h2 className="hero-subtitle">
            Made for Henry academy Lab project. In loving memory of Praga, my
            nephew’s cute pet, who passed away while I was working on this
            project.
          </h2>
        </div>
        <GoHomeBtn />
      </div>
    </div>
  );
};

export default Landing;
