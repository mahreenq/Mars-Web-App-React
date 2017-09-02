import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { BrowserRouter ,Route,Link } from 'react-router-dom'





class App extends Component{

  constructor(props) {
    super(props);
  }


  render(){
    return (
      <BrowserRouter>

      <div>
      <Route exact path='/' component={Register}/>
      <Route path='/reportaliens' component={ReportAliens} />
      <Route path='/getencounters' component={GetEncounters} />
      </div>

      </BrowserRouter>
    );
  }

}






class Register extends Component {

  constructor(props) {
    super(props);
    this.state =
              {
                      name :"",
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

   axios.post("https://red-wdp-api.herokuapp.com/api/mars/colonists",
   { "colonist":{"name":this.state.name,
                  "age": this.state.age,
                  "job" : this.state.job}
  })
}


  render() {
    return (
        <div className="App-intro">
    <form onSubmit={this.handleSubmit}>

            <div> NAME <input type="text" name="name"  value = {this.state.name} onChange={this.handleChange}/> </div>

            <div> AGE <input type="number" name="age" value={this.state.age} onChange={this.handleChange}/> </div>


            <div> OCCUPATION MAPS
            <select value={this.state.value} onChange={this.handleChange} name="job">
             <option value="" > Choose Job</option>
              {this.state.jobs.map(job =>
                <option value={job.id} >{job.name}  </option>

              )}
            </select>
            </div>

            <Link to = '/getencounters'><input type="submit" value="Submit" /></Link>
        </form>

        </div>


    );

  }


  componentDidMount(){
   axios.get("https://red-wdp-api.herokuapp.com/api/mars/jobs")
     .then(res => {
       const jobs = res.data.jobs;
       this.setState({ jobs});
   })
     .catch((error) => {
       console.log(error);
   });
 }


}



class ReportAliens extends Component{
  constructor(props) {
    super(props);
    this.state={ aliens:[],
                action:""};

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {

    axios.post("https://red-wdp-api.herokuapp.com/api/mars/encounters",
    { "encounter":{"atype":this.state.alientype,
                   "date": new Date(),
                   "action" : this.state.action,
                   "colonist_id": 5000}
   })

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>


      <select value ={this.state.value} onChange={this.handleChange} name="alientype">
          <option value="" > Choose Alien</option>
        {this.state.aliens.map(alien =>
          <option value={alien.type} > {alien.type} </option>
        )}
        </select>

        <div> ACTION TAKEN <input type="text" name="action"  value = {this.state.action} onChange={this.handleChange}/> </div>

        <Link to = '/getencounters'><input type="submit" value="Submit" /></Link>
      </form>
    );
  }
}




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
     <div>
     <Link to = '/reportaliens'><div> Report Encounters </div></Link>

       {this.state.encounters.map(encounter =>
         <p key={encounter.id} >{encounter.date} {encounter.atype}
         {encounter.action} </p>
       )}
     </div>
   );
 }
}

















export default App;
