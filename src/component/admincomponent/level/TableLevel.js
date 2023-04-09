import React, { useState, useEffect } from "react";
import http from "../../../api/http";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import UpdateLavel from "./UpdateLavel";

const TableLevel = ({ navigate }) => {
  const [data, setData] = useState([]);
  const [udata, setUdata] = useState({ levelName: "", year: "" });
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onUpdate = async (id) => {
    try {
      const { data: fetchedClasses } = await http.get(
        "http://localhost:5000/api/adminController/getLavelById/" + id
      );
      setUdata(fetchedClasses);
    } catch (error) {
      console.error(error);
    }
  };

  // Define handleChange function to update searchQuery state
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Fetch data from API and store in state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedClasses } = await http.get(
          "http://localhost:5000/api/adminController/getLavel"
        );
        setData(fetchedClasses);

        // Call navigate function here, after data has been set
        if (typeof navigate === "function") {
          navigate("/classe");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [data, navigate]);

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        http.delete(
          `http://localhost:5000/api/adminController/deleteLavel/${id}`
        );
      }
    });
  };
  // Filter data based on search query
  const filteredData = data.filter(
    (row) =>
      row.classeName &&
      row.classeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-3">
      {/* Add onChange handler to update search query */}
      <UpdateLavel data={udata} />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>niveau</th>
            <th>Année</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.levelName}</td>
              <td>{row.year}</td>
              <Link
                className="btn btn-danger"
                onClick={() => onDelete(row._id)}
              >
                Supprimer
              </Link>
              <td>
                <Link className="btn btn-info" to={`/addclasse/${row._id}`}>
                  ajouter un classe
                </Link>
              </td>
              <td>
                <Link
                  className="btn btn-info"
                  onClick={() => onUpdate(row._id)}
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                >
                  modifier
                </Link>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLevel;
