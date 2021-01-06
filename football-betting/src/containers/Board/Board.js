import  React , {Component } from "react";
import classes from './Board.module.css';
import Button from "react-bootstrap/Button";
import PlayRow from "../../components/board/playRow/PlayRow/PlayRow.js";
import { connect }  from "react-redux";
import * as actions from '../../store/actions/index';
import Betslip from "../Betslip/Betslip";
import NumberFormat from 'react-number-format';
import TopBoard from "../../components/TopBoard/topBoard";

class Board extends Component {

    componentDidMount(){
        this.props.onSetBoard();
    }

    render (){
        return  (!this.props.loading )? <div className= {'row '+ classes.Board}>
              
                <div className= {'col-12 col-lg-7 '+classes.BoardLeft}>
                    <div className="row"   style={{background : '#eee'}}>   
                        <TopBoard isStarted = {this.props.isStarted} clicked ={this.props.onEmptyEditingISlip}
                                                genrateSlip = {this.props.onGenrateSlip}
                        />
                    </div>
                    <div className ='row ' >
                        <PlayRow  toggleSelectedTile = {this.props.ontoggleSelectedTile} 
                         slips = {this.props.slips} checkPurchasable= {this.props.onIsPurchasing} 
                          setPurchaseAll = {this.props.onSetPurchaseAll } playingGames = {this.props.playingGames }
                            editIndex={this.props.editIndex} 
                             calculateTotalPrice = { this.props.onCalculateOverAllPrice}
                             toggleShowHistory= {this.props.onToggleShowHistory}
                        />
                        
                    </div>
                </div>
            <div className ={'col-lg-5 '+ classes.BoardRight}  
                style={{ background:'#c6f5f3', minWidth: '25%'}} >
                    <div className= 'row' >
                        <div className= {'col-11  ' } style= {{marginLeft: '2.4vw'}}>
                            <Betslip slips = {this.props.slips}  setAdding = {this.props.onSetAdding}
                            setRemoving = {this.props.onSetRemoving} 
                            setPurchaseAll = {this.props.onSetPurchaseAll }
                            checkPurchasable = {this.props.onCheckPurchasable}
                            setTotalPrice = {this.props.onSetTotalPrice}
                            deleteAndResetAll = {  this.props.onDeleteAndResetAll}
                            addEmptySlip = {this.props.onAddEmptySlip}
                              removeSlipSingle  = { this.props.onRemoveRowFromBetSlip }
                               purchaseAll= {this.props.purchaseAll} setEditIndex = {this.props.onSetEditIndex}
                               addBetSlip = {this.props.onAddRowToslips} editIndex={this.props.editIndex}
                              />
                              
                        </div>
                    </div>
        {console.log(this.props.slips[this.props.editIndex])}
                    
                    <div className= 'row ' >
                        <div className='col-md-7' style = {{fontSize: '1emm', float:'left'}}>
                            { (this.props.purchaseAll&& this.props.totalPrice > 0) ? <p style ={{fontWeight: 'bold' }} >
                                <span style={{marginRight: '1vw'}}>Total Price:</span><span 
                            style={{fontSize: '1.2em',color: 'blue' , fontWeight: 'bold'}}>
                                <NumberFormat value={ this.props.totalPrice}  displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                                </span>
                            <span style={{color: 'green', fontWeight: 'bold' , marginLeft: '0.2vw'}}>NAIRA</span></p>  : null }
                        </div>
                    </div>
                    <div className = 'row'>
                        <div className='offset-5'  style={{marginTop: '0' , marginBottom: "0.2em"}}>
                            {this.props.purchaseAll? <Button variant= "success"  style={{padding: '0.5vw 2vw',
                             fontWeight: 'bold', fontSize: '1em'}}
                                clicked = {this.AddToslips} 
                            >CHECKOUT</Button>  : null }
                        </div>
                    </div>
            
                </div>
            </div>

        : null
        
    }
}

const mapStateToProps = state =>{
    return {
        slips : state.slips,
        playingGames : state.playingGames,
        totalPrice: state.totalPrice,
        editIndex : state.editIndex,
        loading : state.loading,
        purchaseAll: state.purchaseAll,
        isStarted : state.isStarted
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onSetBoard : ()=> dispatch (actions.setBoard()),
        ontoggleSelectedTile : (slipIndex, gameIndex, sideIndex, side) =>
                             dispatch ( actions.toggleSelectedTile( slipIndex, gameIndex, sideIndex, side)),
         onAddRowToslips : (postion) => dispatch ( actions.copyBetslip(postion)),
         onRemoveRowFromBetSlip: (deleteId) => dispatch(actions.removeRowFromBetSlip(deleteId)),
         onIsPurchasing : (index) => dispatch(actions.checkPurchasable(index)),
         onSetAdding : (slipIndex, isAdded) => dispatch(actions.setAdding(slipIndex,isAdded)),
         onSetRemoving : (slipIndex, isRemoved) => dispatch(actions.setRemoving(slipIndex,isRemoved)),
         onSetEditIndex : (index) => dispatch(actions.setEditIndex(index)),
         onCheckPurchasable : (index) => dispatch(actions.checkPurchasable(index)),
         onSetPurchaseAll : () => dispatch(actions.setPurchaseAll()),
         onSetTotalPrice : () => dispatch(actions.calculateGrandTtoalPriceOfAllSlips()),
         onDeleteAndResetAll : () => dispatch(actions.deleteAndResetAll()),
         onAddEmptySlip : () => dispatch(actions.addEmptySlip()),
         onEmptyEditingISlip : () => dispatch(actions.EmptyEditingISlip()),
         onCalculateOverAllPrice : (slip, game, side)=>dispatch(actions.calculateOverAllPrice(slip, game, side)),
         onGenrateSlip : (amount)=>dispatch(actions.genrateSlip(amount)),
         onToggleShowHistory : (gameIndex)=>dispatch(actions.toggleShowHistory(gameIndex)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);