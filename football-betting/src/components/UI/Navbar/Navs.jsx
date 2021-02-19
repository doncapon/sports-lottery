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
  logout = () => {
    firebase.auth().signOut().then(() => {
      this.props.deleteAndResetAll();
      this.props.setLoggedInUser({});
      this.props.setIsLoggedIn(false);
      this.props.setIsPaying(false);
      this.props.setIsPaid(false);
      this.props.history.push("/");
    }).catch((error) => {
      // An error happened.
    });
  }
  render() {
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
            <Nav.Link to="/results" as={NavLink}>Result</Nav.Link>
            {this.props.user.role === "admin" ?
              <Nav.Link to="/settings" as={NavLink}>Settings</Nav.Link>
              : null}
          </Nav>
          {this.props.isLoggedIn ?
            <div className={classes.LoginSection}>
              <Button className={classes.Logout} onClick={this.logout} variant="danger">Logout</Button>
              <Funds showFunds={this.props.showFunds} firstName={this.props.firstName}
                toggleShowFunds={this.props.toggleShowFunds} setIsLoggedIn={this.props.setIsLoggedIn} />
            </div>
            : <Login setPassword={this.props.setPassword} setIsLoggedIn={this.props.setIsLoggedIn} slips={this.props.slips}
              username={this.props.username} deleteAndResetAll={this.props.deleteAndResetAll} setLoggedInUser={this.props.setLoggedInUser} />
          }

        </Navbar.Collapse>
      </Navbar>

    );
  }
}
export default withRouter(Navs);