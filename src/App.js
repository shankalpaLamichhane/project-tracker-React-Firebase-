import React from 'react';
import Admin from './components/Admin/Admin'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import './styles/sb-admin-2.min.css';
import Login from './components/auth/login';
import Register from './components/auth/register';

function App() {

  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Admin/>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
