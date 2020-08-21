import React from 'react';
import {  Link, browserHistory }
    from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class AppRouter extends React.Component {
    
    home(){
        browserHistory.push("login");
    }
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="home" className="nav-link">Home</Link>
                            <Link to="claim" className="nav-link">View Claim</Link>
                            <Link to="updateClaim/1" className="nav-link">Update Claim</Link>
                            <Link to="aboutus" className="nav-link">About Us</Link>
                        </Nav>
                        <Nav>
                            <li className="nav-item">
                            <p className="mr-5 pt-2 user">Hi siddasai</p>
                            </li>
                            <li>
                                <button className="btn btn-outline-light mt-1" onClick={()=> this.home()}>Logout</button>
                            </li>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default AppRouter;