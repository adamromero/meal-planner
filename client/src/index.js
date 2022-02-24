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
   const [items, setItems] = useState([]);
   const [modalIsOpen, setModalIsOpen] = useState(false);

   useEffect(() => {
      fetch("http://localhost:5000/api/meals")
         .then((res) => res.json())
         .then((data) => setItems(data));
   }, []);

   const handleAddMeal = () => {
      setModalIsOpen(true);
   };

   return (
      <div>
         <h1>Meal Planner</h1>
         <PrimaryButton onClick={handleAddMeal}>Add Meal</PrimaryButton>
         <SecondaryButton>Saved Meal</SecondaryButton>
         <h2>Today Is:</h2>
         <Planner items={items} />
         <ShoppingList items={items} />
         <PlannerModal
            isOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            request="add"
         />
      </div>
   );
};

ReactDOM.render(<App />, document.querySelector("#root"));
