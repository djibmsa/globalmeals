// Import the CSS stylesheet for styling the component
import "./fav.css";

// Define the Favoris functional component
function Favoris() {
  return (
    // Main container for the favorites section
    <div className="ensemble">
      {/* Heading for the favorites menu */}
      <h2 className="favorisé">❤️ Vos Menus Favoris</h2>
      <div className="favor">
        {/* Unordered list for the favorite menus */}
        <ul className="listMenus">
          {/* List item for the first menu */}
          <li className="menuList">
            {/* Title for the first menu */}
            <h2 className="menus-titles1">Europe</h2>
            {/* Description for the first menu */}
            <p className="détail">Menu Italien🇮🇹</p>
          </li>

          {/* List item for the second menu */}
          <li className="menuList">
            {/* Title for the second menu */}
            <h2 className="menus-titles2">Afrique</h2>
            {/* Description for the second menu */}
            <p className="détail">Menu Sénégalais🇸🇳</p>
          </li>

          {/* List item for the third menu */}
          <li className="menuList">
            {/* Title for the third menu */}
            <h2 className="menus-titles3">Amérique</h2>
            {/* Description for the third menu */}
            <p className="détail">Menu Mexicain🇲🇽</p>
          </li>

          {/* List item for the fourth menu */}
          <li className="menuList">
            {/* Title for the fourth menu */}
            <h2 className="menus-titles4">Asie</h2>
            {/* Description for the fourth menu */}
            <p className="détail">Menu Coréen🇰🇷</p>
          </li>

          {/* List item for the fifth menu */}
          <li className="menuList">
            {/* Title for the fifth menu */}
            <h2 className="menus-titles5">Océanie</h2>
            {/* Description for the fifth menu */}
            <p className="détail">Menu Calédonien🇳🇨</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Export the Favoris component for use in other parts of the application
export default Favoris;
