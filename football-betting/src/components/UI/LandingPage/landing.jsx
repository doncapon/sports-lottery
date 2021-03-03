import React, { Component } from "react";
import classes from "./landing.module.css";
import { connect } from "react-redux";
import CountDown from "../CountDown/CountDown";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentDidMount = () => {
    if (!this.state.loading) {
      setTimeout(() => {
        console.log("I am in landing page", this.props.gameDateRaw);
      }, 3000);
    }
    this.setState({ loading: true });
  };
  render() {
    return (
      <div className={classes.LandingWrapper}>
        <CountDown gamedate={this.props.gameDateRaw}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // console.log("I am in landing page", this.props.gameDateRaw)
    gameDateRaw: state.board.gameDateRaw,
    // gameDate: state.
  };
};

export default connect(mapStateToProps)(Landing);
