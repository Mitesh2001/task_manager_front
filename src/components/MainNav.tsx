import { Link, useLocation, matchPath } from "react-router-dom";
import { Dropdown, Text, Avatar } from "rizzui";
import { useAuth } from "../auth/AuthInit";
import { Logout } from "../requests/_request";

export const MainNav = () => {

    const router = useLocation();

    const { logout } = useAuth();

    const AuthLogout = async () => {
        await Logout().then(() => {
            logout();
        })
    }

    const NavItems = [
        {
            path: "/dashboard",
            title: "Dashboard"
        },
        {
            path: "/task",
            title: "Tasks"
        }
    ]

    return (
        (
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {NavItems.map((item) => {
                                        const isActive = matchPath(router.pathname, item.path)
                                        return <Link to={item.path} className={`${isActive && "bg-gray-900"} text-white rounded-md px-3 py-2 text-sm font-medium`}> {item.title}</Link>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Dropdown placement="bottom-end">
                                <Dropdown.Trigger>
                                    <Avatar
                                        name="John Doe"
                                        src="https://randomuser.me/api/portraits/women/40.jpg"
                                        className="cursor-pointer"
                                    />
                                </Dropdown.Trigger>
                                <Dropdown.Menu className="w-56 divide-y text-gray-600">
                                    <Dropdown.Item className="hover:bg-transparent">
                                        <Avatar
                                            name="John Doe"
                                            src="https://randomuser.me/api/portraits/women/40.jpg"
                                        />
                                        <span className="ml-2 text-start">
                                            <Text className="text-gray-900 font-medium leading-tight">
                                                Mary Hoops
                                            </Text>
                                            <Text>maryhe@demo.io</Text>
                                        </span>
                                    </Dropdown.Item>
                                    <div className="mt-3 mb-2 pt-2">
                                        <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">
                                            Account Settings
                                        </Dropdown.Item>
                                        <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">
                                            Support
                                        </Dropdown.Item>
                                        <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">
                                            License
                                        </Dropdown.Item>
                                    </div>
                                    <div className="mt-2 pt-2">
                                        <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50" onClick={AuthLogout}>
                                            Sign Out
                                        </Dropdown.Item>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav >
        )
    )
}