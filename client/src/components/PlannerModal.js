import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { AuthContext } from "../context/auth/AuthState";
import { MealContext } from "../context/meals/MealState";

const PlannerModal = ({
   show,
   onHide,
   isNewMeal,
   meal,
   isUpdated,
   setIsUpdated,
}) => {
   const [currentMeal, setCurrentMeal] = useState([]);
   const { id } = useContext(AuthContext);
   const { addMeal, editMeal } = useContext(MealContext);

   useEffect(() => {
      if (meal) {
         setCurrentMeal(meal);
      }
   }, [meal]);

   //replace addmeal with context
   const handleAddMeal = async (e) => {
      const newMeal = {
         _id: "",
         name: e.target.name.value,
         ingredients: e.target.ingredients.value.split(/(?:,|\n)+/),
         day: e.target.day.value,
         isSaved: false,
         createdBy: id,
      };

      addMeal(newMeal);
      setIsUpdated(!isUpdated);
   };

   //replace editmeal with context
   const handleEditMeal = async () => {
      editMeal(currentMeal);
      setIsUpdated(!isUpdated);
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (isNewMeal) {
         handleAddMeal(e);
      } else {
         handleEditMeal();
      }

      onHide();
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      setCurrentMeal((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   return (
      <Modal show={show} onHide={onHide}>
         <Modal.Header closeButton>
            <Modal.Title>{isNewMeal ? "Add Meal" : "Edit Meal"}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form onSubmit={handleSubmit}>
               <Form.Control
                  className="mb-3"
                  name="name"
                  type="text"
                  placeholder="Meal"
                  value={currentMeal.name || ""}
                  onChange={handleChange}
               />
               <Form.Group className="mb-3">
                  <Form.Control
                     as="textarea"
                     rows={8}
                     name="ingredients"
                     type="text"
                     placeholder="Ingredients"
                     value={currentMeal.ingredients || ""}
                     onChange={handleChange}
                  />
               </Form.Group>
               <Form.Select
                  className="mb-3"
                  name="day"
                  value={currentMeal.day || ""}
                  onChange={handleChange}
               >
                  <option>Sunday</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
               </Form.Select>
               <Button type="submit">Submit</Button>
            </Form>
         </Modal.Body>
      </Modal>
   );
};

export default PlannerModal;
