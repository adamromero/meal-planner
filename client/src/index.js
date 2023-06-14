import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthState";
import { MealProvider } from "./context/meals/MealState";

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
         <MealProvider>
            <Router>
               <Routes>
                  <Route path="/" element={<MealPlanner />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
               </Routes>
            </Router>
         </MealProvider>
      </AuthProvider>
   );
};

ReactDOM.render(<App />, document.querySelector("#root"));
