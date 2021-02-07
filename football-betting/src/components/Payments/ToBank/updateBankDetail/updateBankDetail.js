import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import classes from './updateBankDetail.module.css';

class UpdateBankDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            amount: '',
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

    saveBankValidation() {
        const { name, bank } = this.state;
        let formErrors = {};
        let formIsValid = true;

        //Name   
        if (!name) {
            formIsValid = false;
            formErrors["nameErr"] = "Name is required.";
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

    handleDelete = (e) => {
        e.preventDefault();
        if (this.saveBankValidation()) {

        }
    }
    handleUpdate = (e) => {
        e.preventDefault();
        if (this.saveBankValidation()) {

        }
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
            console.log(this.state.allowedBanks);
            banksallowed = [...this.state.allowedBanks];
            optionsAllowed = banksallowed.sort((a, b) => a.bankName > b.bankName ? 1 : -1).map((detail, i) => (
                <option key={i} value={detail.bankCode}>{detail.bankName}</option>
            ));
        }

        return (<div>
            {this.state.loading ?
                <form onSubmit={this.handleSubmit}>
                    <h2>Update or Delete bank</h2>
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
                        <input type="submit" className={classes.Submit} onClick={this.handleUpdate}
                            value="Update" />
                    </div>
                </form> : <Spinner />}
        </div>);
    }
}

export default UpdateBankDetail;