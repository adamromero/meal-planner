import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Planner from "./components/Planner.js";
import PlannerModal from "./components/PlannerModal.js";
import ShoppingList from "./components/ShoppingList.js";

import PrimaryButton, {
   SecondaryButton,
   TertiaryButton,
} from "./components/styled-components/Buttons";

const App = () => {
   const [meals, setMeals] = useState([]);
   const [ingredients, setIngredients] = useState([]);
   const [modalIsOpen, setModalIsOpen] = useState(false);

   useEffect(() => {
      fetch("http://localhost:5000/api/meals")
         .then((res) => res.json())
         .then((data) => {
            setMeals(data);
            combineIngredientsIntoList(data);
         });
   }, []);

   const combineIngredientsIntoList = (data) => {
      const ingredientsArray = Array.from(
         new Set(
            data
               .map((item) => item.ingredients)
               .flat()
               .map((i) => i.toLowerCase().split("\n"))
               .flat()
         )
      );

      setIngredients(ingredientsArray);
   };

   const handleAddMeal = () => {
      setModalIsOpen(true);
   };

   return (
      <div>
         <h1>Meal Planner</h1>
         <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
               <PrimaryButton onClick={handleAddMeal}>Add Meal</PrimaryButton>
               <SecondaryButton>Saved Meal</SecondaryButton>
               <h2>Today Is:</h2>
               <Planner meals={meals} />
            </div>
            <div>
               <ShoppingList ingredients={ingredients} />
            </div>
         </div>

         <PlannerModal
            isOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            request="add"
         />
      </div>
   );
};

ReactDOM.render(<App />, document.querySelector("#root"));
