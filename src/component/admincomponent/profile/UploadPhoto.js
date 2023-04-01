import React, { useState } from "react";
import http from "../../../api/http";

const UploadPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if a file was selected
    if (!selectedFile) {
      return;
    }

    // Append the selected file to the form data
    const formData = new FormData();
    formData.append("photo", selectedFile);

    // Use the correct API endpoint URL
    http
      .post("http://localhost:5000/api/adminController/UploadsImage", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              src=""
              className="rounded-circle mt-5"
              width="150px"
              alt="profile picture"
            />
            <span className="font-weight-bold">Edogaru</span>
            <span className="text-black-50">edogaru@mail.com.my</span>
            <span> </span>
            <br />
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <input
                type="file"
                className="form-control"
                name="photo"
                onChange={handleFileChange}
              />
              <button type="submit">Changer votre photo de profil</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
