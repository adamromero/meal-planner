import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Planner from "./components/Planner.js";
import PlannerModal from "./components/PlannerModal.js";
import ShoppingList from "./components/ShoppingList.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const App = () => {
   const [meals, setMeals] = useState([]);
   const [ingredients, setIngredients] = useState([]);
   const [isUpdated, setIsUpdated] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   useEffect(() => {
      fetch("/api/meals")
         .then((res) => res.json())
         .then((data) => {
            setMeals(data);
            combineIngredientsIntoList(data);
            setIsLoading(false);
         });
   }, [isUpdated]);

   const combineIngredientsIntoList = (data) => {
      let ingredientsArray = Array.from(
         new Set(
            data
               .map((item) => item.ingredients)
               .flat()
               .map((item) => item.toLowerCase().split(/(?:,|\n)+/))
               .flat()
         )
      ).map((item) => item.trim());

      const ingredientsArrayNoDuplicates = ingredientsArray.filter(
         (item, index) => {
            return ingredientsArray.indexOf(item) === index;
         }
      );

      setIngredients(ingredientsArrayNoDuplicates);
   };

   return (
      <>
         <style type="text/css">
            {`
               header {
                  background: black;
                  color: white;
                  padding: 25px 0;
                  margin: 0 0 25px;
               }
               .btn-primary {
                  background-color: #1c5b78;
                  border-color: #1c5b78;
               }
               .btn-primary:hover, .btn-primary:active, .btn-primary:visited, .btn-primary:focus {
                  background-color: #153e50;
                  border-color: #1c5b78;
               }
               .btn-primary:active, .btn-primary:focus {
                  box-shadow: 0 0 0 0.25rem rgb(111 145 161);
               }
            `}
         </style>
         <header>
            <h1 className="text-center">Meal Planner</h1>
         </header>
         <Container fluid="md">
            <Row>
               <Col md={7} lg={6}>
                  <Row className="mb-3">
                     <Col lg={3}>
                        <Button variant="primary" onClick={handleShow}>
                           Add Meal
                        </Button>
                     </Col>
                     <Col lg={3}>
                        <Button>Saved Meal</Button>
                     </Col>
                  </Row>
                  <Row>
                     <Planner
                        meals={meals}
                        isLoading={isLoading}
                        isUpdated={isUpdated}
                        setIsUpdated={setIsUpdated}
                     />
                  </Row>
               </Col>
               <Col md={5} lg={6}>
                  <Row>
                     <ShoppingList ingredients={ingredients} />
                  </Row>
               </Col>
            </Row>

            <PlannerModal
               show={show}
               onHide={handleClose}
               isNewMeal={true}
               mealsList={meals}
               setMealsList={setMeals}
               isUpdated={isUpdated}
               setIsUpdated={setIsUpdated}
            />
         </Container>
      </>
   );
};

ReactDOM.render(<App />, document.querySelector("#root"));
