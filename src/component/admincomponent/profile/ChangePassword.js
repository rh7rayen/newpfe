import React from "react";
const ChangePassword = () => {
  return (
    <div>
      <div className="col-md-5 border-right">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Profile Settings</h4>
          </div>
          <form>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="first name"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter email id"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">modepasse </label>
                <input
                  type="password"
                  name="pwd1"
                  className="form-control"
                  placeholder="modepasse"
                  defaultValue
                />
              </div>
              <div className="col-md-12">
                <label className="labels">verfier votre modepasse:</label>
                <input
                  type="password"
                  name="pwd2"
                  className="form-control"
                  placeholder="modepasse"
                  defaultValue
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
