import React from "react";
import PlannerDay from "./PlannerDay";

const getSortedWeek = (week) => {
   const today = new Date().getDay();
   const sortedWeek = [
      ...week.slice(today, week.length),
      ...week.slice(0, today),
   ];
   return sortedWeek;
};

const Planner = ({ meals }) => {
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
            <PlannerDay key={index} day={day} meals={meals} />
         ))}
      </>
   );
};

export default Planner;
