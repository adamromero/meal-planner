import React from "react";

const ShoppingList = ({ items }) => {
   const ingredients = items
      .map((item) => item.ingredients)
      .flat()
      .map((i) => i.split("\n"))
      .flat();

   return (
      <div>
         <h2>Shopping List</h2>
         <ul>
            {ingredients.map((ingredient, index) => (
               <li key={index}>{ingredient}</li>
            ))}
         </ul>
      </div>
   );
};

export default ShoppingList;
