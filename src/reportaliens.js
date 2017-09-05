
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter ,Route,Link, Switch } from 'react-router-dom'



class ReportAliens extends Component{
  constructor(props) {
    super(props);
    this.state={ aliens:[],
                action:""};

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {

    if (this.state.alien  == "" || this.state.action =="") {
        document.getElementById('error2').innerHTML = "Please complete all fields";
        event.preventDefault();
    } else {

    axios.post("https://red-wdp-api.herokuapp.com/api/mars/encounters",
    { "encounter":{"atype":this.state.alien,
                   "date": new Date(),
                   "action" : this.state.action,
                   "colonist_id": 2840}
   })
   .then(function(response) {
   console.log(response);
 })
 .catch(function (error) {
   console.log(error);
 });
  }}

  componentDidMount(){
   axios.get("https://red-wdp-api.herokuapp.com/api/mars/aliens")
     .then(res => {
       const aliens = res.data.aliens;
       this.setState({ aliens});
   })
     .catch((error) => {
       console.log(error);
   });
  }


  render() {
    return (
      <div className="reportAliensPage background flex justify-content-center">


      <form  onSubmit={this.handleSubmit}>

      <h1 className="text-align-center">
      Submit your alien encounter below
      </h1>

      <div className="alienImage flex align-items-center justify-content-center padding-top-med padding-bottom-med">
      <img src="https://media.giphy.com/media/3og0IVcYfFPzFp1gFG/giphy.gif"/>
      </div>


      <div className=" flex justify-content-space-between selectAlien flex-dir-col text-align-center ">
      <div className="padding-bottom-med">WHICH ALIEN DID YOU SEE </div>
      <select name="alien" value ={this.state.value} onChange={this.handleChange} >
          <option value="" > Choose Alien</option>
        {this.state.aliens.map(alien =>
          <option value={alien.id} > {alien.type} </option>
        )}
        </select>
      </div>

        <div className="actionTaken text-align-center">
        <div className="padding-bottom-med">ACTION TAKEN</div>
        <textarea className="flex" type="text" name="action"  value = {this.state.action} onChange={this.handleChange}> </textarea>
        </div>

        <div id="error2"> </div>

        <div className="flex justify-content-center submitResponsive">
        <Link to = '/getencounters'>
        <input className="submitReportAlien" type="submit" value="SUBMIT" onClick={this.handleSubmit} />
        </Link>
        </div>

      </form>


      <div className="navHome navHomeEnc flex justify-content-space-around">
      <Link to = '/'> HOME </Link>
      <Link to = '/getencounters'> GO BACK </Link>
      </div>

      </div>
    );
  }
}

export default ReportAliens;
