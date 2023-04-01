import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  FormGroup,
  Input,
  Table,
  FormText,
} from "reactstrap";
import { read, utils } from "xlsx";
import http from "../../api/http";

const requiredFields = ["ID", "name", "lastname", "email"];

function Admin() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState({ users: [] });
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const { data: userAmin } = await http.get(
        "http://localhost:5000/api/adminController"
      );

      setData(userAmin);
    } catch (error) {
      console.error(error);
    }
  };

  const updateFile = async (e) => {
    e.preventDefault();
    setLoading(true);

    http
      .post("http://localhost:5000/api/users/excel", users)
      .then((response) => {
        console.log(response.data);
        fetchData(); // Fetch data after updating
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet);
        setUsers((prevUsers) => ({
          ...prevUsers,
          users: [...prevUsers.users, ...json], // Use spread operator to merge arrays
        })); // Use spread operator to merge arrays
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      http
        .delete("http://localhost:5000/api/adminController/deleteuser/" + id)
        .then((res) => {
          setMessage(res.data.message);
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 4000);
          setData(data.filter((user) => user._id !== id)); // Filter the deleted user from the "data" array
        });
    }
  };

  function renderDataTable() {
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>nom</th>
            <th>prénom</th>
            <th>email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Map over "data" array and render table rows */}
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  className="btn btn-danger"
                  onClick={() => onDelete(user._id)}
                >
                  Supprimer
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  return (
    <Fragment>
      <div className="container">
        <Row>
          <Col md="6 text-left">
            <form onSubmit={updateFile}>
              <Input
                id="inputEmpGroupFile"
                name="file"
                type="file"
                onChange={readUploadFile}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />

              <Button disabled={loading} color="success" type="submit">
                ajouter un fichier XL
              </Button>
            </form>
          </Col>
        </Row>
        <h4 className="mt-4" style={{ color: "lightgray" }}>
          Jokes Table
        </h4>
        <button>Refresh</button>
        {renderDataTable()}
      </div>
    </Fragment>
  );
}

export default Admin;
