import React, { Component } from "react";
import classes from "./Board.module.css";
import Button from "react-bootstrap/Button";
import PlayRow from "../../components/board/playRow/PlayRow/PlayRow.js";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Betslip from "../Betslip/Betslip";
import NumberFormat from "react-number-format";
import TopBoard from "../../components/TopBoard/topBoard";

class Board extends Component {
  componentDidMount() {
    this.props.onSetBoard();
  }

  render() {
    return !this.props.loading ? (
      <div className={"row " + classes.Board}>
        <div className={"col-12 col-lg-7 " + classes.BoardLeft}>
          <div className="row" style={{ background: "#eee" }}>
            <TopBoard
              isStarted={this.props.isStarted}
              clicked={this.props.onEmptyEditingISlip}
              genrateSlip={this.props.onGenrateSlip}
              editIndex = {this.props.editIndex}
            />
          </div>
          <div className="row ">
            <PlayRow
              toggleSelectedTile={this.props.ontoggleSelectedTile}
              slips={this.props.slips}
              checkPurchasable={this.props.onIsPurchasing}
              setPurchaseAll={this.props.onSetPurchaseAll}
              playingGames={this.props.playingGames}
              editIndex={this.props.editIndex}
              calculateTotalPrice={this.props.onCalculateOverAllPrice}
              toggleShowHistory={this.props.onToggleShowHistory}
            />
          </div>
        </div>

        <div
          className={"col-lg-5 " + classes.BoardRight}
          style={{ background: "#c6f5f3", minWidth: "25%" }}
        >
            {console.log(this.props.totalPrice)}
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
            <div
              className="col-6"
              style={{ marginBottom: "0.2em" 
            }}
            >
              <Button
                disabled={!this.props.purchaseAll}
                variant="success"
                style={{
                  padding: "0.5vw 2vw",
                  width: '30vw',
                  fontWeight: "bold",
                  fontSize: "2.2em",
                }}
                clicked={this.AddToslips}
              >
                PAY{" "}
                <NumberFormat
                  value={this.props.totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapstateToProps = (state) => {
  return {
    slips: state.board.slips,
    playingGames: state.board.playingGames,
    totalPrice: state.board.totalPrice,
    editIndex: state.board.editIndex,
    loading: state.board.loading,
    purchaseAll: state.board.purchaseAll,
    isStarted: state.board.isStarted,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSetBoard: () => dispatch(actions.setBoard()),
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
    onSetTotalPrice: () =>dispatch(actions.calculateGrandTtoalPriceOfAllSlips()),
    onDeleteAndResetAll: () => dispatch(actions.deleteAndResetAll()),
    onAddEmptySlip: () => dispatch(actions.addEmptySlip()),
    onEmptyEditingISlip: () => dispatch(actions.EmptyEditingISlip()),
    onCalculateOverAllPrice: (slip, game, side) =>
      dispatch(actions.calculateOverAllPrice(slip, game, side)),
    onGenrateSlip: (amount, slipIndex) => dispatch(actions.genrateSlip(amount, slipIndex)),
    onToggleShowHistory: (gameIndex) =>
      dispatch(actions.toggleShowHistory(gameIndex)),
  };
};

export default connect(mapstateToProps, mapDispatchToProps)(Board);
