import React from 'react';
import axios from 'axios';
import AppRouter from './AppRoute.jsx';
import { Row, Form, Col, Card, Container, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Logger } from 'react-logger-lib';

function ValidationMessage(props) {
    if (!props.valid) {
        return (
            <div className='error-msg'>{props.message}</div>
        )
    }
    return null;
}
const validClaimNumRegex = RegExp(/^[0-9a-zA-Z]{3}-[0-9a-zA-Z]{3}-[0-9a-zA-Z]{3}$/i);
const validClaimProgramRegex = RegExp(/^[a-zA-Z]+$/i);
class UpdateClaim extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            employeeId:'',
            employeeName:'',
            claimNumber: '', claimNumberValid: false,
            claimProgram: '', claimProgramValid: false,
            claimType:'',
            claimStartDate: '', claimStartDateValid: false,
            claimEndDate: '', claimEndDateValid: false,
            formValid: false,
            errors: {
                claimNumber: '', claimProgram: '', claimStartDate: '', claimEndDate: ''
            }
        };
    }

    componentDidMount() {
        let userName = localStorage.getItem('username');
        this.setState({userName});
        axios.get(`http://localhost:7000/claims/`+this.props.params.id)
            .then(res => {
                const employeeId = res.data.id;
                const employeeName = res.data.Employee_Name;
                const claimNumber = res.data.Claim_Number;
                const claimProgram = res.data.Claim_Program;
                const claimStartDate = res.data.Claim_Start_Date;
                const claimEndDate = res.data.Claim_End_Date;
                const claimType = res.data.Claim_Type;
                this.setState({ employeeId,  employeeName, claimNumber, 
                    claimProgram, claimStartDate, claimEndDate, claimType});
            })
    }
  handleSubmit(){
    event.preventDefault();
    Logger.of('App.UpdateClaim.handleSubmit').info('inside handle submit');
    axios.put(`http://localhost:7000/claims/`+this.state.employeeId, { 
        Claim_Number: this.state.claimNumber,
        Claim_Type: this.state.claimType,
        Employee_Name: this.state.employeeName,
        Claim_Program: this.state.claimProgram,
        Claim_Start_Date: this.state.claimStartDate,
        Claim_End_Date: this.state.claimEndDate
     })
      .then(res => {
        Logger.of('App.UpdateClaim.handleSubmit').info('claim data',res.data);
        browserHistory.push('claim');
      })
    }
    validateForm(){
        const {claimNumber, claimProgram} = this.state;
        this.setState({
          formValid: claimNumber && claimProgram
        })
    }
    handleCancel(){
        browserHistory.push('claim');
    }
    handleChange(target) {
        event.preventDefault();
        const { name, value } = target;
        let errors = this.state.errors;

        switch (name) {
            case 'claimNumber':
                if (value === '') {
                    errors.claimNumber = 'claim number is required';
                } else {
                    errors.claimNumber =
                        validClaimNumRegex.test(value)
                            ? ''
                            : 'claim Number is invalid';
                }
                let claimNumberValid = false;
                if (errors.claimNumber === '') {
                    claimNumberValid = true; 
                } 
                this.setState({ claimNumberValid });
                break;
            case 'claimProgram':
                if (value === '') {
                    errors.claimProgram = 'claim program is required';
                } else {
                    if (value.length > 20) {
                        errors.claimProgram = 'claim program length must be less than 20';
                    } else {
                        errors.claimProgram =
                            validClaimProgramRegex.test(value)
                                ? ''
                                : 'claim program is invalid';
                    }
                }
                let claimProgramValid = false;
                if (errors.claimProgram === '') {
                    claimProgramValid = true;
                } 
                this.setState({ claimProgramValid });
                break;
            case 'claimStartDate':
                if (value === '') {
                    errors.claimStartDate = 'claim start date is required';
                }
                let claimStartDateValid = false;
                if (errors.claimStartDate === '') {
                    claimStartDateValid = true;
                }
                this.setState({ claimStartDateValid });
                break;
            case 'claimEndDate':
                if (value === '') {
                    errors.claimEndDate = 'claim end date is required';
                }
                let claimEndDateValid = false;
                if (errors.claimEndDate === '') {
                    claimEndDateValid = true;
                } 
                this.setState({ claimEndDateValid });
                break;            
            case 'claimType':
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            this.validateForm();
        })
    }

    render() {
        let myStyle = {
            maxWidth: "25rem",
            marginTop: "3rem",
            marginBottom: "3rem",
        }
        return (
            <div>
                <AppRouter username = {this.state.userName}></AppRouter>
                <Container>
                    <Card border="secondary" style={myStyle} className="mx-auto">
                        <Card.Body>
                            <Row>
                                <Col lg={12}>
                                    <h5 className="text-center">
                                        UPDATE CALIM
                                    </h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <Form onSubmit={(e) => this.handleSubmit(e.target)}>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Employee ID *</Form.Label>
                                                <input disabled name="employeeId" className="form-control" defaultValue={this.state.employeeId}/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Employee Name *</Form.Label>
                                                <input disabled name="employeeName" className="form-control" defaultValue={this.state.employeeName}/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Claim Number *</Form.Label>
                                                <input name="claimNumber" className="form-control" onChange={(e) => this.handleChange(e.target)} defaultValue={this.state.claimNumber}/>
                                                < ValidationMessage valid={this.state.claimNumberValid} message={this.state.errors.claimNumber} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Claim Type *</Form.Label>
                                                <Form.Control as="select" name="claimType"  onChange={(e) => this.handleChange(e.target)} value={this.state.claimType}>
                                                    <option>Submitted</option>
                                                    <option>Recieved</option>
                                                    <option>Pending</option>
                                                    <option>Rejected</option>
                                                    <option>Denied</option>
                                                    <option>Paid</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Claim Programs *</Form.Label>
                                                <input name="claimProgram" className="form-control" onChange={(e) => this.handleChange(e.target)} defaultValue={this.state.claimProgram}/>
                                                < ValidationMessage valid={this.state.claimProgramValid} message={this.state.errors.claimProgram} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Claim Start Date *</Form.Label>
                                                <input type="date" className="form-control" name="claimStartDate" onChange={(e) => this.handleChange(e.target)} defaultValue={this.state.claimStartDate}/>
                                                < ValidationMessage valid={this.state.claimStartDateValid} message={this.state.errors.claimStartDate} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <Form.Label>Claim End Date *</Form.Label>
                                                <input type="date" className="form-control" name="claimEndDate" onChange={(e) => this.handleChange(e.target)} defaultValue={this.state.claimEndDate}/>
                                                < ValidationMessage valid={this.state.claimEndDateValid} message={this.state.errors.claimEndDate} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md={12}>
                                                <div className="mt-4 text-center">
                                                    <button type="submit" className="btn btn-outline-primary mr-4 next" disabled={!this.state.formValid} onClick={() => this.handleSubmit()}>Update</button>
                                                    <button className="btn btn-outline-danger cancel" onClick={() => this.handleCancel()}>Cancel</button>
                                                </div>
                                            </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </div >
        );
    }
}
export default UpdateClaim;