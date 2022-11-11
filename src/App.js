import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { ref, onValue, update, set } from "firebase/database";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { database, db } from "./firebase-config";
import Loading from "./Loading";
import Data from "./Data";
import logo from "./train-svgrepo-com.svg";
import "./App.css";

function App() {
    const [manual, setManual] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = React.useState([]);
    const [data, setData] = useState({});
    const [senddata, setsendData] = useState({});
    const dbRef = ref(database);
    const senddbRef = ref(database, "sendData/");

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

    const changeManual = () => {
        onValue(dbRef, (snapshot) => {
            setsendData(snapshot.val().sendData);
        });
        try {
            set(senddbRef, {
                Open: senddata.Open,
                Manual: !senddata.Manual,
            });
            setManual((prev) => !prev);
            console.log("changed", "senddata", senddata, manual);
        } catch (err) {
            console.log(err);
        }
    };

    const changeOpen = () => {
        try {
            set(senddbRef, {
                Open: !senddata.Open,
                Manual: senddata.Manual,
            });
            setOpen((prev) => !prev);
            console.log("changed", "senddata", senddata, open);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            // console.log(snapshot.val().Data);
            setData(snapshot.val().Data);
        });
    }, []);
    useEffect(() => {
        getLogs();
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
                {/* <button onClick={() => changeManual(!open)}>Manual</button>
                {manual && <button onClick={() => changeOpen()}>Open</button>} */}
                <div className="App">
                    <div className="table__container">
                        {data?.Barrier_Down ? (
                            <>
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
                            </>
                        ) : (
                            <h4>Barrier is up, you can pass safely.</h4>
                        )}
                    </div>
                </div>
                <div className="logs">
                    {logs.length > 0 ? (
                        <>
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
                                                <td>
                                                    {
                                                        log?.date
                                                            ?.toDate()
                                                            .toLocaleString()
                                                            .split(",")[0]
                                                    }
                                                </td>
                                                <td>{log?.time}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </>
                    ) : (
                        <h4>No logs found</h4>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
