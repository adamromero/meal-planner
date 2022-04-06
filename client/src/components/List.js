import React, { useEffect, useState } from "react";

import PrimaryButton, {
   SecondaryButton,
   TertiaryButton,
} from "./styled-components/Buttons";

function ListItem({ item, index, removeItem }) {
   return (
      <li>
         {item.name} - {item.day}
         <button onClick={() => removeItem(index)}>X</button>
      </li>
   );
}

function ListForm({ addItem }) {
   const [value, setValue] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!value) return;
      addItem(value);
      setValue("");
   };

   return (
      <form onSubmit={handleSubmit}>
         <input
            type="text"
            value={value}
            placeholder="Enter meal"
            onChange={(e) => setValue(e.target.value)}
         />
         <PrimaryButton onClick={handleSubmit}>Add Meal</PrimaryButton>
      </form>
   );
}

const Meal = () => {
   return (
      <li>
         <span>meal</span>
      </li>
   );
};

function List() {
   const [items, setItems] = useState([]);

   useEffect(() => {
      fetch("/api/meals")
         .then((res) => res.json())
         .then((data) => setItems(data));
   }, []);

   const addItem = (text) => {
      let newList = [...items];
      newList.push(text);
      setItems(newList);
   };

   const removeItem = (index) => {
      let newList = [...items];
      newList.splice(index, 1);
      setItems(newList);
   };

   return (
      <div>
         <ul>
            {items.map((item, index) => (
               <ListItem
                  key={index}
                  index={index}
                  item={item}
                  removeItem={removeItem}
               />
            ))}
         </ul>
         <ListForm addItem={addItem} />
      </div>
   );
}

export default List;
