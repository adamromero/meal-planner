import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Planner from "./components/Planner.js";
import PlannerModal from "./components/PlannerModal.js";
import SavedMealsModal from "./components/SavedMealsModal.js";
import ShoppingList from "./components/ShoppingList.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

if (!localStorage.getItem("savedMeals")) {
   localStorage.setItem("savedMeals", "[]");
}

if (!localStorage.getItem("shoppingList")) {
   localStorage.setItem("shoppingList", "[]");
}

const App = () => {
   const [meals, setMeals] = useState([]);
   const [ingredients, setIngredients] = useState([]);
   const [isUpdated, setIsUpdated] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const [showSavedMeals, setShowSavedMeals] = useState(false);
   const handleCloseSavedMeals = () => setShowSavedMeals(false);
   const handleShowSavedMeals = () => setShowSavedMeals(true);

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
               .flatMap((item) => item.ingredients)
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
                  margin: 0 0 50px;
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
            <Navbar collapseOnSelect expand="md" variant="dark">
               <Container fluid>
                  <Navbar.Brand className="m-auto">
                     <h1 className="text-center">Meal Planner</h1>
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="offcanvasNavbar" />
                  <Navbar.Collapse id="offcanvasNavbar">
                     <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                     >
                        <Offcanvas.Header closeButton></Offcanvas.Header>
                        <Offcanvas.Body>
                           <ShoppingList ingredients={ingredients} />
                        </Offcanvas.Body>
                     </Navbar.Offcanvas>
                  </Navbar.Collapse>
               </Container>
            </Navbar>
         </header>
         <Container fluid="md" className="mb-5">
            <Row>
               <Col md={7} lg={6}>
                  <Row className="mb-3">
                     <Col>
                        <Button onClick={handleShow}>Add Meal</Button>
                     </Col>
                     <Col className="d-flex justify-content-end">
                        <Button onClick={handleShowSavedMeals}>
                           Saved Meals
                        </Button>
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
               <Col md={5} lg={6} className="d-none d-md-block">
                  <Row>
                     <ShoppingList ingredients={ingredients} />
                  </Row>
               </Col>
            </Row>
            <SavedMealsModal
               show={showSavedMeals}
               handleClose={handleCloseSavedMeals}
               isUpdated={isUpdated}
               setIsUpdated={setIsUpdated}
            />
            <PlannerModal
               show={show}
               onHide={handleClose}
               isNewMeal={true}
               meals={meals}
               isUpdated={isUpdated}
               setIsUpdated={setIsUpdated}
            />
         </Container>
      </>
   );
};

ReactDOM.render(<App />, document.querySelector("#root"));
