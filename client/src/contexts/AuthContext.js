import React, { useState, useContext, useEffect } from 'react';
import { checkAuth } from '../actions/User';
const AuthContext = React.createContext();

const useAuthContext = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await checkAuth();
                if (res.data.auth) {
                    setIsAuth(true);
                }
            } catch {
                setIsAuth(false);
            }
        };
        checkSession();
    }, [setIsAuth]);
    return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuthContext };
