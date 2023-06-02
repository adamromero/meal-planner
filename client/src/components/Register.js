import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthState";

const Register = () => {
   const { handleRegister } = useContext(AuthContext);

   const initialState = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   };
   const [credentials, setCredentials] = useState(initialState);

   const { name, email, password, confirmPassword } = credentials;

   const handleRegisterSubmission = (e) => {
      e.preventDefault();
      console.log(credentials);
      handleRegister(credentials);
   };

   const handleInputChange = (e) => {
      setCredentials({
         ...credentials,
         [e.target.name]: e.target.value,
      });
   };

   return (
      <div>
         <h1>Register</h1>
         <form onSubmit={(e) => handleRegisterSubmission(e)}>
            <input
               type="text"
               name="name"
               onChange={handleInputChange}
               placeholder="Name"
            />
            <br />
            <input
               type="text"
               name="email"
               onChange={handleInputChange}
               placeholder="Email"
            />
            <br />
            <input
               type="password"
               name="password"
               onChange={handleInputChange}
               placeholder="Password"
            />
            <br />
            <input
               type="password"
               name="confirmPassword"
               onChange={handleInputChange}
               placeholder="Confirm Password"
            />
            <br />
            <input type="submit" value="Submit" />
         </form>
      </div>
   );
};

export default Register;
