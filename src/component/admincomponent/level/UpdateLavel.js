import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../api/http";
import Swal from "sweetalert2";
const UpdateLevel = (props) => {
  let data = {
    levelName: props.data.levelName,
    year: props.data.year,
    _id: props.data._id,
  };
  useEffect(() => {
    // Add your code here to execute after the form is submitted
  }, [data]);
  const handleChange = (event) => {
    data[event.target.name] = event.target.value;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedData = {
        levelName: data.levelName,
        year: data.year,
        _id: props.data._id,
      };
      await http.put(
        "http://localhost:5000/api/adminController/updateLevel",
        updatedData
      );
      Swal.fire("Good job!", "You clicked the button!", "success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modifier un niveau
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form
                className="col-8"
                onSubmit={handleSubmit}
                action={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="levelName">Niveau</label>
                  <input
                    type="text"
                    className="form-control"
                    id="levelName"
                    aria-describedby="emailHelp"
                    placeholder="Entrer le nom du niveau"
                    name="levelName"
                    defaultValue={props.data.levelName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="year">Année</label>
                  <input
                    type="text"
                    className="form-control"
                    id="year"
                    aria-describedby="emailHelp"
                    placeholder="Entrer l'année"
                    name="year"
                    defaultValue={props.data.year}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Modifier le niveau
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLevel;
