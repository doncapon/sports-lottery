import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import classes from './forgotPassword.module.css';
import Modal from '../../UI/Modal/Modal';
import firebase from '../../../config/firebase/firebase';

const ForgotPassword = (props) => {
    const [showModal, setShowModal] = useState(true);
    const [emailId, setEmail] = useState('');
    const [emailIdErr, setEmailErr] = useState('');
    props.onSetIsLoggedIn(false);
    let history = useHistory();

    const handleFormValidationEmail = () => {
        let formErrors = '';
        let formIsValid = true;
        //Email    
        if (!emailId) {
            formIsValid = false;
            formErrors = "Email id is required.";
        }
        else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailId))) {

            formIsValid = false;
            formErrors = "Invalid email id.";
        }

        setEmailErr(formErrors);
        return formIsValid;
    }
    const forgetRedirect=()=>{
        setShowModal(false);
        history.push("/");
    }
    const handleSubmitEmail = (e) => {
        e.preventDefault();

        if (handleFormValidationEmail()) {
            var auth = firebase.auth();
            auth.sendPasswordResetEmail(emailId, {url: process.env.REACT_APP_HOME}).then(() => {
              // Email sent.
              setShowModal(false);
              history.push("/");
              alert("A reset link has been sent to your email.")
            }).catch(function(error) {
              // An error happened.
            });
        }

    }
    const Email = [classes.Email];
        if(emailIdErr)
        {Email.push(classes.showError)}
    return (
        <Modal show={showModal} modalClosed={forgetRedirect} >
            <div className={classes.PasswordWrapper}>
                <h5>Request password!</h5>
                    <div className="formDiv">
                        <div>
                            <div className={classes.formText}>Enter your email: </div>
                            <form onSubmit={(e) => handleSubmitEmail(e)}>
                                <div className= {classes.EmailWrapper}>
                                    <label htmlFor="emailId">Email</label>
                                    <input type="text" name="emailId"
                                        value={emailId}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email id.."
                                        className={Email.join(" ")}
                                        />
                                    {emailIdErr &&
                                        <div className={classes.ErrorText}>{emailIdErr}</div>
                                    }

                                </div>
                                <div className={classes.Buttons}>
                                    <button type="button" onClick={forgetRedirect} className={classes.Button1}
                                    >Cancel</button>
                                    <button type="submit" className={classes.Submit}
                                        >Submit </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div> 
    
        </Modal>);
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSetIsLoggedIn: (value) => dispatch(actions.setIsLoggedIn(value)),
    }
}
export default connect(null, mapDispatchToProps)(ForgotPassword);