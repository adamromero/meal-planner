import React, { createContext, useReducer } from "react";
import MealReducer from "./MealReducer";

const id = JSON.parse(localStorage.getItem("id"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
   id: id ? id : null,
};

export const MealContext = createContext(initialState);

export const MealProvider = ({ children }) => {
   const [state, dispatch] = useReducer(MealReducer, initialState);

   async function addMeal(meal) {
      const response = await fetch(`/api/meals/${id}`, {
         method: "POST",
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(meal),
      });

      const jsonData = await response.json();
      if (response.status !== 200) {
         dispatch({ type: "ERROR", payload: jsonData });
      } else {
         dispatch({ type: "ADD_MEAL", payload: jsonData });
      }
   }

   async function editMeal(meal) {
      const response = await fetch(`/api/meals/${meal._id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(meal),
      });

      const jsonData = await response.json();
      if (response.status !== 200) {
         dispatch({ type: "ERROR", payload: jsonData });
      } else {
         dispatch({ type: "EDIT_MEAL", payload: jsonData });
      }
   }

   async function deleteMeal(id) {
      fetch(`/api/meals/${id}`, { method: "DELETE" }).then(() => {
         dispatch({ type: "DELETE_MEAL" });
      });
   }

   async function favoriteMeal(meal) {
      const response = await fetch(`/api/meals/${meal._id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ isSaved: !meal.isSaved }),
      });

      const jsonData = await response.json();
      if (response.status !== 200) {
         dispatch({ type: "ERROR", payload: jsonData });
      } else {
         dispatch({ type: "FAVORITE_MEAL", payload: jsonData });
      }
   }

   async function getMealsByUser(id) {
      const response = await fetch(`/api/meals/${id}`);
      const data = await response.json();
      return data;
   }

   async function getSavedMeals(meal) {}

   async function removeFromSavedMeals(meal) {}

   async function addSavedMealToPlanner(meal) {}

   return (
      <MealContext.Provider
         value={{
            id: state.id,
            addMeal,
            editMeal,
            deleteMeal,
            favoriteMeal,
            getMealsByUser,
            getSavedMeals,
            removeFromSavedMeals,
            addSavedMealToPlanner,
         }}
      >
         {children}
      </MealContext.Provider>
   );
};
