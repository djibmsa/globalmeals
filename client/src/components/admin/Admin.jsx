// Importing necessary dependencies and styles
import "./Admin.css"; // Import the CSS for styling the Admin component
import { useState, useRef, useEffect } from "react"; // Import hooks from React
import { useNavigate } from "react-router-dom"; // Import hook for navigation
import { toast } from "react-toastify"; // Import toast notifications for user feedback
import { useUserContext } from "../../contexts/UserContext"; // Import user context for authentication

// Function to create the initial state for the form
const createInitialFormState = () => ({
  id: "", // Unique identifier for the item
  country: "", // Country name
  starterId: "", // ID for starter
  starterName: "", // Name for starter
  starterIngredients: "", // Ingredients for starter
  starterSteps: "", // Steps for making starter
  starterStepTime: "", // Time required for each step of the starter
  starterImageUrl: "", // Image URL for the starter
  dishId: "", // ID for main dish
  dishName: "", // Name for main dish
  dishIngredients: "", // Ingredients for main dish
  dishSteps: "", // Steps for making main dish
  dishStepTime: "", // Time required for each step of the main dish
  dishImageUrl: "", // Image URL for the main dish
  dessertId: "", // ID for dessert
  dessertName: "", // Name for dessert
  dessertIngredients: "", // Ingredients for dessert
  dessertSteps: "", // Steps for making dessert
  dessertStepTime: "", // Time required for each step of the dessert
  dessertImageUrl: "", // Image URL for the dessert
  cocktailId: "", // ID for cocktail
  cocktailName: "", // Name for cocktail
  cocktailIngredients: "", // Ingredients for cocktail
  cocktailSteps: "", // Steps for making cocktail
  cocktailStepTime: "", // Time required for each step of the cocktail
  cocktailImageUrl: "", // Image URL for the cocktail
});

// Main Admin component
function Admin() {
  // State to hold the selected continent
  const [selectedContinent, setSelectedContinent] = useState("");

  // State to hold the form data for each continent
  const [newsForm, setNewsForm] = useState({
    europe: createInitialFormState(),
    afrique: createInitialFormState(),
    amerique: createInitialFormState(),
    asie: createInitialFormState(),
    oceanie: createInitialFormState(),
  });

  // Toast notification functions for success and failure
  const notifySuccess = (text) => toast.success(text);
  const notifyFail = (text) => toast.error(text);

  const formRef = useRef(null); // Ref for the form to reset it later
  const navigate = useNavigate(); // Hook for navigation

  // Getting user context to check if user is admin
  const { user } = useUserContext();

  // Effect to redirect non-admin users to the home page
  useEffect(() => {
    if (!(user !== "" && user.role === "admin")) {
      navigate("/"); // Redirect to home if not admin
    }
  }, [user, navigate]); // Run effect whenever user or navigate changes

  // Map to translate continent numbers to names
  const continentMap = {
    1: "europe",
    2: "afrique",
    3: "amerique",
    4: "asie",
    5: "oceanie",
  };

  // Handler for continent selection change
  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value); // Update selected continent
  };

  // Handler for updating form fields based on input
  const handleUpdateChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setNewsForm((prevState) => ({
      ...prevState,
      [continentMap[selectedContinent]]: {
        ...prevState[continentMap[selectedContinent]],
        [name]: value, // Update specific field in the state
      },
    }));
  };

  // Adjust the height of textareas based on content
  const adjustTextareaHeight = (e) => {
    e.target.style.height = "auto"; // Reset height to auto to shrink
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to the scroll height to expand
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const ApiUrl = import.meta.env.VITE_API_URL; // Get API URL from environment variable

    try {
      const continentData = newsForm[continentMap[selectedContinent]]; // Get data for the selected continent
      const menuId = selectedContinent; // Store the selected continent as menu ID

      // Prepare menu data for update
      const menuData = {
        id: menuId,
        country: continentData.country,
      };

      // Make API request to update menu
      const menuResponse = await fetch(`${ApiUrl}/menu`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Set content type for JSON
        },
        body: JSON.stringify(menuData), // Convert menuData to JSON
      });

      // Check for errors in menu response
      if (!menuResponse.ok) {
        throw new Error("Erreur lors de la mise à jour du menu."); // Throw an error if response is not ok
      }

      const recipeTypes = ["starter", "dish", "dessert", "cocktail"]; // Define recipe types
      const recipePromises = recipeTypes.map(async (type) => {
        const idField = `${type}Id`; // Dynamically create the ID field name
        const nameField = `${type}Name`; // Dynamically create the name field name
        const ingredientsField = `${type}Ingredients`; // Dynamically create the ingredients field name
        const stepsField = `${type}Steps`; // Dynamically create the steps field name
        const stepTimeField = `${type}StepTime`; // Dynamically create the step time field name
        const imageUrlField = `${type}ImageUrl`; // Dynamically create the image URL field name

        const recipeData = {
          id: continentData[idField], // Get the recipe ID from continentData
          menu_id: menuId, // Set the menu ID
          type, // Set the recipe type
        };

        // Only add fields that are not empty
        if (continentData[nameField])
          recipeData.name = continentData[nameField];
        if (continentData[ingredientsField])
          recipeData.ingredient = continentData[ingredientsField];
        if (continentData[stepsField])
          recipeData.step = continentData[stepsField];
        if (continentData[stepTimeField])
          recipeData.step_time = continentData[stepTimeField];
        if (continentData[imageUrlField])
          recipeData.image = continentData[imageUrlField];

        // Make API request to update recipe
        return fetch(`${ApiUrl}/recipe`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Set content type for JSON
          },
          body: JSON.stringify(recipeData), // Convert recipeData to JSON
        });
      });

      await Promise.all(recipePromises); // Wait for all recipe updates to finish

      notifySuccess("Le formulaire a été validé avec succès !"); // Notify user of success
      if (formRef.current) {
        formRef.current.reset(); // Reset the form
      }
      setSelectedContinent(""); // Reset selected continent
      setNewsForm({
        // Reset the form state to initial values for all continents
        europe: createInitialFormState(),
        afrique: createInitialFormState(),
        amerique: createInitialFormState(),
        asie: createInitialFormState(),
        oceanie: createInitialFormState(),
      });

      // Navigate to the menu page for the selected continent
      navigate(`/menuPage/${continentMap[selectedContinent]}`);
    } catch (error) {
      console.error("Error submitting form:", error); // Log any errors that occur
      notifyFail("Erreur lors de la soumission du formulaire."); // Notify user of failure
    }
  };

  // Render the Admin component
  return (
    <div className="create-menu">
      <h1>Création d'un menu</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        {" "}
        {/* Form for menu creation */}
        <div className="admin-continent">
          <label htmlFor="continent">
            {" "}
            {/* Label for continent selection */}
            Continents:
            <select
              id="continent"
              className="select-continent"
              name="continent"
              value={selectedContinent} // Bind value to selectedContinent state
              onChange={handleContinentChange} // Handle change event
            >
              <option value="">Sélectionner</option> {/* Default option */}
              <option value="1">Europe</option>
              <option value="2">Afrique</option>
              <option value="3">Amérique</option>
              <option value="4">Asie</option>
              <option value="5">Océanie</option>
            </select>
          </label>
          <label htmlFor="country">
            {" "}
            {/* Label for country input */}
            Nom du pays:
            <input
              type="text"
              name="country" // Bind to country state
              value={newsForm[continentMap[selectedContinent]].country} // Bind value to country from the form state
              onChange={handleUpdateChange} // Handle change event
              required // Make field required
            />
          </label>
        </div>
        {/* Render the form fields for each recipe type (starter, dish, dessert, cocktail) */}
        {["starter", "dish", "dessert", "cocktail"].map((type) => (
          <div key={type} className="admin-recipe">
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)}:</h2>
            <label htmlFor={`${type}Name`}>
              Nom:
              <input
                type="text"
                name={`${type}Name`} // Bind to name of the recipe type
                value={newsForm[continentMap[selectedContinent]][`${type}Name`]} // Bind value from form state
                onChange={handleUpdateChange} // Handle change event
                required // Make field required
              />
            </label>
            <label htmlFor={`${type}Ingredients`}>
              Ingrédients:
              <textarea
                name={`${type}Ingredients`} // Bind to ingredients of the recipe type
                value={
                  newsForm[continentMap[selectedContinent]][
                    `${type}Ingredients`
                  ]
                } // Bind value from form state
                onChange={(e) => {
                  handleUpdateChange(e); // Handle change event
                  adjustTextareaHeight(e); // Adjust height of textarea
                }}
                required // Make field required
              />
            </label>
            <label htmlFor={`${type}Steps`}>
              Étapes:
              <textarea
                name={`${type}Steps`} // Bind to steps of the recipe type
                value={
                  newsForm[continentMap[selectedContinent]][`${type}Steps`]
                } // Bind value from form state
                onChange={(e) => {
                  handleUpdateChange(e); // Handle change event
                  adjustTextareaHeight(e); // Adjust height of textarea
                }}
                required // Make field required
              />
            </label>
            <label htmlFor={`${type}StepTime`}>
              Temps pour chaque étape (en minutes):
              <input
                type="number"
                name={`${type}StepTime`} // Bind to step time of the recipe type
                value={
                  newsForm[continentMap[selectedContinent]][`${type}StepTime`]
                } // Bind value from form state
                onChange={handleUpdateChange} // Handle change event
                required // Make field required
              />
            </label>
            <label htmlFor={`${type}ImageUrl`}>
              URL de l'image:
              <input
                type="url"
                name={`${type}ImageUrl`} // Bind to image URL of the recipe type
                value={
                  newsForm[continentMap[selectedContinent]][`${type}ImageUrl`]
                } // Bind value from form state
                onChange={handleUpdateChange} // Handle change event
                required // Make field required
              />
            </label>
          </div>
        ))}
        <button type="submit">Valider</button> {/* Submit button */}
      </form>
    </div>
  );
}

// Export the Admin component as default
export default Admin;
