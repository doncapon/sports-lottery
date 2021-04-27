import React, { Component } from "react";
import classes from "./landing.module.css";
import { connect } from "react-redux";
import CountDown from "../CountDown/CountDown";
import Footer from "../Footer/Footer";
import firebase from '../../../config/firebase/firebase';
import { Container } from 'react-bootstrap'
import { addCommaToAmounts, getNextPlayDate } from "..//../../shared/utility";
import moment from "moment";
import guy from '../../../assets/guy.png'
import ball from '../../../assets/ball.png'

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      gameDateRaw: null,
      jackpot: null,
      isGamesAvailable: true
    };
  }
  componentDidMount() {
    if (!this.state.loading) {
      firebase.database().ref("board").orderByChild("dateKey").limitToLast(1).once("value")
        .then(snapshot => {
          let data = Object.keys(snapshot.val())[0]
          this.kickOffDate = data;
          let kickOffDate;
          kickOffDate = getNextPlayDate(this.props.daysOffset,
            this.props.hourToNextDay);
          if (new Date(data + "T" + this.props.kickOffTime) < new Date(kickOffDate)) {
            this.setState({ isGamesAvailable: false })
          }
          this.getJackpo();
          this.setState({ gameDateRaw: this.kickOffDate + "T" + this.props.kickOffTime });

        })
    }
    this.setState({ loading: true })
    setTimeout(() => {
      this.interval = setInterval(() => this.getJackpo(), 30 * 60 * 1000)
    }, 2000);
  }
  getJackpo = () => {
    firebase.database().ref("jackpots").child(moment(this.kickOffDate).format("YYYY-MM-DD"))
      .on("value", snapshot => {
        this.setState({ jackpot: snapshot.val().jackpot });
      })
  }
  componentWillUnmount() {
    firebase.database().ref("jackpots").off();
    clearInterval(this.interval);
  }
  render() {
    return (
      <>
        <Container className={classes.wrapperLand} style={{position: 'relative'}}>
          <div >
            {this.state.loading && this.state.gameDateRaw ? <CountDown gamedate={this.state.gameDateRaw} /> : null}
           
         
           {this.state.jackpot >= 0 ? <div className={classes.Jackpot}><div className={classes.JapotText}>Jackpot: </div>{this.state.isGamesAvailable ? " ₦ " + addCommaToAmounts(this.state.jackpot) : "Sorry, No games this week"}</div> : null}
          

          </div>
          <img className={classes.ball_img} src={ball} width='200px' alt='ball' style={{position: 'absolute', right: '100px', bottom: '200px'}}/>
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

  };
};

export default connect(mapStateToProps)(Landing);
