import React from 'react';   
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';  
import './AddStudent'  
class Edit extends React.Component {  
    emptyStudent = {
        FirstName: '',
        LastName: '',
        Gender: '',
        Address: '',
       
      };
    constructor(props) {  
        super(props)  
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
         this.state = { 
            item: this.emptyStudent
            
        }  
        
      
    }  
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
          const student = await (await fetch(`https://localhost:44379/Api/Students/Get/${this.props.match.params.id}`)).json();
          this.setState({item: student});
        }
      }
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
      }
      async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch(`https://localhost:44379/Api/Students/Put/${this.props.match.params.id}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),
        });
        this.props.history.push('/Studentlist');
      }
  render() {  
        const {item} = this.state;
      
        return (  
            <Container className="App">  
             
             <h4 className="PageHeading">Update Student Informations</h4>  
                <Form className="form" onSubmit={this.handleSubmit}>  
                    <Col>  
                        <FormGroup Row>  
                            <Label for="FirstName" sm={2}>FirstName</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="FirstName" value={item.FirstName || ''} onChange={this.handleChange}  
                                placeholder="Enter FirstName" required/>  
                            </Col>  
                        </FormGroup>  
                        <FormGroup Row>  
                            <Label for="LastName" sm={2}>LastName</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="LastName" value={item.LastName || ''} onChange={this.handleChange} placeholder="Enter LastName" required/>  
                            </Col>  
                        </FormGroup>  
                         <FormGroup Row>  
                            <Label for="Gender" sm={2}>Gender</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Gender" value={item.Gender || ''} onChange={this.handleChange} placeholder="Enter Gender" required/>  
                            </Col>  
                        </FormGroup>  
                         <FormGroup Row>  
                            <Label for="Address" sm={2}>Address</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Address"value={item.Address || ''} onChange={this.handleChange} placeholder="Enter Address" required/>  
                            </Col>  
                        </FormGroup>   
                    </Col>  
                    <Col>  
                        <FormGroup row>  
                            <Col sm={4}>  
                            </Col>  
                            <Col sm={2}>  
                               <Button type="submit" color="success">Submit</Button>{' '}  
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
  
export default Edit;