import React, { Component } from "react";
import './ToBank.module.css'
import classes from "./ToBank.module.css";
import axios from '../../../axios-paystack';;
class ToBank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Olusegun Akintimehin",
            amount: '300',
            account: "0125732236",
            bank: '058',
            savedBank: '',
            formErrors: {},
            config: {},
            apiError: {}
        };

        this.initialState = this.state;
    }

    handleFormValidation() {
        const { name, amount, account, bank, savedBank } = this.state;
        let formErrors = {};
        let formIsValid = true;

        //Name   
        if (!name) {
            formIsValid = false;
            formErrors["nameErr"] = "Name id is required.";
        }

        if (!account) {
            formIsValid = false;
            formErrors["accountErr"] = "Account number is required.";
        }

        //Amount    
        if (!amount) {
            formIsValid = false;
            formErrors["amountErr"] = "Amount is required.";
        }
        else {
            if (Number(amount) <= 0) {
                formIsValid = false;
                formErrors["amountErr"] = "Please enter value greater than  0";
            }
            if (Number(amount) > this.props.funds) {
                formIsValid = false;
                formErrors["amountErr"] = "Withrawal amount is more than your funds. correct";

            }

        }
        //Bank
        if (bank === '' || bank === "select") {
            formIsValid = false;
            formErrors["bankErr"] = "Select bank.";
        }
        this.setState({ formErrors: formErrors });

        //Bank
        if (savedBank === '' || savedBank === "select") {
            formIsValid = false;
            formErrors["savedBankErr"] = "Select bank.";
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
    handleSubmit2 = (e) => {
        e.preventDefault();
        if (this.handleFormValidation()) {
            alert('You have been successfully registered.')
            // this.setState(this.initialState)
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const receipntData = {
            type: "nuban",
            name: this.state.name,
            account_number: this.state.account,
            bank_code: this.state.bank,
            currency: "NGN"
        }
        const params = "account_number=" + this.state.account + "&bank_code=" + this.state.bank;
        if (this.state.amount <= this.props.funds && this.state.amount > 0) {
            axios.get("bank/resolve?" + params)
                .then(response => {
                    if (response.data.message === "Account number resolved") {
                        axios.post("transferrecipient", receipntData)
                            .then(response => {
                                if (response.data.message === "Transfer recipient created successfully") {
                                    return response.data.data;
                                }
                            })
                            .then(value => {
                                const paymentData = {
                                    source: "balance",
                                    amount: this.state.amount* 100,
                                    recipient: value.recipient_code,
                                    reason: "Returns from BetSoka account"
                                }
                                console.log(paymentData);

                                axios.post("transfer", paymentData)
                                    .then(response => {
                                        if (response.data.status === "success") {
                                            console.log("your withdrawal was successful")
                                            this.props.debitFunds(this.state.amount);
                                        }
                                    })
                                    .catch(error => {
                                        this.setState({ apiError: error })
                                    })
                            })
                            .catch(error => {
                                this.setState({ apiError: error })
                            });
                    }
                })
                .catch(error => {
                    this.setState({ apiError: error })
                });
        }
        if (this.handleFormValidation()) {
            alert('Withdraw successful. Funds wull be received within 24 hours.')
            // this.setState(this.initialState)
        }
    }


    render() {

        const { nameErr, amountErr, accountErr, bankErr, savedBankErr } = this.state.formErrors;
        // const reference = '' + Math.floor((Math.random() * 1000000000) + 1);
        return (
            <div className={classes.ToBankWrapper}>
                <div>
                    <form onSubmit={this.handleSubmit2}>
                        <select name="bank"
                            value={this.state.savedBank}
                            onChange={this.handleChange}
                            className={savedBankErr ? ' showError' : ''} >
                            <option value="select">User an exisitng bank</option>
                            <option value="058">023948362354</option>
                            <option value="zenith">08234634324</option>
                            <option value="echoCode">09237473264</option>
                        </select>
                    </form>
                </div>
                <div className="formDiv">
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label className={classes.label} htmlFor="amount">Amount</label>
                                <input type="number" name="amount"
                                    onChange={this.handleChange}
                                    value={this.state.amount}
                                    placeholder="Amount: 100 Naira minimum"
                                    className={amountErr ? ' showError' : ''} />
                                {amountErr &&
                                    <div style={{ color: "red" }}>{amountErr}</div>
                                }
                            </div>

                            <div>
                                <label className={classes.label} htmlFor="name">Name</label>
                                <input type="text" name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    placeholder="Name: as in bank"
                                    className={nameErr ? ' showError' : ''} />
                                {nameErr &&
                                    <div style={{ color: "red" }}>{nameErr}</div>
                                }

                            </div>


                            <div>
                                <label className={classes.label} htmlFor="name">Bank:</label>
                                <label className={classes.label2} htmlFor="name">Bank:</label>

                                <select name="bank"
                                    value={this.state.bank}
                                    onChange={this.handleChange}
                                    className={bankErr ? ' showError' : ''} >
                                    <option value="select">--Select--</option>
                                    <option value="058">Guaranty Trust Bank</option>
                                    <option value="zenith">Zenith Bank</option>
                                    <option value="echoCode">Eco bank</option>
                                </select>
                                {bankErr &&
                                    <div style={{ color: "red", paddingBottom: 10 }}>{bankErr}</div>
                                }
                            </div>
                            <div>
                                <label className={classes.label} htmlFor="name">Account</label>
                                <input type="number" name="account"
                                    value={this.state.account}
                                    onChange={this.handleChange}
                                    placeholder="Account Number"
                                    className={accountErr ? ' showError' : ''} />
                                {accountErr &&
                                    <div style={{ color: "red" }}>{accountErr}</div>
                                }

                            </div>
                            <div className={classes.Buttons}>
                                <div>
                                    <button className={classes.Button1}
                                    >Store Details</button>
                                </div>
                                <input type="submit" className={classes.Submit}
                                    value="Withdraw" />
                            </div>
                        </form>
                    </div>
                </div>

            </div >
        )
    }
}

export default ToBank;