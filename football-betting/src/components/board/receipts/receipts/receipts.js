import React from 'react';
import Receipt from  '../receipt/receipt';
import classes from './Receipts.mocdule.css';
const receipts = (props)=>{

    return(
        props.receipts.map((receipt, i) =>{
            return <div className={classes.ReceiptWrapper} key = {receipt.id}> 
            <Receipt receipt = {receipt} basePrice={props.basePrice} 
             gameDate = {props.gameDate}/> </div>
        })
    );
} 


export default receipts;