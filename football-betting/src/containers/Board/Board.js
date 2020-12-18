import { Component, React } from "react";
import classes from './Board.module.css';
import Button from "../../components/UI/Button/Button";
import PlayRow from "../../components/board/playRow/PlayRow/PlayRow.js";
import Order from '../Order/Order';
import { Route } from "react-router";
import {connect}  from "react-redux";
import * as actions from '../../store/actions/index';

class Board extends Component {
 
  
    ResetBoard = ()=>{
        let updatedeams = this.state.teams;
        for(let team of updatedeams){
            for(let side in team.sides){
                team.sides[side].selected = false;
            }
        }
    }

    AddToBetSlip =()=>{
        const updatedOrder = [];
        let buildOrder = {};
        if(this.state.allRowsValid){
            buildOrder.teams = [...this.props.teams];
            buildOrder.totalPrice = this.state.totalPrice
        updatedOrder.push(buildOrder);
        this.props.history.push("/orders" , updatedOrder);

        }
        this.ResetBoard();
    }

    render (){
           
        return <div className = {classes.Board}>
             <PlayRow  clicked = {this.props.onToggleTile} 
             teams = { this.props.teams }
             />
            <div style={{display:'block',float: 'left', width: '150%',fontSize: '1.4em'}}>
             { this.props.totalPrice > 0 ? <p >Total : {this.props.totalPrice} 
             <span style={{color: 'green'}}>Naira</span></p>  : null }
            
            <Button btnType= "Primary" disabled = { !this.props.allRowsValid}
            clicked = {this.AddToBetSlip}
            >ADD TO BETSLIP</Button>
             </div>
                <Route path= '/orders'  component= {Order} />
            </div>
        
    }
}

const mapStateToProps = state =>{
    return {
        teams : state.board.teams,
        allRowsValid : state.board.allRowsValid,
        totalPrice: state.board.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleTile : (key, index) => dispatch ( actions.toggleTile(key,index))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);