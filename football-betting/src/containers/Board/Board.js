import { Component, React } from "react";
import classes from './Board.module.css';
import Button from "../../components/UI/Button/Button";
import PlayRow from "../../components/board/playRow/PlayRow/PlayRow.js";
import { connect }  from "react-redux";
import * as actions from '../../store/actions/index';
import Betslip from "../Betslip/Betslip";

class Board extends Component {
 
    // state = {
    //     totalPrice : 0,
    //     allRowsValid: false
    // }; 

    // ResetBoard = ()=>{
    //     let updatedeams = this.state.teams;
    //     for(let team of updatedeams){
    //         for(let side in team.sides){
    //             team.sides[side].selected = false;
    //         }
    //     }
    // }

    // AddToBetSlip =()=>{
    //     const updatedOrder = [];
    //     let buildOrder = {};
    //     if(this.state.allRowsValid){
    //         buildOrder.teams = [...this.props.teams];
    //         buildOrder.totalPrice = this.state.totalPrice
    //     updatedOrder.push(buildOrder);
    //     this.props.history.push("/orders" , updatedOrder);

    //     }
    //     this.ResetBoard();
    // }
 
    render (){
           
        return <div className = {classes.Board}>
            <div>
                <div style={{float: 'left' ,display: 'block',padding: 'auto',margin: 'auto', marginTop: '55px', borderRight: '10px solid grey' , marginRight: '10px'}}>
                    <PlayRow  clicked = {this.props.onToggleTile} 
                    teams = { this.props.teams }
                    />
                </div>
                <div style = {{borderRight : '10px grey solid'}}>
                    {(this.props.betSlip.length > 0 )?  <div style = {{ float: 'right'}}><Button btnType='Danger' >EMPTY</Button> </div>: null }
                    <Betslip betSlip = {this.props.betSlip}  add = {this.props.onAbleTosend} />
                </div>
            </div>

            <div style={{display:'block',float: 'left', width: '150%',fontSize: '1.4em'}}>
             { this.props.betSlip.updatedTotalPrice > 0 ? <p >Total : {this.props.totalPrice} 
             <span style={{color: 'green'}}>Naira</span></p>  : null }

            <div style = {{clear: 'right', paddingLeft: '50px'}}>
            <Button btnType= "Primary" disabled = { !this.props.allRowsValid}
            clicked = {this.AddToBetSlip}
            >ADD TO BETSLIP</Button>
            </div>

             </div>
        </div>
        
    }
}

const mapStateToProps = state =>{
    return {
        teams : state.board.teams,
        allRowsValid : state.board.allRowsValid,
        totalPrice: state.board.totalPrice,
        betSlip : state.board.betSlip
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleTile : (key, index) => dispatch ( actions.toggleTile(key,index)),
        onAbleTosend : () => dispatch ( actions.ableToSend())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);