import React, { Component } from "react";
import classes from "./landing.module.css";
import { connect } from "react-redux";
import CountDown from "../CountDown/CountDown";
import Footer from "../Footer/Footer";
import firebase from "../../../config/firebase/firebase";
import { Container } from "react-bootstrap";
import { addCommaToAmounts, getNextPlayDate, dateInYYYYMMDD } from "..//../../shared/utility";
import moment from "moment";
// import guy from '../../../assets/guy.png'
import ball from "../../../assets/ball.png";
import * as actions from '../../../store/actions/index';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      gameDateRaw: null,
      jackpot: null,
      isGamesAvailable: true,
      isResetTime: false,
      total: 0
    };
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
            this.setupJackpot(kickOffDate);
            this.props.onDeleteAndResetAll();
          }
        });
      }
      let version = process.env.REACT_APP_VERSION;
      if (this.props.version !== version) {
        this.clearCacheData();
        window.localStorage.removeItem("persist:root")
        this.props.onSetVersion(version);
        window.location.reload();
      }
    }, 1000);

    if (!this.state.loading) {
      firebase
        .database()
        .ref("board")
        .orderByChild("dateKey")
        .limitToLast(1)
        .once("value")
        .then((snapshot) => {
          let data = Object.keys(snapshot.val())[0];
          this.kickOffDate = data;
          let kickOffDate;
          kickOffDate = getNextPlayDate(
            this.props.daysOffset,
            this.props.hourToNextDay
          );
          if (
            new Date(data + "T" + this.props.kickOffTime) <
            new Date(kickOffDate)
          ) {
            this.setState({ isGamesAvailable: false });
          }
          this.getJackpot();
          this.setState({
            gameDateRaw: this.kickOffDate + "T" + this.props.kickOffTime,
          });
        });
    }
    this.setState({ loading: true });
    setTimeout(() => {
      firebase.database().ref("board").off();
      firebase.database().ref("jackpots").off();
      this.interval = setInterval(() => this.getJackpot(), 30 * 60 * 1000);
      this.interval2 = setInterval(() => window.location.reload(), 15 * 60 * 1000);
    }, 2000);


  }
  clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  };

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


  setupJackpot = (key) => {
    let jackpotData;
    firebase.database().ref("jackpots").limitToLast(1).once("value").then(snapshot => {
      let data = snapshot.val();
      jackpotData = Object.keys(data).map(key => {
        return data[key];
      })
      let total = 0;
      if (jackpotData[0].tenUser === 0) {
        let percent = this.props.tenPercent * jackpotData[0].jackpot;
        total += percent;
      }

      if (jackpotData[0].elevenUser === 0) {
        let percent = this.props.elevenPercent * jackpotData[0].jackpot;
        total += percent;
      }
      if (jackpotData[0].twelveUser === 0) {
        let percent = this.props.twelvePercent * jackpotData[0].jackpot;
        total += percent;
      }
      if (jackpotData[0].thirteenUser === 0) {
        let percent = this.props.thirteenPercent * jackpotData[0].jackpot;
        total += percent;
      }
      firebase.database().ref("jackpots").child(key).on("value", snapshot => {
        let data = snapshot.val();
        setTimeout(() => {
          if (data === null) {
            firebase.database().ref("jackpots").child(key).set({
              jackpot: total,
              tenUser: 0,
              elevenUser: 0,
              twelveUser: 0,
              thirteenUser: 0
            })
          }
        }, 1000);
        firebase.database().ref("jackpots").off();
        firebase.database().ref("board").off();
        return null;
      })
    });
  }

  getJackpot = () => {
    let data = null;
    firebase.database().ref("jackpots").limitToLast(1).on("value", snapshot => {
      data = Object.keys(snapshot.val())[0]
      firebase
        .database()
        .ref("jackpots")
        .child(moment(data).format("YYYY-MM-DD"))
        .on("value", (snapshot) => {
          this.setState({ jackpot: snapshot.val().jackpot });
        });
    })
  };
  componentWillUnmount() {
    firebase.database().ref("jackpots").off();
    clearInterval(this.interval);
    clearInterval(this.interval2);
  }
  render() {
    return (
      <>
        <Container
          className={classes.wrapperLand}
          style={{ position: "relative" }}
        >
          <div>
            {this.state.jackpot >= 0 && this.state.jackpot != null ? (
              <div className={classes.Jackpot}>
                <div className={classes.JapotText}>Jackpot: </div>
                {this.state.isGamesAvailable
                  ? " ₦ " + addCommaToAmounts(this.state.jackpot)
                  : "Sorry, No games this week"}
              </div>
            ) : null}

            {this.state.loading && this.state.gameDateRaw ? (
              <CountDown gamedate={this.state.gameDateRaw} />
            ) : null}

          </div>
          <img
            className={classes.ball_img}
            src={ball}
            width="200px"
            alt="ball"

          />
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gameDateRaw: state.board.gameDateRaw,
    hourToNextDay: state.config.hourToNextDay,
    daysOffset: state.config.daysOffset,
    kickOffTime: state.config.kickOffTime,
    thirteenPercent: state.config.thirteenPercent,
    twelvePercent: state.config.twelvePercent,
    elevenPercent: state.config.elevenPercent,
    tenPercent: state.config.tenPercent,
    endTime: state.config.endTime,

    version: state.board.version,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetVersion: (version) => dispatch(actions.setVersion(version)),
    onUpdateBoard: (fixturesToPush, kickOffDate) =>
      dispatch(actions.updateBoard(fixturesToPush, kickOffDate)),
    onConfigureBoard: (kickOffTime, endTime, kickOffDate) =>
      dispatch(actions.configureBoard(kickOffTime, endTime, kickOffDate)),
    // onSetCurrentResult: (index) =>
    //   dispatch(actions.setCurrentResult(index)),
    onDeleteAndResetAll: () => dispatch(actions.deleteAndResetAll()),
    onSetIsBoardSet: (isBoardSet) => dispatch(actions.setIsBoardSet(isBoardSet))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
