import { useState } from "react"; // Imports useState hook to manage local state
import { toast } from "react-toastify"; // Imports toast for notifications
import { useNavigate } from "react-router-dom"; // Imports useNavigate for programmatic navigation

import "./inscription.css"; // Imports the CSS styles for this component

function Register() {
  // Defines the Register component
  const ApiUrl = import.meta.env.VITE_API_URL; // Gets the API URL from environment variables
  const notifySuccess = (text) => toast.success(text); // Function to show success notifications
  const notifyFail = (text) => toast.error(text); // Function to show error notifications

  // State to hold form input values
  const [registerForm, setRegisterForm] = useState({
    username: "", // State for username
    mail: "", // State for email
    password: "", // State for password
    confirmPassword: "", // State for confirming password
  });

  const navigate = useNavigate(); // Initializes navigation

  const handleRegisterForm = (e) => {
    // Handles input changes in the registration form
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value }); // Updates the relevant state based on the input name
  };

  const handleSubmitForm = async (event) => {
    // Handles form submission
    event.preventDefault(); // Prevents default form submission behavior

    try {
      // Call to API to create a new user
      const response = await fetch(`${ApiUrl}/auth/register`, {
        method: "post", // Sets the request method to POST
        headers: { "Content-Type": "application/json" }, // Sets the content type to JSON
        body: JSON.stringify(registerForm), // Converts form state to JSON and sends it in the request body
      });

      // Redirects to the login page if user creation is successful
      if (response.status === 201) {
        notifySuccess(
          "Votre profil a bien été créé. Vous pouvez vous connecter" // Success notification message
        );
        setTimeout(() => {
          navigate("/connexion"); // Redirects to the login page after 2 seconds
        }, 2000); // Waits for 2 seconds before redirecting
      } else {
        // Logs response details in case of failure
        console.info(response);
        notifyFail("Une erreur s'est produite"); // Error notification message
      }
    } catch (err) {
      // Logs possible errors to the console
      console.error(err);
    }
  };

  return (
    <div className="form-container2">
      {" "}
      {/* Main container for the registration form */}
      <div>
        <img
          src="src/assets/images/insc2.jpg" // Image source
          alt="chicken" // Alternate text for the image
          className="betrave" // Applies styles from the CSS class
        />
      </div>
      <form onSubmit={handleSubmitForm}>
        {" "}
        {/* Handles form submission */}
        <h2 className="create-count">Créer un compte</h2>{" "}
        {/* Title for the form */}
        <div className="formOne">
          {" "}
          {/* Container for username input */}
          <label htmlFor="username" className="the-label1">
            {" "}
            {/* Label for username input */}
            Pseudo * {/* Required field indicator */}
          </label>
          <input
            type="text" // Input type for text
            name="username" // Name attribute for the input
            className="nes-input" // Applies styles from the CSS class
            value={registerForm.username} // Binds input value to state
            onChange={handleRegisterForm} // Calls handler on input change
          />
        </div>
        <div className="formTwo">
          {" "}
          {/* Container for email input */}
          <label htmlFor="mail" className="the-label1">
            {" "}
            {/* Label for email input */}
            Adresse email * {/* Required field indicator */}
          </label>
          <input
            type="mail" // Input type for email
            name="mail" // Name attribute for the input
            className="nes-input" // Applies styles from the CSS class
            value={registerForm.mail} // Binds input value to state
            onChange={handleRegisterForm} // Calls handler on input change
          />
        </div>
        <div className="formThree">
          {" "}
          {/* Container for password input */}
          <label htmlFor="password" className="the-label1">
            {" "}
            {/* Label for password input */}
            Mot de passe * {/* Required field indicator */}
          </label>
          <input
            type="password" // Input type for password
            name="password" // Name attribute for the input
            className="nes-input" // Applies styles from the CSS class
            value={registerForm.password} // Binds input value to state
            onChange={handleRegisterForm} // Calls handler on input change
          />
        </div>
        <div className="formFor">
          {" "}
          {/* Container for confirm password input */}
          <label htmlFor="confirmPassword" className="the-label1">
            {" "}
            {/* Label for confirm password input */}
            Confirmez le mot de passe * {/* Required field indicator */}
          </label>
          <input
            type="password" // Input type for password
            name="confirmPassword" // Name attribute for the input
            className="nes-input" // Applies styles from the CSS class
            value={registerForm.confirmPassword} // Binds input value to state
            onChange={handleRegisterForm} // Calls handler on input change
          />
        </div>
        <div className="back-home2">
          {" "}
          {/* Container for the submit button */}
          <button type="submit" className="validate2">
            {" "}
            {/* Submit button */}
            M'enregistrer {/* Button text */}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register; // Exports the Register component for use in other parts of the application
