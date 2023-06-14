import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const id = JSON.parse(localStorage.getItem("id"));
const name = JSON.parse(localStorage.getItem("name"));
const email = JSON.parse(localStorage.getItem("email"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
   //isAuthenticated: token,
   id: id ? id : null,
   name: name ? name : null,
   email: email ? email : null,
   error: false,
   message: "",
   token: token ? token : null,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, initialState);

   async function handleLogin(credentials) {
      console.log("token: ", token);

      const response = await fetch("/api/users/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(credentials),
      });

      const jsonData = await response.json();
      if (response.status !== 200) {
         dispatch({ type: "ERROR", payload: jsonData });
      } else {
         dispatch({ type: "LOGIN", payload: jsonData });
      }
   }

   async function handleRegister(credentials) {
      const response = await fetch("/api/users", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(credentials),
      });

      const jsonData = await response.json();
      if (response.status !== 201) {
         dispatch({ type: "ERROR", payload: jsonData });
      } else {
         console.log("register is here");
         dispatch({ type: "REGISTER", payload: jsonData });
      }
   }

   async function handleLogout() {
      dispatch({ type: "LOGOUT" });
   }

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated: state.isAuthenticated,
            id: state.id,
            name: state.name,
            email: state.email,
            error: state.error,
            message: state.message,
            token: state.token,
            handleRegister,
            handleLogin,
            handleLogout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
