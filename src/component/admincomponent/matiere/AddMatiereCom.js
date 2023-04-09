import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AddMatiereCom = (props) => {
  const [data, setData] = useState({ subjectName: "", id_classe: props.id });
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    setData({ subjectName: "", id_classe: props.id });
  }, [props.id]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await setAlert(true);
      const response = await axios.post(
        "http://localhost:5000/api/adminController/addSubject",
        data
      );
      await setAlert(false);
      setData({ subjectName: "", id_classe: props.id }); // reset form fields

      // Fetch the updated data after adding a new level
      // and update the component's state accordingly

      Swal.fire("Succès", "Classe ajoutée avec succès", "success");
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Une erreur est survenue",
        "Erreur lors de l'ajout de la classe",
        "error"
      );
    }
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
          Ajouter une matiere
        </button>
        <div>
          {alert && (
            <div
              className="alert alert-danger col-8"
              role="alert"
              style={{ float: "right" }}
            >
              probléme d'ajout de matiére{" "}
            </div>
          )}
        </div>
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
                  Ajouter un classe
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
                {/* Use handleSubmit function in form onSubmit */}
                <form className="col-8" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="subjectName">matiere</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subjectName"
                      aria-describedby="emailHelp"
                      placeholder="ajouter une matiére"
                      name="subjectName"
                      value={data.subjectName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="hidden"
                      className="form-control"
                      placeholder="Année universitaire"
                      name="id_classe"
                      value={data.id_classe}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Ajouter matiére
                  </button>
                </form>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMatiereCom;
