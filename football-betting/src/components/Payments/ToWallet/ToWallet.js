import React, { Component } from "react";
import './ToWallet.module.css'
import { PaystackButton } from 'react-paystack';
import classes from "./ToWallet.module.css";
class ToWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            amount: '',
            emailError : '',
            amountErr: '',
            config: {}
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
            if (amount < 100) {
                formIsValid = false;
                amountErr = "Minimum amount is 100 Naira";
            }
            if(amount %1 !== 0){
                amountErr= "No decimals allowed, remove dot(.)";

            }
        }
        this.setState({ amountErr: amountErr });
        return formIsValid;
    }

    handleChangeEmail = (e) => {
        e.preventDefault();
        
        let { name, value } = e.target;
        this.handleFormValidationEmail(value)

        this.setState({ [name]: value });
    }
    handleChangeAmount = (e) => {
        e.preventDefault();
        
        let { name, value } = e.target;
        this.handleFormValidationAmount(value)
        this.setState({ [name]: value });
    }

    handlePaystackSuccessAction = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        this.props.creditFunds(Number(this.state.amount));
        console.log(reference);
    };

    handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    render() {
        
        const  emailIdErr = this.state.emailError;
        const  amountErr = this.state.amountErr;
        const reference = '' + Math.floor((Math.random() * 1000000000) + 1);
        return (
            <div className="formDiv">
                <div>
                    <form>

                        <div>
                            <label className={classes.label} htmlFor="emailId">Email</label>
                            <input type="text" name="emailId"
                                value={this.state.emailId}
                                onChange={this.handleChangeEmail}
                                placeholder="Email Address"
                                className={emailIdErr ? ' showError' : ''} />
                            {emailIdErr &&
                                <div className={classes.Error} style={{ color: "red" }}>{emailIdErr}</div>
                            }

                        </div>

                        <div>
                            <label className={classes.label} htmlFor="amount">Amount</label>
                            <input type="number" name="amount"
                                onChange={this.handleChangeAmount}
                                value={this.state.amount}
                                placeholder="Amount 100 Naira minimum"
                                className={amountErr ? ' showError' : ''} />
                            {amountErr &&
                                <div  className={classes.Error} style={{ color: "red" }}>{amountErr}</div>
                            }
                        </div>
                    
                    </form>
                </div>
                <PaystackButton className={classes.Button}
                    reference={reference}
                    email={this.state.emailId}
                    amount={this.state.amount * 100}
                    publicKey={process.env.REACT_APP_PAYSTACT_PUBLIC_KEY}
                    text={'Pay Here'}
                    onSuccess={() => this.handlePaystackSuccessAction(reference)}
                    onClose={this.handlePaystackCloseAction} />
            </div >
        )
    }
}

export default ToWallet;