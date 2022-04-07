import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";

const SavedMealsModal = ({ show, handleClose }) => {
   const [savedMeals, setSavedMeals] = useState(
      localStorage.getItem("savedMeals")
         ? JSON.parse(localStorage.getItem("savedMeals"))
         : []
   );

   useEffect(() => {
      console.log("savedMeals", savedMeals);
   }, [savedMeals]);

   const removeFromSavedMeals = (id) => {
      const meals = savedMeals.filter((meal) => meal._id !== id);
      setSavedMeals(meals);
      localStorage.setItem("savedMeals", JSON.stringify(meals));
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
                              {meal.ingredients.map((ingredient) => ingredient)}
                           </em>
                           <p>{meal.day}</p>
                           <Button>Add to planner</Button>
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
