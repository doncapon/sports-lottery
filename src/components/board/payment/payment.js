import Button from 'react-bootstrap/Button';
import React from 'react';
import { XOctagon } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import {addCommaToAmounts} from '../../../shared/utility';
import classes from './payment.module.css';


const payment = (props) => {

    return (<div className={classes.PaymentWrapper}>
        <div className={classes.PaymentWrapperInner}>
            <div className={classes.HeaderLeft} > {!props.isPaid ? 'Confirm Payment'
                : 'Payment confirmed'}
            </div>
            <div className={classes.HeaderRight}>
                <div className= {classes.ButtonNormal}>
                    <Button className={classes.CancelButton}variant="danger" onClick={() => { props.closePayment(false, false) }} >
                        {!props.isPaid ?
                            'CANCEL' : 'CLOSE'} <XOctagon /> </Button>
                </div>
             
            </div>
        </div>
        { !props.isPaid ?
            <div className={classes.TermsWrapper}>
                <div className={classes.TermHeaderLeft} >{props.gamesCount + " "}game(s) </div>
                <div className={classes.TermHeaderRight} >
                {"₦"+addCommaToAmounts(props.totalPrice.toString(10))}
                </div>
                <div >
                    <p className={classes.AcceptTerms} >By confirming you are have read
             and accepted the< Link to=""> Terms & Condtions</Link> of the game</p>
                </div>
            </div>
            : <div >
                <div className={classes.TermHeaderLeft} > You have been charged   </div>
                <div className={classes.TermHeaderRight} style={{ color: 'green' }}>
                {"₦"+addCommaToAmounts(props.totalPrice.toString(10))}

                </div>
                <Button
                    variant="info"
                    onClick={props.toggleshowShowReceipt}
                    className={classes.ShowReceipt}
                >{!props.isShowReceipt ? 'SHOW RECEIPT' : 'HIDE RECEIPT'} </Button>
            </div>}

    </div>)
}

export default payment;