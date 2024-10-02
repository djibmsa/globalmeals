// Import the CSS stylesheet for styling the Footer component
import "./Footer.css";
// Import React icons for LinkedIn and GitHub from the react-icons library
import { FaLinkedin, FaGithub } from "react-icons/fa";

// Define the Footer functional component
function Footer() {
  return (
    // Main footer element
    <footer>
      {/* Section for the footer content */}
      <section className="footer">
        {/* Paragraph displaying copyright information */}
        <p>Copyright © 2024</p>
        <div className="social-icons">
          {/* Link to LinkedIn profile */}
          <a
            href="https://www.linkedin.com/in/zakarya-moussa-boina-b71a56191" // URL of the LinkedIn profile
            target="_blank" // Opens the link in a new tab
            rel="noopener noreferrer" // Prevents security risks when using target="_blank"
            aria-label="LinkedIn" // Accessible label for screen readers
          >
            {/* LinkedIn icon */}
            <FaLinkedin />
          </a>
          {/* Link to GitHub profile */}
          <a
            href="https://github.com/djibmsa" // URL of the GitHub profile
            target="_blank" // Opens the link in a new tab
            rel="noopener noreferrer" // Prevents security risks when using target="_blank"
            aria-label="GitHub" // Accessible label for screen readers
          >
            {/* GitHub icon */}
            <FaGithub />
          </a>
        </div>
      </section>
    </footer>
  );
}

// Export the Footer component for use in other parts of the application
export default Footer;
