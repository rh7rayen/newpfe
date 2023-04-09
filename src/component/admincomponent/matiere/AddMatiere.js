import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddMatiereCom from "./AddMatiereCom";
import LinkS from "./Semaistre";
import Swal from "sweetalert2";
import http from "../../../api/http";
import TableMatiere from "./TableMatiere";

const AddMatiere = (props) => {
  const { id } = useParams();
  const [data, setData] = useState({
    SubjectName: "",
    id_classe: props.id,
  });
  // Declare state variable for search query

  // Define handleChange function to update searchQuery state

  return (
    <div>
      <AddMatiereCom id={id} />
      <div className="container mt-3">
        {/* Add onChange handler to update search query */}

        <br />
        {/* Pass searchQuery as prop to TableClasse */}
        <TableMatiere id={id} />
      </div>
    </div>
  );
};

export default AddMatiere;
