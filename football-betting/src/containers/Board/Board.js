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
                         slips = {this.props.slips} 
                         isPurchasable= {this.props.onIsPurchasing} setDisableAdd
                          = {this.props.onDisableAddButton } playingIndex = {this.props.playingIndex }
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
                            <div><Betslip slips = {this.props.slips}  addSlip = {this.props.onAddRowToslips}
                              removeSlipSingle  = { this.props.onRemoveRowFromBetSlip }
                               disableAdd= {this.props.disableAdd} setPlayingIndex = {this.props.onSetPlayingIndex}
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
        playingIndex : state.playingIndex,
        disableAdd: state.disableAdd,
        totalPrice: state.totalPrice,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ontoggleSelectedTile : ( slipIndex , gameIndex, sideIndex, side) =>
                             dispatch ( actions.toggleSelectedTile( slipIndex, gameIndex, sideIndex, side)),
         onAddRowToslips : (postion) => dispatch ( actions.addRowToBetSlip(postion)),
         onRemoveRowFromBetSlip: (deleteId) => dispatch(actions.removeRowFromBetSlip(deleteId)),
         onIsPurchasing : (index) => dispatch(actions.isPurchasable(index)),
         onDisableAddButton : () => dispatch(actions.disableAddButtons()),
         onSetPlayingIndex : (position) => dispatch(actions.setPlayingIndex(position)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);