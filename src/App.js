import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ref, onValue, update, set } from "firebase/database";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { database, db } from "./firebase-config";
import Loading from "./Loading";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Login from "./components/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
    const [manual, setManual] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState([]);
    const [data, setData] = useState({});
    const [senddata, setsendData] = useState({});

    const [user, setUser] = useState(null);

    const dbRef = ref(database);
    const senddbRef = ref(database, "getData/");

    // console.log(data);
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
            // console.log("arr", arr);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const changeManual = () => {
        onValue(dbRef, (snapshot) => {
            setsendData(snapshot.val().getData);
        });
        // console.log("senddata", senddata);
        try {
            set(senddbRef, {
                Open: senddata.Open,
                Manual: !senddata.Manual,
            });
            setManual(!senddata.Manual);
            setOpen(senddata.Open);
            // console.log("changed", "senddata", senddata, manual, open);
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
            setOpen(!senddata.Open);
            // console.log("changed", "senddata", senddata, open);
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
        const user = localStorage.getItem("user");
        if (user) {
            setUser(user);
        }
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                logs={logs}
                                data={data}
                                changeManual={changeManual}
                                changeOpen={changeOpen}
                            />
                        }
                    >
                        {/* <Route index element={<Home />} /> */}
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route
                            path="/admin"
                            element={
                                <Admin
                                    manual={manual}
                                    open={open}
                                    changeManual={changeManual}
                                    changeOpen={changeOpen}
                                    senddata={senddata}
                                />
                            }
                        />
<<<<<<< HEAD
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
=======
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
                    <div className="table__container">
                        {data?.Barrier_Down && data.Distance > 0 ? (
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
                Manual{" "}
                <Switch onChange={changeManual} checked={senddata.Manual} />
                {manual && (
                    <>
                        <br />
                        Open{" "}
                        <Switch onChange={changeOpen} checked={senddata.Open} />
                    </>
                )}
                {console.log("manual", manual, open)}
            </div>
>>>>>>> 29e65984e69d9e994907e43e6f415ef85e2eb2c7
        </>
    );
}

export default App;
