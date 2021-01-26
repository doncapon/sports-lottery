import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.css';
import Landing from './components/UI/LandingPage/landing';
import Navs from './components/UI/Navbar/Navs'
import classes from './App.module.css';
import * as actions from './store/actions/index'
import { connect } from 'react-redux'

import AcceptACard from './containers/CardPayments/AcceptACard/AcceptACard';
import ResultPage from './containers/Board/ResultPage';
import { IdleTimeoutModal } from './components/UI/IdleTimeoutModal/IdleTimeoutModal';
import IdleTimer from 'react-idle-timer';
import Board from './containers/Board/Board';
import Signup from './components/loginLogout/signup/signup';



class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      timeout: 1000 * 10 * 1,
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
      this.props.history.push("/")

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
    this.setState({ showModal: false })
    this.props.onSetIsLoggedIn(false);
    this.props.history.push("/")
  }

  render() {

    return (
      <div className={classes.App}>
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={this.state.timeout} />

        <div className={classes.Navs}><Navs funds={this.props.funds}
          loggedIn={false} setUsername={this.props.onSetUsername} loginSuccess= {this.props.loginSuccess}
          setPassword={this.props.onSetPassword} setIsLoggedIn={this.props.onSetIsLoggedIn}
          login={this.props.onLogin} isLoggedIn={this.props.isLoggedIn}
          username={this.props.username} password={this.props.password}
          showFunds={this.props.showFunds} firstName={this.props.user.name}
          toggleShowFunds={this.props.onToggleShowFunds} /></div>
        <Switch>
          <Route path="/payment" component={AcceptACard} />
          <Route path="/results" component={ResultPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Board} />
          <Route exact path="/" component={Landing} />
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
    funds: state.board.funds,

    loginSuccess:state.login.loginSuccess,
    user: state.login.user,
    username: state.login.username,
    password: state.login.password,
    isLoggedIn: state.login.isLoggedIn

  };
};
const mapDispatchToProps = (dispatch) => {
  return {

    onSetIsLoggedIn: (value) => dispatch(actions.setIsLoggedIn(value)),
    onToggleShowFunds: () => dispatch(actions.toggleShowFunds()),
    onSetPassword: (password) => dispatch(actions.setPassword(password)),
    onSetUsername: (username) => dispatch(actions.setUsername(username)),
    onLogin: (username, password) => dispatch(actions.login(username, password)),
  };
};
export default withRouter(connect(mapstateToProps, mapDispatchToProps)(App));
