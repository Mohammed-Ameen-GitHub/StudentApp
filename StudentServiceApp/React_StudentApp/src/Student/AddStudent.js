import React from 'react';  
import axios from 'axios';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';  


class Addstudent extends React.Component{  
constructor(props){  
super(props)  
this.state = {  
entities: {},
errors: {} 
} 
}   

Addstudent=(e)=>{
   
e.preventDefault();
if (this.validateemployee()) {
  axios.post('https://localhost:44379/Api/Students/Post', {FirstName:this.state.entities.FirstName,LastName:this.state.entities.LastName,  
  Gender:this.state.entities.Gender, Address:this.state.entities.Address})  
.then(response => {  
  
  alert("Data Saved Successfully");  
  this.props.history.push('/Studentlist') 
if(response.ok){  
  console.log(response.data);  
}
})  
}
}  
   
handleChange= (e)=> {  
  let entities = this.state.entities;
  entities[e.target.name] = e.target.value;
  this.setState({
  entities
  });
}  
validateemployee() {
  let entities = this.state.entities;
  let errors = {};
  let IsValid = true;
  if (!entities["FirstName"]) {
  IsValid = false;
  errors["FirstName"] = "FirstName is Required";
  }
  
  if (!entities["LastName"]) {
  IsValid = false;
  errors["LastName"] = "LastName is Required";
  }
  
  if (!entities["Gender"]) {
    IsValid = false;
    errors["Gender"] = "Gender is Required";
    }
  
    if (!entities["Address"]) {
      IsValid = false;
      errors["Address"] = "Address is Required";
      }
  
  this.setState({
  errors: errors
  });
  return IsValid;


}
render() {  
  
return (
  <Container className="App container-fluid ">  
    <h4 className="PageHeading">Enter Student Informations</h4>  
    <Form className="form">  
      <Col>  
      
        <FormGroup row>  
          <Label for="FirstName" sm={2}>First Name</Label>  
          <Col sm={10}>  
            <Input type="text" name="FirstName" onChange={this.handleChange} value={this.state.entities.FirstName} placeholder="Enter First Name" required/>  
            <div className="errorMsg" style={{color:'red'}}>{this.state.errors.FirstName}</div>
          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Label for="LastName" sm={2}>Last Name</Label>  
          <Col sm={10}>  
            <Input type="text" name="LastName" onChange={this.handleChange} value={this.state.entities.LastName} placeholder="Enter Last Name" required/>
            <div className="errorMsg" style={{color:'red'}}>{this.state.errors.LastName}</div>  
          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Label for="Gender" sm={2}>Gender</Label>  
          <Col sm={10}>  
            <Input type="text" name="Gender" onChange={this.handleChange} value={this.state.entities.Gender} placeholder="Enter Gender" required/>
            <div className="errorMsg" style={{color:'red'}}>{this.state.errors.Gender}</div>  
          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Label for="Address" sm={2}>Address</Label>  
          <Col sm={10}>  
            <Input type="text" name="Address" onChange={this.handleChange} value={this.state.entities.Address} placeholder="Enter Address" required/> 
            <div className="errorMsg" style={{color:'red'}}>{this.state.errors.Address}</div> 
          </Col>  
        </FormGroup>  
      </Col>  
      <Col>  
        <FormGroup row>  
          <Col sm={4}>  
          </Col>  
          <Col sm={2}>  
          <button type="button" onClick={this.Addstudent} className="btn btn-success">Submit</button>  
          </Col>  
          <Col sm={2}>  
            <Button onClick={() => this.props.history.push('/Studentlist')} color="danger">Cancel</Button>{' '}  
          </Col>  
          <Col sm={4}>  
          </Col>  
        </FormGroup>  
      </Col>  
    </Form>  
  </Container> 

);  
}  
   
}
   
export default Addstudent;