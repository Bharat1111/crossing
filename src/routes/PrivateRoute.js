import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    const user = sessionStorage.getItem("AuthToken");
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
