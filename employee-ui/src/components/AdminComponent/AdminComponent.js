import React, { Component } from 'react';
import axios from 'axios';
import './AdminComponent.css';
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
class AdminComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            feedbackData:[],
            emp_name:"",
            emp_contact:"",
            emp_roll:"Admin",
            userName:"",
            password:"",
            actionSttus:"",
            show:false,
            showTagPopup:false,
            feedback_emp_id:"",
            feedback_emp_name:"",
            feedback_emp_contact:"",
            feedback_emp_roll:"",
            feedback_textArea:"",
            options : [],
            selected:[],
             tag_emp_id:"",
            tag_emp_name:"",
            tag_emp_contact:"",
            tag_emp_roll:"",
            taggedData:[]

        }
    } 

    //Onchnage events to get the input values
    componentDidMount(){
        this.listingEmployeeDetails();        
    }
    empNameTextBox =(e)=>{
        this.setState({
            emp_name:e.target.value
        })
    }
    contactTextBox =(e)=>{
        this.setState({
            emp_contact:e.target.value
        })
    }
    usernameTextBox =(e)=>{
        this.setState({
            userName:e.target.value
        })
    }
    passwordTextBox =(e)=>{
        this.setState({
            password:e.target.value
        })
    }
    rollSelectBox =(e)=>{
        this.setState({
            emp_roll:e.target.value
        })
    }
    handleClose = ()=>{
        this.setState({
            show: false
        })
    }
    handleCloseTagPopup = ()=>{
        this.setState({
            showTagPopup: false
        })
    }
    feedbackTextBoxChange = (e)=>{
        this.setState({
            feedback_textArea:e.target.value
        })
    }

    TagEmployeePopup = (selectedEmpID)=>{
        console.log("rrrrrr");
        this.setState({
            showTagPopup: true,    
            tag_emp_id:selectedEmpID.emp_id,
            tag_emp_name:selectedEmpID.emp_name,
            tag_emp_contact:selectedEmpID.emp_contact,
            tag_emp_roll:selectedEmpID.emp_roll         
        })
        axios.post('http://localhost:9000/taggedusersListForSelectedEmp', {
                    emp_id: selectedEmpID.emp_id                                
                  })
                  .then((response)=> {           
                    if(response.data.status=="success"){    
                      console.log(response.data.dataValue);
                      this.setState({
                        taggedData:response.data.dataValue
                      })
                      //new call
                      var excludedArray = [];
                      for(var j=0;j<response.data.dataValue.length;j++){
                        excludedArray.push(response.data.dataValue[j].provider_id);
                      }
                      excludedArray.push(selectedEmpID.emp_id);
                      console.log("Anoop antony");
                      console.log(excludedArray);
                      axios.post('http://localhost:9000/listEmployeeExceptSelected', {
                        emp_idList: excludedArray            
                      })
                      .then((response)=> {           
                        if(response.data.status=="success"){    
                            console.log("anoop");           
                            console.log(response.data.dataValue);
                            var dummyEmpList = [];
                            var obj = {}
                            for(var j=0;j<response.data.dataValue.length;j++){
                                obj = { label: response.data.dataValue[j].emp_name+"--"+response.data.dataValue[j].emp_id, value: response.data.dataValue[j].emp_id };
                                dummyEmpList.push(obj);
                            }
                            this.setState({
                                options: dummyEmpList
                            })
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                      //new call end

                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
       
        
    }
    setSelectedNew = (e)=>{
        console.log(e);
        this.setState({
            selected:e
        })
    }

    tagButtonClick = (e)=>{      
        axios.post('http://localhost:9000/tageEmployeeSelected', {
            emp_id: this.state.tag_emp_id,
            selectedEmpID:this.state.selected            
          })
          .then((response)=> {           
            if(response.data.status=="success"){    
                axios.post('http://localhost:9000/taggedusersListForSelectedEmp', {
                    emp_id: this.state.tag_emp_id                                
                  })
                  .then((response)=> {           
                    if(response.data.status=="success"){    
                      console.log(response.data.dataValue);
                      this.setState({
                        taggedData:response.data.dataValue
                      })
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    //This function is used for feedback popup listing
    FeedBackEmployee = (selectedEmpID)=>{
        console.log(selectedEmpID.emp_id);
        this.setState({
            show: true,  
            feedback_emp_id:selectedEmpID.emp_id,
            feedback_emp_name:selectedEmpID.emp_name,
            feedback_emp_contact:selectedEmpID.emp_contact,
            feedback_emp_roll:selectedEmpID.emp_roll
        })
        this.listingFeedbackList(selectedEmpID);

    }    

    //This function is used for feedback saving
    feedbackClickSavebutton=(e)=>{
        axios.post('http://localhost:9000/saveFeedbackSelectedEmp', {           
            emp_id:this.state.feedback_emp_id,
            feedbackProvidedBy:this.props.location.empID,
            onDate:new Date(),
            feedback:this.state.feedback_textArea

          })
          .then((response)=> {           
            if(response.data.status=="success"){  
                var obj = {
                    emp_id:this.state.feedback_emp_id
                } 
                this.setState({
                    feedback_textArea: ""
                })
                this.listingFeedbackList(obj);          
                
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    //This function is used for feedback listing
    listingFeedbackList=(selectedEmpID)=>{
        axios.post('http://localhost:9000/listFeedbackSelectedEmp', {           
            emp_id:selectedEmpID.emp_id                
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
 
    //This function is used to add a new employee to the database
    addEmployee = (e)=>{
        axios.post('http://localhost:9000/addEmployee', {           
            emp_name:this.state.emp_name,
            emp_contact:this.state.emp_contact,
            emp_roll:this.state.emp_roll,
            userName:this.state.userName,
            password:this.state.password          
          })
          .then((response)=> {           
            if(response.data.status=="success"){               
                this.listingEmployeeDetails(); 
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    //This function is used to populate the details of selected employee to the input box
    editEmployee=(selectedEmp)=>{
        this.setState({           
            emp_name:selectedEmp.emp_name,
            emp_contact:selectedEmp.emp_contact,
            emp_roll:selectedEmp.emp_roll,
            userName:selectedEmp.userName,
            password:selectedEmp.password,
            actionSttus:"1"
        })
        axios.post('http://localhost:9000/selectedEmpUserDetails', {
            emp_id: selectedEmp.emp_id            
          })
          .then((response)=> {           
            if(response.data.status=="success"){               
            console.log(response.data.dataValue[0].userName);
            console.log(response.data.dataValue[0].password);
            this.setState({ 
                emp_id: selectedEmp.emp_id,          
                emp_name:selectedEmp.emp_name,
                emp_contact:selectedEmp.emp_contact,
                emp_roll:selectedEmp.emp_roll,
                userName:response.data.dataValue[0].userName,
                password:response.data.dataValue[0].password
            })
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    //This function is used to cancel the edit details clicked  by the user
    ResetEmployee = (e)=>{
        this.setState({           
            emp_name:"",
            emp_contact:"",
            emp_roll:"Admin",
            userName:"",
            password:"",
            actionSttus:""
        })          
        
    }

    //This function is used to list down the employee details
    listingEmployeeDetails = ()=>{
        axios.post('http://localhost:9000/listEmployee', {
            search: "All"            
          })
          .then((response)=> {           
            if(response.data.status=="success"){               
             this.setState({
                 data:response.data.dataValue,
                 emp_id:0,
                 emp_name:"",
                 emp_contact:"",
                 emp_roll:"Admin",
                 userName:"",
                 password:"",
                 actionSttus:""
             })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    //This function is used to save the edited value to the empdetails table and login details table
    saveEmployee = (e)=>{
        console.log(this.state);
        axios.post('http://localhost:9000/updateEmpdetails', {
            emp_id: this.state.emp_id,
            emp_name:this.state.emp_name,
            emp_contact:this.state.emp_contact,
            emp_roll:this.state.emp_roll,
            userName:this.state.userName,
            password:this.state.password,
            actionSttus:this.state.actionSttus,
          })
          .then((response)=> {           
            if(response.data.status=="success"){               
                this.listingEmployeeDetails();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    //This function is used to delete the selected employee
    deleteEmployee=(selectedEmpID)=>{
        
            if (window.confirm("Are you sure you want to delete the user!")) {
                axios.post('http://localhost:9000/deleteEmpdetails', {
                    emp_id: selectedEmpID           
                  })
                  .then((response)=> {           
                    if(response.data.status=="success"){               
                        this.listingEmployeeDetails();
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            } else {
                //
            }
        
    }

    

    render() {
        return (
           
            
<div className="row bg-clr">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">

                    </div>
                    <div className="col-md-12">
                        <div  className="row contentWrapper">
                            <div className="col-md-12 employeHeading">
                                Add New Employee
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                               <label className="labelClass">Employee Name</label> 
                               <input value={this.state.emp_name} type="text" placeholder="Enter Employee Name" className="form-control" onChange={this.empNameTextBox}></input>
                            </div>
                            <div className="col-md-2">
                            <label className="labelClass">Contact No</label> 
                            <input value={this.state.emp_contact} type="text" placeholder="Enter Employee Contact" className="form-control" onChange={this.contactTextBox}></input>
                            </div>
                            <div className="col-md-2">
                            <label className="labelClass">UserName</label> 
                            <input value={this.state.userName} type="text" placeholder="Enter Username" className="form-control" onChange={this.usernameTextBox}></input>
                            </div>
                            <div className="col-md-2">
                            <label className="labelClass">Password</label> 
                            <input value={this.state.password} type="text" placeholder="Enter Password" className="form-control" onChange={this.passwordTextBox}></input>
                            </div>
                            <div className="col-md-2">
                            <label className="labelClass">Employee Roll</label> 
                            <select value={this.state.emp_roll} className="form-control" onChange={this.rollSelectBox}>
                                <option>Admin</option>
                                <option>Employee</option>
                            </select>                            
                            </div>
                            <div className="col-md-2">
                             <Button disabled={!this.state.emp_name || !this.state.password || !this.state.userName || !this.state.emp_contact || !this.state.emp_roll} variant="primary" className={this.state.actionSttus ? 'showEditButton buttonAdd' :'ShowAddButton buttonAdd'}  onClick={this.addEmployee}>Add</Button> 
                             <Button disabled={!this.state.emp_name || !this.state.password || !this.state.userName || !this.state.emp_contact || !this.state.emp_roll} variant="primary" className={this.state.actionSttus ? 'showEditButtonREal editResetButtonStyle' :'ShowAddButtonReal'}  onClick={this.saveEmployee}>Save</Button>   
                             <Button variant="secondary" className={this.state.actionSttus ? 'showEditButtonREal editResetButtonStyle' :'ShowAddButtonReal'}  onClick={this.ResetEmployee}>Cancel</Button> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 employeListHeadding">
                                Employee List
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <td>Employee ID</td>
                                            <td>Employee Name</td>
                                            <td>Contact No</td>                                           
                                            <td>Employee Roll</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.data.map((item,key)=>{
                                            return(
                                                <tr key={key}>
                                                <td>{item.emp_id}</td>
                                                <td>{item.emp_name}</td>
                                                <td>{item.emp_contact}</td>                                                
                                                <td>{item.emp_roll}</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <button  disabled={this.state.actionSttus || item.emp_id==this.props.location.empID} title="Edit Employee" className="EditIcon" onClick={()=>this.editEmployee(item)}>
                                                            </button>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <button disabled={this.state.actionSttus || item.emp_id==this.props.location.empID}  title="Delete Employee" className="DeleteIcon"  onClick={()=>this.deleteEmployee(item.emp_id)}>
                                                            </button>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <button disabled={this.state.actionSttus}  title="Provide Feedback" className="feedbackIcon"  onClick={()=>this.FeedBackEmployee(item)}>
                                                            </button>
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
                                                                                this.state.feedbackData.map((item,key)=>{
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

                                                          
                                                            
                                                        </div>
                                                        <div className="col-md-3">
                                                            <button disabled={this.state.actionSttus}  title="Tag Employee" className="tagIcon"  onClick={()=>this.TagEmployeePopup(item)}>
                                                            </button>
                                                            <Modal
                                                                show={this.state.showTagPopup} onHide={this.handleCloseTagPopup}
                                                                dialogClassName="modal-500w"
                                                                aria-labelledby="example-custom-modal-styling-title">
                                                                    <Modal.Header closeButton>
                                                                    <Modal.Title id="example-custom-modal-styling-title">
                                                                        Tag Employee For Feedback
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
                                                                                        <td>{this.state.tag_emp_id}</td>
                                                                                        <td>{this.state.tag_emp_name}</td>
                                                                                        <td>{this.state.tag_emp_contact}</td>                                                
                                                                                        <td>{this.state.tag_emp_roll}</td>
                                                                                    </tr>                                                                            
                                                                            </tbody>
                                                                        </table>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                       <div className="col-md-12 listingheader"> 
                                                                            Tag Employees Who can provide feedback to {this.state.tag_emp_name} -- {this.state.tag_emp_id}
                                                                       </div>
                                                                    </div>
                                                                    <div className="row">
                                                                       <div className="col-md-3"> 
                                                                             <div>                                                                          
                                                                                
                                                                                <MultiSelect
                                                                                    options={this.state.options}
                                                                                    value={this.state.selected}
                                                                                    onChange={this.setSelectedNew}
                                                                                    labelledBy="Select"
                                                                                />
                                                                                </div>
                                                                       </div>
                                                                       <div className="col-md-3">  
                                                                                                                                               
                                                                       <Button disabled={this.state.selected.length<=0}  variant="primary" className='buttonAdd btnspacingTag' onClick={this.tagButtonClick}>Tag Employee</Button>
                                                                       </div>
                                                                    </div>
                                                                    <div className="row">
                                                                       <div className="col-md-12 listingheader"> 
                                                                            currently Taged Employees Who can provide feedback to {this.state.tag_emp_name} -- {this.state.tag_emp_id}
                                                                       </div>
                                                                    </div>
                                                                    <div className="row spacingClass">
                                                                        <div className="col-md-12">
                                                                        <table className="table table-bordered table-striped">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td>Tagged ID</td>
                                                                                    <td>Tagged Employee ID</td>
                                                                                    <td>Tagged Employee Name</td>                                          
                                                                                                                                                                      
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>    
                                                                            {
                                                                                this.state.taggedData.map((item,key)=>{
                                                                                return(                                                                        
                                                                                    <tr key={key} >
                                                                                        <td>{item.tag_id}</td>
                                                                                        <td>{item.provider_id}</td>
                                                                                        <td>{item.emp_name}</td>
                                                                                    </tr> 
                                                                                )
                                                                                })
                                                                            }                                                                           
                                                                            </tbody>
                                                                        </table>
                                                                        </div>
                                                                    </div>
                                                                   
                                                                   
                                                                    </Modal.Body>
                                                                </Modal>
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                   
                                                </td>
                                            </tr>
                                            )
                                            })
                                        }
                                       
                                     
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
         
            </div>
</div>





            );

    }
}

export default withRouter(AdminComponent);