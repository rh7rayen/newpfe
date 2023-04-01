import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../api/http";
import "sweetalert2/dist/sweetalert2.min.css";

const Classe = () => {
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

  // Filter data based on search query
  const filteredData = data.filter((row) =>
    row.classeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = ({ target }) =>
    setData({ ...data, [target.name]: target.value });

  const onDelete = async (id) => {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer ce niveau?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await http.delete(
            `http://localhost:5000/api/adminController/deleteLavel/${id}`
          );
          setShow(true);
          setClasses(classes.filter((level) => level._id !== id)); // Filter the deleted level from the "classes" array
          Swal.fire({
            title: "Niveau supprimé avec succès!",
            icon: "success",
          });
        } catch (error) {
          console.error(error);
          Swal.fire("Une erreur est survenue", "", "error");
        }
        setShow(false);
      }
    });
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          style={{ float: "right" }}
        >
          Ajouter un niveau
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ajouter un niveau
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="col-8" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="niveau">Niveau</label>
                    <input
                      type="text"
                      className="form-control"
                      id="niveau"
                      aria-describedby="emailHelp"
                      placeholder="Enter niveau"
                      name="niveau"
                      value={data.niveau}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="annee">Année universitaire</label>
                    <input
                      type="text"
                      className="form-control"
                      id="annee"
                      placeholder="Année universitaire"
                      name="annee"
                      value={data.annee}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    ajouter niveau
                  </button>
                </form>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <input
          className="form-control"
          id="myInput"
          type="text"
          placeholder="Search.."
        />
        <br />
        {alert && (
          <div class="alert alert-warning" role="alert">
            This is a warning alert—check it out!
          </div>
        )}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Niveau</th>
              <th>Année</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={c._id}>
                <td>{c.levelName}</td>
                <td>{c.year}</td>
                <td>
                  <Link
                    className="btn btn-danger"
                    onClick={() => onDelete(c._id)}
                  >
                    Supprimer
                  </Link>
                </td>
                <td>
                  <Link
                    className="btn btn-primary"
                    to={`/updateLevels/${c._id}`}
                  >
                    modifier
                  </Link>
                </td>
                <td>
                  <Link className="btn btn-info" to={`/addclasse/${c._id}`}>
                    ajouter classe
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Classe;
