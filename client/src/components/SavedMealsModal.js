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
      getSavedMeals();
   }, [isUpdated]);

   const getSavedMeals = async () => {
      const response = await fetch("/api/meals");
      const data = await response.json();

      if (!JSON.parse(localStorage.getItem("savedMeals")).length) {
         const savedMealsData = data.filter((item) => item.isSaved);
         setSavedMeals(savedMealsData);

         (function () {
            localStorage.setItem("savedMeals", JSON.stringify(savedMealsData));
         })();
      } else {
         setSavedMeals(JSON.parse(localStorage.getItem("savedMeals")));
      }
   };

   function getLocalStorageMealData() {
      return localStorage.getItem("savedMeals")
         ? JSON.parse(localStorage.getItem("savedMeals"))
         : [];
   }

   const removeFromSavedMeals = async (id) => {
      await fetch(`/api/meals/${id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ isSaved: false }),
      })
         .then((res) => res.json())
         .catch((err) => console.error(err));

      const filteredMeals = savedMeals.filter((meal) => meal._id !== id);
      setSavedMeals(filteredMeals);
      console.log("savedMeals: ", filteredMeals);
      localStorage.setItem("savedMeals", JSON.stringify(filteredMeals));
      setIsUpdated(!isUpdated);
   };

   const addSavedMealToPlanner = async (meal) => {
      const savedMeal = {
         ...meal,
         isSaved: true,
      };

      await fetch("/api/meals", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(savedMeal),
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
                           <Button onClick={() => addSavedMealToPlanner(meal)}>
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
