import  React , {Component } from "react";
import classes from './Board.module.css';
import Button from "react-bootstrap/Button";
import PlayRow from "../../components/board/playRow/PlayRow/PlayRow.js";
import { connect }  from "react-redux";
import * as actions from '../../store/actions/index';
import Betslip from "../Betslip/Betslip";
import NumberFormat from 'react-number-format';

class Board extends Component {

    render (){
        return <div className = {'container-fluid ' + classes.Board}
         style= {{  margin: 'auto'}
         
         }>
            <div className= 'row  justify-content-center' style= {{ margin: '1% 0'}}>
          
                <div className= ' col-lg-6 col-lg-5 col-md-8  col-md-4 col-sm-12 col-sm-6' style = 
                {{background: 'white' , paddingTop: '28vh', minWidth: '25%' }}>
                    <div className ='row' >
                        <PlayRow  toggleSelectedTile = {this.props.ontoggleSelectedTile} 
                         slips = {this.props.slips} checkPurchasable= {this.props.onIsPurchasing} 
                          setPurchaseAll = {this.props.onSetPurchaseAll } playingGames = {this.props.playingGames }
                            editIndex={this.props.editIndex}
                             calculateTotalPrice = { this.props.onCalculateOverAllPrice}
                        />
                        
                    </div>
                </div>
                <div className = 'col-lg-5 col-lg-4 col-md-8 col-md-4 col-sm-12 col-sm-6' 
                style={{ background:'#c6f5f3', minWidth: '25%'}} >

                    <div className= 'row' style= {{margin: 'auto'}}>
                        <div className= 'col-md-12 col-md-5 '>
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
                    <div className= 'row ' >
                        <div className='col-md-12' style = {{fontSize: '1.6vw', float:'left'}}>
                            { (this.props.purchaseAll&& this.props.totalPrice > 0) ? <p style ={{fontWeight: 'bold' }} >
                                <span style={{marginRight: '1vw'}}>Total Price:</span><span 
                            style={{fontSize: '1.6vw',color: 'blue' , fontWeight: 'bold'}}>
                                <NumberFormat value={ this.props.totalPrice}  displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                                </span>
                            <span style={{color: 'green', fontWeight: 'bold' , marginLeft: '0.2vw'}}>NAIRA</span></p>  : null }
                        </div>
                    </div>
                    <div className = 'row'>
                        <div className='offset-5'  style={{marginTop: '0' , marginBottom: "2vh"}}>
                            {this.props.purchaseAll? <Button variant= "success"  style={{padding: '0.5vw 2vw',
                             fontWeight: 'bold', fontSize: '4.5vh'}}
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
        totalPrice: state.totalPrice,
        editIndex : state.editIndex,
        purchaseAll: state.purchaseAll,
    };
};
const mapDispatchToProps = dispatch => {
    return {
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
         onCalculateOverAllPrice : (slip, game, side)=>dispatch(actions.calculateOverAllPrice(slip, game, side))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);