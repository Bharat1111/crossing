import logo from "./train-svgrepo-com.svg";
import "./App.css";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Alert, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Loading from "./Loading";
function App() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 7000);
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              style={{
                marginRight: "10px",
              }}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Railway Crosing
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#e7e7e7",
        }}
      >
        <div className="App">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                gap: "10px",
                display: "flex",
                padding: "10px",
              }}
            >
              <Button
                variant="success"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Open
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close
              </Button>
            </div>
            <div className="light__container">
              <div
                style={{
                  backgroundColor: open ? "white" : "red",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: open ? "green" : "white",
                }}
              ></div>
            </div>
          </div>

          <div className="table__container">
            <h1
              style={{
                marginBottom: "1rem",
              }}
            >
              Recent
            </h1>
            <Table hover className="rounded">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Username</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="logs">
          <h1
            style={{
              marginBottom: "1rem",
            }}
          >
            Logs
          </h1>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Username</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
