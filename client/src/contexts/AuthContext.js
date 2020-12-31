import React, { useState, useContext } from 'react';

const AuthContext = React.createContext();

const useAuthContext = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuthContext };
