import React, { Component } from "react";
import classes from "./Board.module.css";
import Button from "react-bootstrap/Button";
import PlayRow from "../PlayRow/PlayRow";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Betslip from "../Betslip/Betslip";
import NumberFormat from "react-number-format";
import TopBoard from "../../components/topBoard/topBoard";
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-fixtures';
import Payment from '../../components/board/payment/payment';
import { ArrowRight } from "react-bootstrap-icons";
import  Receipts from '../../components/board/receipts/receipts/receipts';

class Board extends Component {

  componentDidMount() {
    if (!this.props.loading){
      this.props.onSetBoard(this.props.gameDay,this.props.kickOffTime);
    }
  }

  togglePaymentButton = (paying, paid) => {
    this.props.onSetIsPaying(paying);
    this.props.onSetIsPaid(paid);

  }
  confirmPurchase = () => {
    this.props.onExecutePurchase();
    this.props.onSetReceipt();
    this.togglePaymentButton(false, true)
  }

  render() {
    return (this.props.loading ? (<div className={"row " + classes.Board}>
      <div className={"col-12 col-lg-7 " + classes.BoardLeft}>
        <div className="row" style={{ background: "#eee" }}>
          <TopBoard
            isStarted={this.props.isStarted}
            clicked={this.props.onEmptyEditingISlip}
            genrateSlip={this.props.onGenrateSlip}
            editIndex={this.props.editIndex}
            basePrice={this.props.basePrice}
            funds={this.props.funds}
            firstName={"Emmanuel"}
            showFunds={true}
            toggleShowFunds={this.props.toggleShowFunds}
          />

        </div>
        <div className="row ">
          <PlayRow
            loading={this.props.loading}
            fetchPredictionsAll={this.props.onFetchPredictionsAll}
            predictions={this.props.predictions}
            toggleSelectedTile={this.props.ontoggleSelectedTile}
            slips={this.props.slips}
            checkPurchasable={this.props.onIsPurchasing}
            setPurchaseAll={this.props.onSetPurchaseAll}
            playingGames={this.props.playingGames}
            editIndex={this.props.editIndex}
            CalculateOverAllPrice={this.props.onCalculateOverAllPrice}
            toggleShowHistory={this.props.onToggleShowHistory}
          />
        </div>
      </div>

      <div
        className={"col-lg-5 " + classes.BoardRight}
        style={{ background: "#c6f5f3", minWidth: "25%" }}
      >
        <div className="row">
          <div className={"col-11  "} style={{ marginLeft: "2.4vw" }}>
            <Betslip
              slips={this.props.slips}
              setAdding={this.props.onSetAdding}
              setRemoving={this.props.onSetRemoving}
              setPurchaseAll={this.props.onSetPurchaseAll}
              checkPurchasable={this.props.onCheckPurchasable}
              setTotalPrice={this.props.onSetTotalPrice}
              deleteAndResetAll={this.props.onDeleteAndResetAll}
              addEmptySlip={this.props.onAddEmptySlip}
              removeSlipSingle={this.props.onRemoveRowFromBetSlip}
              purchaseAll={this.props.purchaseAll}
              setEditIndex={this.props.onSetEditIndex}
              addBetSlip={this.props.onAddRowToslips}
              editIndex={this.props.editIndex}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-11" style={{ marginBottom: "0.2em" }}>
            <div className="row" >

              <div className="offset-1" style={{ background: 'lightgrey' }} >
                {(this.props.isPaying || this.props.isPaid) ?
                  <Payment totalPrice={this.props.totalPrice} toggleshowShowReceipt={this.props.onToggleIsShowReceipt}
                    isPaid={this.props.isPaid} closePayment={this.togglePaymentButton} isShowReceipt={this.props.isShowReceipt}
                    gamesCount={this.props.slips.length} setIsPaying={this.props.onSetIsPaying}
                    receipts={this.props.receipts}
                  />
                  : null}
              </div>
            </div>
            <div className="row">
              {(!this.props.isPaying && !this.props.isPaid) ? <div className="col-12">
                <Button
                  disabled={!this.props.purchaseAll || this.props.funds < this.props.totalPrice}
                  variant="success"

                  onClick={() => this.togglePaymentButton(true, false)}
                  style={{
                    padding: "0.0vw 2vw 0",
                    width: "34vw",
                    marginLeft: '28px',
                    fontWeight: "bold",
                    fontSize: "2.2em",
                  }}
                >
                  PAY {" "}
                  <NumberFormat
                    value={this.props.purchaseAll ? this.props.totalPrice : 0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                  />
                </Button>
                {this.props.funds < this.props.totalPrice ? <div>
                  <div style={{ color: 'red', textAlign: 'center' }}>Sorry, you do not have enough funds to make the purchase</div>
                  <Button> <ArrowRight style={{ fontWeight: 'bold' }} size="20" /> GO TO FUNDS TRANFER</Button>
                </div> : null}

              </div>
                : this.props.isPaying ?
                  <div> <Button
                    disabled={!this.props.purchaseAll}
                    variant="success"
                    onClick={this.confirmPurchase}
                    style={{
                      padding: "0.0vw 2vw 0",
                      width: "34vw",
                      marginLeft: '28px',
                      fontWeight: "bold",
                      fontSize: "2.2em",
                    }}
                  >
                    CONFIRM {" "}
                    <NumberFormat
                      value={this.props.purchaseAll ? this.props.totalPrice : 0}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </Button>

                  </div>
                  : this.props.isShowReceipt? 
                    <div className="row" style = {{background: 'grey', width: "430px", marginLeft: '40px'}}>
                        <Receipts receipts = {this.props.receipts} 
                        basePrice= {this.props.basePrice} gameDate= {this.props.gameDate} />
                    </div>
                    : null }  
            </div>
        
          </div>

        </div>
      </div>
    </div>)
      : <div><Spinner /></div>

    );
  }
}
const mapstateToProps = (state) => {
  return {
    loading: state.board.loading,
    isShowReceipt: state.board.isShowReceipt,
    receipts: state.board.receipts,
    basePrice: state.board.basePrice,
    slips: state.board.slips,
    playingGames: state.board.playingGames,
    totalPrice: state.board.totalPrice,
    editIndex: state.board.editIndex,
    purchaseAll: state.board.purchaseAll,
    isStarted: state.board.isStarted,
    isPaying: state.board.isPaying,
    isPaid: state.board.isPaid,
    funds: state.board.funds,
    kickOffTime: state.board.kickOffTime,
    gameDate: state.board.gameDate,
    gameDay: state.board.gameDay,


    predictions: state.pred.predictions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSetBoard: (kickOffDay, kicOffTime) => dispatch(actions.setBoard(kickOffDay,kicOffTime)),
    onToggleIsShowReceipt: () => dispatch(actions.toggleIsShowReceipt()),
    onSetReceipt: () => dispatch(actions.setReceipt()),
    onExecutePurchase: () => dispatch(actions.executePurchase()),
    ontoggleSelectedTile: (slipIndex, gameIndex, sideIndex, side) =>
      dispatch(
        actions.toggleSelectedTile(slipIndex, gameIndex, sideIndex, side)
      ),
    onAddRowToslips: (postion) => dispatch(actions.copyBetslip(postion)),
    onRemoveRowFromBetSlip: (deleteId) =>
      dispatch(actions.removeRowFromBetSlip(deleteId)),
    onIsPurchasing: (index) => dispatch(actions.checkPurchasable(index)),
    onSetAdding: (slipIndex, isAdded) =>
      dispatch(actions.setAdding(slipIndex, isAdded)),
    onSetRemoving: (slipIndex, isRemoved) =>
      dispatch(actions.setRemoving(slipIndex, isRemoved)),
    onSetEditIndex: (index) => dispatch(actions.setEditIndex(index)),
    onCheckPurchasable: (index) => dispatch(actions.checkPurchasable(index)),
    onSetPurchaseAll: () => dispatch(actions.setPurchaseAll()),
    onSetTotalPrice: () =>
      dispatch(actions.calculateGrandTtoalPriceOfAllSlips()),
    onDeleteAndResetAll: () => dispatch(actions.deleteAndResetAll()),
    onAddEmptySlip: () => dispatch(actions.addEmptySlip()),
    onEmptyEditingISlip: () => dispatch(actions.EmptyEditingISlip()),
    onCalculateOverAllPrice: (slip, game, side) =>
      dispatch(actions.calculateOverAllPrice(slip, game, side)),
    onGenrateSlip: (amount, slipIndex) =>
      dispatch(actions.genrateSlip(amount, slipIndex)),
    onToggleShowHistory: (gameIndex) =>
      dispatch(actions.toggleShowHistory(gameIndex)),
    onSetIsPaying: (isPaying) =>
      dispatch(actions.setIsPaying(isPaying)),
    onSetIsPaid: (isPaid) =>
      dispatch(actions.setIsPaid(isPaid)),

    onFetchPredictionsAll: (FixturesList, gameIndex) =>
      dispatch(actions.fetchPredictionsAll(FixturesList, gameIndex)),
  };
};

export default connect(mapstateToProps, mapDispatchToProps)(WithErrorHandler(Board, axios));
