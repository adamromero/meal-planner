import React, { useState } from "react";
import PlannerModal from "./PlannerModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { Pencil, Trash, Heart } from "react-bootstrap-icons";

const PlannerDay = ({
   day,
   mealsList,
   setMealsList,
   isUpdated,
   setIsUpdated,
   isLoading,
}) => {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const [currentMeal, setCurrentMeal] = useState(null);

   const handleEdit = (id) => {
      const selectedMeal = mealsList.filter((meal) => meal._id === id)[0];
      setCurrentMeal(selectedMeal);
      handleShow();
   };

   const handleDelete = (id) => {
      fetch(`/api/meals/${id}`, { method: "DELETE" }).then(() => {
         console.log("meal deleted");
         setIsUpdated(!isUpdated);
      });
   };

   const handleFavorite = (meal) => {
      let savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
      savedMeals.push(meal);
      savedMeals = JSON.stringify(savedMeals);
      localStorage.setItem("savedMeals", savedMeals);
   };

   return (
      <>
         <div className="day">
            <ListGroup>
               <ListGroup.Item
                  header={day}
                  as="h2"
                  className="mb-0 mt-3"
                  style={{ backgroundColor: "gray" }}
               >
                  {day}
               </ListGroup.Item>

               {isLoading ? (
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "10px 0",
                     }}
                  >
                     <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                     </Spinner>
                  </div>
               ) : (
                  mealsList
                     .filter(
                        (meal) => meal.day.toLowerCase() === day.toLowerCase()
                     )
                     .map((meal) => (
                        <ListGroup.Item key={meal._id}>
                           <Row>
                              <Col>
                                 <h5>{meal.name}</h5>
                                 <em>
                                    {meal.ingredients.map(
                                       (ingredient, index) =>
                                          `${ingredient}${
                                             index !==
                                             meal.ingredients.length - 1
                                                ? ", "
                                                : ""
                                          }`
                                    )}
                                 </em>
                              </Col>
                              <Col className="d-flex justify-content-end">
                                 <button
                                    title="Add to Favorites"
                                    onClick={() => handleFavorite(meal)}
                                    style={{
                                       backgroundColor: "transparent",
                                       border: "none",
                                    }}
                                 >
                                    <Heart className="text-danger" />
                                 </button>
                                 <button
                                    title="Edit"
                                    onClick={() => handleEdit(meal._id)}
                                    style={{
                                       backgroundColor: "transparent",
                                       border: "none",
                                    }}
                                 >
                                    <Pencil className="text-dark" />
                                 </button>
                                 <button
                                    title="Delete"
                                    onClick={() => handleDelete(meal._id)}
                                    style={{
                                       backgroundColor: "transparent",
                                       border: "none",
                                    }}
                                 >
                                    <Trash className="text-danger" />
                                 </button>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     ))
               )}
            </ListGroup>
         </div>

         <PlannerModal
            show={show}
            onHide={handleClose}
            isNewMeal={currentMeal === null}
            meal={currentMeal}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
         />
      </>
   );
};

export default PlannerDay;
