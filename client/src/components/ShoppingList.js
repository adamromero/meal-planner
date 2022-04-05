import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

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
      <>
         <h2>Shopping List</h2>
         <Form.Group>
            <Form.Select
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
            </Form.Select>
            <InputGroup className="mb-3">
               <Form.Control
                  type="text"
                  placeholder="Add item"
                  value={inputItem}
                  onChange={(e) => setInputItem(e.target.value)}
               />
               <Button
                  onClick={() => {
                     addToShoppingList(inputItem);
                     setInputItem("");
                  }}
               >
                  Submit
               </Button>
            </InputGroup>
         </Form.Group>
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
      </>
   );
};

export default ShoppingList;
