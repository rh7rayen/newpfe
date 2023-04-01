import React, { useState, useEffect } from "react";
import http from "../../../api/http";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const TableClasse = () => {
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
        const { data: fetchedClasses } = await http.get(
          "http://localhost:5000/api/adminController/getallclasse"
        );
        setData(fetchedClasses);
      } catch (error) {
        console.error(error);
      }
    };

    return () => fetchData();
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
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        http.delete(
          `http://localhost:5000/api/adminController/deleteClasse/${id}`
        );
      }
    });
  };
  // Filter data based on search query
  const filteredData = data.filter((row) =>
    row.classeName.toLowerCase().includes(searchQuery.toLowerCase())
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
            <th>Non de classe</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>{row.classeName}</td>
              <td>
                <Link
                  className="btn btn-danger"
                  onClick={() => onDelete(row._id)}
                >
                  Supprimer
                </Link>
              </td>
              <td>
                {" "}
                <Link
                  className="btn btn-info"
                  to={`/ajouterStudent/${row._id}`}
                >
                  ajouter des éleves
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableClasse;
