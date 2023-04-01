import React from "react";
import AddLevelCom from "./AddLevelCom"; // Renamed to avoid naming conflict
import TableLevel from "./TableLevel";

const AddLevel = () => {
  return (
    <div>
      <AddLevelCom />
      <TableLevel />
    </div>
  );
};

export default AddLevel;
