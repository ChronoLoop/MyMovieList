import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.scss';

const AppNavbar = () => (
    <Navbar expand="sm" sticky="top" variant="dark">
        <Navbar.Brand className="ml-md-2 ml-lg-3" href="/">
            MyMovieList
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto mr-md-2  mr-lg-3">
                <Nav.Link href="/movies/new">Add Movie</Nav.Link>
                <Nav.Link href="/signin">Sign In</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/signout">Sign Out</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default AppNavbar;
