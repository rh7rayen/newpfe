import React, { useEffect, useContext, useState } from "react";
import http from "../../../api/http";
import UserContext from "../../../context/UserContext";
const UploadPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedClasses } = await http.get(
          "http://localhost:5000/api/adminController/getProfile/" + user._id
        );
        setData(fetchedClasses);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(data);

    fetchData();
  }, [data]);
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a file was selected
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    // Append the selected file to the form data
    const formData = new FormData();
    formData.append("photo", selectedFile);

    // Add the user ID to the request body
    const data = {
      user_id: user._id,
    };

    // Add the content type header
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await http.post(
        "http://localhost:5000/api/adminController/UploadsImage",
        formData,
        {
          params: data,
          headers: headers,
        }
      );
      setAlert(true);
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the file. Please try again.");
    }
  };

  return (
    <div>
      <div>
        {alert && (
          <div class="alert alert-success" role="alert">
            votre photot de profile est changé avec succès
          </div>
        )}
        <div className=" border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            {data.map((photo) => (
              <img
                className="rounded-circle mt-5"
                width="150px"
                key={photo._id}
                src={`http://localhost:5000/uploads/${photo.image_profile}`}
                alt=""
              />
            ))}
            <span className="font-weight-bold">
              {user.name}
              {user.lastname}
            </span>
            <span className="text-black-50">{user.email}</span>
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
