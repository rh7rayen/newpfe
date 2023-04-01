import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TableClasse from "./TableClasse";
import AddClasseCom from "./AddClasseCom";
import Swal from "sweetalert2";
import http from "../../../api/http";

const AddClasse = () => {
  const { id } = useParams();

  // Declare state variable for search query

  // Define handleChange function to update searchQuery state

  return (
    <div>
      <AddClasseCom id={id} />
      <div className="container mt-3">
        {/* Add onChange handler to update search query */}

        <br />
        {/* Pass searchQuery as prop to TableClasse */}
        <TableClasse />
      </div>
    </div>
  );
};

export default AddClasse;
