import React, { useState, useEffect } from "react";
import http from "../../../api/http";
import "./cart.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const ReadEvent = () => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedEvents } = await http.get(
          "http://localhost:5000/api/adminController/getallevent"
        );
        setEvent(fetchedEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [event]);
  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        http.delete(
          `http://localhost:5000/api/adminController/deleteEvent/${id}`
        );
      }
    });
  };
  // Filter data based on search query

  return (
    <div className="container">
      <div className="row ">
        {event.map((eventItem) => (
          <div className="col-md-4 mb-3" key={eventItem.id}>
            <div className="card">
              <img
                src={`http://localhost:5000/uploads/${eventItem.photo}`}
                alt={eventItem.title}
              />
              <div className="card-body">
                <h5 className="card-title">{eventItem.title}</h5>
                <p className="card-text">{eventItem.description}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Place: {eventItem.place}</li>
                  <li className="list-group-item">Price: {eventItem.price}</li>
                </ul>
                <Link
                  to={`/updateEvent/${eventItem._id}`}
                  className="btn btn-primary"
                >
                  Modifier
                </Link>
                <Link
                  className="btn btn-danger"
                  style={{ marginLeft: "30px" }}
                  onClick={() => onDelete(eventItem._id)}
                >
                  Supprimer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadEvent;
