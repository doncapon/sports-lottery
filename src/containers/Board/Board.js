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
import { addCommaToAmounts, dateInYYYYMMDD, getNextPlayDate } from '../../shared/utility';
import firebase from '../../config/firebase/firebase';
import Modal from "../../components/UI/Modal/Modal";
import LoginModal from '../../components/loginLogout/modalLogin/loginModal';
import moment from 'moment';

class Board extends Component {

  state = {
    showModalSignin: false,
    funds: 0,
    isGamesAvailable: true,
    loading: false,
    eventDate: null,
    endTime: null,
    
    tenWinners: 0,
    elevenWinners: 0,
    twelveWinners: 0,
    thirteenWinners: 0,
  }
  constructor(props) {
    super(props);
    if (!this.props.loading) {
      this.props.onSetBoard(this.props.basePrice);
      this.state.funds = this.props.user.funds;
    }
  }

  componentDidMount() {
    setInterval(() => {
      let kickOffDate;
      kickOffDate = getNextPlayDate(this.props.daysOffset,
        this.props.hourToNextDay);
      let gameTime = kickOffDate + "T" + this.props.kickOffTime;
      if (moment(new Date()).isSameOrAfter(moment(gameTime))) {
        firebase.database().ref("board").child(kickOffDate).on("value", snapshot => {
          if (snapshot.val() === null) {
            this.handlecConfigureBoard();
            this.setupJackpot(kickOffDate)
            this.props.onSetCurrentResult(1);
            this.props.onDeleteAndResetAll();
          }
        });
      }
 if (moment().format("yyyy-MM-dd:hh:mm:ss") === (moment(/*this.state.endTime */ "2021-08-29T16:51:00+00:00").add(2, "hours").format("yyyy-MM-dd:hh:mm:ss"))) {
        setTimeout(()=>{
          this.props.onSetCurrentResult(0);
        }, 2000)
        setTimeout(()=>{
          this.handleUpdateBoard();

        }, 5000)
        setTimeout(()=>{
          this.shareJackpot();

        },10000)
        setTimeout(()=>{
          this.fillJackpotWithPreviousLosses();
        },15000)
      }
    }, 1000);

    if (!this.state.loading) {
      setTimeout(() => {
        this.setState({ funds: this.props.user.funds });
      }, 1000);

      firebase.database().ref("board").limitToLast(2).on("value", snapshot => {
        let endDate = Object.keys(snapshot.val())[0];
        let endTime = endDate + "T" + this.props.endTime;
        this.setState({ endTime: endTime })
      });

      firebase.database().ref("board").orderByChild("dateKey").limitToLast(1).once("value")
        .then(snapshot => {
          let key = Object.keys(snapshot.val())[0];
          let kickOffDate;
          kickOffDate = getNextPlayDate(this.props.daysOffset,
            this.props.hourToNextDay);
          if (new Date(key + "T" + this.props.kickOffTime) < new Date(kickOffDate)) {
            this.setState({ isGamesAvailable: false })
          }
          this.setState({ eventDate: key + "T" + this.props.kickOffTime })
        });

    }
    this.setState({ loading: true });
  }

  componentWillUnmount() {
    firebase.database().ref("jackpots").off();
    firebase.database().ref("board").off();

  }
  calculaterWiinerAmount = () => {
    firebase.database().ref("board").limitToLast(2).on("value", snapshot => {
      let gameDate = Object.keys(snapshot.val())[0];

      let jackpotRef = firebase.database().ref("jackpots").child(gameDate);
      jackpotRef.on("value", snapshot => {
        let data = snapshot.val();
        let thirteen = 0;
        let twelve = 0;
        let eleven = 0;
        let ten = 0;
        if (data !== null) {
          if (data.jackpot > 0) {
            if (data.thirteenUser > 0) {
              thirteen = (data.jackpot * this.props.thirteenPercent) / data.thirteenUser;
              firebase.database().ref("jackpot-win").child(gameDate).update({ thirteen: thirteen });
            } else {
              firebase.database().ref("jackpot-win").child(gameDate).update({ thirteen: 0 });
            }
            if (data.twelveUser > 0) {
              twelve = (data.jackpot * this.props.twelvePercent) / data.twelveUser;
              firebase.database().ref("jackpot-win").child(gameDate).update({ twelve: twelve });
            } else {
              firebase.database().ref("jackpot-win").child(gameDate).update({ twelve: 0 });
            }
            if (data.elevenUser > 0) {
              eleven = (data.jackpot * this.props.elevenPercent) / data.elevenUser;
              firebase.database().ref("jackpot-win").child(gameDate).update({ eleven: eleven });
            } else {
              firebase.database().ref("jackpot-win").child(gameDate).update({ eleven: 0 });
            }
            if (data.tenUser > 0) {
              ten = (data.jackpot * this.props.tenPercent) / data.tenUser;
              firebase.database().ref("jackpot-win").child(gameDate).update({ ten: ten });
            } else {
              firebase.database().ref("jackpot-win").child(gameDate).update({ ten: 0 });
            }
          }
        }
        firebase.database().ref("jackpots").off();
        firebase.database().ref("jackpot-win").off();
      });
    });

  }


  setMatchResults = (gameDate) => {
    let matchResults = [];
    let matchResRef = firebase.database().ref("match-results");
    matchResRef.once("value").then(snapshot => {
      let keys = Object.keys(snapshot.val());
      keys.forEach(key => {
        let matchData = snapshot.val()[key];
        if (matchData.gameDay.substr(0, 10) === gameDate){
          matchResults.splice(matchResults.length,
            matchResults.length + 1, matchData);
        }  
      })
    });

    return matchResults;
  }

  calculateWins = (match, matchRes) => {
    let allNotFinished = 0;
    let sideWon = 0;
    for (let i = 0; i < matchRes.length; i++) {

      if (matchRes[i].status !== "Match Finished" && matchRes[i].status !== undefined) {
        allNotFinished++;
      }
    }

    for (let i = 0; i < matchRes.length; i++) {
      for (let k = 0; k < 3; k++) {
        let left = this.translateResult(matchRes[i].homeGoals, matchRes[i].awayGoals, matchRes[i].status);
        let right = this.determineSelection(match.games[i].selections[k].selected, k,);
        if (left === right && left !== "-" && right !== "-") {
          sideWon++;
        }
      }
    }
    if (allNotFinished === 1) {
      sideWon++;
    }
    return sideWon;
  }
  translateResult = (goalHome, goalAway, status) => {
    if (status === "Match Finished") {
      if (goalHome > goalAway) {
        return "H";
      } else if (goalHome < goalAway) {
        return "A";
      } else {
        return "D";
      }
    } else {
      return "-";
    }

  }
  determineSelection = (choice, position) => {
    if (choice) {
      if (position === 0) {
        return "H"
      } else if (position === 1) {
        return "D"
      } else {
        return "A";
      }
    } else {
      return "-";
    }
  }

  handleUpdateBoard = () => {
    firebase.database().ref("board").orderByChild("dateKey").limitToLast(2)
      .once("value").then(snapshot => {
        let date = Object.keys(snapshot.val())[0];
        let data = snapshot.val()[date];
        let fixturesToPush = [];
        Object.keys(data).map(key => {
          Object.keys(data[key]).map(keys2 => {
            if (keys2 === "fixture_id") {
              fixturesToPush.push(data[key][keys2])
            }
            return null;
          })
          return null;
        })

        this.props.onUpdateBoard(fixturesToPush, date)
      })

  }
  shareJackpot = (e) => {
    firebase.database().ref("board").limitToLast(2).on("value", snapshot => {
      let gameDate = Object.keys(snapshot.val())[0];
      let dataBoard = snapshot.val()[gameDate]
      let matchesPlayedRef = firebase.database().ref("game-history");
      let boardRef = firebase.database().ref("board").child(gameDate);

      setTimeout(() => {
        if (!dataBoard.isPaid) {
        matchesPlayedRef.once("value").then(snapshot => {
          let data = snapshot.val();
          Object.keys(data).map(keys => {
            let matches = data[keys];
            return Object.keys(matches).map(key => {
              let matchesPlayed = matches[key];
              let endDate = moment (new Date(gameDate + "T" + this.props.kickOffTime));
              let tempDate = new Date(gameDate + "T" + this.props.kickOffTime);

              tempDate.setDate(tempDate.getDate() - 7)
              let startDate = moment(tempDate);
              let matchDate = moment(new Date(matchesPlayed.datePlayed));
              if (matchesPlayed.evaluationDate === gameDate) {
                if (matchDate.isSameOrBefore(endDate)
                  && matchDate.isSameOrAfter(startDate)) {
                  if (!matchesPlayed.isEvaluated) {
                  let matchRes = this.setMatchResults(gameDate);
                  let hits
                  setTimeout(() => {
                    hits = this.calculateWins(matchesPlayed, matchRes);
                  }, 500)
                  setTimeout(() => {
                    firebase.database().ref("game-history").child(matchesPlayed.userId)
                      .child(matchesPlayed.gameNumber)
                      .update({ hits: hits });
                    if (hits === 10) {
                      this.setState({ tenWinners: this.state.tenWinners + 1 });
                    } else if (hits === 11) {
                      this.setState({ elevenWinners: this.state.elevenWinners + 1 });
                    } else if (hits === 12) {
                      this.setState({ twelveWinners: this.state.twelveWinners + 1 });
                    } else if (hits === 13) {
                      this.setState({ thirteenWinners: this.state.thirteenWinners + 1 });
                    }
                    firebase.database().ref("game-history").child(matchesPlayed.userId)
                      .child(matchesPlayed.gameNumber).update({ isEvaluated: true })
                    firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).update({ tenUser: this.state.tenWinners })
                    firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).update({ elevenUser: this.state.elevenWinners })
                    firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).update({ twelveUser: this.state.twelveWinners })
                    firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).update({ thirteenUser: this.state.thirteenWinners })
                  }, 2000)
                }
              }
            }
              return null;
          })
        });
        setTimeout(() => {
          firebase.database().ref("jackpots").off();
          firebase.database().ref("match-results").off();
        firebase.database().ref("game-history").off();

        }, 2000)
      });
      setTimeout(() => {
        this.calculaterWiinerAmount();
        this.setState({ disable: false });
      }, 30000); //Subject to change with huge data possible to 1 hour

      boardRef.update({ isPaid: true })
      firebase.database().ref("board").off();
      }
    }, 2000)
  });

}

togglePaymentButton = (paying, paid) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
      this.props.onSetIsPaying(paying);
      this.props.onSetIsPaid(paid);
    } else {
      this.setState({ showModalSignin: true })
    }
    this.scrollToBottom();
  })
}

cancelLoginPopup = () => {
  this.setState({ showModalSignin: false })
}

confirmPurchase = () => {
  this.ExecutePurchase();
  this.props.onSetReceipt(this.state.eventDate, this.props.endTime);
  this.togglePaymentButton(false, true)
}
ExecutePurchase = () => {
  let userId = firebase.auth().currentUser.uid;
  this.updateJackpot(this.props.totalPrice);
  this.updateDividend(this.props.totalPrice);
  let userRef = firebase.database().ref("users").child(userId);
  userRef.child('funds').transaction((funds) => {
    this.props.onSetFunds(funds - this.props.totalPrice)
    return funds - this.props.totalPrice
  });
  userRef.off();
}

setupJackpot = (key) => {

  firebase.database().ref("jackpots").child(key).on("value", snapshot => {
    let data = snapshot.val();
    setTimeout(() => {
      if (data === null) {
        firebase.database().ref("jackpots").child(key).set({
          jackpot: 0,
          tenUser: 0,
          elevenUser: 0,
          twelveUser: 0,
          thirteenUser: 0
        });
      }
    }, 1000);
    firebase.database().ref("jackpots").off();
    return null;
  })
}
fillJackpotWithPreviousLosses = () => {
  let jackpotData;
  firebase.database().ref("jackpots").limitToLast(2).once("value").then(snapshot => {
    let prevJackPotDate = Object.keys(snapshot.val())[0];
    let CurrentJackPotDate = Object.keys(snapshot.val())[1];
    let bothDateDate = snapshot.val();
    let total;

    jackpotData = bothDateDate[prevJackPotDate];

    firebase.database().ref("jackpots").child(CurrentJackPotDate).once("value").then(snapshot => {
      total = snapshot.val().jackpot;

    });
    setTimeout(() => {

      if (jackpotData.tenUser === 0) {
        let percent = this.props.tenPercent * jackpotData.jackpot;
        total += percent;
      }

      if (jackpotData.elevenUser === 0) {
        let percent = this.props.elevenPercent * jackpotData.jackpot;
        total += percent;
      }
      if (jackpotData.twelveUser === 0) {
        let percent = this.props.twelvePercent * jackpotData.jackpot;
        total += percent;
      }
      if (jackpotData.thirteenUser === 0) {
        let percent = this.props.thirteenPercent * jackpotData.jackpot;
        total += percent;
      }
    }, 2000)

    setTimeout(() => {
      firebase.database().ref("jackpots").child(CurrentJackPotDate).update({
        jackpot: total
      })
    }, 3000);
    firebase.database().ref("jackpots").off();
    firebase.database().ref("board").off();
    return null;
  });
}

updateJackpot = (totalPrice) => {
  firebase.database().ref("jackpots").child(dateInYYYYMMDD(this.props.gameDate)).child("jackpot").transaction(Jackpots => {
    return Jackpots + (totalPrice / 2);
  })
}
updateDividend = (totalPrice) => {
  firebase.database().ref("dividends").child(dateInYYYYMMDD(this.props.gameDate)).child("dividend").transaction(dividends => {
    return dividends + (totalPrice / 2);
  })
}

handlecConfigureBoard = () => {
  this.props.onSetIsBoardSet(false);
  let kickOffDate;
  kickOffDate = getNextPlayDate(this.props.daysOffset,
    this.props.hourToNextDay);
  setTimeout(() => {
    this.props.onConfigureBoard(
      this.props.kickOffTime, this.props.endTime, dateInYYYYMMDD(kickOffDate)); //this.state.gameDate
  }, 3000);
}

scrollToBottom = () => {
  this.messagesEnd.scrollIntoView({ behavior: "smooth" });
}

render() {
  return (this.props.loading ? (
    // this.state.isGamesAvailable? 
    <div className={classes.Board}>
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
            basePrice={this.props.basePrice}
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
          <div style={{ float: "left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <div className={classes.ButtonsAndReceipt}>
          {(!this.props.isPaying && !this.props.isPaid) ?
            <div>
              <div className={classes.PayButtons}>
                <Button
                  disabled={this.props.totalPrice <= 0 || (this.props.isLoggedIn && this.state.funds < this.props.totalPrice)}
                  variant={this.props.purchaseAll? "success": "danger"}
                  className={classes.PayButton}
                  onClick={() => this.togglePaymentButton(true, false)}

                >
                  {this.props.purchaseAll? "PAY ₦" + addCommaToAmounts(this.props.totalPrice.toString(10)) : "Incomplete Slip(s)"}

                </Button>
                {(this.state.funds < this.props.totalPrice && this.props.isLoggedIn) ? <div>
                  <div style={{
                    color: 'red', textAlign: 'center', background:
                      'grey', padding: '10px 0', marginBottom: '10px'
                  }}>Sorry, you do not have enough funds to make the purchase</div>
                  <div><Button className={classes.TransferButton}
                    onClick={() => (this.props.history.push("/transfers"))}> <ArrowRight style={{ fontWeight: 'bolder' }} size="20" /> GO TO FUNDS TRANSFER</Button></div>
                </div> : null}
                <Modal show={this.state.showModalSignin} modalClosed={this.cancelLoginPopup}>
                  <LoginModal setLoggedInUser={this.props.onSetLoggedInUser}
                    setIsPaying={this.props.onSetIsPaying} setIsLoggedIn={this.props.onSetIsLoggedIn}
                    setIsPaid={this.props.onSetIsPaid} cancelLoginPopup={this.cancelLoginPopup}
                  />
                </Modal>
              </div>
            </div>

            : this.props.isPaying ?
              <div> <Button
                disabled={!this.props.purchaseAll}
                variant={ "success"}
                onClick={this.confirmPurchase}
                className={classes.ConfrimPayments}
              >
                {"CONFIRM ₦" + addCommaToAmounts(this.props.totalPrice.toString(10)) }
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
    // : <div style={{background: 'skyblue', paddingLeft: '10vw'}}>Sorry there are no games available for this week</div>
  )
    : <div><Spinner /></div>

  );
}
}
const mapstateToProps = (state) => {
  return {
    hourToNextDay: state.config.hourToNextDay,
    daysOffset: state.config.daysOffset,
    kickOffTime: state.config.kickOffTime,
    endTime: state.config.endTime,
    thirteenPercent: state.config.thirteenPercent,
    twelvePercent: state.config.twelvePercent,
    elevenPercent: state.config.elevenPercent,
    tenPercent: state.config.tenPercent,

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

    isLoggedIn: state.login.isLoggedIn,
    user: state.login.user,

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSetFunds: (funds) => dispatch(actions.setFunds(funds)),
    onSetBoard: (basePrice) =>
      dispatch(actions.setBoard(basePrice)),
    onResetReduxBoard: () => dispatch(actions.resetReduxBoard()),
    // onToggleShowFunds: () => dispatch(actions.toggleShowFunds()),
    onToggleIsShowReceipt: () => dispatch(actions.toggleIsShowReceipt()),
    onSetReceipt: (gameDay, endTime) => dispatch(actions.setReceipt(gameDay, endTime)),
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
    onAddEmptySlip: (basePrice) => dispatch(actions.addEmptySlip(basePrice)),
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
    onConfigureBoard: (kickOffTime, endTime, kickOffDate) =>
      dispatch(actions.configureBoard(kickOffTime, endTime, kickOffDate)),
    onSetIsBoardSet: (isBoardSet) => dispatch(actions.setIsBoardSet(isBoardSet)),

    onSetCurrentResult: (index) =>
      dispatch(actions.setCurrentResult(index)),
    onUpdateBoard: (fixturesToPush, date) => dispatch(actions.updateBoard(fixturesToPush, date))

  };
};

export default connect(mapstateToProps, mapDispatchToProps)(WithErrorHandler(Board, axios));
