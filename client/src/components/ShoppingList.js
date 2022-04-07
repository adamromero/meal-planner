import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import { Trash } from "react-bootstrap-icons";

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
         <Form.Group>
            <h2>Shopping List</h2>
            <Form.Select
               className="mb-3"
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
            <ListGroup>
               {shoppingList.map((item, index) => (
                  <ListGroup.Item
                     key={index}
                     value={item}
                     className="d-flex justify-content-between"
                  >
                     {item}
                     <button
                        style={{
                           backgroundColor: "transparent",
                           border: "none",
                        }}
                     >
                        <Trash
                           className="text-danger"
                           onClick={(e) => {
                              removeFromShoppingList(item);
                           }}
                        />
                     </button>
                  </ListGroup.Item>
               ))}
            </ListGroup>
         </Form.Group>
      </>
   );
};

export default ShoppingList;
