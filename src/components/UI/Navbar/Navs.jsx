import React, { Component, } from "react";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Funds from '../../../components/board/funds/funds'
import Login from '../../../components/loginLogout/login/login';
import { withRouter } from 'react-router-dom';
import firebase from '../../../config/firebase/firebase';

//import Navbar from "reactjs-navbar";
import logo from "./logo.JPG";
import classes from "./Navs.module.css";

class Navs extends Component {
  state = {
    isLoading: false,
  };
  componentDidMount() {
    if (!this.state.isLoading) {
      setTimeout(() => {
        if (firebase.auth().onAuthStateChanged(user => {
          if (user && user.emailVerified) {
            if (this.props.user.funds <= 0) {
              this.props.setIsPaying(false);
              this.props.setIsPaid(false);
            }
            this.setState({ isLoading: true })
          }
        })) {
        
        }
      }, 2000);
    }

  }
  logout = () => {
    this.props.logout();
    this.props.setIsPaying(false);
    this.props.setIsPaid(false);

    if (this.props.slips !== null && this.props.slips.length > 0)
      this.props.deleteAndResetAll();
    this.props.history.push("/");
    this.props.setBoardLoading(false);
    setTimeout(()=>{
      window.location.reload();

    }, 1000)
  }

  render() {
    let firstName = this.props.firstName;
    return (
      <Navbar bg="success" expand="lg">
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="100px"
            height="50px"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
            <Nav.Link to="/play" as={NavLink}>Play</Nav.Link>
            {firebase.auth().currentUser ? <Nav.Link to="/history" as={NavLink}>My Games</Nav.Link> : null}
            <Nav.Link to="/results" as={NavLink}>Result</Nav.Link>
            {this.props.user.role === "admin" ?
              <Nav.Link to="/settings" as={NavLink}>Settings</Nav.Link>
              : null}
          </Nav>
          {this.props.isLoggedIn && this.props.user.funds >= 0 ?
            <div className={classes.LoginSection}>
              <Button className={classes.Logout} onClick={this.logout} variant="danger">Logout</Button>
              <Funds showFunds={this.props.showFunds} firstName={firstName}
                toggleShowFunds={this.props.toggleShowFunds} setIsLoggedIn={this.props.setIsLoggedIn} />
            </div>
            : <Login slips={this.props.slips} deleteAndResetAll={this.props.deleteAndResetAll} user={this.props.user}
              login={this.props.login} setForgot={this.props.setForgot} forgotPassword={this.props.forgotPassword}
              loading={this.props.loading} isLoggedIn={this.props.isLoggedIn}
            />
          }

        </Navbar.Collapse>
      </Navbar>

    );
  }
}
export default withRouter(Navs);