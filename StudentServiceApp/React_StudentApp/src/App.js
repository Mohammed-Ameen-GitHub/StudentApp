import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css';
import Addstudent from './Student/AddStudent';  
import Studentlist from './Student/StudentList';  
import EditStudent from './Student/EditStudent';  
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import './App.css';  
function App() {  
  return (  
    <Router>  
      <div className="container">  
        <nav className="navbar navbar-expand-md navheader">  
          <div className="collapse navbar-collapse" >  
            <ul className="navbar-nav mr-auto">  
              <li className="nav-item ">  
                <Link to={'/Addstudent'} className="nav-link">Addstudent</Link>  
              </li>  
              <li className="nav-item">  
                <Link to={'/Studentlist'} className="nav-link">Student List</Link>  
              </li>  
            </ul>  
          </div>  
        </nav> <br/>  
        <Switch>  
          <Route exact path='/Addstudent' component={Addstudent} />  
          <Route path='/Edit/:id' component={EditStudent} />  
          <Route path='/Studentlist' component={Studentlist} />  
        </Switch>  
      </div>  
    </Router>  
  );  
}  
  
export default App;  