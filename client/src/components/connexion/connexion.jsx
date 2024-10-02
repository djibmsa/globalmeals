// Import necessary hooks and components from React and other libraries
import { useState } from "react"; // Hook for managing state in functional components
import { useNavigate, Link } from "react-router-dom"; // Hooks for navigation and routing
import { toast } from "react-toastify"; // Library for displaying notifications
import { useUserContext } from "../../contexts/UserContext"; // Custom hook for accessing user context
import "./connexion.css"; // Importing CSS styles for this component

// Define the Login component
function Login() {
  // Access the API URL from environment variables
  const ApiUrl = import.meta.env.VITE_API_URL;

  // Function to notify success on login
  const notifySuccess = (username) => toast.success(`Bienvenue, ${username} !`); // Toast message for successful login

  // Function to notify failure during login
  const notifyFail = () => toast.error("Une erreur s'est produite"); // Toast message for failed login

  const navigate = useNavigate(); // Hook for programmatic navigation

  const { login } = useUserContext(); // Destructure the login function from UserContext

  // State to hold login information
  const [loginInfos, setLoginInfos] = useState({
    mail: "", // Initialize email field
    password: "", // Initialize password field
  });

  // Handle changes in login input fields
  const handleLoginInfos = (e) => {
    setLoginInfos({ ...loginInfos, [e.target.name]: e.target.value }); // Update the state with the new value
  };

  // Handle the login process when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if email or password fields are empty
    if (loginInfos.mail.trim() === "" || loginInfos.password.trim() === "") {
      console.error("Mail and password must be non-empty strings"); // Log error if fields are empty
      return; // Exit the function
    }

    try {
      // API call to request login
      const response = await fetch(`${ApiUrl}/auth/connexion`, {
        method: "post", // HTTP method
        headers: { "Content-Type": "application/json" }, // Set content type to JSON
        credentials: "include", // Include cookies in the request
        body: JSON.stringify(loginInfos), // Convert login information to JSON
      });

      // Check if the response status is OK (200)
      if (response.status === 200) {
        const responseData = await response.json(); // Parse the JSON response
        console.info("API response:", responseData); // Log the API response
        if (responseData.user) {
          const { username } = responseData.user; // Extract username from the response
          login(responseData.user); // Call the login function from context with user data
          // Navigate to admin or home page based on user type
          if (loginInfos.pseudo === "admin") {
            navigate("/admin"); // Navigate to admin page if the user is admin
          } else {
            navigate("/"); // Navigate to home page otherwise
          }
          notifySuccess(username); // Show success notification
        } else {
          console.error("User object is missing in the response"); // Log error if user object is missing
        }
      } else {
        console.info("Login failed with status:", response.status); // Log failed login status
        notifyFail(); // Show failure notification
      }
    } catch (error) {
      console.error("Error during login:", error); // Log any errors during login
    }
  };

  // Render the login form
  return (
    <div className="form-container">
      {" "}
      {/* Main container for the form */}
      <div>
        <img
          src="src/assets/images/chickencurry.jpg" // Image source for chicken curry
          alt="chicken" // Alt text for the image
          className="chickenC" // CSS class for styling the image
        />
      </div>
      <form onSubmit={handleLogin}>
        {" "}
        {/* Form element with submit handler */}
        <h2 className="nect">Connexion</h2> {/* Heading for the form */}
        <div className="form-group1">
          {" "}
          {/* Container for email input */}
          <label htmlFor="mail" className="the-label">
            {" "}
            {/* Label for email input */}
            Adresse email * {/* Email label text */}
          </label>
          <input
            type="email" // Input type for email
            id="mail" // ID for the input
            name="mail" // Name attribute for the input
            className="the-input" // CSS class for styling the input
            value={loginInfos.mail} // Bind input value to state
            onChange={handleLoginInfos} // Handler for input change
          />
        </div>
        <div className="form-group2">
          {" "}
          {/* Container for password input */}
          <label htmlFor="password" className="the-label">
            {" "}
            {/* Label for password input */}
            Mot de passe * {/* Password label text */}
          </label>
          <input
            type="password" // Input type for password
            id="password" // ID for the input
            name="password" // Name attribute for the input
            className="the-input" // CSS class for styling the input
            value={loginInfos.password} // Bind input value to state
            onChange={handleLoginInfos} // Handler for input change
          />
        </div>
        <div className="back-home">
          {" "}
          {/* Container for submit button */}
          <button type="submit" className="validate">
            {" "}
            {/* Submit button */}
            Me connecter {/* Button text */}
          </button>
        </div>
        <Link to="/inscription" className="create">
          {" "}
          {/* Link to registration page */}
          <p className="count">Pas de compte?</p>{" "}
          {/* Text asking if the user has no account */}
        </Link>
      </form>
    </div>
  );
}

export default Login; // Export the Login component for use in other parts of the application
