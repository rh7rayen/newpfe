import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../api/http";

const UpdateLevel = () => {
  const [data, setData] = useState({
    level: "",
    year: "",
  });
  const [alert, setAlert] = useState(false);
  const { id } = useParams(); // useParams returns an object, so you need to destructure the id from it

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  const fetchData = async () => {
    try {
      const { data: fetchedClasses } = await http.get(
        `http://localhost:5000/api/adminController/getUpdateLevel/${id}`
      );
      await setData(fetchedClasses[0]); // Update the state with the fetched data
    } catch (error) {
      console.error(error);
      Swal.fire("Une erreur est survenue", "", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAlert(true);
      await http.post(
        `http://localhost:5000/api/adminController/updataLevel/${id}`,
        data
      );
      await setAlert(false);
      fetchData(); // Fetch the updated data after adding a new level
    } catch (error) {
      console.error(error);
      Swal.fire("Une erreur est survenue", "", "error");
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="col-8" style={{ float: "right" }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="levelInput">Niveau</label>
          <input
            type="text"
            className="form-control"
            id="levelInput"
            name="level"
            aria-describedby="levelHelp"
            placeholder="level"
            value={data.levelName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="yearInput">Année</label>
          <input
            type="text"
            className="form-control"
            id="yearInput"
            name="year"
            placeholder="annee"
            value={data.year}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Modifier
        </button>
      </form>
      {alert && (
        <div className="alert alert-success" role="alert">
          Le niveau a été mis à jour avec succès.
        </div>
      )}
    </div>
  );
};

export default UpdateLevel;
