import React, { useContext, useState, useRef } from "react";
import UserContext from "../../../context/UserContext";
import http from "../../../api/http";
import Swal from "sweetalert2";
const ChangePassword = () => {
  const { user } = useContext(UserContext);
  const [alert, setAlert] = useState(false);

  let data = {
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    pwd1: "",
    pwd2: "",
    pwd3: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    try {
      await http.post(
        "http://localhost:5000/api/adminController/UpdatePassword",
        data
      );
      setAlert(true);
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the file. Please try again.");
    }
  };

  const handleChange = (event) => {
    data[event.target.name] = event.target.value;
  };

  return (
    <div>
      <div className="col-md-8 border-right">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Profile Settings</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="first name"
                  onChange={handleChange}
                  defaultValue={user.name}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  placeholder="last name"
                  defaultValue={user.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="enter email id"
                  onChange={handleChange}
                  value={user.email}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="labels">modepasse </label>
                <input
                  type="password"
                  name="pwd1"
                  className="form-control"
                  placeholder="modepasse"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="labels">verfier votre modepasse:</label>
                <input
                  type="password"
                  name="pwd2"
                  className="form-control"
                  placeholder="modepasse"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="labels">verfier votre modepasse:</label>
                <input
                  type="password"
                  name="pwd3"
                  className="form-control"
                  placeholder="modepasse"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mt-3"></div>
            <div className="mt-5 text-center">
              <button type="submit" className="btn btn-primary profile-button">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
