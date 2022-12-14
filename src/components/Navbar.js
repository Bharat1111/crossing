import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../train-svgrepo-com.svg";
import "../App.css";

const Navbar1 = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
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
    );
};

export default Navbar1;
