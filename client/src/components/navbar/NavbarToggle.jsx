import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";
import "./NavbarToggle.css";

export default function NavbarToggle() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const notifyFail = () =>
    toast.error("Accès non autorisé, veuillez vous connecter");

  const { logout } = useUserContext();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    setUser("");
    logout(false);
    navigate("/");
  };

  // Toggle dropdown for desktop on hover
  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <img src="/src/assets/logo3.jpg" alt="logo" className="globalLogo" />

      {/* Mobile burger menu */}
      <div
        className="burger"
        onClick={toggleMobileMenu}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleMobileMenu();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Menu"
      >
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>

      <ul className={`navbar-nav ${isMobileMenuOpen ? "mobile-show" : ""}`}>
        <li className="nav-item">
          <Link
            className="nav-link active"
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Accueil
          </Link>
        </li>

        {/* Menu dropdown for desktop, burger menu for mobile */}
        <li
          className="nav-item dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="dropdown-toggle nav-link"
            id="navbar-dropdown"
            role="button"
          >
            Menus
          </div>
          <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
            <li>
              <Link
                className="nav-dropdown"
                to="/menuPage/europe"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Europe
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`}
                to={!user ? "#" : "/menuPage/afrique"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Afrique
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`}
                to={!user ? "#" : "/menuPage/amerique"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Amérique
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`}
                to={!user ? "#" : "/menuPage/asie"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Asie
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`}
                to={!user ? "#" : "/menuPage/oceanie"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Océanie
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          {user && user.role === "admin" ? (
            <Link
              to="/admin"
              className="nav-link active"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Création
            </Link>
          ) : (
            <Link
              to={!user ? "#" : "/favoris"}
              className={`nav-link active ${!user ? "disabled" : ""}`}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  notifyFail();
                }
                setIsMobileMenuOpen(false);
              }}
              onKeyDown={(e) => {
                if (!user) {
                  e.preventDefault();
                  notifyFail();
                } else if (e.key === "Enter" || e.key === " ") {
                  setIsMobileMenuOpen(false);
                  // Vous pouvez déclencher la navigation manuellement si nécessaire
                }
              }}
              role="link"
              tabIndex={0} // Ensure the link is focusable via keyboard
            >
              Favoris
            </Link>
          )}
        </li>

        <li className="nav-item">
          {user ? (
            <span
              className="nav-link active"
              onClick={handleLogout}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleLogout();
                }
              }}
            >
              Déconnexion
            </span>
          ) : (
            <Link
              to="/connexion"
              className="nav-link active"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Connexion
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
