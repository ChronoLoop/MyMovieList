import React, { useState, useContext, useEffect } from 'react';
import { checkAuth, checkAdmin } from '../actions/User';
const AuthContext = React.createContext();

const useAuthContext = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    //check if auth
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

    //check if admin
    useEffect(() => {
        if (!isAuth) {
            setIsAdmin(false);
        } else {
            const checkUserAdmin = async () => {
                try {
                    const res = await checkAdmin();
                    if (res.data.admin) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                } catch {
                    setIsAdmin(false);
                }
            };
            checkUserAdmin();
        }
    }, [isAuth]);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuthContext };
