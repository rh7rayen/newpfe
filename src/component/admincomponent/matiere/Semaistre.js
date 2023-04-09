import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const Semaistre = () => {
  const { id } = useParams();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        marginTop: "80px",
      }}
    >
      <Link to={`/Subject/${id}`} className="btn btn-block btn-primary">
        Semaistre 1
      </Link>
      <Link to={`/Subject/${id}`} className="btn btn-block btn-primary">
        Semaistre 2
      </Link>
    </div>
  );
};

export default Semaistre;
