import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import ViewClaim from './components/ViewClaim.jsx';
import UpdateClaim from './components/UpdateClaim.jsx';
import App from './components/App.jsx';
import { Router, Route,browserHistory, IndexRoute  } from 'react-router';
import About from './components/AboutUs.jsx';


ReactDOM.render((
    <Router history = {browserHistory}>
    <Route path = "/" component = {App}>
           <IndexRoute component = {Login} />
           <Route path = "home" component = {Home} />
           <Route path = "claim" component = {ViewClaim} />
           <Route path = "updateClaim/:id" component = {(props)=><UpdateClaim{...props}/>} />
           <Route path = "login" component = {Login} />
           <Route path = "aboutus" component = {About} />
    </Route>
   </Router>
   ), document.getElementById('router'));
