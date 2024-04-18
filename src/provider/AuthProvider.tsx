import { Outlet } from 'react-router-dom'

const AuthProvider = () => {
    return (
        <div>{<Outlet />}</div>
    )
}

export default AuthProvider