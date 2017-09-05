

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter ,Route,Link, Switch } from 'react-router-dom'





class GetEncounters extends Component {
 constructor(props) {
  super(props);
  this.state={encounters:[]};
 }

 componentDidMount(){
  axios.get("https://red-wdp-api.herokuapp.com/api/mars/encounters")
    .then(res => {
      const encounters = res.data.encounters;
      this.setState({ encounters});
  })
    .catch((error) => {
      console.log(error);
  });
}
 render() {
   return (
     <div className="background getencounterspage">

     <div className="getEncountersHeader flex justify-content-center">

    <div>
     See an alien? Report it
     <div><Link to = '/reportaliens'> HERE </Link></div>
     </div>

     </div>

     <div className="getEncountersBody">
     <h1> Recent Encounters</h1>
       {this.state.encounters.map(encounter =>
         <p key={encounter.id} >
         <div><span className="Roboto">DATE:</span> {encounter.date}</div>
         <div><span className="Roboto">ALIEN:</span> {encounter.atype}</div>
         <div><span className="Roboto">ACTION:</span> {encounter.action}</div>
         </p>
       )}
      </div>
    <div className="navHome"> <Link to = '/'> HOME </Link></div>

</div>
   );
 }
}




export default GetEncounters;
