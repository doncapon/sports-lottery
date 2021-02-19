import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.css';
import Landing from './components/UI/LandingPage/landing';
import Navs from './components/UI/Navbar/Navs'
import classes from './App.module.css';
import * as actions from './store/actions/index'
import { connect } from 'react-redux'

import ResultPage from './containers/Board/ResultPage';
import { IdleTimeoutModal } from './components/UI/IdleTimeoutModal/IdleTimeoutModal';
import IdleTimer from 'react-idle-timer';
import Board from './containers/Board/Board';
import Transfers from './containers/Transfers/Transfers';
import ForgotPassword from './components/loginLogout/forgotPassword/forgotPassword';
import Settings from './containers/Settings/Settings';
import Signup from './containers/Signup/Signup';
import ActivateNewUser from './containers/ActivateNewUser/ActivateNewUser';
import UserPlayHistory from './components/gameHistory/userPlayHistory/UserPlayHistory';
import firebase from "./config/firebase/firebase";

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      timeout: 1000 * 60 * 15,
      showModal: false,
      isTimedOut: false,
    }

    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);


    this.handleClose = this.handleClose.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  _onAction(e) {
    this.setState({ isTimedOut: false })
  }

  _onActive(e) {
    this.setState({ isTimedOut: false })
  }

  _onIdle(e) {
    const isTimedOut = this.state.isTimedOut
    if (isTimedOut) {
      this.props.onSetIsLoggedIn(false);
      this.props.history.push("/");

    } else {
      this.setState({ showModal: true })
      this.idleTimer.reset();
      this.setState({ isTimedOut: true })

    }
  }

  handleClose() {
    this.setState({ showModal: false });

  }

  handleLogout() {
    firebase.auth().signOut().then(() => {
      this.setState({ showModal: false })
      this.props.onSetIsLoggedIn(false);
      this.props.history.push("/")
    })
  }

  render() {

    return (
      <div className={classes.App}>
        {this.props.isLoggedIn ?

          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            debounce={250}
            timeout={this.state.timeout} />
          : null}
        <div className={classes.Navs}><Navs
          loggedIn={false} setIsLoggedIn={this.props.onSetIsLoggedIn}
          setLoggedInUser={this.props.onSetLoggedInUser} isLoggedIn={this.props.isLoggedIn}
          deleteAndResetAll={this.props.onDeleteAndResetAll}
          username={this.props.username} password={this.props.password} slips={this.props.slips}
          showFunds={this.props.showFunds} firstName={this.props.user.name}
          setShowFunds={this.props.onSetShowFunds} user={this.props.user}
          toggleShowFunds={this.props.onToggleShowFunds} setEditIndex={this.props.onSetEditIndex}
          setIsPaying = {this.props.onSetIsPaying} setIsPaid = {this.props.onSetIsPaid}
        /></div>

        <Switch>
          <Route path="/transfers" component={Transfers} />
          <Route path="/results" component={ResultPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot-password/:resetLink" component={ForgotPassword} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/settings" component={Settings} />
          <Route path="/history" component={UserPlayHistory} />
          <Route path="/play" component={Board} />
          <Route path="/authentication/activate/:token" component={ActivateNewUser} />
          <Route exact path="/" component={Landing} />
          <Redirect to="/" />
        </Switch>
        {this.props.isLoggedIn ?
          <IdleTimeoutModal
            showModal={this.state.showModal}
            handleClose={this.handleClose}
            handleLogout={this.handleLogout}
          />
          : null}
      </div>
    )
  }
}

const mapstateToProps = (state) => {
  return {


    showFunds: state.board.showFunds,
    slips: state.board.slips,

    loginMessage: state.login.loginMessage,
    user: state.login.user,
    username: state.login.username,
    password: state.login.password,
    isLoggedIn: state.login.isLoggedIn,

    isFaCup: state.config.isFaCup,
    kickOffTime: state.config.kickOffTime,
    kickOffDate: state.config.kickOffDate

  };
};
const mapDispatchToProps = (dispatch) => {
  return {

    onSetIsLoggedIn: (value) => dispatch(actions.setIsLoggedIn(value)),
    onSetLoggedInUser: (username, password) => dispatch(actions.setLoggedInUser(username, password)),
    onToggleShowFunds: () => dispatch(actions.toggleShowFunds()),
    onDeleteAndResetAll: () => dispatch(actions.deleteAndResetAll()),
    onSetShowFunds: () => dispatch(actions.setShowFunds()),
    onResetReduxBoard: () =>
      dispatch(actions.resetReduxBoard()),

    onSetEditIndex: (value) =>
      dispatch(actions.setEditIndex(value)),
    onSetBoard: (isFaCup, kickOffTime, kickOffDate) =>
      dispatch(actions.setBoard(isFaCup, kickOffTime, kickOffDate)),
      
    onSetIsPaying: (isPaying) =>
    dispatch(actions.setIsPaying(isPaying)),
  onSetIsPaid: (isPaid) =>
    dispatch(actions.setIsPaid(isPaid)),

  };
};
export default withRouter(connect(mapstateToProps, mapDispatchToProps)(App));
