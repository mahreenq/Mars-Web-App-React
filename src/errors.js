
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter ,Route,Link, Switch } from 'react-router-dom'





class Errors extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
<div className="background">
<h1> PAGE NOT FOUND </h1>
<div > <Link to = '/'> GO BACK HOME </Link></div>
</div>
    );
  }
}

export default Errors;
