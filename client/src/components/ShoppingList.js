import React, { useEffect, useState } from "react";

const ShoppingList = ({ ingredients }) => {
   const [shoppingList, setShoppingList] = useState([]);
   const [inputItem, setInputItem] = useState("");

   useEffect(() => {
      setShoppingList(ingredients);
   }, [ingredients]);

   const addToShoppingList = (item) => {
      if (
         !shoppingList.filter(
            (listItem) => listItem.toLowerCase() === item.toLowerCase()
         ).length > 0
      ) {
         setShoppingList([...shoppingList, item]);
      }
   };

   const removeFromShoppingList = (item) => {
      setShoppingList(
         shoppingList.filter(
            (listItem) => listItem.toLowerCase() !== item.toLowerCase()
         )
      );
   };

   return (
      <div>
         <h2>Shopping List</h2>
         <select
            defaultValue="default"
            name="ingredients"
            onChange={(e) => {
               const item = e.target.value;
               if (item !== "default") {
                  addToShoppingList(item);
               }
            }}
         >
            <option value="default">Select an item</option>
            {ingredients.map((ingredient, index) => (
               <option key={index} value={ingredient}>
                  {ingredient}
               </option>
            ))}
         </select>
         <input
            type="text"
            placeholder="Add item"
            value={inputItem}
            onChange={(e) => setInputItem(e.target.value)}
         />
         <button
            onClick={() => {
               addToShoppingList(inputItem);
               setInputItem("");
            }}
         >
            Submit
         </button>
         <ul>
            {shoppingList.map((item, index) => (
               <li
                  key={index}
                  value={item}
                  onClick={(e) => {
                     removeFromShoppingList(e.target.innerHTML);
                  }}
               >
                  {item}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default ShoppingList;
