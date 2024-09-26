import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./inscription.css";

function Register() {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const notifySuccess = (text) => toast.success(text);
  const notifyFail = (text) => toast.error(text);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleRegisterForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch(`${ApiUrl}/auth/register`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 201) {
        notifySuccess(
          "Votre profil a bien été créé. Vous pouvez vous connecter"
        );
        setTimeout(() => {
          navigate("/connexion");
        }, 2000); // Attendre 2 secondes avant de rediriger
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
        notifyFail("Une erreur s'est produite");
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  return (
    <div className="form-container2">
      <div>
        <img
          src="src/assets/images/insc2.jpg"
          alt="chicken"
          className="betrave"
        />
      </div>
      <form onSubmit={handleSubmitForm}>
        <h1 className="meal2">GLOBAL MEALS</h1>
        <h2 className="create-count">Créer un compte</h2>

        <div className="formOne">
          <label htmlFor="username" className="the-label1">
            Pseudo *
          </label>
          <input
            type="text"
            name="username"
            className="nes-input"
            value={registerForm.username}
            onChange={handleRegisterForm}
          />
        </div>
        <div className="formTwo">
          <label htmlFor="mail" className="the-label1">
            Adresse email *
          </label>
          <input
            type="mail"
            name="mail"
            className="nes-input"
            value={registerForm.mail}
            onChange={handleRegisterForm}
          />
        </div>

        <div className="formThree">
          <label htmlFor="password" className="the-label1">
            Mot de passe *
          </label>
          <input
            type="password"
            name="password"
            className="nes-input"
            value={registerForm.password}
            onChange={handleRegisterForm}
          />
        </div>
        <div className="formFor">
          <label htmlFor="confirmPassword" className="the-label1">
            Confirmez le mot de passe *
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="nes-input"
            value={registerForm.confirmPassword}
            onChange={handleRegisterForm}
          />
        </div>
        <div className="back-home2">
          <button type="submit" className="validate2">
            M'enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
