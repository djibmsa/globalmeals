import "./Accueil.css"; // Imports the CSS stylesheet for styling the component
import { Link } from "react-router-dom"; // Imports the Link component for client-side navigation
import europeImage from "../../assets/images/i136012-spaghettis-bolognaise.jpeg"; // Imports the image for Europe
import afriqueImage from "../../assets/images/bonava.jpg"; // Imports the image for Africa
import ameriqueImage from "../../assets/images/burger.jpeg"; // Imports the image for America
import asieImage from "../../assets/images/assiette-de-sushi.jpeg"; // Imports the image for Asia
import oceanieImage from "../../assets/images/KANGAROO_STEAK.jpeg"; // Imports the image for Oceania
import welcomeImage from "../../assets/images/friends-happiness.png"; // Imports the welcome image
import { useUserContext } from "../../contexts/UserContext"; // Imports the user context to access user information

function Continents() {
  const { user } = useUserContext(); // Retrieves the user information from the UserContext

  return (
    <main className="continents">
      {" "}
      {/* Main container for the continents section */}
      <div className="welcome-container">
        {" "}
        {/* Container for the welcome message */}
        <img className="welcome" src={welcomeImage} alt="welcome" />{" "}
        {/* Displays the welcome image */}
        <h2 className="welcome-text">
          {" "}
          {/* Heading for the welcome text */}
          {user !== "" // Conditional rendering based on whether the user is logged in
            ? "Bienvenue et bonne dégustation !" // Message for logged-in users
            : "Connectez-vous pour découvrir l'ensemble de nos menus !"}{" "}
        </h2>
      </div>
      <h2 className="new-menus">
        {" "}
        {/* Heading for new menus section */}
        Chaque mois, un tour du monde culinaire avec nos menus complets !{" "}
        {/* Description of the monthly culinary tour */}
      </h2>
      <div className="cercles">
        {" "}
        {/* Container for the circles representing continents */}
        <div className="continents1">
          {" "}
          {/* First row of continents */}
          <div className="image-container">
            {" "}
            {/* Container for the Europe image */}
            <img className="europe" src={europeImage} alt="europe" />{" "}
            {/* Displays the Europe image */}
            <h2>
              {" "}
              {/* Heading for the Europe link */}
              <Link to="/menuPage/europe">Europe</Link>{" "}
              {/* Link to the Europe menu page */}
            </h2>
          </div>
          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            {" "}
            {/* Container for the Africa image, disables if user is not logged in */}
            <img className="afrique" src={afriqueImage} alt="afrique" />{" "}
            {/* Displays the Africa image */}
            <h2>
              {" "}
              {/* Heading for the Africa link */}
              <Link to={user !== null ? "/menuPage/afrique" : "#"}>
                {" "}
                {/* Link to the Africa menu page, disabled if user is not logged in */}
                Afrique
              </Link>
            </h2>
          </div>
          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            {" "}
            {/* Container for the America image, disables if user is not logged in */}
            <img className="amerique" src={ameriqueImage} alt="amérique" />{" "}
            {/* Displays the America image */}
            <h2>
              {" "}
              {/* Heading for the America link */}
              <Link to={user !== null ? "/menuPage/amerique" : "#"}>
                {" "}
                {/* Link to the America menu page, disabled if user is not logged in */}
                Amérique
              </Link>
            </h2>
          </div>
        </div>
        <div className="continents2">
          {" "}
          {/* Second row of continents */}
          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            {" "}
            {/* Container for the Asia image, disables if user is not logged in */}
            <img className="asie" src={asieImage} alt="asie" />{" "}
            {/* Displays the Asia image */}
            <h2>
              {" "}
              {/* Heading for the Asia link */}
              <Link to={user !== null ? "/menuPage/asie" : "#"}>
                {" "}
                {/* Link to the Asia menu page, disabled if user is not logged in */}
                Asie
              </Link>
            </h2>
          </div>
          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            {" "}
            {/* Container for the Oceania image, disables if user is not logged in */}
            <img className="oceanie" src={oceanieImage} alt="océanie" />{" "}
            {/* Displays the Oceania image */}
            <h2>
              {" "}
              {/* Heading for the Oceania link */}
              <Link to={user !== null ? "/menuPage/oceanie" : "#"}>
                {" "}
                {/* Link to the Oceania menu page, disabled if user is not logged in */}
                Océanie
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Continents; // Exports the Continents component for use in other parts of the application
