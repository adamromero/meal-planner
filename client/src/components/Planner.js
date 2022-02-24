import React from "react";
import PlannerDay from "./PlannerDay";

const Planner = ({ items }) => {
   return (
      <>
         <PlannerDay day="Sunday" meals={items} />
         <PlannerDay day="Monday" meals={items} />
         <PlannerDay day="Tuesday" meals={items} />
         <PlannerDay day="Wednesday" meals={items} />
         <PlannerDay day="Thursday" meals={items} />
         <PlannerDay day="Friday" meals={items} />
         <PlannerDay day="Saturday" meals={items} />
      </>
   );
};

export default Planner;
