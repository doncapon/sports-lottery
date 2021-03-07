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
  // onUnload = e => {
  //   e.preventDefault();
  //   e.returnValue = 'hello';
  //   this.handleLogout();
  // }
  // componentDidMount() {
  //   window.addEventListener("beforeunload", this.onUnload);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("beforeunload", this.onUnload);
  // }
  _onAction(e) {
    this.setState({ isTimedOut: false })
  }

  _onActive(e) {
    this.setState({ isTimedOut: false })
  }

  _onIdle(e) {
    const isTimedOut = this.state.isTimedOut
    if (isTimedOut) {
      this.handleLogout();
    } else {
      this.setState({ showModal: true })
      this.idleTimer.reset();
      this.setState({ isTimedOut: true })
    }
  }

  handleClose() {
    this.setState({ showModal: false });

  }

  handleLogout = () => {
    this.props.onLogout();
    this.props.onSetIsLoggedIn(false);
    this.props.onSetIsPaying(false);
    this.props.onSetIsPaid(false);

    if (this.props.slips !== null && this.props.slips.length > 0)
      this.props.onDeleteAndResetAll();
    this.props.history.push("/");
    this.props.onSetBoardLoading(false);

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
        <div className={classes.Navs}><Navs setForgot={this.props.onSetForgot} setBoardLoading={this.props.onSetBoardLoading}
          isLoggedIn={this.props.isLoggedIn} login={this.props.onLogin} logout={this.props.onLogout}
          deleteAndResetAll={this.props.onDeleteAndResetAll} loading={this.props.loading}
          slips={this.props.slips} forgotPassword={this.props.forgotPassword}
          showFunds={this.props.showFunds} firstName={this.props.user.name}
          setShowFunds={this.props.onSetShowFunds} user={this.props.user}
          toggleShowFunds={this.props.onToggleShowFunds} setEditIndex={this.props.onSetEditIndex}
          setIsPaying={this.props.onSetIsPaying} setIsPaid={this.props.onSetIsPaid}
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
    isLoggedIn: state.login.isLoggedIn,
    forgotPassword: state.login.forgotPassword,
    loading: state.login.loading,

    isFaCup: state.config.isFaCup,
    kickOffTime: state.config.kickOffTime,
    kickOffDate: state.config.kickOffDate

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSetBoardLoading: (loading) => dispatch(actions.setBoardLoading(loading)),
    onLogout: () => dispatch(actions.logout()),
    onSetIsLoggedIn: (value) => dispatch(actions.setIsLoggedIn(value)),
    onSetForgot: (value) => dispatch(actions.setForgot(value)),
    onLogin: (email, password) => dispatch(actions.login(email, password)),
    onToggleShowFunds: () => dispatch(actions.toggleShowFunds()),
    onDeleteAndResetAll: () => dispatch(actions.deleteAndResetAll()),
    onSetShowFunds: () => dispatch(actions.setShowFunds()),
    onResetReduxBoard: () =>
      dispatch(actions.resetReduxBoard()),

    onSetEditIndex: (value) =>
      dispatch(actions.setEditIndex(value)),
    // onSetBoard: (isFaCup, kickOffTime, kickOffDate, basePrice) =>
    //   dispatch(actions.setBoard(isFaCup, kickOffTime, kickOffDate,basePrice)),

    onSetIsPaying: (isPaying) =>
      dispatch(actions.setIsPaying(isPaying)),
    onSetIsPaid: (isPaid) =>
      dispatch(actions.setIsPaid(isPaid)),

  };
};
export default withRouter(connect(mapstateToProps, mapDispatchToProps)(App));
