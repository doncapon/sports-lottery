import React, { Component } from "react";
import classes from "./landing.module.css";
import { connect } from "react-redux";
import CountDown from "../CountDown/CountDown";
import Footer from "../Footer/Footer";
import { getNextPlayDate } from '../../../shared/utility';
import firebase from '../../../config/firebase/firebase';
import { addCommaToAmounts } from "..//../../shared/utility";
import moment from "moment";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      gameDateRaw: null,
      jackpot: null,
    };
  }
  componentDidMount() {
    if (!this.state.loading) {
      this.kickOffDate = getNextPlayDate(this.props.daysOffset,
        this.props.hourToNextDay);
        this.getJackpo();
      this.setState({ gameDateRaw: this.kickOffDate + "T" + this.props.kickOffTime })
    }
    this.setState({ loading: true })
    setTimeout(() => {
      this.interval = setInterval(()=>this.getJackpo(), 30*60*1000)      
    }, 2000);
  }
  getJackpo = () => {
    firebase.database().ref("jackpots").child(moment(this.kickOffDate).format("YYYY-MM-DD"))
      .on("value", snapshot => {
        this.setState({ jackpot: snapshot.val().jackpot });
      })
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className={classes.LandingWrapper}>
        {this.state.loading ? <CountDown gamedate={this.state.gameDateRaw} /> : null}
        {this.state.jackpot? <div className={classes.Jackpot}><div className={classes.JapotText}>Jackpot: </div>{" ₦ " + addCommaToAmounts(this.state.jackpot) }</div>:null}
        <Footer />
      </div>
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
