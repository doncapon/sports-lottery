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

    // AddToslips =()=>{
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
           
        return <div className = {'container ' + classes.Board}
         style= {{background: 'e00f'
          , width: '80%' , margin: 'auto'}
         
         }>
  
            <div className= 'row' style= {{marginBottom: '50px'}}>
          {}
                <div className= 'col-lg-6  col-md-6 col-sm-11 col-sm-5 offset-' style = {{background:
                  'white' ,
                    padding: '64px 0px 0px 0px', marginLeft: '15px' , boxSizing: 'border-box'}}>
                    <div>
                        <PlayRow  toggleSelectedTile = {this.props.ontoggleSelectedTile} 
                        teams = { this.props.teams } games = {this.props.games}  sides = {this.props.sides} slips = {this.props.slips}
                        setAdding = {this.props.onSetAdding}
                        
                        />
                    </div>
                </div>
                <div className = 'col-lg-4 col-md-4  col-md-3 ' style={{margin : ' 30px 0px 0px 60px'}} >
                    <div className = 'row'>
                        {(this.props.slips.length > 0 )?  <div className= 'offset-8'>
                           <div className= 'row'> <span  style={{color: 'red', marginRight: '2px', 
                                fontWeight: 'bold'}}>EMPTY: </span> 
                           <Button size= 'sm' variant='outline-danger' ><Trash /></Button> </div></div>: null }
                    </div>
                    <div className= 'row'>
                        <div className= 'col-md-12 col-md-3 ' style = {{float: 'left'}}>
                            <div><Betslip slips = {this.props.slips}  setAdding = {this.props.onSetAdding} 
                             addSlip = {this.props.onAddRowToslips} 
                            /></div>
                        </div>
                    </div>
                    
                    <div className= 'row'>
                        <div  style = {{fontSize: '1.3em', marginLeft: '10px'}}>
                            { this.props.grandTotalPrice > 0 ? <p style ={{fontWeight: 'bold'}} >Total Price:<span style={{fontSize: '1.4em',color: 'white' , fontWeight: 'bold'}}> {this.props.totalPrice} </span>
                            <span style={{color: 'green', fontWeight: 'bold'}}>Naira</span></p>  : null }
                        </div>
                        <div className='offset-8' style={{marginTop: '10px'}}>
                            {this.props.allRowsValid? <Button variant= "success" 
                                clicked = {this.AddToslips} 
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
        slips : state.slips,
        adding: state.adding,
        totalPrice: state.totalPrice,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ontoggleSelectedTile : ( slipIndex , gameIndex, sideIndex, side) =>
         dispatch ( actions.toggleSelectedTile( slipIndex, gameIndex, sideIndex, side)),

         onAddRowToslips : (postion) => dispatch ( actions.addRowToBetSlip(postion)),
         onAbleTosend : () => dispatch ( actions.ableToSend()),
        onSetAdding : (val) => dispatch(actions.setAdding(val))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);