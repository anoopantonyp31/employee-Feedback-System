import React, { Component } from 'react';
import axios from 'axios';
import './EmployeeComponent.css';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Nav} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';
import {withRouter} from "react-router";
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import MultiSelect from "react-multi-select-component";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
class EmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {      
            feedbackData:[],
            feedbackTobeProvidedData:[],
            feedbackDataOnPopup:[],
            show:false,
            feedback_emp_id:"",
            feedback_emp_name:"",
            feedback_emp_contact:"",
            feedback_emp_roll:"",
            feedback_textArea:""
        }
    } 



    componentDidMount(){
        this.listFeedback();
        this.listFeedbackTobeProvided();
    }

    listFeedback = ()=>{
        axios.post('http://localhost:9000/listFeedbackSelectedEmp', {           
            emp_id:this.props.location.empID            
          })
          .then((response)=> {           
            if(response.data.status=="success"){   
                console.log(response.data.dataValue);            
                this.setState({
                    feedbackData:response.data.dataValue
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    listFeedbackOfSelectedemp =(selectedEmpId)=>{
        axios.post('http://localhost:9000/listFeedbackSelectedEmp', {           
            emp_id:selectedEmpId            
          })
          .then((response)=> {           
            if(response.data.status=="success"){   
                console.log(response.data.dataValue);            
                this.setState({
                    feedbackDataOnPopup:response.data.dataValue
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    listFeedbackTobeProvided = ()=>{
        axios.post('http://localhost:9000/listFeedbackTobeProvided', {           
            emp_id:this.props.location.empID            
          })
          .then((response)=> {           
            if(response.data.status=="success"){   
                console.log(response.data.dataValue);            
                this.setState({
                    feedbackTobeProvidedData:response.data.dataValue
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    feedBackPopup = (selectedEmpId)=>{       
        axios.post('http://localhost:9000/listEmployeeSelected', {           
            emp_id:selectedEmpId            
          })
          .then((response)=> {           
            if(response.data.status=="success"){   
                console.log(response.data.dataValue);            
                this.setState({
                    feedback_emp_id:response.data.dataValue[0].emp_id,
                    feedback_emp_name:response.data.dataValue[0].emp_name,
                    feedback_emp_contact:response.data.dataValue[0].emp_contact,
                    feedback_emp_roll:response.data.dataValue[0].emp_roll,
                    show: true
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          });

          this.listFeedbackOfSelectedemp(selectedEmpId);
    }
    handleClose = ()=>{
        this.setState({
            show: false
        })
    }

    feedbackTextBoxChange = (e)=>{
        this.setState({
            feedback_textArea: e.target.value
        })

    }

    feedbackClickSavebutton = (e)=>{
        axios.post('http://localhost:9000/saveFeedbackSelectedEmp', {           
            emp_id:this.state.feedback_emp_id,
            feedbackProvidedBy:this.props.location.empID,
            onDate:new Date(),
            feedback:this.state.feedback_textArea

          })
          .then((response)=> {           
            if(response.data.status=="success"){
                this.setState({
                    feedback_textArea: ""
                })
                this.listFeedbackOfSelectedemp(this.state.feedback_emp_id);        
                
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    }


    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Welcome</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <Accordion>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                               Employee Feedback
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div className="row">
                                    <div className="col-md-12">
                                    <table className="table table-bordered table-striped">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td>Feedback ID</td>
                                                                                    <td>FeedBack</td>
                                                                                    <td>Feedback Provided by</td>                                                                                                                               
                                                                                    <td>Date</td>                                                                                   
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {
                                                                                this.state.feedbackData.map((item,key)=>{
                                                                                return(                                                                            
                                                                                    <tr key={key}>
                                                                                        <td>{item.feedback_id}</td>
                                                                                        <td>{item.feedback}</td>
                                                                                        <td>{item.emp_name}</td>                                                
                                                                                        <td>{item.feedback_date}</td>
                                                                                    </tr>  
                                                                                )
                                                                                })
                                                                             }                                                                          
                                                                            </tbody>
                                                                        </table>
                                    </div>
                                </div>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Provide FeedBack
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>
                            <div className="row">
                                    <div className="col-md-12">
                                    <table className="table table-bordered table-striped">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td>Tagging ID</td>
                                                                                    <td>Employee ID</td>
                                                                                    <td>Employee</td>                                                                                                                               
                                                                                    <td>Action</td>                                                                                   
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {
                                                                                this.state.feedbackTobeProvidedData.map((item,key)=>{
                                                                                return(                                                                            
                                                                                    <tr key={key}>
                                                                                        <td>{item.tag_id}</td>
                                                                                        <td>{item.emp_id}</td>
                                                                                        <td>{item.emp_name}</td>                                                
                                                                                        <td>
                                                                                        <Button variant="primary" className='buttonAdd btnspacingTag provdButtonClass' onClick={()=>this.feedBackPopup(item.emp_id)}>Provide Feedback</Button>
                                                                                        <Modal
                                                                show={this.state.show} onHide={this.handleClose}
                                                                dialogClassName="modal-500w"
                                                                aria-labelledby="example-custom-modal-styling-title"
                                                            >
                                                                    <Modal.Header closeButton>
                                                                    <Modal.Title id="example-custom-modal-styling-title">
                                                                        FeedBack
                                                                    </Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                        <table className="table table-bordered table-striped">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td>Employee ID</td>
                                                                                    <td>Employee Name</td>
                                                                                    <td>Contact No</td>                                           
                                                                                    <td>Employee Roll</td>                                                                                   
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>                                                                            
                                                                                    <tr>
                                                                                        <td>{this.state.feedback_emp_id}</td>
                                                                                        <td>{this.state.feedback_emp_name}</td>
                                                                                        <td>{this.state.feedback_emp_contact}</td>                                                
                                                                                        <td>{this.state.feedback_emp_roll}</td>
                                                                                    </tr>                                                                            
                                                                            </tbody>
                                                                        </table>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                           <label>Feedback</label>
                                                                           <textarea value={this.state.feedback_textArea} onChange={this.feedbackTextBoxChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <Button disabled={!this.state.feedback_textArea} variant="primary" className='buttonAdd btnspacing' onClick={this.feedbackClickSavebutton}>Save FeedBack</Button> 
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                           
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12 listingheader">
                                                                            Listing Feedback For {this.state.feedback_emp_name}--{this.state.feedback_emp_id}
                                                                        </div>
                                                                    </div>
                                                                    <div className="row myscroll">
                                                                        <div className="col-md-12">
                                                                        <table className="table table-bordered table-striped">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td>Feedback ID</td>
                                                                                    <td>Feedback</td>
                                                                                    <td>Received From</td>                                           
                                                                                    <td>Date</td>                                                                                   
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {
                                                                                this.state.feedbackDataOnPopup.map((item,key)=>{
                                                                                return(
                                                                            <tr key={key}>
                                                                                <td>{item.feedback_id}</td>
                                                                                <td>{item.feedback}</td>
                                                                                <td>{item.emp_name}</td>                                                
                                                                                <td>{item.feedback_date}</td>                                                                                
                                                                            </tr>)
                                                                                })
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                        </div>
                                                                    </div>
                                                                    </Modal.Body>
                                                                </Modal>
                                                                                        </td>
                                                                                    </tr>  
                                                                                )
                                                                                })
                                                                             }                                                                          
                                                                            </tbody>
                                                                        </table>
                                    </div>
                                </div>

                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    </div>
            </div>
                </div>

            </div>
           

            

            );

    }
}

export default withRouter(EmployeeComponent);