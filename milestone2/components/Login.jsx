import React from 'react';
import { browserHistory } from 'react-router';
import { Card, Form, Button, Container, Col } from 'react-bootstrap';
import Axios from 'axios';
import { Logger } from 'react-logger-lib';
function Validation(props) {
    if (!props.valid) {
        return (
            <div className='error-msg'>{props.message}</div>
        )
    }
    return null;
}
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '', userNameValid: false,
            password: '', passwordValid: false,
            formValid: false,
            validUser: true,
            errors: {
                userName: '', password: '', validUser: ''
            }
        };
    }
    componentDidMount(){
        localStorage.setItem('username', '');
    }
    validateForm() {
        const { userName, password } = this.state;
        this.setState({
            formValid: userName && password
        })
    }
    userValid(e){

        event.preventDefault();
        Logger.of('App.Login.userValidation').warn('Authenticating User');
        Axios.get('http://localhost:7001/users/')
        .then( res => {
                let errors = this.state.errors;
                let userFound = false;
                const user = res.data;
                let loggedUserName;
                user.map((user)=>{
                    if((user.userName === this.state.userName) && 
                    (user.password === this.state.password)){
                        loggedUserName = user.username;
                        userFound = true;
                    }
                });
                if(userFound){
                    localStorage.setItem('username', loggedUserName);
                    browserHistory.push("home");
                }else{
                    this.setState({validUser : false});
                    errors.validUser = 'Invalid Credentials';
                }
        })
        
    }
    handleChange(target) {
        event.preventDefault();
        const { name, value } = target;
        let errors = this.state.errors;

        switch (name) {
            case 'userName':
                if (value === '') {
                    errors.userName = 'user name is required';
                }else{
                    errors.userName = '';
                }
                let userNameValid = false;
                if (errors.userName === '') {
                    userNameValid = true;
                }else{
                    errors.password = '';
                }
                this.setState({ userNameValid });
                break;
            case 'password':
                if (value === '') {
                    errors.password = 'password is required';
                }
                let passwordValid = false;
                if (errors.password === '') {
                    passwordValid = true;
                }
                this.setState({ passwordValid });
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            Logger.of('App.Login.handleChange.errors').info('errors',errors);
            this.validateForm();
        })
    }
    render() {
        let myStyle = {
            maxWidth: "30rem",
            marginBottom: "5%",
        }
        return (
            <Container>
                <Card variant="border-dark" className="logincard mx-auto" style={myStyle}>
                    <Card.Body className="text-dark">
                        <Form className="loginform">
                            <p className="h4 mb-4 text-center">Sign in</p>
                            <Form.Row>
                                <Form.Group as={Col} md={12}>
                                    <input type="text" ref="username" name="userName" className="form-control" placeholder="Username" onChange={(e) => this.handleChange(e.target)} />
                                    < Validation valid={this.state.userNameValid} message={this.state.errors.userName} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md={12}>
                                    <input type="password" ref="password" name="password" className="form-control" placeholder="Password" onChange={(e) => this.handleChange(e.target)} />
                                    < Validation valid={this.state.passwordValid} message={this.state.errors.password} />
                                </Form.Group>
                            </Form.Row>
                            <div className="text-center">
                            <Button variant="outline-primary" className="my-4" type="submit" disabled={!this.state.formValid} onClick={(e)=> this.userValid(e.target)}>Login</Button>
                            </div>
                        </Form>
                        <h5 className="text-center">
                        < Validation valid={this.state.validUser} message={this.state.errors.validUser} />
                        </h5>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}
export default Login;