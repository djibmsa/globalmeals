import { useState } from "react"; // Importing the useState hook from React for state management
import { Link, useNavigate } from "react-router-dom"; // Importing Link for navigation and useNavigate for programmatic navigation
import { toast } from "react-toastify"; // Importing toast for notifications
import { useUserContext } from "../../contexts/UserContext"; // Importing a custom context for user management
import "./NavbarToggle.css"; // Importing CSS for styling the Navbar

// Functional component definition for NavbarToggle
export default function NavbarToggle() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility
  const { user, setUser } = useUserContext(); // Destructuring user state and function from UserContext
  const navigate = useNavigate(); // Hook for programmatic navigation
  const notifyFail = () =>
    // Function to show error notification
    toast.error("Accès non autorisé, veuillez vous connecter");

  const { logout } = useUserContext(); // Extracting the logout function from UserContext

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Inverts the mobile menu state
  };

  // Function to handle user logout
  const handleLogout = () => {
    setUser(""); // Resets user state
    logout(false); // Calls logout function
    navigate("/"); // Redirects to the home page after logout
  };

  // Functions to manage dropdown visibility on desktop
  const handleMouseEnter = () => {
    setDropdownOpen(true); // Opens the dropdown on mouse enter
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false); // Closes the dropdown on mouse leave
  };

  return (
    <nav className="navbar">
      {" "}
      {/* Main navigation container */}
      <img
        src="/src/assets/images/logoGM.png" // Logo image source
        alt="logo" // Alt text for the logo
        className="globalLogo" // CSS class for styling the logo
      />
      {/* Mobile burger menu for toggling the mobile menu */}
      <div
        className="burger" // CSS class for burger menu styling
        onClick={toggleMobileMenu} // Toggle mobile menu on click
        onKeyDown={(e) => {
          // Handles keyboard interactions for accessibility
          if (e.key === "Enter" || e.key === " ") {
            toggleMobileMenu(); // Toggles mobile menu on Enter or Space key
          }
        }}
        role="button" // Specifies the role as a button for accessibility
        tabIndex={0} // Makes the element focusable via keyboard
        aria-label="Menu" // Accessibility label for the button
      >
        <div className="line" /> {/* Line 1 of the burger menu */}
        <div className="line" /> {/* Line 2 of the burger menu */}
        <div className="line" /> {/* Line 3 of the burger menu */}
      </div>
      <ul className={`navbar-nav ${isMobileMenuOpen ? "mobile-show" : ""}`}>
        {" "}
        {/* Navigation items */}
        <li className="nav-item">
          {" "}
          {/* Navigation item for Home */}
          <Link
            className="nav-link active" // Active link style
            to="/" // Link to home
            onClick={() => setIsMobileMenuOpen(false)} // Closes mobile menu on click
          >
            Accueil {/* Text for Home */}
          </Link>
        </li>
        {/* Dropdown menu for desktop, displayed on hover */}
        <li
          className="nav-item dropdown" // Dropdown item class
          onMouseEnter={handleMouseEnter} // Opens dropdown on mouse enter
          onMouseLeave={handleMouseLeave} // Closes dropdown on mouse leave
        >
          <div
            className="dropdown-toggle nav-link" // Class for dropdown toggle
            id="navbar-dropdown" // ID for the dropdown toggle
            role="button" // Specifies the role as a button for accessibility
          >
            Menus {/* Text for the dropdown toggle */}
          </div>
          <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
            {" "}
            {/* Dropdown items */}
            <li>
              <Link
                className="nav-dropdown" // Class for dropdown link
                to="/menuPage/europe" // Link to Europe menu
                onClick={() => setIsMobileMenuOpen(false)} // Closes mobile menu on click
              >
                Europe {/* Text for Europe menu */}
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`} // Adds disabled class if user is not logged in
                to={!user ? "#" : "/menuPage/afrique"} // Conditional link for Africa menu
                onClick={() => setIsMobileMenuOpen(false)} // Closes mobile menu on click
              >
                Afrique {/* Text for Africa menu */}
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`} // Adds disabled class if user is not logged in
                to={!user ? "#" : "/menuPage/amerique"} // Conditional link for America menu
                onClick={() => setIsMobileMenuOpen(false)} // Closes mobile menu on click
              >
                Amérique {/* Text for America menu */}
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`} // Adds disabled class if user is not logged in
                to={!user ? "#" : "/menuPage/asie"} // Conditional link for Asia menu
                onClick={() => setIsMobileMenuOpen(false)} // Closes mobile menu on click
              >
                Asie {/* Text for Asia menu */}
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`} // Adds disabled class if user is not logged in
                to={!user ? "#" : "/menuPage/oceanie"} // Conditional link for Oceania menu
                onClick={() => setIsMobileMenuOpen(false)} // Closes mobile menu on click
              >
                Océanie {/* Text for Oceania menu */}
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          {" "}
          {/* Navigation item for Favorites */}
          {user && user.role === "admin" ? ( // Conditional rendering based on user role
            <Link
              to="/admin" // Link to admin page
              className="nav-link active" // Active link style
              onClick={() => setIsMobileMenuOpen(false)} // Closes mobile menu on click
            >
              Création {/* Text for Creation (Admin) */}
            </Link>
          ) : (
            <Link
              to={!user ? "#" : "/favoris"} // Conditional link for Favorites menu
              className={`nav-link active ${!user ? "disabled" : ""}`} // Adds disabled class if user is not logged in
              onClick={(e) => {
                if (!user) {
                  // Checks if user is logged in
                  e.preventDefault(); // Prevents default action if not logged in
                  notifyFail(); // Shows error notification
                }
                setIsMobileMenuOpen(false); // Closes mobile menu on click
              }}
              onKeyDown={(e) => {
                // Handles keyboard interactions for accessibility
                if (!user) {
                  // Checks if user is logged in
                  e.preventDefault(); // Prevents default action if not logged in
                  notifyFail(); // Shows error notification
                } else if (e.key === "Enter" || e.key === " ") {
                  // Checks for Enter or Space key
                  setIsMobileMenuOpen(false); // Closes mobile menu
                  // Additional navigation logic can be added here
                }
              }}
              role="link" // Specifies the role as a link for accessibility
              tabIndex={0} // Ensures the link is focusable via keyboard
            >
              Favoris {/* Text for Favorites menu */}
            </Link>
          )}
        </li>
        <li className="nav-item">
          {" "}
          {/* Navigation item for Logout/Connexion */}
          {user ? ( // Checks if user is logged in
            <span
              className="nav-link active" // Active link style for logout
              onClick={handleLogout} // Handles logout on click
              role="button" // Specifies the role as a button for accessibility
              tabIndex={0} // Makes the element focusable via keyboard
              onKeyDown={(e) => {
                // Handles keyboard interactions for accessibility
                if (e.key === "Enter" || e.key === " ") {
                  // Checks for Enter or Space key
                  handleLogout(); // Calls logout function
                }
              }}
            >
              Déconnexion {/* Text for Logout */}
            </span>
          ) : (
            <Link
              to="/connexion" // Link to Login page
              className="nav-link active" // Active link style
              onClick={() => setIsMobileMenuOpen(false)} // Closes mobile menu on click
            >
              Connexion {/* Text for Login */}
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
