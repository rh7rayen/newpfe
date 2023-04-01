import React, { useState, useEffect } from "react";
import http from "../../../api/http";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const TableLevel = () => {
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
          "http://localhost:5000/api/adminController/getLavel"
        );
        setData(fetchedClasses);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(data);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLevel;
