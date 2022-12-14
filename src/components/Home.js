import React from "react";
import Table from "react-bootstrap/Table";

import Data from "../Data";

const Home = ({ logs, data, changeManual, changeOpen }) => {
    return (
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
    );
};

export default Home;
