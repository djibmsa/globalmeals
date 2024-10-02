// Footer.js

import "./Footer.css";
// Importation des icônes depuis react-icons
import { FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <section className="footer">
      <p>Copyright © 2024</p>
        <div className="social-icons">
        
          <a
            href="https://www.linkedin.com/in/zakarya-moussa-boina-b71a56191"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/djibmsa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
