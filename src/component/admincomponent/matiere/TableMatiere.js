import React, { useState, useEffect } from "react";
import http from "../../../api/http";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TableMatiere = (props) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Define handleChange function to update searchQuery state
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Fetch data from API and store in state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData } = await http.get(
          `http://localhost:5000/api/adminController/getAllSubject/${props.id}`
        );
        setData(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data]);

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await http.delete(
          `http://localhost:5000/api/adminController/deleteSubject/${id}`
        );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setData(data.filter((row) => row._id !== id));
      }
    });
  };

  // Filter data based on search query
  const filteredData = data.filter((row) =>
    row.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-3 col-8" style={{ float: "right" }}>
      {/* Add onChange handler to update search query */}
      <input
        className="form-control"
        id="myInput"
        type="text"
        placeholder="Search.."
        onChange={handleChange}
      />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Non de matiére</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row._id}>
              <td>{row.subjectName}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(row._id)}
                >
                  Supprimer
                </button>
              </td>
              <td>
                <Link className="btn btn-primary" to={`/Semaistre`}>
                  modifier{" "}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableMatiere;
