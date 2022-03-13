import React, { useEffect, useState } from "react";

const ShoppingList = ({ items }) => {
   const ingredients = items
      .map((item) => item.ingredients)
      .flat()
      .map((i) => i.split("\n"))
      .flat();
   const [shoppingList, setShoppingList] = useState([]);
   const [inputItem, setInputItem] = useState("");

   console.log(ingredients);

   useEffect(() => {
      setShoppingList(ingredients);
   }, []);

   const selectIngredient = (item) => {
      if (item !== "default") {
         setShoppingList([...shoppingList, item]);
      }
   };

   const addItem = () => {
      setShoppingList([...shoppingList, inputItem]);
   };

   const removeItem = (item) => {
      console.log(item);
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
            onChange={(e) => selectIngredient(e.target.value)}
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
            onChange={(e) => setInputItem(e.target.value)}
         />
         <button onClick={() => addItem()}>Submit</button>
         <ul>
            {shoppingList.map((item, index) => (
               <li
                  key={index}
                  value={item}
                  onClick={(e) => {
                     console.log(e);
                     removeItem(e.target.innerHTML);
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
