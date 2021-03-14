import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import classes from './DeleteBankDetails.module.css';
import firebase from '../../../../config/firebase/firebase';

class DeleteBankDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            account: "",
            bank: '',

            allowedBanks: [],
            formErrors: {},
            config: {},
            apiError: '',
            saveError: '',
            showUpdate: '',
            loading: false

        }
    }

    componentDidMount() {
        if (!this.state.loading) {
            this.setState({ allowedBanks: this.props.allowedBanks });

            this.setState({ name: this.props.name });
            this.setState({ bank: this.props.bank });
            this.setState({ account: this.props.account });
        }
        this.setState({ loading: true });
    }
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
    validateBank(bank) {
        let formIsValid = true;
        let error = "";
        if (bank === '' || bank === "select") {
            formIsValid = false;
            error = "Select bank.";
        }

        return { isValid: formIsValid, error: error }
    }


    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });

        const ele = document.activeElement.name;
        let error = {};

        if (ele === "name")
            error["anameErr"] = this.validateName(value).error;
        if (ele === "account")
            error["bankErr"] = this.validateBank(value).error;

        this.setState({ formErrors: error })

    }

    handleDelete = (e) => {
        e.preventDefault();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let savedBanks = [...this.props.savedBanks];
                let account = savedBanks.filter(bank => bank.accountNumber === this.state.account)[0];

                if (account && account.accountName === this.state.name && account.bank === this.state.bank) {
                    let bankRef = firebase.database().ref('bank-accounts/' + user.uid + "/" + account.accountNumber);
                    bankRef.remove();
                } else {
                    alert("Account does not exist")
                }
                firebase.database().ref("bank-accounts").off();

                } else {
                alert("User is not logged in");
            }
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 2500);
    }

    render() {

        const { nameErr, accountErr, bankErr } = this.state.formErrors;
        const banks = [classes.Banks];
        if (bankErr) {
            banks.push(classes.showError);
        }

        let banksallowed;
        let optionsAllowed;
        if (this.state.loading) {
            banksallowed = [...this.state.allowedBanks];
            optionsAllowed = banksallowed.sort((a, b) => a.bankName > b.bankName ? 1 : -1).map((detail, i) => (
                <option key={i} value={detail.bankCode}>{detail.bankName}</option>
            ));
        }

        return (<div>
            {this.state.loading ?
                <form>
                    <h2>Delete bank</h2>
                    <div>
                        <label className={classes.label} htmlFor="name">Name</label>
                        <input type="text" name="name"
                            value={this.state.name}
                            disabled={true}
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
                            disabled={true}

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
                            disabled={true}
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
                            <button type="button" onClick={() => this.props.setShowUpdate(false)} className={classes.Button1}
                            >Cancel</button>

                            <button type="button" className={classes.Button2} onClick={this.handleDelete}
                            >Delete</button>
                        </div>
                    </div>
                </form> : <Spinner />}
        </div>);
    }
}

export default DeleteBankDetail;