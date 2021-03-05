import React, { Component } from "react";
import classes from "./landing.module.css";
import { connect } from "react-redux";
import CountDown from "../CountDown/CountDown";
import Footer from "../Footer/Footer";
import {getNextPlayDate} from '../../../shared/utility';
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      gameDateRaw: null
    };
  }
  componentDidMount(){
    if(!this.state.loading){
      let kickOffDate = getNextPlayDate(this.props.daysOffset,
        this.props.hourToNextDay);
        this.setState({gameDateRaw: kickOffDate+"T"+this.props.kickOffTime })
    }
    this.setState({loading: true})
  }

  render() {
    return (
      <div className={classes.LandingWrapper}>
        {this.state.loading? <CountDown gamedate={this.state.gameDateRaw}/> : null}
        <Footer/>
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
