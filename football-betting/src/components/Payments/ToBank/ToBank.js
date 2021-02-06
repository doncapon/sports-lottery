import React, { Component } from "react";
import './ToBank.module.css'
import classes from "./ToBank.module.css";
import axios from '../../../axios-paystack'; import UpdateBankDetail from "./updateBankDetail/updateBankDetail";
import SignupModal from "../../UI/SignupModal/SignupModoal";
class ToBank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            amount: '',
            account: "",
            bank: '',
            savedBankDetails: [
                { name: '', account: "Use an exisitng bank", bank: '' },
                { name: 'Olusegun Akintimehin', account: "0125732236", bank: '058' },
                { name: 'akintigbola', account: "02374736264", bank: 'zenith' },
            ],

            allowedBanks: [
                { name: '--Select Bank--', value: 'select' },
                { name: 'Guaranty Trust Bank', value: '058' },
                { name: 'Zenith Bank', value: 'zenith' },
                { name: 'Eco bank', value: 'echoCode' },
            ],
            formErrors: {},
            config: {},
            apiError: '',
            saveError: '',
            showUpdate: ''
        };

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


    saveBankValidation() {
        const { name, account, bank } = this.state;
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

        let bankDetails = [...this.state.savedBankDetails];
        let cardTobeSaved = bankDetails.filter(detail => detail.account === e.target.value)[0];

        this.setState({ account: cardTobeSaved.account });
        this.setState({ bank: cardTobeSaved.bank });
        this.setState({ name: cardTobeSaved.name });
        setTimeout(() => {
            this.saveBankValidation();
        }, 500);
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
                                            this.setState({ apiError: error });
                                        })
                                })
                                .catch(error => {
                                    this.setState({ apiError: error });

                                });
                        }
                    })
                    .catch(error => {
                        this.setState({ apiError: error })

                    });
            }
        }
    }
    HandleSave = () => {
        let bankDetail = [...this.state.savedBankDetails];
        if (this.state.name && this.state.bank && this.state.account !== 'select') {
            let BankExist = bankDetail.find(detail => detail.account === this.state.account);
            if (BankExist === null) {
                const params = "account_number=" + this.state.account + "&bank_code="
                    + this.state.bank;
                axios.get("bank/resolve?" + params)
                    .then(response => {
                        if (response.data.message === "Account number resolved") {

                            bankDetail.splice(bankDetail.length, bankDetail.length + 1,
                                { name: this.state.name, account: this.state.account, bank: this.state.bank });
                            this.setState({ saveError: '' })
                            this.setState({ savedBankDetails: bankDetail })
                            alert("Bank details saved!");
                        }
                    })
                    .catch(error => {
                        this.setState({ saveError: "Please check your card details" })

                    })


            } else {
                this.setState({ saveError: "Taht bank detail already exists" });
            }
        } else {
            this.setState({ saveError: "Please enter: name, bank and account to proceed" });

        }

    }
    setShowUpdate=(value)=>{
        this.setState({showUpdate: value})
    }
    render() {

        const { nameErr, amountErr, accountErr, bankErr } = this.state.formErrors;
        const banks = [classes.Banks];
        if (bankErr) {
            banks.push(classes.showError);
        }
        const banksExist = [classes.BanksExist];

        let bankDetails = [...this.state.savedBankDetails];
        let options = bankDetails.map((detail, i) => (
            <option key={i} value={detail.account}>{detail.account}</option>
        ));

        let banksallowed = [...this.state.allowedBanks];
        let optionsAllowed = banksallowed.map((detail, i) => (
            <option key={i} value={detail.value}>{detail.name}</option>
        ));

        return (
            <div className={classes.ToBankWrapper}>
                {this.state.showUpdate ? <SignupModal show={this.state.showUpdate}><UpdateBankDetail 
                name= {this.state.name} bank = {this.state.bank} account ={this.state.account}
                setShowUpdate = {this.setShowUpdate} /></SignupModal> :
                    <div className="formDiv">
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <select name="savedBankDetails"
                                    value="Use an exisitng bank"
                                    onChange={this.handleSubmit2}
                                    multiple={false}
                                    className={banksExist.join(" ")} >
                                    {options}

                                </select>
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
                                        {optionsAllowed}
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
                                    {this.state.apiError ? <div style={{ color: 'red' }}>Please check your bank details</div> : null}
                                    {this.state.saveError ? <div style={{ color: 'red' }}>{this.state.saveError}</div> : null}

                                </div>
                                <div className={classes.Buttons}>
                                    <div className={classes.ButtonInner}>
                                        <button type="button" onClick={this.HandleSave} className={classes.Button1}
                                        >Save</button>

                                        <button type="button" className={classes.Button2}
                                            onClick={() => this.setShowUpdate(true)}
                                        >Update / Delete</button>
                                    </div>
                                    <input type="submit" className={classes.Submit}
                                        value="Withdraw" />
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div >

        )
    }
}

export default ToBank;