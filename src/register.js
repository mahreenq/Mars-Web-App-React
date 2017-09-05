
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter ,Route,Link, Switch } from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state =  {   name :"",
                      age: "",
                      jobs:[]
                };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState(  { [event.target.name]: event.target.value });
  }
  handleSubmit(event) {

    if (this.state.name  == "" || this.state.age =="" || !this.state.job) {
      document.getElementById('error').innerHTML = "Please complete all fields";

        event.preventDefault();
    } else {

   axios.post("https://red-wdp-api.herokuapp.com/api/mars/colonists",
   { "colonist":{"name":this.state.name,
                  "age": this.state.age,
                  "job_id" : this.state.job}
  })
  .then(function(response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});
}
}

componentDidMount(){


 axios.get("https://red-wdp-api.herokuapp.com/api/mars/jobs")
   .then(res => {
     const jobs = res.data.jobs;
     this.setState({ jobs});
 })
   .catch((error) => {
     console.log(error);
 })
}

  render() {
    return (
        <div className="App-intro background text-align-center">

        <div>
        <h1> Welcome</h1>
        <h1> Please register below </h1>
        <img src="assets/mars.gif"/>

         </div>

        <div className="justify-content-center flex padding-top-med">

              <form className="register" onSubmit={this.handleSubmit}>
              <div id="error"> </div>
            <div className="regform flex justify-content-space-between">
            NAME
            <input id="roll-input" type="text" name="name"  value = {this.state.name} onChange={this.handleChange}/>
            </div>

            <div className="regform flex justify-content-space-between">
            AGE
            <input type="number" name="age" value={this.state.age} onChange={this.handleChange}/> </div>


            <div className="regform flex justify-content-space-between">
            OCCUPATION
            <select value={this.state.job}  name="job" onChange={this.handleChange}>
             <option value="" > Choose Job</option>
              {this.state.jobs.map(job =>
                <option value={job.id} >{job.name}  </option>
              )}
            </select>
            </div>

            <Link to = '/getencounters'>
            <input className="submit" type="submit" value="Check In " onClick={this.handleSubmit} />
            </Link>
              </form>
        </div>
        </div>
    );
  }

}


export default Register;
