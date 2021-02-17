import React, { Component } from "react";
import './ToWallet.module.css'
import { PaystackButton } from 'react-paystack';
import classes from "./ToWallet.module.css";
import firebase from '../../../config/firebase/firebase';
class ToWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            amount: '',
            emailError: '',
            amountErr: '',
            config: {},
            isTouched: false,
            loading: false
        };

        this.initialState = this.state;
    }

    handleFormValidationEmail(emailId) {

        let emailError = '';
        let formIsValid = true;

        //Email    
        if (!emailId) {
            formIsValid = false;
            emailError = "Email id is required.";
        }
        else if (!(/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i.test(emailId))) {

            formIsValid = false;
            emailError = "Invalid email id.";
        }

        this.setState({ emailError: emailError });
        return formIsValid;
    }
    handleFormValidationAmount(amount) {
        let amountErr = '';
        let formIsValid = true;


        //Amount
        if (!amount) {
            formIsValid = false;
            amountErr = "Amount is required.";
        }
        else {
            if (amount < 500) {
                formIsValid = false;
                amountErr = "Minimum amount is 500 Naira";
            }
            if (amount > 50000 && formIsValid) {
                formIsValid = false;
                amountErr = "Maximum amount is 50000 Naira";
            }
            if (amount % 1 !== 0 && formIsValid) {
                amountErr = "No decimals allowed, remove dot(.)";

            }
        }
        this.setState({ amountErr: amountErr });
        return formIsValid;
    }

    handleChangeEmail = (e) => {
        e.preventDefault();

        let { name, value } = e.target;
        this.handleFormValidationEmail(value)

        this.setState({ [name]: value, isTouched: true });
    }
    handleChangeAmount = (e) => {
        e.preventDefault();

        let { name, value } = e.target;
        this.handleFormValidationAmount(value)
        this.setState({ [name]: value, isTouched: true });

    }

    handlePaystackSuccessAction = (reference) => {
        let userId = firebase.auth().currentUser.uid;
        let userRef = firebase.database().ref("users").child(userId);
        userRef.child('funds').transaction((funds)=> {
            return funds+ Number(this.state.amount)
        })
    };

    handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }
    QuickPayHandler = (e) => {
        this.setState({ amount: e.target.innerHTML.split(" ")[1] })
        this.handleFormValidationAmount(e.target.innerHTML.split(" ")[1])
    }
    render() {

        const emailIdErr = this.state.emailError;
        const amountErr = this.state.amountErr;
        const reference = '' + Math.floor((Math.random() * 1000000000) + 1);
        return (
            <div className="formDiv">
                <form>
                    <div>
                        <label className={classes.label} htmlFor="emailId">Email</label>
                        <input type="text" name="emailId"
                            value={this.state.emailId}
                            onChange={this.handleChangeEmail}
                            placeholder="Email Address"
                            className={classes.Text} />
                        {emailIdErr &&
                            <div className={classes.Error} style={{ color: "red" }}>{emailIdErr}</div>
                        }

                    </div>
                    <div className={classes.QuickButtons}>
                        <div className={classes.TransferText}>Amount option:</div>
                        <button type="button" onClick={(e) => this.QuickPayHandler(e)} className={classes.Quick}>₦ 500</button>
                        <button type="button" onClick={(e) => this.QuickPayHandler(e)} className={classes.Quick}>₦ 1000</button>
                        <button type="button" onClick={(e) => this.QuickPayHandler(e)} className={classes.Quick}>₦ 5000</button>
                    </div>
                    <div>
                        <label className={classes.label} htmlFor="amount">Amount</label>
                        <input type="number" name="amount"
                            onChange={this.handleChangeAmount}
                            value={this.state.amount}
                            placeholder="Amount: 500 - 50000 "
                            className={classes.Number} />
                        {amountErr &&
                            <div className={classes.Error} style={{ color: "red" }}>{amountErr}</div>
                        }
                    </div>

                </form>
                {!emailIdErr && !amountErr && this.state.emailId && this.state.amount ?
                    <PaystackButton className={classes.Button}
                        reference={reference}
                        email={this.state.emailId}
                        amount={this.state.amount * 100}
                        publicKey={process.env.REACT_APP_PAYSTACT_PUBLIC_KEY}
                        text={'Pay Here'}
                        onSuccess={() => this.handlePaystackSuccessAction(reference)}
                        onClose={this.handlePaystackCloseAction} />
                    : null}
            </div >
        )
    }
}

export default ToWallet;