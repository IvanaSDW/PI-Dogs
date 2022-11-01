import "./footer.css";
import logoHenry from "../../assets/logo_henry.png";
import socialLinks from "../../assets/social_links_footer.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <img src={logoHenry} alt="logo-sponsor" className="logo-henry" />
      <p>© 2022 Jorge Castañeda. All rights reserved</p>
      <img src={socialLinks} alt="social links" className="social-links" />
    </div>
  );
};

export default Footer;
