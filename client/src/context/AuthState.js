import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const id = JSON.parse(localStorage.getItem("id"));
const name = JSON.parse(localStorage.getItem("name"));
const email = JSON.parse(localStorage.getItem("email"));
//const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
   //isAuthenticated: token,
   id: id ? id : null,
   name: name ? name : null,
   email: email ? email : null,
   meals: [],
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
            id: state.id,
            name: state.name,
            email: state.email,
            meals: state.meals,
            handleRegister,
            handleLogin,
            handleLogout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
