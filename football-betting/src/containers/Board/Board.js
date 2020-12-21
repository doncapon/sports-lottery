import { Component, React } from "react";
import classes from './Board.module.css';
import Button from "react-bootstrap/Button";
import PlayRow from "../../components/board/playRow/PlayRow/PlayRow.js";
import { connect }  from "react-redux";
import * as actions from '../../store/actions/index';
import Betslip from "../Betslip/Betslip";
import { Trash} from "react-bootstrap-icons";

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
           
        return <div className = {'container' + classes.Board}
         style= {{border: '10px solid lightgrey' , background: 'e00f'
          , width: '80%' , margin: 'auto'}
         
         }>
  
            <div className= 'row' style= {{marginBottom: '50px'}}>
          
                <div className= 'col-lg-5 col-md-5 offset-' style = {{background:
                  'white' ,
                    padding: '64px 30px 0px 20px', marginLeft: '15px'}}>
                    
                    <div>
                        <PlayRow  clicked = {this.props.onToggleTile} 
                        teams = { this.props.teams }
                        />
                    </div>
                </div>

                <div className = 'col-lg-5 col-md-5 ' style={{margin : ' 30px 60px 0px 60px'}} >
                    <div className = 'row'>
                        {(this.props.betSlip.length > 0 )?  <div className= 'offset-9'>
                           <div className= 'row'> <span  style={{color: 'red', marginRight: '2px'}}>EMPTY: </span> 
                           <Button size= 'sm' variant='outline-danger' ><Trash /></Button> </div></div>: null }
                    </div>
                    <div className= 'row'>
                        <div className= 'col-md-12' style = {{float: 'left'}}>
                            <div><Betslip betSlip = {this.props.betSlip}  add = {this.props.onAbleTosend} /></div>
                        </div>
                    </div>
                    <div className= 'row'>
                        <div>
                            { this.props.betSlip.updatedTotalPrice > 0 ? <p >Total : {this.props.totalPrice} 
                            <span style={{color: 'green'}}>Naira</span></p>  : null }
                        </div>
                        <div className='offset-8' style={{marginTop: '10px'}}>
                            {this.props.allRowsValid? <Button variant= "success" 
                                clicked = {this.AddToBetSlip} 
                            >CHECKOUT</Button>  : null }
                        </div>
                        
                    </div>
            
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