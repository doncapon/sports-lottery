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
                {this.props.isToWallet ? <ToWallet />
                    :  <ToBank user = {this.props.user} />}
            </div>
        </div>);
    }
}



const mapstateToProps = (state) => {
    return {

        isToWallet: state.board.isToWallet,

        isLoggedIn: state.login.isLoggedIn,
        user: state.login.user,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetIsToWallet: (isToWallet) => dispatch(actions.setIsToWallet(isToWallet)),
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(Transfers);