import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Register from './register';
import ReportAliens from './reportaliens';
import GetEncounters from './getencounters';
import Errors from './errors';

import { BrowserRouter ,Route,Link, Switch, e } from 'react-router-dom'





class App extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <BrowserRouter>

      <div>
      <Switch>
      <Route exact path='/' component={Register}/>
      <Route path='/reportaliens' component={ReportAliens} />
      <Route path='/getencounters' component={GetEncounters} />
      <Route  component={Errors} />
      </Switch>
      </div>

      </BrowserRouter>
    );
  }
}






export default App;
