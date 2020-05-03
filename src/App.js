import React, {useState, useEffect} from 'react';
import Admin from './components/Admin/Admin'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import './styles/sb-admin-2.min.css';
import Login from './components/auth/login';
import firebase from './firebase';
import {connect} from 'react-redux';
import {setCurrentUser} from './actions/authAction';

function App(props) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(`Auth State Changed:  ${JSON.stringify(user)}`);
      props.setCurrentUser(user)
    });
  }, []);
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
        <Route exact path="/login" component={Login}/>
        <Admin/>
        </Switch>
        </Router>
    </div>
  );
}

export default connect(null, {setCurrentUser})(App);
