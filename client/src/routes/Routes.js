import React, { useEffect } from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
//pages
import Movies from '../pages/Movies/Movies';
import AddMovie from '../pages/AddMovie/AddMovie';
import Register from '../pages/Register/Register';
import Signin from '../pages/Signin/Signin';
//components
import Navbar from '../components/Navbar/Navbar';
import { useAuthContext } from '../contexts/AuthContext';
//actions
import { checkAuth } from '../actions/User';

const PageRoutes = () => {
    const { setIsAuth } = useAuthContext();
    useEffect(() => {
        const checkSession = async () => {
            const res = await checkAuth();
            if (res.data.auth) {
                setIsAuth(true);
            }
        };
        checkSession();
    }, [setIsAuth]);

    return (
        <div className="background-container">
            <Navbar />
            <Router>
                <Switch>
                    <Route exact path="/movies/new" render={(props) => <AddMovie {...props} />} />
                    <Route exact path="/movies" render={(props) => <Movies {...props} />} />
                    <Route exact path="/register" render={(props) => <Register {...props} />} />
                    <Route exact path="/signin" render={(props) => <Signin {...props} />} />
                    <Redirect to="/movies" />
                </Switch>
            </Router>
        </div>
    );
};

export default PageRoutes;
