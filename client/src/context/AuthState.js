import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const name = JSON.parse(localStorage.getItem("name"));
//const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
   //isAuthenticated: token,
   name: name ? name : null,
   //token: null,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, initialState);

   async function handleLogin(credentials) {
      try {
         await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
         })
            .then((res) => res.json())
            .then((data) => {
               console.log("data: ", data);
               dispatch({ type: "LOGIN", payload: data });
            });
      } catch (error) {
         console.error(error);
      }
   }

   async function handleLogout() {
      dispatch({ type: "LOGOUT" });
   }

   async function handleRegister(credentials) {
      try {
         await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
         })
            .then((res) => res.json())
            .then((data) => {
               dispatch({ type: "REGISTER", payload: data });
            });
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated: state.isAuthenticated,
            name: state.name,
            handleRegister,
            handleLogin,
            handleLogout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
