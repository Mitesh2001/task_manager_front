import { FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, Dispatch, useState } from "react";
import { AuthModel } from "./_models";
import * as authHelper from "./AuthHelper"
import { getUserByToken } from "../requests/_request";
import LoadingPage from "../pages/LoadingPage";

type AuthContexProps = {
    auth: AuthModel | undefined
    isUserAuthenticated: boolean
    saveAuth: (auth: AuthModel | undefined) => void
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

    const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

    const saveAuth = (auth: AuthModel | undefined) => {
        setAuth(auth)
        if (auth) {
            authHelper.setAuth(auth.accessToken, auth.refreshToken)
        } else {
            authHelper.removeAuth();
        }
    }

    const logout = async () => {
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
            requestUser(auth.accessToken)
        } else {
            logout()
            setShowSplashScreen(false)
        }

    }, [auth]);

    return showSplashScreen ? <LoadingPage /> : <>{children}</>;
}

export { AuthProvider, useAuth, AuthInit };