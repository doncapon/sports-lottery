import Board from './containers/Board/Board';
import { Route, Switch } from "react-router-dom";
import Navs from './components/UI/Navbar/Navs'
import { Component } from 'react';
import {connect} from 'react-redux'
import classes from './App.module.css';
import AcceptACard from './containers/CardPayments/AcceptACard/AcceptACard';
import ResultPage from './containers/Board/ResultPage';
import * as actions from './store/actions/index'
import Landing from './components/UI/LandingPage/landing';

class  App extends Component {
  
  render(){
   
    return(<div className={classes.App}>
    <div className= {classes.Navs}><Navs funds={this.props.funds} 
    loggedIn = {false} setUsername = {this.props.onSetUsername} setPassword= {this.props.onSetPassword}
    login = {this.props.onLogin} isLoggedIn= {this.props.isLoggedIn} 
    username = {this.props.username} password ={this.props.password}
     showFunds={this.props.showFunds} firstName={this.props.user.name} 
    toggleShowFunds={this.props.onToggleShowFunds}/></div>
    <Switch>
      <Route path= "/payment" component ={AcceptACard} />
      <Route path= "/results" component ={ResultPage} />
      <Route path= "/home" component ={Board} />
      <Route path= "/" component ={Landing} />
    </Switch>
  
   </div>);
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
    
    onToggleShowFunds: () => dispatch(actions.toggleShowFunds()),
    onSetPassword: (password) => dispatch(actions.setPassword(password)),
    onSetUsername: (username) => dispatch(actions.setUsername(username)),
    onLogin: (username, password) => dispatch (actions.login(username,password)),
  };
};

export default connect(mapstateToProps, mapDispatchToProps)(App);

