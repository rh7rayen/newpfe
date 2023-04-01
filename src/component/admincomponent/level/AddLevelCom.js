import React, { useState, useEffect } from "react";
import http from "../../../api/http";
import Swal from "sweetalert2";
const AddLevelCom = () => {
  const [data, setData] = useState({
    levelName: "",
    year: "",
  });
  const [alert, setAlert] = useState(false);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await setAlert(true);
      const response = await http.post(
        "http://localhost:5000/api/adminController/addlevel",
        data
      );
      await setAlert(false);
      setData({ levelName: "", year: "" }); // reset form fields

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
      {alert && (
        <div class="alert alert-warning" role="alert">
          Classe ajoutée avec succès
        </div>
      )}
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
                    <label htmlFor="classe">Classe</label>
                    <input
                      type="text"
                      className="form-control"
                      id="classe"
                      aria-describedby="emailHelp"
                      placeholder="Enter classe"
                      name="levelName"
                      value={data.levelName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="classe"
                      aria-describedby="emailHelp"
                      placeholder="Enter classe"
                      name="year"
                      value={data.year}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Ajouter classe
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

export default AddLevelCom;
