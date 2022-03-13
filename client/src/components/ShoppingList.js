import React, { useState } from "react";

const ShoppingList = ({ items }) => {
   const [shoppingList, setShoppingList] = useState([]);

   const ingredients = items
      .map((item) => item.ingredients)
      .flat()
      .map((i) => i.split("\n"))
      .flat();

   const selectIngredient = (item) => {
      setShoppingList([...shoppingList, item]);
   };

   return (
      <div>
         <h2>Shopping List</h2>
         <select
            name="ingredients"
            onChange={(e) => selectIngredient(e.target.value)}
         >
            {ingredients.map((ingredient, index) => (
               <option key={index} value={ingredient}>
                  {ingredient}
               </option>
            ))}
         </select>
         <ul>
            {shoppingList.map((item, index) => (
               <li key={index}>{item}</li>
            ))}
         </ul>
      </div>
   );
};

export default ShoppingList;
