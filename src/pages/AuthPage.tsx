import { Outlet, Route, Routes } from "react-router-dom"
import Login from "./Login";
import Registration from "./Registration";

const AuthLayout = () => {
    return (
        <>{<Outlet />}</>
    );
}

const AuthPage = () => (
    <Routes>
        <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route index element={<Login />} />
        </Route>
    </Routes>
)

export default AuthPage