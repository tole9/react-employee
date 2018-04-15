import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormErrors from '../EmployeeForm/FormErrors/FormErrors';
import Button from '../UI/Button/Button';
import { auth } from '../../store/actions/auth';

class Auth extends Component {

    state = {
        email: '',
        password: '',
        formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false,
        isSignup: true
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value);
            });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.auth(this.state.email, this.state.password, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {
        return (
            <div>
                <FormErrors formErrors={this.state.formErrors} />
                <form onSubmit={this.submitHandler}>
                <h2>Sign up</h2>
                <label htmlFor="email">Email address</label>
                <input
                    onChange={(e) => this.handleUserInput(e)}
                    value={this.state.email}
                    type="email"
                    name="email" />
                <label htmlFor="password">Password</label>
                <input
                    onChange={(e) => this.handleUserInput(e)}
                    value={this.state.password}
                    type="password"
                    name="password" />
                <Button disabled={!this.state.formValid} type="submit" >Submit</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
            </div>
        );
    }
}

export default connect(null, { auth })(Auth);

