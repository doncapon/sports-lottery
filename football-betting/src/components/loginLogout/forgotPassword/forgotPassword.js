import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import classes from './forgotPassword.module.css';
import Modal from '../../UI/Modal/Modal';
import axios  from "../../../axios-users";

const ForgotPassword = (props) => {
    const [showModal, setShowModal] = useState(true);
    const [emailId, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [emailIdErr, setEmailErr] = useState('');
    const { resetLink } = useParams();
    const [formErrors, setFormErrors] = useState({});
    props.onSetIsLoggedIn(false);
    const handleFormValidation = () => {
        const formErros1 = {};
        let formIsValid = true;
        //Passwod Validations   
        if (!password) {
            formIsValid = false;
            formErros1["passwordErr"] = "Password is required.";
        }

        if (password !== passwordConf || passwordConf === "") {
            formIsValid = false;

            formErros1["passwordConfErr"] = "Passwords dont match";
            if (passwordConf === "")
                formErros1["passwordConfErr"] = "Re-Password is required";
        }
        setFormErrors(formErros1);
        return formIsValid;
    }
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
    const handleSubmitEmail = (e) => {
        e.preventDefault();
  
        if (handleFormValidationEmail()) {
            const emailBody = {email: emailId}
            axios.put("forgot-password", emailBody)
            .then(response =>{
                alert(response.data.message)
            })
        }
     
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleFormValidation()) {
            alert("Check your email and clink the reset link")
        }
    }

    const { passwordErr, passwordConfErr } = formErrors;

    return (
        <Modal show={showModal} modalClosed={()=>{}} >
            <div className={classes.PasswordWrapper}>
                {!resetLink ? <div>
                    <div className="formDiv">
                        <div>
                            <div className={classes.formText}>Enter your email: </div>
                            <form onSubmit={(e) => handleSubmitEmail(e)}>
                                <div>
                                    <label htmlFor="emailId">Email</label>
                                    <input type="text" name="emailId"
                                        value={emailId}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email id.."
                                        className={emailIdErr ? ' showError' : ''} />
                                    {emailIdErr &&
                                        <div className={classes.ErrorText}>{emailIdErr}</div>
                                    }

                                </div>
                                <div className={classes.Buttons}>
                                    <button type="button" onClick={() => setShowModal(false)} className={classes.Button1}
                                    >Cancel</button>
                                    <input type="submit"
                                        value="Submit" />
                                </div>
                            </form>

                        </div>
                    </div>
                </div> :
                    <div>
                        <div className="formDiv">
                            <div>
                                <div className={classes.formText}>Set new Password </div>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password.."
                                            className={passwordErr ? ' showError' : ''} />
                                        {passwordErr &&
                                            <div className={classes.ErrorText} >{passwordErr}</div>
                                        }

                                    </div>
                                        {password !== '' ?
                                    <div>
                                        <label htmlFor="passwordConf">Confirm Password</label>
                                        <input type="password" name="passwordConf"
                                            value={passwordConf}
                                            onChange={(e) => setPasswordConf(e.target.value)}
                                            placeholder="Re-password"
                                            className={passwordConfErr ? ' showError' : ''} />
                                        {passwordConfErr &&
                                            <div className={classes.ErrorText}>{passwordConfErr}</div>
                                        }

                                    </div>
                                    :null}
                                    <div className={classes.Buttons}>
                                        <button type="button"  onClick={() => setShowModal(false)} className={classes.Button1}
                                        >Cancel</button>
                                        <input type="submit"
                                            value="Change" />
                                    </div>
                                </form>

                            </div>
                        </div>

                    </div>
                }
            </div>
        </Modal>);
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSetIsLoggedIn: (value) => dispatch(actions.setIsLoggedIn(value)),
    }
}
export default connect(null, mapDispatchToProps)(ForgotPassword);