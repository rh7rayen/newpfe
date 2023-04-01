import React, { useState, useEffect } from "react";
import AddEleveCom from "./AddeleveCom";
import TableEleve from "./TableEleve";
import UpdateLevel from "../updateLavel";
const AddEleve = () => {
  return (
    <div>
      <AddEleveCom />
      <TableEleve />
    </div>
  );
};

export default AddEleve;
