import { Outlet } from 'react-router-dom'
import { AuthInit } from '../auth/AuthInit'

const LayoutProvider = () => {
    return (
        <>
            <AuthInit>
                <Outlet />
            </AuthInit >
        </>
    )
}

export default LayoutProvider