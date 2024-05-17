import { FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, Dispatch, useState } from "react";
import { AuthModel, User } from "./_models";
import * as authHelper from "./AuthHelper"
import { getUserByToken } from "../requests/_request";
import LoadingPage from "../pages/LoadingPage";

type AuthContexProps = {
    auth: string | undefined
    isUserAuthenticated: boolean
    saveAuth: (auth: string | undefined) => void
    setIsUserAuthenticated: Dispatch<SetStateAction<boolean>>
    logout: () => void
}

const initAuthContextPropsState = {
    auth: authHelper.getAuth(),
    isUserAuthenticated: false,
    saveAuth: () => { },
    setIsUserAuthenticated: () => { },
    logout: () => { }
}

const AuthContex = createContext<AuthContexProps>(initAuthContextPropsState);

const useAuth = () => {
    return useContext(AuthContex);
};

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

    const [auth, setAuth] = useState<string | undefined>(authHelper.getAuth());
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

    const saveAuth = (auth: string | undefined) => {
        setAuth(auth)
        if (auth) {
            authHelper.setAuth(auth)
        } else {
            authHelper.removeAuth();
        }
    }

    const logout = () => {
        saveAuth(undefined)
        setIsUserAuthenticated(false)
    }

    return (
        <AuthContex.Provider value={{ auth, isUserAuthenticated, setIsUserAuthenticated, saveAuth, logout }}>
            {children}
        </AuthContex.Provider>
    )
}

const AuthInit: FC<PropsWithChildren> = ({ children }) => {
    const { auth, logout, setIsUserAuthenticated } = useAuth();
    const [showSplashScreen, setShowSplashScreen] = useState(true)
    useEffect(() => {
        const requestUser = async (apiToken: string) => {
            try {
                const { data } = await getUserByToken(apiToken);
                if (data) {
                    setIsUserAuthenticated(true)
                }
            } catch (error) {
                logout()
            } finally {
                setShowSplashScreen(false)
            }
        }
        if (auth) {
            requestUser(auth)
        } else {
            logout()
            setShowSplashScreen(false)
        }
    }, []);
    return showSplashScreen ? <LoadingPage /> : <>{children}</>;
}

export { AuthProvider, useAuth, AuthInit };