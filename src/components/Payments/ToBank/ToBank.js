import React, { Component } from "react";
import './ToBank.module.css'
import classes from "./ToBank.module.css";
import axios from '../../../axios-paystack';
import DeleteBankDetail from "./DeleteBankDetail/DeleteBankDetail";
import SignupModal from "../../UI/SignupModal/SignupModoal";
import { Spinner } from "react-bootstrap";
import firebase from '../../../config/firebase/firebase';
import * as actions from '../../../store/actions/index';
import { connect } from "react-redux";
import ConfirmPassword from '../ToBank/ConfirmPassword/ConfirmPassword';
import Modal from '../../UI/Modal/Modal';
import { Button } from 'react-bootstrap';

class ToBank extends Component {
    state = {
        name: "",
        amount: '',
        account: "",
        bank: '',

        funds: 0,
        formErrors: {},
        config: {},
        apiError: '',
        saveError: '',
        showUpdate: '',
        checkMessage: '',
        showReSigninForm: false,
        isWithDraw: false,
        loding: false,
    }
    componentDidMount() {
        if (!this.state.loading) {
            this.props.onFetchBanks();
            this.setState({ funds: this.props.user.funds })
        }
        this.setState({ loading: true })
    }
    validateAccount(account) {
        let formIsValid = true;
        let error = "";
        //Account
        if (!account) {
            formIsValid = false;
            error = "Account number is required.";
        }

        return { isValid: formIsValid, error: error }
    }
    validateAmount(amount) {
        let formIsValid = true;
        let error = "";
        if (!amount) {
            formIsValid = false;
            error = "Amount is required.";
        }
        else {
            if (Number(amount) < 500) {
                formIsValid = false;
                error = "Minimum amount allowed is 500";
            }
            if (Number(amount) > this.state.funds) {
                formIsValid = false;
                error = "Withrawal amount is more than your funds. correct";

            }

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

    handleFormValidation() {
        const { amount, account, bank } = this.state;
        let formErrors = {};
        let formIsValid = true;

        // Account
        formIsValid = this.validateAccount(account).isValid && formIsValid;
        formErrors["accountErr"] = this.validateAccount(account).error;

        //Amount    
        formIsValid = this.validateAmount(amount).isValid && formIsValid;
        formErrors["amountErr"] = this.validateAmount(amount).error;
        //Bank
        formIsValid = this.validateBank(bank).isValid && formIsValid;
        formErrors["bankErr"] = this.validateBank(bank).error;

        this.setState({ formErrors: formErrors });

        this.setState({ formErrors: formErrors });

        return formIsValid;
    }


    saveBankValidation() {
        const { account, bank } = this.state;
        let formErrors = {};
        let formIsValid = true;
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
        if (name === "account") {
            value = value.replace(/[^0-9]+/, '');
            this.setState({ account: value });
        }
        const ele = document.activeElement.name;
        let error = {};
        if (ele === "account")
            error["accountErr"] = this.validateAccount(value).error;
        if (ele === "amount")
            error["amountErr"] = this.validateAmount(value).error;
        if (ele === "account")
            error["bankErr"] = this.validateBank(value).error;

        this.setState({ formErrors: error })

    }


    handlePaystackSuccessAction = (reference) => {
        firebase.database().onAuthStateChanged((user) => {
            if (user) {
                user.funds += this.state.amount;
                let updates = {};
                updates["users/" + user.uid] = user;
                firebase.database().ref().update(updates);
            }
        })
    };

    handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }
    handleSubmit2 = (e) => {
        e.preventDefault();

        let bankDetails = [...this.props.savedBanks];
        let cardTobeSaved = bankDetails.filter(detail => detail.accountNumber === e.target.value)[0];

        this.setState({ account: cardTobeSaved.accountNumber });
        this.setState({ bank: cardTobeSaved.bank });
        this.setState({ name: cardTobeSaved.accountName });

        this.setState({ savedAccountNumber: e.target.value });

        setTimeout(() => {
            this.saveBankValidation();
        }, 100);
            this.setState({checkMessage: ""});
    }
    handleWithdraw = () => {
        const receipntData = {
            type: "nuban",
            name: this.state.name,
            account_number: this.state.account,
            bank_code: this.state.bank,
            currency: "NGN"
        }
        const params = "account_number=" + this.state.account + "&bank_code=" + this.state.bank;
        if (this.state.amount <= this.state.funds && this.state.amount > 0) {
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
                                            let userId = firebase.auth().currentUser.uid;
                                            let userRef = firebase.database().ref("users").child(userId);
                                            userRef.child('funds').transaction((funds) => {
                                                this.props.onSetFunds(funds - Number(this.state.amount))
                                                return funds - Number(this.state.amount)
                                            })

                                            alert(`${response.data.message}. Funds wull be received within 24 hours.`)
                                        }
                                    })
                                    .catch(error => {
                                        this.setState({ apiError: error, saveError: '' });
                                    })
                            })
                            .catch(error => {
                                this.setState({ apiError: error, saveError: '' });

                            });
                    }
                })
                .catch(error => {
                    this.setState({ apiError: error, saveError: '' })

                });
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let bankDetail = [...this.props.savedBanks];

        if (this.handleFormValidation()) {
            let BankExist = bankDetail.find(detail => detail.accountNumber === this.state.account);
            if (BankExist) {
                this.handleWithdraw();
            } else {
                this.setState({ showReSigninForm: true });
                this.setState({ isWithDraw: true })
            }

        }
    }
    handleSaveHandler = (e) => {
        e.preventDefault();
        let bankDetail = [...this.props.savedBanks];

        if (this.saveBankValidation()) {
            let BankExist = bankDetail.find(detail => detail.accountNumber === this.state.account);
            if (BankExist) {
                alert("Account already saved");
            } else {
                this.setState({ showReSigninForm: true });
            }

        }
    }

    checkBankAccount = (e) => {
        e.preventDefault();
        let account = this.state.account;
        let bank = this.state.bank;

        if (account && bank !== 'select') {
            this.setState({ name: '' })
            const params = "account_number=" + account + "&bank_code="
                + bank;
            axios.get("bank/resolve?" + params)
                .then(response => {
                    this.setState({ name: response.data.data.account_name });
                    this.setState({ checkMessage: 'Account Found' })
                })
                .catch(err => {
                    this.setState({ checkMessage: 'Account Not Found' })
                })
        } else {
            this.setState({ saveError: "Please enter: bank and account to proceed", apiError: '' });
        }
    }

    HandleSave = () => {
        let bankDetail = [...this.props.savedBanks];
        let account = this.state.account;
        let bank = this.state.bank;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                if (account && bank !== 'select') {
                    let BankExist = bankDetail.find(detail => detail.accountNumber === account);
                    if (!BankExist) {
                        const params = "account_number=" + account + "&bank_code="
                            + bank;
                        axios.get("bank/resolve?" + params)
                            .then(response => {
                                if (response.data.message === "Account number resolved") {
                                    const accountDetail = { accountName: response.data.data.account_name, bank: bank, accountNumber: account }
                                    firebase.database().ref('bank-accounts/' + user.uid + "/" + accountDetail.accountNumber).set(
                                        accountDetail
                                    );
                                    var accountRef = firebase.database().ref('bank-accounts/' + user.uid);
                                    accountRef.on('value', (snapshot) => {
                                        const data = snapshot.val();
                                        this.props.onResetSavedBanks(data);
                                    });
                                    this.setState({ saveError: '', apiError: '' })
                                    alert("Bank details saved!");
                                    setTimeout(() => {
                                        window.location.reload(false);
                                    }, 2500);
                                } else {
                                    this.setState({ saveError: "Please check your card details", apiError: '' })

                                }
                            })
                            .catch(error => {
                                this.setState({ saveError: "Please check your card details", apiError: '' })

                            })


                    } else {
                        this.setState({ saveError: "That bank detail already exists", apiError: '' });
                    }
                } else {
                    this.setState({ saveError: "Please enter: valid name, bank and account to proceed", apiError: '' });
                }
            } else {
                // No user is signed in.
                // alert("please login")
            }
        })

    }

    setShowUpdate = (value) => {
        this.setState({ showUpdate: value })
    }

    render() {
        const { amountErr, accountErr, bankErr } = this.state.formErrors;
        const banks = [classes.Banks];
        if (bankErr) {
            banks.push(classes.showError);
        }
        const banksExist = [classes.BanksExist];
        let bankDetails;
        let options;
        let banksallowed;
        let optionsAllowed;
        if (this.state.loading) {
            bankDetails = [...this.props.savedBanks];
            options = bankDetails.sort((a, b) => a.accountNumber < b.accountNumber ? 1 : -1)
                .map((detail, i) => (
                    <option key={i} value={detail.accountNumber}>{detail.accountNumber}</option>
                ));

            banksallowed = [...this.props.allowedBanks];

            optionsAllowed = banksallowed.sort((a, b) => a.bankName > b.bankName ? 1 : -1)
                .map((detail, i) => (
                    <option key={i} value={detail.bankCode}>{detail.bankName}</option>
                ));

        }
        return (
            <div className={classes.ToBankWrapper}>
                {this.state.showReSigninForm ? <Modal show={this.state.showReSigninForm}><ConfirmPassword
                    handleWithdraw={this.handleWithdraw} isWithDraw={this.state.isWithDraw}
                    cancel={() => this.setState({ showReSigninForm: false })} HandleSave={this.HandleSave} /></Modal> : null}
                {this.state.showUpdate ? <SignupModal show={this.state.showUpdate}>
                    <DeleteBankDetail showUpdate={() => this.setState({ showUpdate: false })}
                    name={this.state.name} bank={this.state.bank} account={this.state.account}
                    allowedBanks={this.props.allowedBanks} savedBanks={this.props.savedBanks}
                    setShowUpdate={this.setShowUpdate} /></SignupModal> :
                    this.state.loading ? <div className="formDiv">
                        <div>
                            {this.state.apiError ? <div style={{ color: 'red', fontSize: '20px' }}>Please check your bank details</div> : null}

                            <form onSubmit={this.handleSubmit}>
                                <select name="savedAccountNumber"
                                    value={this.state.savedAccountNumber}
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

                                        placeholder="Amount: 500 Naira minimum"
                                        className={classes.Number} />
                                    {amountErr &&
                                        <div style={{ color: "red" }}>{amountErr}</div>
                                    }
                                </div>

                                <div>
                                    <label className={classes.label} htmlFor="bank">Bank:</label>
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
                                    <input type="text" name="account"
                                        value={this.state.account}
                                        onChange={this.handleChange}
                                        maxLength="10"
                                        placeholder="Account Number"
                                        className={classes.Number} />
                                    {accountErr &&
                                        <div style={{ color: "red" }}>{accountErr}</div>
                                    }
                                    {this.state.saveError ? <div style={{ color: 'red', fontSize: '20px' }}>{this.state.saveError}</div> : null}
                                </div>
                                <div className={classes.Verify}>
                                    <div className={classes.VerifyButton}><Button variant="info" onClick={this.checkBankAccount}>Verify Account Details</Button></div>
                                    <div className={this.state.checkMessage.includes("Not") ? classes.RedMsg : classes.NormalMsg} >{this.state.checkMessage}</div>
                                </div>

                                <div>
                                    <label className={classes.label} htmlFor="name">Name</label>
                                    <input type="text" name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        disabled={true}
                                        placeholder="Your Name: will appear here"
                                        className={classes.Text} />
                                </div>
                                {this.state.name ?
                                    <div className={classes.Buttons}>
                                        <button type="button" onClick={this.handleSaveHandler} className={classes.Button1}
                                        >Save</button>
                                        {this.state.name && this.state.bank !== "select" && this.state.account ?
                                            <button type="button" className={classes.Button2}
                                                onClick={() => this.setShowUpdate(true)}
                                            >Delete</button> : null}

                                        <input type="submit" className={classes.Submit}
                                            value="Withdraw" />
                                    </div>
                                    : null}
                            </form>
                        </div>
                    </div>
                        : <Spinner />
                }
            </div >

        )

    }
}

const mapStateToProps = (state) => {
    return {
        savedBanks: state.banks.savedBanks,
        allowedBanks: state.banks.allowedBanks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchBanks: () => dispatch(actions.fetchBanks()),
        onResetSavedBanks: (payload) => dispatch(actions.resetSavedBanks(payload)),
        onSetFunds: (funds) => dispatch(actions.setFunds(funds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToBank);