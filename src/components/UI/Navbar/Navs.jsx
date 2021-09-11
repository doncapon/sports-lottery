import React, { Component, } from "react";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Funds from '../../../components/board/funds/funds'
import Login from '../../../components/loginLogout/login/login';
import { withRouter } from 'react-router-dom';
import firebase from '../../../config/firebase/firebase';

//import Navbar from "reactjs-navbar";

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
            console.log(user)
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
    this.props.setForgot(false);

    if (this.props.slips !== null && this.props.slips.length > 0)
      this.props.deleteAndResetAll();
    this.props.history.push("/");
    this.props.setBoardLoading(false);
    setTimeout(() => {
      window.location.reload();
    }, 100)
  }

  render() {
    let firstName = this.props.firstName;
    return (
      <Navbar expand="lg" style={{ background: '#000' }}>
        <Navbar.Brand href="/">
          <h2 style={{ color: '#fff', fontSize: '35px' }}>Bet<small style={{ fontWeight: 'bold', color: '#63CFEA', fontSize: '35px', fontStyle: 'italic' }}>Soka</small></h2>
          {/* <img
            src={logo}
            width="100px"
            height="50px"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={classes.Toggler} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link to="/" as={NavLink} className='text-white ml-2'>Home</Nav.Link>
            <Nav.Link to="/play" as={NavLink} className='text-white ml-2'>Play</Nav.Link>
            {firebase.auth().currentUser !== null? <Nav.Link to="/history" as={NavLink} className='text-white ml-2'>My Games</Nav.Link> : null}
            <Nav.Link to="/results" as={NavLink} className='text-white ml-2'>Result</Nav.Link>
            {this.props.user.role === "admin" ?
              <Nav.Link to="/settings" as={NavLink} className='text-white ml-2'>Settings</Nav.Link>
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