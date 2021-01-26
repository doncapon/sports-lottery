import React, { Component } from "react";
import './signupForm.module.css'
import axios from '../../../../axios-users';

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
            gender: 'select',
            phoneNumber: '',
            city: 'select',
            formErrors: {},
            apiError: ''
        };

        this.initialState = this.state;
    }

    handleFormValidation() {
        const { studName, emailId, dob, phoneNumber, username, role, password, passwordConf } = this.state;
        let formErrors = {};
        let formIsValid = true;

        //Student name     
        if (!studName) {
            formIsValid = false;
            formErrors["nameErr"] = "Name is required.";
        }

        //username name     
        if (!username) {
            formIsValid = false;
            formErrors["usernameErr"] = "Username is required.";
        }
        //Student name     
        if (!password) {
            formIsValid = false;
            formErrors["passwordErr"] = "Password is required.";
        }

        if (password !== passwordConf || passwordConf ==="") {
            formIsValid = false;
            formErrors["passwordConfErr"] = "Passwords dont match";
            if(passwordConf === "")
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

        //City    
        if (role === '' || role === "select") {
            formIsValid = false;
            formErrors["cityErr"] = "Select city.";
        }

        this.setState({ formErrors: formErrors });
        return formIsValid;
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        // if(name ==="dob" && (value.length ===2 || value.length === 5)){
        //     value += "-";

        // }

        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let role = this.props.adminLoggedIn? this.state.role: "user";
        const registerData = {
            name: this.state.name,
            surname: this.state.surname,
            username: this.state.username,
            phone: this.state.phoneNumber,
            dob: this.state.dob,
            password: this.state.password,
            state: role,
            email: this.state.emailId
        }
        axios.post("register" , registerData)
        .then(response =>{
            console.log(response.data);
        })
        .catch(error =>{
            console.log(error)
            // this.setState({apiError: error.response.data})
        })
        if (this.handleFormValidation()) {
            alert('You have been successfully registered.')
            // this.setState(this.initialState)
        }
    }

    render() {

        const { nameErr, emailIdErr, dobErr, roleErr, phoneNumberErr, usernameErr, passwordErr,
            passwordConfErr } = this.state.formErrors;

        return (
            <div className="formDiv">
                <h3 style={{ textAlign: "center" }} >Registration Form </ h3>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                placeholder="Your name.."
                                className={nameErr ? ' showError' : ''} />
                            {nameErr &&
                                <div style={{ color: "red" }}>{nameErr}</div>
                            }

                        </div>
                        <div>
                            <label htmlFor="surname">Surname</label>
                            <input type="text" name="surname"
                                value={this.state.surname}
                                onChange={this.handleChange}
                                placeholder="Your Surame.."
                                className={nameErr ? ' showError' : ''} />
                            {nameErr &&
                                <div style={{ color: "red" }}>{nameErr}</div>
                            }

                        </div>

                        <div>
                            <label htmlFor="emailId">Email</label>
                            <input type="text" name="emailId"
                                value={this.state.emailId}
                                onChange={this.handleChange}
                                placeholder="Your email id.."
                                className={emailIdErr ? ' showError' : ''} />
                            {emailIdErr &&
                                <div style={{ color: "red" }}>{emailIdErr}</div>
                            }

                        </div>
                        <div>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" name="phoneNumber"
                                onChange={this.handleChange}
                                value={this.state.phoneNumber}
                                placeholder="Your phone number.."
                                className={phoneNumberErr ? ' showError' : ''} />
                            {phoneNumberErr &&
                                <div style={{ color: "red" }}>{phoneNumberErr}</div>
                            }
                        </div>
                        <div>
                            <label htmlFor="dob">Birth Date</label>
                            <span htmlFor="dob">Birth Date</span>
                            <input type="date" name="dob"
                                value={this.state.dob}
                                
                                onChange={this.handleChange}
                                placeholder="dob: DD-MM-YYYY.."
                                className={dobErr ? ' showError' : ''} />
                            {dobErr &&
                                <div style={{ color: "red" }}>{dobErr}</div>
                            }
                        </div>
                        <div>
                            <label htmlFor="role">Role</label>
                            <select name="role" onChange={this.handleChange}
                                className={roleErr ? ' showError' : ''}
                                value={this.state.gender} >
                                <option value="select">--Select--</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            {roleErr &&
                                <div style={{ color: "red" }}>{roleErr}</div>
                            }
                        </div>

                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                placeholder="Username.."
                                className={usernameErr ? ' showError' : ''} />
                            {usernameErr &&
                                <div style={{ color: "red" }}>{usernameErr}</div>
                            }

                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Password.."
                                className={passwordErr ? ' showError' : ''} />
                            {passwordErr &&
                                <div style={{ color: "red" }}>{passwordErr}</div>
                            }

                        </div>

                        <div>
                            <label htmlFor="passwordConf">Confirm Password</label>
                            <input type="password" name="passwordConf"
                                value={this.state.passwordConf}
                                onChange={this.handleChange}
                                placeholder="Re-password"
                                className={passwordConfErr ? ' showError' : ''} />
                            {passwordConfErr &&
                                <div style={{ color: "red" }}>{passwordConfErr}</div>
                            }

                        </div>
                        <input type="button" value="Cancel" />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div >
        )
    }
}

export default SignupForm;