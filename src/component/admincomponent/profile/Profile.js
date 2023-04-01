import React from "react";
import ChangePassword from "./ChangePassword";
import UploadPhoto from "./UploadPhoto";
const Profile = () => {
  return (
    <div style={{ float: "right" }} className="col-8">
      <UploadPhoto />
      <ChangePassword />
    </div>
  );
};

export default Profile;
