import React, { Component } from "react";
import './ToWallet.module.css'
import { PaystackButton } from 'react-paystack';
class ToWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            amount: '',
            formErrors: {},
            config: {}
        };

        this.initialState = this.state;
    }

    handleFormValidation() {
        const { emailId, amount } = this.state;
        let formErrors = {};
        let formIsValid = true;

        //Email    
        if (!emailId) {
            formIsValid = false;
            formErrors["emailIdErr"] = "Email id is required.";
        }
        else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailId))) {

            formIsValid = false;
            formErrors["emailIdErr"] = "Invalid email id.";
        }

        //Phone number    
        if (!amount) {
            formIsValid = false;
            formErrors["amountErr"] = "Phone number is required.";
        }
        else {
            if (amount < 0) {
                formIsValid = false;
                formErrors["amountErr"] = "Amount cannot be less than zero";
            }
            if(amount %1 !== 0){
                formErrors["amountErr"] = "No decimals allowed, remove dot(.)";

            }
        }
        this.setState({ formErrors: formErrors });
        return formIsValid;
    }

    handleChange = (e) => {
        let { name, value } = e.target;
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

        const { emailIdErr, amountErr } = this.state.formErrors;
        const reference = '' + Math.floor((Math.random() * 1000000000) + 1);
        return (
            <div className="formDiv">
                <div>
                    <form onSubmit={this.handleSubmit}>

                        <div>
                            <label htmlFor="emailId">Email</label>
                            <input type="text" name="emailId"
                                value={this.state.emailId}
                                onChange={this.handleChange}
                                placeholder="Email Address"
                                className={emailIdErr ? ' showError' : ''} />
                            {emailIdErr &&
                                <div style={{ color: "red" }}>{emailIdErr}</div>
                            }

                        </div>

                        <div>
                            <label htmlFor="amount">Amount</label>
                            <input type="number" name="amount"
                                onChange={this.handleChange}
                                value={this.state.amount}
                                placeholder="Amount"
                                className={amountErr ? ' showError' : ''} />
                            {amountErr &&
                                <div style={{ color: "red" }}>{amountErr}</div>
                            }
                        </div>
                       
                    </form>
                </div>
                <PaystackButton
                    reference={reference}
                    email={this.state.emailId}
                    amount={this.state.amount * 100}
                    publicKey={'pk_test_6de1def8442e2f2447e3f88367518f797f5360af'}
                    text={'Pay Here'}
                    onSuccess={() => this.handlePaystackSuccessAction(reference)}
                    onClose={this.handlePaystackCloseAction} />
            </div >
        )
    }
}

export default ToWallet;