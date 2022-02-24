import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "50vh",
      maxWidth: "500px",
      width: "100%",
   },
};

Modal.setAppElement("#root");

const API_URL = "http://localhost:5000/api/meals/";

const PlannerModal = ({ isOpen, setModalIsOpen, request, meal }) => {
   const [currentMeal, setCurrentMeal] = useState([]);

   useEffect(() => {
      if (meal) {
         setCurrentMeal(meal);
      }
   }, [meal]);

   const closeModal = () => {
      setModalIsOpen(false);
   };

   const addMeal = () => {
      const data = {
         name: e.target.name.value,
         ingredients: e.target.ingredients.value.split("\n"),
         day: e.target.day.value,
      };

      fetch(API_URL, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
         },
         body: JSON.stringify(data),
      })
         .then((res) => res.json())
         .catch((err) => console.error(err));
   };

   const editMeal = () => {
      fetch(API_URL + currentMeal._id, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
         },
         body: JSON.stringify(currentMeal),
      })
         .then((res) => res.json())
         .catch((err) => console.error(err));
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (request === "add") {
         //addMeal();
         console.log(currentMeal);
      }
      if (request === "edit") {
         editMeal();
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      setCurrentMeal((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   return (
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
         <form onSubmit={handleSubmit}>
            <input
               name="name"
               type="text"
               placeholder="Meal"
               value={currentMeal.name}
               onChange={handleChange}
            />
            <textarea
               name="ingredients"
               rows="15"
               cols="50"
               value={currentMeal.ingredients}
               onChange={handleChange}
            ></textarea>
            <select name="day" value={currentMeal.day} onChange={handleChange}>
               <option>Sunday</option>
               <option>Monday</option>
               <option>Tuesday</option>
               <option>Wednesday</option>
               <option>Thursday</option>
               <option>Friday</option>
               <option>Saturday</option>
            </select>
            <button type="submit">Submit</button>
         </form>
      </Modal>
   );
};

export default PlannerModal;
