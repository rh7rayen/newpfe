import React, { useState, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import http from "../../../api/http";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
const UpdateEvent = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [zoom, setZoom] = useState(12);
  const [selectedFile, setSelectedFile] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedClasses } = await http.get(
          `http://localhost:5000/api/adminController/getalleventById/${id}`
        );
        await setData(fetchedClasses);
        await setLng(fetchedClasses.longitude);
        await setLat(fetchedClasses.latitude);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, lng, lat]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("place", data.place);
    formData.append("price", data.price);
    formData.append("latitude", lat);
    formData.append("longitude", lng);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await http.put(
        "http://localhost:5000/api/adminController/updateEvent/" + id,
        formData,
        {
          headers: headers,
        }
      );
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
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoicmg3cmF5ZW4iLCJhIjoiY2wxOWVwajVoMXp2ODNpbXRxcjEydHFxdCJ9.LM2fLTqqgJCckO4hCYlrJg";
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    let marker = new mapboxgl.Marker({
      draggable: true,
      clickable: true,
    })
      .setLngLat([lng, lat])
      .addTo(map);

    map.on("movestart", function (e) {
      console.log(`Current Map Center: ${map.getCenter()}`);
      marker.setLngLat(map.getCenter());
    });

    map.on("moveend", function (e) {
      console.log(`Current Map Center: ${map.getCenter()}`);
      marker.setLngLat(map.getCenter());
    });

    map.on("mouseup", (e) => {
      console.log(e.lngLat);
      setLng(e.lngLat.lng);
      setLat(e.lngLat.lat);
    });

    map.addControl(new mapboxgl.NavigationControl());

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      flyTo: {
        zoom: 12,
      },
    });

    map.addControl(geocoder);

    geocoder.on("result", function (e) {
      console.log(e.result.center);
      setLng(e.result.center[0]);
      setLat(e.result.center[1]);
      marker.setLngLat([lng, lat]);
      map.flyTo({
        center: e.result.center,
        zoom: 12,
      });
    });

    return () => map.remove();
  }, []);
  return (
    <div className="col-8" style={{ float: "right" }}>
      <form enctype="multipart/form-data" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="titleInput">Titre</label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              placeholder="Nom de place"
              name="title"
              onChange={handleChange}
              value={data.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descriptionInput">Description</label>
            <textarea
              className="form-control"
              id="descriptionInput"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={data.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="photoInput">Image</label>
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  onChange={handleFileChange}
                />
              </div>
              <div className="input-group-append">
                <span className="input-group-text">Envoyer</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="placeInput">Place</label>
            <input
              type="text"
              className="form-control"
              id="placeInput"
              placeholder="Entrer une place"
              name="place"
              onChange={handleChange}
              value={data.place}
            />
          </div>
          <div className="form-group">
            <label htmlFor="priceInput">Prix</label>
            <input
              type="text"
              className="form-control"
              id="priceInput"
              placeholder="Prix"
              name="price"
              onChange={handleChange}
              value={data.price}
            />
          </div>
          <div className="form-group">
            <div
              ref={mapContainer}
              style={{
                width: "400px",
                height: "400px",
                borderRadius: "15px",
                border: "2px solid red",
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
