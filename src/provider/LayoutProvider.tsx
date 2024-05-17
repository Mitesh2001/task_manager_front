import { Outlet } from 'react-router-dom'
import { AuthInit } from '../auth/AuthInit'

const LayoutProvider = () => {
    return (
        <>
            <AuthInit>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <Outlet />
                </div>
            </AuthInit>
        </>
    )
}

export default LayoutProvider