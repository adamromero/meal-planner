import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthState";

const Login = () => {
   const { name, handleLogin } = useContext(AuthContext);
   const initialState = {
      email: "",
      password: "",
   };
   const [credentials, setCredentials] = useState(initialState);
   const navigate = useNavigate();

   const { email, password } = credentials;

   const handleLoginSubmission = (e) => {
      e.preventDefault();
      console.log(credentials);
      handleLogin(credentials);
      //navigate("/");
   };

   const handleInputChange = (e) => {
      setCredentials({
         ...credentials,
         [e.target.name]: e.target.value,
      });
   };

   useEffect(() => {
      console.log(name);
      if (name) {
         navigate("/");
      }
   }, [name]);

   return (
      <div>
         <h1>Login</h1>
         <form onSubmit={(e) => handleLoginSubmission(e)}>
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
            <input type="submit" value="Submit" />
         </form>
      </div>
   );
};

export default Login;
