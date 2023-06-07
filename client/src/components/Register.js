import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthState";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import WelcomePanel from "./WelcomePanel";

const Register = () => {
   const { name, handleRegister } = useContext(AuthContext);
   const navigate = useNavigate();

   const initialState = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   };
   const [credentials, setCredentials] = useState(initialState);

   const handleRegisterSubmission = (e) => {
      e.preventDefault();
      console.log(credentials);
      handleRegister(credentials);
   };

   const handleInputChange = (e) => {
      setCredentials({
         ...credentials,
         [e.target.name]: e.target.value,
      });
   };

   useEffect(() => {
      if (name) {
         navigate("/");
      }
   }, [name]);

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
         <WelcomePanel />
         <Container>
            <h1 className="fs-4">Register</h1>
            <Form onSubmit={(e) => handleRegisterSubmission(e)}>
               <Form.Control
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Name"
               />
               <br />
               <Form.Control
                  type="text"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Email"
               />
               <br />
               <Form.Control
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  placeholder="Password"
               />
               <br />
               <Form.Control
                  type="password"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
               />
               <br />
               <Button type="submit">Submit</Button>
            </Form>
            <Link to="/login">Click here to login</Link>
         </Container>
      </>
   );
};

export default Register;
