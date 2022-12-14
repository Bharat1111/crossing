import React from "react";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";

import "../App.css";

const Admin = ({ manual, open, changeManual, changeOpen, senddata }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("AuthToken");
        navigate("/login");
    };

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
                <p style={{ color: "green" }}>
                    All components are working, there are no defects found.{" "}
                </p>
            </div>
            <div
                className="logs"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    Manual{" "}
                    <Switch onChange={changeManual} checked={senddata.Manual} />
                </div>
                {manual && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        Open{" "}
                        <Switch onChange={changeOpen} checked={senddata.Open} />
                    </div>
                )}
                {console.log("manual", manual, open)}
                <button className="btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Admin;
