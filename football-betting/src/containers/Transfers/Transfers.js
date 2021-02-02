import React, { Component } from "react";
import classes from './Transfers.module.css';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import ToWallet from "../../components/Payments/ToWallet/ToWallet";
import ToBank from "../../components/Payments/ToBank/ToBank";
import * as  actions from '../../store/actions/index';
class Transfers extends Component {
    render() {
        if (!this.props.isLoggedIn) {
            return (
                <Redirect to="/" />
            )
        }
        let toWallet = [classes.ToWalletHeader];
        let toBank = [classes.ToBankHeader];
        if (this.props.isToWallet) {
            toWallet.push(classes.Selected);
        } else {
            toBank.push(classes.Selected);
        }
        return (<div className={classes.CardWrapper}>
            <div className={classes.Top}>
                <div className={toWallet.join(" ")} onClick={() => this.props.onSetIsToWallet(true)}>To Wallet</div>
                <div className={toBank.join(" ")} onClick={() => this.props.onSetIsToWallet(false)}>To Bank Account</div>

            </div>
            <div className={classes.Main}>
                {this.props.isToWallet ? <ToWallet creditFunds={this.props.onCreditFunds} />
                    :  <ToBank funds = {this.props.funds} debitFunds = {this.props.onDebitFunds}/>}
            </div>
        </div>);
    }
}



const mapstateToProps = (state) => {
    return {

        isToWallet: state.board.isToWallet,
        funds: state.board.funds,
        isLoggedIn: state.login.isLoggedIn,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCreditFunds: (funds) => dispatch(actions.creditFunds(funds)),
        onDebitFunds: (funds) => dispatch(actions.debitFunds(funds)),
        onSetIsToWallet: (isToWallet) => dispatch(actions.setIsToWallet(isToWallet)),
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(Transfers);