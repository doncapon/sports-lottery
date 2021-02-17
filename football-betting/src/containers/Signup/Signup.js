import React, { Component } from "react";
import classes from './Signup.module.css'
import axios from '../../axios-main';
import { connect } from "react-redux";
import { calculateAge } from '../../shared/utility';
import firebase from '../../config/firebase/firebase';
import passwordHash from 'password-hash';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Olusegun',
            surname: 'Akintimehin',
            password: 'Emmanuel1987',
            passwordConf: 'Emmanuel1987',
            emailId: 'lordshegz@gmail.com',
            dob: '25/09/1987',
            phoneNumber: '01234567891',
            formErrors: {},
            apiError: ''
        };


        this.initialState = this.state;
    }

    createUser = async () => {
        try {

            const userCredential = await firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.state.emailId,
                    this.state.password
                );

            const userId = userCredential.user.uid;
            await firebase
                .database()
                .ref('users/' + userId + '/')
                .set({
                    name: this.state.name,
                    surname: this.state.surname,
                    password: passwordHash.generate(this.state.password),
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.emailId,
                    dob: this.state.dob,
                    role: "user",
                    funds: 0
                });
            return userId;  //As per your comment below

        } catch (error) {
            return error;
        }
    };

    validateName(name) {
        let formIsValid = true;
        let error = "";
        //Name   
        if (!name) {
            formIsValid = false;
            error = "Name is required.";
        }

        return { isValid: formIsValid, error: error }
    }
    validateSurname(surname) {
        let formIsValid = true;
        let error = "";
        //Name   
        if (!surname) {
            formIsValid = false;
            error = "Surname is required.";
        }

        return { isValid: formIsValid, error: error }
    }

    validatePassword(password) {
        let formIsValid = true;
        let error = "";
        //Password
        if (!password) {
            formIsValid = false;
            error = "Password is required.";
        } else {
            if (password.length < 8 && formIsValid) {
                formIsValid = false;
                error = "Password minumum length is 8 characters";
            }

            if (!/(?=.*?[A-Z])/.test(password) && formIsValid) {
                formIsValid = false;
                error = "Password must contain at least one Uppercase letter";
            }
            if (!/(?=.*?[a-z])/.test(password) && formIsValid) {
                formIsValid = false;
                error = "Password must contain at least one Lowercase letter";
            }
            if (!/(?=.*?[0-9])/.test(password) && formIsValid) {
                formIsValid = false;
                error = "Password must contain at least one number";
            }

        }

        return { isValid: formIsValid, error: error }
    }

    validatePasswordConf(password, passwordConf) {
        let formIsValid = true;
        let error = "";
        //PasswordConf
        if (password !== passwordConf || passwordConf === "") {
            formIsValid = false;
            error = "Passwords dont match";
            if (passwordConf === "")
                error = "Re-Password is required";
        }

        return { isValid: formIsValid, error: error }
    }



    validateEmailId(emailId) {
        let formIsValid = true;
        let error = "";

        //Email    
        if (!emailId) {
            formIsValid = false;
            error = "Email id is required.";
        }
        else {
            if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailId.toLowerCase()))) {

                formIsValid = false;
                error = "Invalid email id.";
            }
        }
        return { isValid: formIsValid, error: error }
    }


    validateDob(dob) {
        let formIsValid = true;
        let error = "";
        //dob   
        if (!dob) {
            formIsValid = false;
            error = "Date of birth is required.";
        }
        else {
            var pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
            if (!pattern.test(dob) && formIsValid) {
                formIsValid = false;
                error = "Invalid date of birth. follow format \"dd/mm/yyyy\"";
            }

            dob = dob.split("/");
            dob = dob[2] + "-" + dob[1] + "-" + dob[0];
            if (calculateAge(dob) < 18 && formIsValid) {
                formIsValid = false;
                error = "Sorry, you must be over 18";
            }
        }

        return { isValid: formIsValid, error: error }
    }

    validatePhoneNumber(phoneNumber) {
        let formIsValid = true;
        let error = "";
        if (!phoneNumber) {
            formIsValid = false;
            error = "Phone number is required.";
        }
        else {
            var mobPattern = /0\d{2}\d{4}\d{4}/;
            if (!mobPattern.test(phoneNumber)) {
                formIsValid = false;
                error = "Invalid phone number.";
            }
        }

        return { isValid: formIsValid, error: error }
    }




    handleFormValidation = () => {
        const { name, surname, emailId, dob, phoneNumber, password, passwordConf } = this.state;
        let formErrors = {};
        let formIsValid = true;
        //Name
        formErrors["nameErr"] = this.validateName(name).error;
        formIsValid = this.validateName(name).isValid && formIsValid;

        //Surname
        formErrors["surnameErr"] = this.validateSurname(surname).error;
        formIsValid = this.validateSurname(surname).isValid && formIsValid;

        //Passwod Validations  
        formErrors["passwordErr"] = this.validatePassword(password).error;
        formIsValid = this.validatePassword(password).isValid && formIsValid;

        //PasswodConf Validation 
        formErrors["passwordConfErr"] = this.validatePasswordConf(password, passwordConf).error;
        formIsValid = this.validatePasswordConf(password, passwordConf).isValid && formIsValid;

        //EmailId
        formErrors["emailIdErr"] = this.validateEmailId(emailId).error;
        formIsValid = this.validateEmailId(emailId).isValid && formIsValid;

        //DOB    
        formErrors["dobErr"] = this.validateDob(dob).error;
        formIsValid = this.validateDob(dob).isValid && formIsValid;

        //Phone number    
        formErrors["phoneNumberErr"] = this.validatePhoneNumber(phoneNumber).error;
        formIsValid = this.validatePhoneNumber(phoneNumber).isValid && formIsValid;


        this.setState({ formErrors: formErrors });
        return formIsValid;
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
        const ele = document.activeElement.name;
        let error = {};
        if (ele === "name")
            error["nameErr"] = this.validateName(value).error;
        if (ele === "surname")
            error["surnameErr"] = this.validateSurname(value).error;
        if (ele === "password")
            error["passwordErr"] = this.validatePassword(value).error;
        if (ele === "passwordConf")
            error["passwordConfErr"] = this.validatePasswordConf(this.state.password, value).error;
        if (ele === "emailId")
            error["emailIdErr"] = this.validateEmailId(value).error;
        if (ele === "dob")
            error["dobErr"] = this.validateDob(value).error;
        if (ele === "phoneNumber")
            error["phoneNumberErr"] = this.validatePhoneNumber(value).error;
        this.setState({ formErrors: error })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let userByPhone;
        if (this.handleFormValidation()) {
            this.setState({ formErrors: {} })
            
            let promise = axios.get("/users.json")
                .then(response => {
                    let isExist = false;
                    if (response.data !== null) {
                        let keys = Object.keys(response.data);
                        for (let i = 0; i < keys.length; i++) {
                            if (response.data[keys[i]].phoneNumber === this.state.phoneNumber) {
                                isExist = true;
                                break;
                            }
                        }
                    }
                    if (response.data === null) {
                        isExist = false;
                    }
                    if (isExist) {
                        let formERror = this.state.formErrors;
                        if (response.data)
                            formERror["phoneNumberErr"] = "Phone number is already in use";
                        this.setState({ formErrors: formERror });

                    }
                    userByPhone = isExist;
                    return response.data;

                });
            Promise.all([ promise])
                .then(value => {
                    if (!userByPhone && !this.state.formErrors["phoneNumberErr"]) {
                        this.createUser()
                            .then(response => {
                                if (response.message) {
                                    let formERror = this.state.formErrors;
                                    formERror["emailIdErr"] = response.message;
                                    this.setState({ formErrors: formERror });
                                } else {
                                    firebase.auth().currentUser.sendEmailVerification({url: process.env.REACT_APP_HOME});
                                    alert("Account registered. Please click link in sent to your email to activate.");
                                    this.props.history.push("/");
                                }
                            })
                    }
                })

        }
    }
    handleKeyUp = () => {
        // eslint-disable-next-line
        this.setState({ dob: this.state.dob.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '') });
    }

    render() {

        const { nameErr, surnameErr, emailIdErr, dobErr, phoneNumberErr, passwordErr,
            passwordConfErr } = this.state.formErrors;
        if (this.props.isLoggedIn) {
            this.props.history.push("/")
        }
        return (<div className={classes.Wrapper}>
            <div className="formDiv">
                <h3 style={{ textAlign: "center" }} >Registration Form </ h3>
                <div>
                    <form className={classes.Form} onSubmit={this.handleSubmit}>
                        <div>
                            <label className={classes.Label} htmlFor="name">Name</label>
                            <input type="text" name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                placeholder="Your name.."
                                className={classes.Text} />
                            {nameErr &&
                                <div className={classes.ErrorText}>{nameErr}</div>
                            }

                        </div>
                        <div>
                            <label className={classes.Label} htmlFor="surname">Surname</label>
                            <input type="text" name="surname"
                                value={this.state.surname}
                                onChange={this.handleChange}
                                placeholder="Your Surame.."
                                className={classes.Text} />
                            {surnameErr &&
                                <div className={classes.ErrorText}>{surnameErr}</div>
                            }

                        </div>

                        <div>
                            <label className={classes.Label} htmlFor="emailId">Email</label>
                            <input type="text" name="emailId"
                                value={this.state.emailId}
                                onChange={this.handleChange}
                                placeholder="Your email id.."
                                className={classes.Text} />
                            {emailIdErr &&
                                <div className={classes.ErrorText}>{emailIdErr}</div>
                            }

                        </div>
                        <div>
                            <label className={classes.Label} htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" name="phoneNumber"
                                onChange={this.handleChange}
                                value={this.state.phoneNumber}
                                size="11" maxLength="11"
                                placeholder="Your phone number.."
                                className={classes.Text} />
                            {phoneNumberErr &&
                                <div className={classes.ErrorText}>{phoneNumberErr}</div>
                            }
                        </div>
                        <div>
                            <label className={classes.Label} htmlFor="dob">Birth Date</label>
                            <span htmlFor="dob">Birth Date</span>
                            <input type="text" name="dob"
                                value={this.state.dob}
                                size="10" maxLength="10" onKeyUp={this.handleKeyUp}
                                onChange={this.handleChange}
                                placeholder="dd/mm/yyyy"
                                className={classes.Date} />
                            {dobErr &&
                                <div className={classes.ErrorText}>{dobErr}</div>
                            }
                        </div>

                        <div>
                            <label className={classes.Label} htmlFor="password">Password</label>
                            <input type="password" name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Password.."
                                className={classes.Password} />
                            {passwordErr &&
                                <div className={classes.ErrorText}>{passwordErr}</div>
                            }

                        </div>

                        <div>
                            <label className={classes.Label} htmlFor="passwordConf">Confirm Password</label>
                            <input type="password" name="passwordConf"
                                value={this.state.passwordConf}
                                onChange={this.handleChange}
                                placeholder="Re-password"
                                className={classes.Password} />
                            {passwordConfErr &&
                                <div className={classes.ErrorText}>{passwordConfErr}</div>
                            }

                        </div>
                        <input onClick={() => this.props.history.push("/")}
                            className={classes.Button}
                            type="button" value="Cancel" />
                        <input type="submit" value="Submit" className={classes.Submit} />
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

export default connect(mapstateToProps)(Signup);