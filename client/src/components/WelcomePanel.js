import React from "react";
import Container from "react-bootstrap/Container";

const WelcomePanel = () => {
   return (
      <div className="pt-4 pb-4 mb-4 bg-dark text-light">
         <Container>
            <h1>Meal Planner</h1>
            <p className="m-0">
               Please login or register below and began scheduling meals for the
               week!
            </p>
         </Container>
      </div>
   );
};

export default WelcomePanel;
