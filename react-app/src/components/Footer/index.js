import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-info">
          <h3>Artzy</h3>
          <p>Built by Ali Keshanian - 2023</p>
        </div>
        <div className="footer-icons">
          <a
            href="https://github.com/ark1980"
            target="_blank"
            className="footer-link"
          >
            <FontAwesomeIcon icon={faSquareGithub} className="icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/alirezakeshanian/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedin} className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
