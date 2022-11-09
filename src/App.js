import logo from "./train-svgrepo-com.svg";
import "./App.css";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Alert, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { database, db } from "./firebase-config";
import Loading from "./Loading";
import { ref, onValue } from "firebase/database";
import Data from "./Data";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function App() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = React.useState([]);
  const dbRef = ref(database);
  const [data, setData] = useState({});

  console.log(data);
  const getLogs = async () => {
    const ref = collection(db, "logs");
    try {
      const q = query(ref, orderBy("date"));
      const res = await getDocs(q);
      const arr = [];
      res.forEach((doc) => {
        arr.push(doc.data());
      });
      setLogs(arr);
      console.log("arr", arr);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getLogs();
    onValue(dbRef, (snapshot) => {
      // console.log(snapshot.val().Data);
      setData(snapshot.val().Data);
    });
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
          backgroundColor: "white",
          minHeight: "100vh",
          backgroundColor: "rgb(242, 242, 242)",
        }}
      >
        <div className="App">
          {/* <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    > */}
          {/* <div
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
                        </div> */}
          {/* </div> */}

          <div className="table__container">
            <h1
              style={{
                marginBottom: "1rem",
              }}
            >
              Recent
            </h1>
            <Table hover className="rounded ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Time</th>
                  <th>Distance</th>
                  <th>Estimated Time</th>
                  <th>Barrier</th>
                </tr>
              </thead>
              <tbody>
                <Data data={data} />
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
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {logs?.map((log, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{log?.date?.toDate().toLocaleString()}</td>
                    <td>{log?.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
