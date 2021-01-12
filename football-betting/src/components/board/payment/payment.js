import Button from 'react-bootstrap/Button';
import React from 'react';
import { XOctagon } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";


const payment = (props) => {

    return (<div className="col-12">
        <div className="row" style={{ color: 'white', paddingLeft: '0', background: 'grey' }}>
            <div style={{ paddingTop: '5px' }} className="col-6">{!props.isPaid ? 'Confirm Payment'
                : 'Game Paid'}</div>
            <div className="col-5 offset-1">
                <Button variant="danger" onClick={() => {props.closePayment(false,false)}} >
                    {!props.isPaid? 
                'CANCEL' : 'CLOSE'} <XOctagon /> </Button>
            </div>
        </div>
        { !props.isPaid  ?
        <div className="row">
            <div style={{ marginLeft: '10px' }} className="col-4">{props.gamesCount + " "}game(s) </div>
            <div className="col-5 offset-2"  style = {{color: 'green'}}>
                <NumberFormat
                    value={props.totalPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                />
            </div>
            <div className="col-10 offset-1">
                <p style={{ textAlign: 'left', marginLeft: '10px', fontSize: '0.9em' }}>By confirming you are have read
             and accepted the< Link to=""> rules</Link> of the game</p>
            </div>
        </div>
        : <div className = "row">
           <div className = "col-7"> You have been changed   </div>
              <div className="col-3 offset-1" style= {{color: 'green'}}>
                <NumberFormat
                    value={props.totalPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                />
            </div>
            <Button
                  variant="info"
                  onClick= {props.toggleshowShowReceipt}
                  style={{
                      marginLeft : '26px',
                    fontWeight: "bold",
                    fontSize: "1.3em",
                  }}
                >{!props.isShowReceipt? 'SHOW RECEIPT' : 'HIDE RECEIPT'} </Button>
            </div>}
          
    </div>)
}

export default payment;