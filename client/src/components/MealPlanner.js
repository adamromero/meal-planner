import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthState";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import Planner from "./Planner.js";
import PlannerModal from "./PlannerModal.js";
import SavedMealsModal from "./SavedMealsModal.js";
import ShoppingList from "./ShoppingList.js";
import { MealContext } from "../context/meals/MealState";

const MealPlanner = () => {
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

   const { id, name, handleLogout } = useContext(AuthContext);

   const { getMealsByUser } = useContext(MealContext);

   const navigate = useNavigate();

   useEffect(() => {
      if (!name) {
         navigate("/login");
      }

      displayMealsByUser();
   }, [name, isUpdated]);

   const displayMealsByUser = async () => {
      if (id) {
         const data = await getMealsByUser(id);
         setMeals(data);
         combineIngredientsIntoList(data);
         setIsLoading(false);
      }
   };

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
            <Navbar
               collapseOnSelect
               expand="md"
               variant="dark"
               className="pt-4 pb-4 mb-4 bg-dark text-light"
            >
               <Container fluid>
                  <Navbar.Brand
                     className="m-auto d-flex justify-content-between"
                     style={{ width: "100%" }}
                  >
                     <div>
                        <h1 className="text-center">Meal Planner</h1>
                     </div>
                     <div className="d-flex align-items-center gap-3">
                        <h2 className="fs-6 m-0">{name}</h2>
                        <Button onClick={() => handleLogout()}>Log out</Button>
                     </div>
                     <Navbar.Toggle aria-controls="offcanvasNavbar" />
                  </Navbar.Brand>
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

export default MealPlanner;
