import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from '../src/components/auth/login.jsx';
import Register from '../src/components/auth/register.jsx';
import Patients from './components/dashboard/patients/index.jsx';
import ShowPatient from './components/dashboard/patients/show.jsx';
import Records from './components/dashboard/records/index.jsx';
import ShowRecord from './components/dashboard/records/show.jsx';
import ShowMetadataReport from './components/report/metadata.jsx';
import ShowPatientReport from './components/report/patient.jsx';
const App = () => {

  useEffect(() => {

  })
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>My Doctor</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/patients"}>Patients</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/records"}>Records</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/metadata/report"}>Metadata Report</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={Register} />
            <Route path="/patients" exact component={Patients} />
            <Route path="/patient/:id" exact component={ShowPatient} />
            <Route path="/create-patient" exact component={ShowPatient} />
            <Route path="/patient/:id/report" exact component={ShowPatientReport} />
            <Route path="/records" exact component={Records} />
            <Route path="/record/:id" exact component={ShowRecord} />
            <Route path="/create-record" exact component={ShowRecord} />
            <Route path="/metadata/report" exact component={ShowMetadataReport} />
          </Switch>
        </div>
      </div>
    </Router >
  );
}

export default App;
