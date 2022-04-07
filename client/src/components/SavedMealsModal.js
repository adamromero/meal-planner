import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";

const SavedMealsModal = ({ show, handleClose, isUpdated, setIsUpdated }) => {
   const [savedMeals, setSavedMeals] = useState(getLocalStorageMealData());

   useEffect(() => {
      console.log("savedMeals", savedMeals);
   }, [savedMeals]);

   function getLocalStorageMealData() {
      return localStorage.getItem("savedMeals")
         ? JSON.parse(localStorage.getItem("savedMeals"))
         : [];
   }

   const removeFromSavedMeals = (id) => {
      const meals = savedMeals.filter((meal) => meal._id !== id);
      setSavedMeals(meals);
      localStorage.setItem("savedMeals", JSON.stringify(meals));
   };

   const addMeal = async (meal) => {
      await fetch("/api/meals/", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(meal),
      })
         .then((res) => res.json())
         .catch((err) => console.error(err));

      setIsUpdated(!isUpdated);
   };

   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Saved Meals</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {savedMeals.length ? (
               savedMeals.map((meal) => (
                  <ListGroup.Item key={meal._id}>
                     <Row>
                        <Col>
                           <h5>{meal.name}</h5>
                           <em>
                              {meal.ingredients.map(
                                 (ingredient, index) =>
                                    `${ingredient}${
                                       index !== meal.ingredients.length - 1
                                          ? ", "
                                          : ""
                                    } `
                              )}
                           </em>
                           <p>{meal.day}</p>
                           <Button onClick={() => addMeal(meal)}>
                              Add to planner
                           </Button>
                           <button
                              style={{
                                 backgroundColor: "transparent",
                                 border: "none",
                              }}
                              onClick={() => removeFromSavedMeals(meal._id)}
                           >
                              <Trash className="text-danger" />
                           </button>
                        </Col>
                     </Row>
                  </ListGroup.Item>
               ))
            ) : (
               <Row>
                  <Col>No meals saved</Col>
               </Row>
            )}
         </Modal.Body>
      </Modal>
   );
};

export default SavedMealsModal;