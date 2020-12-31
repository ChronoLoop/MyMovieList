import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
//components
import Navbar from '../components/Navbar/Navbar';
//pages
import Movies from '../pages/Movies/Movies';
import AddMovie from '../pages/AddMovie/AddMovie';
import Register from '../pages/Register/Register';
import Signin from '../pages/Signin/Signin';

const PageRoutes = () => {
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
