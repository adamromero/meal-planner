import React, { useState, useEffect } from "react";
import PlannerDay from "./PlannerDay";

const getSortedWeek = (week) => {
   const today = new Date().getDay();
   const sortedWeek = [
      ...week.slice(today, week.length),
      ...week.slice(0, today),
   ];
   return sortedWeek;
};

const Planner = ({ meals, isLoading, isUpdated, setIsUpdated }) => {
   const [mealsList, setMealsList] = useState([]);

   useEffect(() => {
      setMealsList(meals);
   }, [meals]);

   const week = getSortedWeek([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ]);

   return (
      <>
         {week.map((day, index) => (
            <PlannerDay
               key={index}
               day={day}
               mealsList={mealsList}
               setMealsList={setMealsList}
               isUpdated={isUpdated}
               setIsUpdated={setIsUpdated}
               isLoading={isLoading}
            />
         ))}
      </>
   );
};

export default Planner;
