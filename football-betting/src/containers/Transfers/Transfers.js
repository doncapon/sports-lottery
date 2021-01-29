import React, {Component} from "react";
import classes from './Transfers.module.css';
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import ToWallet from "../../components/Payments/ToWallet/ToWallet";
import ToBank from "../../components/Payments/ToBank/ToBank";
import * as  actions from '../../store/actions/index';
class Transfers extends Component {
    state= {
        toWallet: true
    }

    setToWallet =(val)=>{
        this.setState({toWallet: val})
    }
    render(){
        if (!this.props.isLoggedIn) {
            return (
                <Redirect to="/" />
            )
        }
        let toWallet = [classes.ToWalletHeader];
        let toBank = [classes.ToBankHeader];
        if(this.state.toWallet){
            toWallet.push(classes.Selected);
        }else{
            toBank.push(classes.Selected);
        }
        return(<div className= { classes.CardWrapper}>
            <div className={classes.Top}>
                <div className= {toWallet.join(" ")} onClick={()=>this.setToWallet(true)}>To Wallet</div>
                <div className= {toBank.join(" ")} onClick={()=>this.setToWallet(false)}>To Bank Account</div>
        
            </div>
            <div className= {classes.Main}>
                {this.state.toWallet?<div><ToWallet  creditFunds = {this.props.onCreditFunds}/></div>
                :<div> <ToBank /></div>}
            </div>
        </div>);
    }
}



const mapstateToProps = (state) => {
    return {
  
    funds: state.board.funds,
    isLoggedIn: state.login.isLoggedIn,
  
    };
  };

  const mapDispatchToProps=(dispatch) =>{
    return {
        onCreditFunds: (funds)=>dispatch(actions.creditFunds(funds))
    }
  }
export default connect(mapstateToProps, mapDispatchToProps) (Transfers);