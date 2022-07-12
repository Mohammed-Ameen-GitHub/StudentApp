import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'reactstrap';  
import { Link } from 'react-router-dom';
export default class Studentlist extends Component {  
  
  constructor(props) {  
      super(props);  
      this.state = {StudentData: [],isLoading: true};  
      this.remove = this.remove.bind(this);
    }  
    componentDidMount(){ 
        this.setState({isLoading: true});

        fetch('https://localhost:44379/Api/Students/Get')
          .then(response => response.json())
          .then(data => this.setState({StudentData: data, isLoading: false}));
    } 
   
    async remove(id) {
      alert("Are you Sure?");
      await fetch(`https://localhost:44379/Api/Students/Delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(() => {
        alert("Record Deleted Successfully!")
        this.props.history.push('/AddStudent') 
       });
    }
  
    render() {  
      const {StudentData, isLoading} = this.state;

      if (isLoading) {
        return <p>Loading...</p>;
      }
  
      const studentList = StudentData.map(student => {
        return <tr key={student.Id}>
          <td style={{whiteSpace: 'nowrap'}}>{student.FirstName}</td>
          <td>{student.LastName}</td>
          <td>{student.Gender}</td>
          <td>{student.Address}</td>
         
          <td>
              <ButtonGroup>
              
              <Button  color="primary" tag={Link} to={"/Edit/" + student.Id}>Edit</Button> 
              
              <Button  color="danger" tag={Link} onClick={() => this.remove(student.Id)}>Delete</Button>
             
              </ButtonGroup>
          </td>
        </tr>
      });
      return (  
        <div>  
          <h4 align="center">Student List</h4>  
          <table className="table table-striped" style={{ marginTop: 10 }}>  
            <thead>  
              <tr>  
                <th>FirstName</th>  
                <th>LastName</th>  
                <th>Gender</th>  
                <th>Address</th>  
                <th colSpan="4">Action</th>  
              </tr>  
            </thead>  
            <tbody>  
             { studentList }   
            </tbody>  
          </table>  
        </div>  
      );  
    }  
  }  