import React, { Component } from "react";
import classes from './signupForm.module.css'
import axios from '../../../../axios-users';
import { connect } from "react-redux";

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            username: '',
            password: '',
            passwordConf: '',
            emailId: '',
            dob: '',
            phoneNumber: '',
            city: 'select',
            formErrors: {},
            apiError: ''
        };


        this.initialState = this.state;
    }

    handleFormValidation() {
        const { name, emailId, dob, phoneNumber, username, password, passwordConf } = this.state;
        let formErrors = {};
        let formIsValid = true;

        //Student name     
        if (!name) {
            formIsValid = false;
            formErrors["nameErr"] = "Name is required.";
        }

        //username name     
        if (!username) {
            formIsValid = false;
            formErrors["usernameErr"] = "Username is required.";
        }
        //Passwod Validations   
        if (!password) {
            formIsValid = false;
            formErrors["passwordErr"] = "Password is required.";
        }

        if (password !== passwordConf || passwordConf === "") {
            formIsValid = false;
            formErrors["passwordConfErr"] = "Passwords dont match";
            if (passwordConf === "")
                formErrors["passwordConfErr"] = "Re-Password is required";
        }

        //Email    
        if (!emailId) {
            formIsValid = false;
            formErrors["emailIdErr"] = "Email id is required.";
        }
        else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailId))) {

            formIsValid = false;
            formErrors["emailIdErr"] = "Invalid email id.";
        }

        //DOB    
        if (!dob) {
            formIsValid = false;
            formErrors["dobErr"] = "Date of birth is required.";
        }
        else {
            var pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
            if (!pattern.test(dob)) {
                formIsValid = false;
                formErrors["dobErr"] = "Invalid date of birth";
            }
        }



        //Phone number    
        if (!phoneNumber) {
            formIsValid = false;
            formErrors["phoneNumberErr"] = "Phone number is required.";
        }
        else {
            var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;
            if (!mobPattern.test(phoneNumber)) {
                formIsValid = false;
                formErrors["phoneNumberErr"] = "Invalid phone number.";
            }
        }

        this.setState({ formErrors: formErrors });
        return formIsValid;
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.handleFormValidation()) {
            const registerData = {
                name: this.state.name,
                surname: this.state.surname,
                username: this.state.username,
                phone: this.state.phoneNumber,
                dob: this.state.dob,
                password: this.state.password,
                email: this.state.emailId
            }
            axios.post("register", registerData)
                .then(response => {
                    alert('You have been successfully registered.')
                })
                .catch(error => {
                })
        }
    }

    render() {

        const { nameErr, emailIdErr, dobErr, phoneNumberErr, usernameErr, passwordErr,
            passwordConfErr } = this.state.formErrors;
        if (this.props.isLoggedIn) {
            return (
                this.props.history.push("/")
            )
        }
        return (
            <div className={classes.Wrapper}>
                <div className="formDiv">
                    <h3 style={{ textAlign: "center" }} >Registration Form </ h3>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label className={classes.Label} htmlFor="name">Name</label>
                                <input type="text" name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    placeholder="Your name.."
                                    className={nameErr ? ' showError' : ''} />
                                {nameErr &&
                                    <div className= {classes.ErrorText}>{nameErr}</div>
                                }

                            </div>
                            <div>
                                <label className={classes.Label} htmlFor="surname">Surname</label>
                                <input type="text" name="surname"
                                    value={this.state.surname}
                                    onChange={this.handleChange}
                                    placeholder="Your Surame.."
                                    className={nameErr ? ' showError' : ''} />
                                {nameErr &&
                                    <div className= {classes.ErrorText}>{nameErr}</div>
                                }

                            </div>

                            <div>
                                <label className={classes.Label} htmlFor="emailId">Email</label>
                                <input type="text" name="emailId"
                                    value={this.state.emailId}
                                    onChange={this.handleChange}
                                    placeholder="Your email id.."
                                    className={emailIdErr ? ' showError' : ''} />
                                {emailIdErr &&
                                    <div className= {classes.ErrorText}>{emailIdErr}</div>
                                }

                            </div>
                            <div>
                                <label className={classes.Label} htmlFor="phoneNumber">Phone Number</label>
                                <input type="text" name="phoneNumber"
                                    onChange={this.handleChange}
                                    value={this.state.phoneNumber}
                                    placeholder="Your phone number.."
                                    className={phoneNumberErr ? ' showError' : ''} />
                                {phoneNumberErr &&
                                    <div className= {classes.ErrorText}>{phoneNumberErr}</div>
                                }
                            </div>
                            <div>
                                <label className={classes.Label} htmlFor="dob">Birth Date</label>
                                <span htmlFor="dob">Birth Date</span>
                                <input type="date" name="dob"
                                    value={this.state.dob}

                                    onChange={this.handleChange}
                                    placeholder="dob: DD-MM-YYYY.."
                                    className={dobErr ? ' showError' : ''} />
                                {dobErr &&
                                    <div className= {classes.ErrorText}>{dobErr}</div>
                                }
                            </div>

                            <div>
                                <label className={classes.Label} htmlFor="username">Username</label>
                                <input type="text" name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    placeholder="Username.."
                                    className={usernameErr ? ' showError' : ''} />
                                {usernameErr &&
                                    <div className= {classes.ErrorText}>{usernameErr}</div>
                                }

                            </div>

                            <div>
                                <label className={classes.Label} htmlFor="password">Password</label>
                                <input type="password" name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    placeholder="Password.."
                                    className={passwordErr ? ' showError' : ''} />
                                {passwordErr &&
                                    <div className= {classes.ErrorText}>{passwordErr}</div>
                                }

                            </div>

                            <div>
                                <label className={classes.Label} htmlFor="passwordConf">Confirm Password</label>
                                <input type="password" name="passwordConf"
                                    value={this.state.passwordConf}
                                    onChange={this.handleChange}
                                    placeholder="Re-password"
                                    className={passwordConfErr ? ' showError' : ''} />
                                {passwordConfErr &&
                                    <div className= {classes.ErrorText}>{passwordConfErr}</div>
                                }

                            </div>
                            <input onClick={() => this.props.setShowForm(false)} type="button" value="Cancel" />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}
const mapstateToProps = (state) => {
    return {
        isLoggedIn: state.login.isLoggedIn,
        user: state.login.user,
    }
}

export default connect(mapstateToProps)(SignupForm);