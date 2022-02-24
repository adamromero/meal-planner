import React, { useState } from "react";
import PlannerModal from "./PlannerModal";

const API_URL = "http://localhost:5000/api/meals/";

const PlannerDay = ({ day, meals }) => {
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [currentMeal, setCurrentMeal] = useState(null);

   const handleEdit = (id) => {
      const selectedMeal = meals.filter((meal) => meal._id === id)[0];
      setCurrentMeal(selectedMeal);
      setModalIsOpen(true);
   };

   const handleDelete = (id) => {
      fetch(API_URL + id, { method: "DELETE" }).then(() =>
         console.log("meal deleted")
      );
   };

   return (
      <>
         <div className="day">
            <h2>{day}</h2>
            <ul>
               {meals
                  .filter((meal) => meal.day === day)
                  .map((meal) => (
                     <li key={meal._id}>
                        <span>{meal.name}</span>
                        <button onClick={() => handleEdit(meal._id)}>
                           Edit
                        </button>
                        <button onClick={() => handleDelete(meal._id)}>
                           Delete
                        </button>
                     </li>
                  ))}
            </ul>
         </div>

         <PlannerModal
            isOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            request="edit"
            meal={currentMeal}
         />
      </>
   );
};

export default PlannerDay;
