import React from 'react';
import Button from 'react-bootstrap/Button';
import {Trash2Fill} from 'react-bootstrap-icons';
import Funds from '../../components/board/funds/funds';

const topBoard = (props) =>{
const genrateSlip = (event) =>{
    let i =  event.target.innerHTML;
    props.genrateSlip(i, props.editIndex);
}
    return (<div className = 'col-12'>
          <div className="row" style={{textAlign: "left"}}>

             <Funds funds = {props.funds} showFunds = {props.showFunds}  firstName = {props.firstName} 
              toggleShowFunds = {props.toggleShowFunds }
             />
          </div>
          <div className= "row">
            <span  style= {{  textAlign : 'left' , color: 'skyblue', fontWeight: 'bold'}}
            > play with <span style={{fontSize: '1.3em', color: 'green'}}>{props.basePrice}₦</span><span style={{color: 'grey', margin: '0'}}> Naira </span></span>
            </div>
            <div className= 'row'>
                <div >Quick Random Play: </div>
                </div>
                <div className= "row">
                <Button
                    style={{ marginRight: '10px'}}
                        variant="success"
                        size="lg"
                        onClick = {(e)=>genrateSlip(e)}
                      >
                          480 ₦
                      </Button>
        
                <Button
                style= {{marginRight: '10px'}}
                        onClick = {(e)=>genrateSlip(e)}
                        variant="success"
                        size="lg"
                      >
                        960 ₦
                      </Button>
        
                <Button
                        variant="success"
                        onClick = {(e)=>genrateSlip(e)}
                        size="lg"
                      >
                        1,440 ₦
                      </Button>
        
         </div>
            <div style  ={{ margin: '10px 0', fontWeight : 'bold'}}>
                <span style ={{ color: 'skyblue', marginRight: '5px'}}>EMPTY SELECTIONS: ? 
                </span>
                <Button
                        variant="outline-primary"
                        disabled = {!props.isStarted}
                        onClick = {props.clicked }
                        size="md"
                      >
                           <Trash2Fill />
                      </Button>
         </div>
    </div>);

}


export default topBoard;