import React, { useState } from "react";
import PlannerModal from "./PlannerModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Pencil, Trash } from "react-bootstrap-icons";

const API_URL = "http://localhost:5000/api/meals/";

const PlannerDay = ({
   day,
   mealsList,
   setMealsList,
   isUpdated,
   setIsUpdated,
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
      fetch(API_URL + id, { method: "DELETE" }).then(() => {
         console.log("meal deleted");
         setIsUpdated(!isUpdated);
      });
   };

   return (
      <>
         <Row className="day">
            <ListGroup>
               <ListGroup.Item
                  header={day}
                  as="h2"
                  className="mb-0 mt-3"
                  style={{ backgroundColor: "gray" }}
               >
                  {day}
               </ListGroup.Item>

               {mealsList
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
                                    (i) =>
                                       `${i
                                          .replaceAll(",", "")
                                          .replaceAll("\n", ", ")}, `
                                 )}
                              </em>
                           </Col>
                           <Col className="d-flex justify-content-end">
                              <button
                                 title="Edit"
                                 onClick={() => handleEdit(meal._id)}
                                 style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                 }}
                              >
                                 <Pencil
                                    className="text-dark
"
                                 />
                              </button>

                              <button
                                 title="Delete"
                                 onClick={() => handleDelete(meal._id)}
                                 style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                 }}
                              >
                                 <Trash
                                    className="text-danger
"
                                 />
                              </button>
                           </Col>
                        </Row>
                     </ListGroup.Item>
                  ))}
            </ListGroup>
         </Row>

         <PlannerModal
            show={show}
            onHide={handleClose}
            isNewMeal={currentMeal === null}
            meal={currentMeal}
            mealsList={mealsList}
            setMealsList={setMealsList}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
         />
      </>
   );
};

export default PlannerDay;
