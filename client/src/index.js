import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthState";

import Register from "./components/Register.js";
import Login from "./components/Login.js";
import MealPlanner from "./components/MealPlanner.js";

if (!localStorage.getItem("savedMeals")) {
   localStorage.setItem("savedMeals", "[]");
}

if (!localStorage.getItem("shoppingList")) {
   localStorage.setItem("shoppingList", "[]");
}

const App = () => {
   return (
      <AuthProvider>
         <Router>
            <Routes>
               <Route path="/" element={<MealPlanner />} />
               <Route path="/register" element={<Register />} />
               <Route path="/login" element={<Login />} />
            </Routes>
         </Router>
      </AuthProvider>
   );
};

ReactDOM.render(<App />, document.querySelector("#root"));
