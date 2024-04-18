import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

const PrivateRoutes: RouteObject[] = [
    {
        index: true,
        element: <Home />
    }
]

const PublicRoutes: RouteObject[] = [
    {
        path: "/auth",
        element: <Login />
    }
]