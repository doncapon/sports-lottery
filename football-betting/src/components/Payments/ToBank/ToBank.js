import React, { Component } from "react";
import './ToBank.module.css'
import classes from "./ToBank.module.css";
import axios from '../../../axios-paystack';;
class ToBank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Olusegun Akintimehin",
            amount: '500',
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
        const { name, amount, account, bank } = this.state;
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
            if (Number(amount) < 500) {
                formIsValid = false;
                formErrors["amountErr"] = "Minimum amount allowed is 500";
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
    };

    handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }
    handleSubmit2 = (e) => {
        e.preventDefault();
        this.handleChange(e);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.handleFormValidation()) {

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
                                        amount: "" + this.state.amount * 100,
                                        recipient: value.recipient_code,
                                        reason: "Returns from BetSoka account"
                                    };
                                    axios.post("transfer", paymentData)
                                        .then(response => {
                                            if (response.data.data.status === "success") {
                                                this.props.debitFunds(this.state.amount);
                                                alert(`${response.data.message}. Funds wull be received within 24 hours.`)

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
        }
    }


    render() {

        const { nameErr, amountErr, accountErr, bankErr } = this.state.formErrors;
        const banks = [classes.Banks];
        if (bankErr) {
            banks.push(classes.showError);
        }
        const banksExist = [classes.BanksExist];


        return (
            <div className={classes.ToBankWrapper}>
                <div>
                    <form>
                        <select name="savedBank"
                            value={this.state.savedBank}
                            onChange={this.handleSubmit2}
                            className={banksExist.join(" ")} >
                            <option value="select">Use an exisitng bank</option>
                            <option value="050988">023948362354</option>
                            <option value="097654">08234634324</option>
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
                                    className={classes.Number} />
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
                                    className={classes.Text} />
                                {nameErr &&
                                    <div style={{ color: "red" }}>{nameErr}</div>
                                }

                            </div>


                            <div>
                                <label className={classes.label} htmlFor="name">Bank:</label>
                                <select name="bank"
                                    value={this.state.bank}
                                    onChange={this.handleChange}
                                    className={banks.join(" ")} >
                                    <option value="select">--Select Bank--</option>
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
                                    className={classes.Number} />
                                {accountErr &&
                                    <div style={{ color: "red" }}>{accountErr}</div>
                                }

                            </div>
                            <div className={classes.Buttons}>
                                <div className={classes.ButtonInner}>
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