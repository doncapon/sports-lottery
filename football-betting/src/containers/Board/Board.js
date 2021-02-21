import React, { Component } from "react";
import classes from "./Board.module.css";
import Button from "react-bootstrap/Button";
import PlayRow from "../PlayRow/PlayRow";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Betslips from "../Betslips/Betslips";
import TopBoard from "../../components/topBoard/topBoard";
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import axios from '../../axios-fixtures';
import Payment from '../../components/board/payment/payment';
import { ArrowRight } from "react-bootstrap-icons";
import Receipts from '../../components/board/receipts/receipts/receipts';
import { getNextPlayDate } from '../../shared/utility';
import { addCommaToAmounts } from '../../shared/utility';
import firebase from '../../config/firebase/firebase';
import Modal from "../../components/UI/Modal/Modal";
import LoginModal from '../../components/loginLogout/modalLogin/loginModal';

class Board extends Component {

  state = {
    funds: 0,
    loading: false,
    showModalSignin: false
  }
  constructor(props) {
    super(props);
    let kickOffDate;
    kickOffDate = getNextPlayDate(this.props.daysOffset,
      this.props.hourToNextDay);

    if (!this.props.loading) {
      this.props.onSetBoard(this.props.isFACup,
        this.props.kickOffTime, kickOffDate);
    }

  }

  componentDidMount() {
    if (!this.state.loading) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          let userRef = firebase.database().ref("users/" + user.uid);
          userRef.on("value", snapshot => {
            let dbUser = snapshot.val();
            this.setState({ funds: dbUser.funds });

          })

        }
      });
    }
    this.setState({ loading: true })
  }
  togglePaymentButton = (paying, paid) => {
    console.log("current user",firebase.auth().currentUser)
    if(firebase.auth().currentUser){
      
    this.props.onSetIsPaying(paying);
    this.props.onSetIsPaid(paid);
    }else{
       this.setState({showModalSignin: true})
    }

  }

  cancelLoginPopup = ()=>{
    this.setState({showModalSignin: false})

  }

  confirmPurchase = () => {
    this.ExecutePurchase();
    this.props.onSetReceipt(this.props.gameDate);
    this.togglePaymentButton(false, true)
  }
  ExecutePurchase = () => {

    let userId = firebase.auth().currentUser.uid;
    let userRef = firebase.database().ref("users").child(userId);
    userRef.child('funds').transaction((funds) => {
      return funds - this.props.totalPrice
    })
  }

  render() {
    return (this.props.loading ? (<div className={classes.Board}>


      <div className={classes.BoardLeft}>
        <div className={classes.TopBoard} >
          <TopBoard
            isStarted={this.props.isStarted}
            clicked={this.props.onEmptyEditingISlip}
            generateSlip={this.props.ongenerateSlip}
            editIndex={this.props.editIndex}
            basePrice={this.props.basePrice}
          />
        </div>
        <div className={classes.PlayRow}>
          <PlayRow
            loading={this.props.loading}
            fetchPredictionsAll={this.props.onFetchPredictionsAll}
            predictions={this.props.predictions}
            toggleSelectedTile={this.props.ontoggleSelectedTile}
            slips={this.props.slips}
            basePrice={this.props.basePrice}
            checkPurchasable={this.props.onIsPurchasing}
            setPurchaseAll={this.props.onSetPurchaseAll}
            playingGames={this.props.playingGames}
            editIndex={this.props.editIndex}
            CalculateOverAllPrice={this.props.onCalculateOverAllPrice}
            toggleShowHistory={this.props.onToggleShowHistory}
          />
        </div>
      </div>
      <div className={classes.BoardRight}>
        <div className={classes.Betslip}>
          <Betslips
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
            addBetSlip={this.props.ononCopyBetslip}
            editIndex={this.props.editIndex}
            funds={this.state.funds}
            totalPrice={this.props.totalPrice}
          />
        </div>
        <div className={classes.Payment} >
          {(this.props.isPaying || this.props.isPaid) ?
            <Payment totalPrice={this.props.totalPrice} toggleshowShowReceipt={this.props.onToggleIsShowReceipt}
              isPaid={this.props.isPaid} closePayment={this.togglePaymentButton} isShowReceipt={this.props.isShowReceipt}
              gamesCount={this.props.slips.length} setIsPaying={this.props.onSetIsPaying}
              receipts={this.props.receipts}
            />
            : null}
        </div>
        <div className={classes.ButtonsAndReceipt}>
          {(!this.props.isPaying && !this.props.isPaid) ?
            <div>
              <div className={classes.PayButtons}>
                <Button
                  disabled={this.props.totalPrice <= 0|| (firebase.auth().currentUser &&this.state.funds < this.props.totalPrice)}
                  variant="success"
                  className={classes.PayButton}
                  onClick={() => this.togglePaymentButton(true, false)}

                >
                  PAY
                  {" "}

                  { "₦" + addCommaToAmounts(this.props.totalPrice.toString(10))}

                </Button>
                {(this.state.funds < this.props.totalPrice && firebase.auth().currentUser) ? <div>
                  <div style={{ color: 'red', textAlign: 'center', background: 'grey', padding: '10px 0', marginBottom: '10px' }}>Sorry, you do not have enough funds to make the purchase</div>
                  <div><Button className={classes.TransferButton}> <ArrowRight style={{ fontWeight: 'bolder' }} size="20" /> GO TO FUNDS TRANSFER</Button></div>
                </div> : null}
                <Modal show= {this.state.showModalSignin} modalClosed = {this.cancelLoginPopup}> 
                  <LoginModal setLoggedInUser= {this.props.onSetLoggedInUser}
                   setIsPaying = {this.props.onSetIsPaying} setIsLoggedIn={this.props.onSetIsLoggedIn} 
                  setIsPaid={this.props.onSetIsPaid} cancelLoginPopup = {this.cancelLoginPopup}
                  />
                  </Modal>
              </div>
            </div>

            : this.props.isPaying ?
              <div> <Button
                disabled={!this.props.purchaseAll}
                variant="success"
                onClick={this.confirmPurchase}
                className={classes.ConfrimePayments}
              >
                CONFIRM {" "}
                {this.props.purchaseAll ? "₦" + addCommaToAmounts(this.props.totalPrice.toString(10)) : "₦0"}
              </Button>

              </div>
              : this.props.isShowReceipt ?
                <div className={classes.Receipts}>
                  <Receipts receipts={this.props.receipts}
                    basePrice={this.props.basePrice} gameDate={this.props.gameDate} />
                </div>
                : null}
        </div>

      </div>
    </div>
    )
      : <div><Spinner /></div>

    );
  }
}
const mapstateToProps = (state) => {
  return {
    hourToNextDay: state.config.hourToNextDay,
    isFACup: state.config.isFACup,
    isFACupNextWeek: state.config.isFACupNextWeek,
    daysOffset: state.config.daysOffset,
    daysOffsetNextWeek: state.config.daysOffsetNextWeek,
    kickOffTime: state.config.kickOffTime,

    gameDate: state.board.gameDate,
    evaluationDate: state.board.evaluationDate,
    gameDateRaw: state.board.gameDateRaw,
    loading: state.board.loading,
    showFunds: state.board.showFunds,
    isShowReceipt: state.board.isShowReceipt,
    receipts: state.board.receipts,
    basePrice: state.config.basePrice,
    slips: state.board.slips,
    playingGames: state.board.playingGames,
    totalPrice: state.board.totalPrice,
    editIndex: state.board.editIndex,
    purchaseAll: state.board.purchaseAll,
    isStarted: state.board.isStarted,
    isPaying: state.board.isPaying,
    isPaid: state.board.isPaid,
    predictions: state.pred.predictions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSetBoard: (isFACup, kicOffTime, kickOfftime) => dispatch(actions.setBoard(isFACup, kicOffTime, kickOfftime)),
    onResetReduxBoard: () => dispatch(actions.resetReduxBoard()),
    // onToggleShowFunds: () => dispatch(actions.toggleShowFunds()),
    onToggleIsShowReceipt: () => dispatch(actions.toggleIsShowReceipt()),
    onSetReceipt: () => dispatch(actions.setReceipt()),
    ontoggleSelectedTile: (slipIndex, gameIndex, sideIndex, side) =>
      dispatch(
        actions.toggleSelectedTile(slipIndex, gameIndex, sideIndex, side)
      ),
    ononCopyBetslip: (postion) => dispatch(actions.copyBetslip(postion)),
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
    onCalculateOverAllPrice: (slip, game, side, basePrice) =>
      dispatch(actions.calculateOverAllPrice(slip, game, side, basePrice)),
    ongenerateSlip: (amount, slipIndex, basePrice) =>
      dispatch(actions.generateSlip(amount, slipIndex, basePrice)),
    onToggleShowHistory: (gameIndex) =>
      dispatch(actions.toggleShowHistory(gameIndex)),
    onSetIsPaying: (isPaying) =>
      dispatch(actions.setIsPaying(isPaying)),
    onSetIsPaid: (isPaid) =>
      dispatch(actions.setIsPaid(isPaid)),

    onFetchPredictionsAll: (FixturesList, gameIndex) =>
      dispatch(actions.fetchPredictionsAll(FixturesList, gameIndex)),
      onSetIsLoggedIn: (value) => dispatch(actions.setIsLoggedIn(value)),
      onSetLoggedInUser: (username, password) => dispatch(actions.setLoggedInUser(username, password)),
     
  };
};

export default connect(mapstateToProps, mapDispatchToProps)(WithErrorHandler(Board, axios));
