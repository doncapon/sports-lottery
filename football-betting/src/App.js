import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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



class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      timeout: 1000 * 10 * 1,
      showModal: false,
      isTimedOut: false
    }

    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);


    this.handleClose = this.handleClose.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  _onAction(e) {
    console.log('user did something', e)
    this.setState({ isTimedOut: false })
  }

  _onActive(e) {
    console.log('user is active', e)
    this.setState({ isTimedOut: false })
  }

  _onIdle(e) {
    console.log('user is idle', e)
    const isTimedOut = this.state.isTimedOut
    if (isTimedOut) {
      this.props.history.push('/');
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
          loggedIn={false} setUsername={this.props.onSetUsername}
          setPassword={this.props.onSetPassword} setIsLoggedIn={this.props.onSetIsLoggedIn}
          login={this.props.onLogin} isLoggedIn={this.props.isLoggedIn}
          username={this.props.username} password={this.props.password}
          showFunds={this.props.showFunds} firstName={this.props.user.name}
          toggleShowFunds={this.props.onToggleShowFunds} /></div>

        <BrowserRouter>
          <Switch>
            <Route path="/payment" component={AcceptACard} />
            <Route path="/results" component={ResultPage} />
            <Route path="/home" component={Board} />
            <Route exact path="/" component={Landing} />
          </Switch>
        </BrowserRouter>
        <IdleTimeoutModal
          showModal={this.state.showModal}
          handleClose={this.handleClose}
          handleLogout={this.handleLogout}
        />
      </div>

    )
  }

}

const mapstateToProps = (state) => {
  return {

    showFunds: state.board.showFunds,
    funds: state.board.funds,

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
export default connect(mapstateToProps, mapDispatchToProps)(App)
