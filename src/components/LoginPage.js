import React, { useEffect, useState } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem("AuthToken");
        if (user) {
            navigate("/admin");
        }
    }, []);
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password).then(
                (response) => {
                    console.log(response);
                    navigate("/admin");
                    sessionStorage.setItem(
                        "AuthToken",
                        response._tokenResponse.refreshToken
                    );
                }
            );
        } catch (err) {
            // alert(err.message);
            if (err.code === "auth/wrong-password") {
                toast.error("Please check the Password");
            }
            if (err.code === "auth/user-not-found") {
                toast.error("Please check the Email");
            }
            if (err.code === "auth/invalid-email") {
                toast.error("Enter valid Email");
            }
        }
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <ToastContainer />
            <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
                wrapperClass="mb-4"
                label="Password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div> */}

            <MDBBtn onClick={() => login(email, password)} className="mb-4">
                Sign in
            </MDBBtn>
            {/* </ToastContainer> */}
        </MDBContainer>
    );
};

export default LoginPage;
