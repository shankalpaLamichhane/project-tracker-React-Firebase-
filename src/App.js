import React from 'react';
import Admin from './components/Admin/Admin'
import {BrowserRouter as Router,Switch} from 'react-router-dom'
import './App.css';
import './styles/sb-admin-2.min.css'

function App() {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
        <Admin/>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
