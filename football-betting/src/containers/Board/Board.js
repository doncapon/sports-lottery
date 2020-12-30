import  React , {Component } from "react";
import classes from './Board.module.css';
import Button from "react-bootstrap/Button";
import PlayRow from "../../components/board/playRow/PlayRow/PlayRow.js";
import { connect }  from "react-redux";
import * as actions from '../../store/actions/index';
import Betslip from "../Betslip/Betslip";
import { Trash} from "react-bootstrap-icons";

class Board extends Component {
    render (){
        return <div className = {'container-fluid ' + classes.Board}
         style= {{  margin: 'auto'}
         
         }>
  
            <div className= 'row  justify-content-center' style= {{ margin: '25px auto'}}>
          
                <div className= ' col-lg-5 col-md-8  col-md-4 col-sm-12 col-sm-6' style = 
                {{background: 'white' , paddingTop: '64px', minWidth: '25%' }}>
                    <div className ='row' >
                        <PlayRow  toggleSelectedTile = {this.props.ontoggleSelectedTile} 
                         slips = {this.props.slips} checkPurchasable= {this.props.onIsPurchasing} setDisableAddButtons
                          = {this.props.onDisableAddButtons } playingGames = {this.props.playingGames }
                             editIndex={this.props.editIndex}
                        />
                        
                    </div>
                </div>
                <div className = 'col-lg-5 col-md-8 col-md-4 col-sm-12 col-sm6' 
                style={{ background:'#c6f5f3', minWidth: '25%'}} >
                    <div className = 'row' >
                        {(this.props.slips.length > 0 )?  <div className= 'offset-9'  style={{paddingTop: '5px'}}>
                           <div className= 'row'> <span  style={{color: 'red',  
                                fontWeight: 'bold', }}>EMPTY<span style={{color: 'salmon' ,marginLeft: '4px', fontWeight: 'bold'}}>?</span> </span> 
                           <Button style={{marginLeft: '4px'}} size= 'sm' variant='outline-danger' ><Trash /></Button> </div></div>: null }
                    </div>
                    <div className= 'row' style= {{margin: 'auto'}}>
                        <div className= 'col-md-11 col-md-5 '>
                            <div><Betslip slips = {this.props.slips}  setAdding = {this.props.onSetAdding}
                              removeSlipSingle  = { this.props.onRemoveRowFromBetSlip }
                               disableAdd= {this.props.disableAdd} setEditIndex = {this.props.onSetEditIndex}
                               addBetSlip = {this.props.onAddRowToslips} editIndex={this.props.editIndex}
                              /></div>
                        </div>
                    </div>
                    <div className= 'row' >
                        <div  style = {{fontSize: '1.3em',}}>
                            { this.props.grandTotalPrice > 0 ? <p style ={{fontWeight: 'bold'}} >Total Price:<span 
                            style={{fontSize: '1.4em',color: 'white' , fontWeight: 'bold'}}> {this.props.totalPrice} </span>
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
        playingGames : state.playingGames,
        disableAdd: state.disableAdd,
        totalPrice: state.totalPrice,
        editIndex : state.editIndex
    };
};
const mapDispatchToProps = dispatch => {
    return {
        ontoggleSelectedTile : (slipIndex, gameIndex, sideIndex, side) =>
                             dispatch ( actions.toggleSelectedTile( slipIndex, gameIndex, sideIndex, side)),
         onAddRowToslips : (postion) => dispatch ( actions.addRowToBetSlip(postion)),
         onRemoveRowFromBetSlip: (deleteId) => dispatch(actions.removeRowFromBetSlip(deleteId)),
         onIsPurchasing : (index) => dispatch(actions.checkPurchasable(index)),
         onDisableAddButtons : () => dispatch(actions.disableAddButtons()),
         onSetAdding : (slipIndex, isAdded) => dispatch(actions.setAdding(slipIndex,isAdded)),
         onSetEditIndex : (index) => dispatch(actions.setEditIndex(index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);