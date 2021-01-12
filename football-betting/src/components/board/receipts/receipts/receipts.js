import React from 'react';
import Receipt from  '../receipt/receipt';

const receipts = (props)=>{

    return(
        props.receipts.map((receipt, i) =>{
            return <div style={{margin: '10px 0 10px', paddingRight: '50px'}} className="col-12"> 
            <Receipt receipt = {receipt} basePrice =  {props.basePrice}  gameDate = {props.gameDate}/> </div>
        })
    );
} 


export default receipts;