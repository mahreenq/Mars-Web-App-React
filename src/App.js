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
        <div className="App-intro background text-align-center">

        <div>
        <h1> Welcome</h1>
        <h1> Please register below </h1>
        </div>

        <div className="justify-content-center flex padding-top-med">
              <form className="register" onSubmit={this.handleSubmit}>

            <div className="regform flex justify-content-space-between"> NAME <input type="text" name="name"  value = {this.state.name} onChange={this.handleChange}/> </div>

            <div className="regform flex justify-content-space-between"> AGE <input type="number" name="age" value={this.state.age} onChange={this.handleChange}/> </div>


            <div className="regform flex justify-content-space-between"> OCCUPATION
            <select value={this.state.value} onChange={this.handleChange} name="job">
             <option value="" > Choose Job</option>
              {this.state.jobs.map(job =>
                <option value={job.id} >{job.name}  </option>
              )}
            </select>
            </div>

            <Link to = '/getencounters'><input className="submit" type="submit" value="Submit" /></Link>
              </form>
        </div>


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
    { "encounter":{"atype":this.state.alien,
                   "date": new Date(),
                   "action" : this.state.action,
                   "colonist_id": 5000}
   })
  }
  render() {
    return (
      <div className="reportAliensPage background flex justify-content-center">
      

      <form onSubmit={this.handleSubmit}>
      <h1> Submit your alien encounter below </h1>

      <div className=" flex justify-content-space-between selectAlien"> WHICH ALIEN DID YOU SEE
      <select value ={this.state.value} onChange={this.handleChange} name="alien">
          <option value="" > Choose Alien</option>
        {this.state.aliens.map(alien =>
          <option value={alien.id} > {alien.type} </option>
        )}
        </select>
      </div>

        <div> ACTION TAKEN
        <textarea className="flex" type="text" name="action"  value = {this.state.action} onChange={this.handleChange}> </textarea>
        </div>

        <Link to = '/getencounters'><input className="submitReportAlien" type="submit" value="SUBMIT" /></Link>
      </form>

      <div className="navHome"> <Link to = '/'> HOME </Link></div>

      </div>
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
     <div className="background getencounterspage">

     <div className="getEncountersHeader ">
     <i class="fa fa-home" aria-hidden="true"></i>
     See an alien? Report it
     <div><Link to = '/reportaliens'> HERE </Link></div>
     </div>




     <div className="getEncountersBody">
       {this.state.encounters.map(encounter =>
         <p key={encounter.id} >{encounter.date} {encounter.atype}
         {encounter.action} </p>
       )}
      </div>
    <div className="navHome"> <Link to = '/'> HOME </Link></div>

</div>
   );
 }
}

















export default App;
