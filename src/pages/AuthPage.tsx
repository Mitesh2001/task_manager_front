import { Outlet, Route, Routes } from "react-router-dom"
import Login from "./Login";

const AuthLayout = () => {
    return (
        <>{<Outlet />}</>
    );
}

const AuthPage = () => (
    <Routes>
        <Route element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route index element={<Login />} />
        </Route>
    </Routes>
)

export default AuthPage