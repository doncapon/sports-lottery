import React, { Component, } from "react";
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Funds from '../../../components/board/funds/funds'
import Login from '../../../components/loginLogout/login/login';
import {withRouter} from 'react-router-dom';

//import Navbar from "reactjs-navbar";
import logo from "./logo.JPG";
import classes from "./Navs.module.css";
// import Loader from "react-loader-spinner";
// import {
// //   faUsers,
//   faHome,
//   faBookOpen,
//   faGlobe,
//   faChartPie,
//   faCogs ,
//   faAnchor,
//   faDizzy,
//   faBell,
//   faGhost,
//   faFan,
//   faCarSide,
//   faJedi,
//   faAdjust,
//   faLaughBeam,
//   faKey,
//   faCheese,
//   faWater,
// } from "@fortawesome/free-solid-svg-icons";

// import "reactjs-navbar/dist/index.css";

class Navs extends Component {
  state = {
    isLoading: false,
  };
  logout = () => {
    this.props.setIsLoggedIn(false);
    if(this.props.slips !== null)
    this.props.deleteAndResetAll();
    //  return <Redirect to="/" />
    this.props.history.push("/");
  }
  render() {
    return (
      // <Navbar
      //   logo={logo}
      //   loader={<Loader type="Puff" color="#D85B5B" height={25} width={25} />}
      //   isLoading={this.state.isLoading}
      //   helpCallback={() => {
      //     window.location="/";

      //   }}
      //   menuItems={[
      //     {
      //       title: "Home",
      //       icon: faHome,
      //       isAuth: true,
      //       onClick: () => {
      //         // What you want to do...
      //         window.location="/";

      //       },
      //     },
      //     {
      //       title: "Transactions",
      //       icon: faBookOpen,
      //       isAuth: () => {
      //         // Claim authorization logic...
      //           return false;              
      //       },
      //     },
      //     {
      //       title: "Networks",
      //       icon: faGlobe,
      //       isAuth: true,
      //     },
      //     {
      //       title: "Settings",
      //       icon: faCogs,
      //       isAuth: true,
      //       subItems: [
      //         {
      //           title: "Subitem 1",
      //           icon: faAnchor,
      //           isAuth: true,
      //           onClick: () => {
      //             // What you want to do...
      //             alert("I need another cup of coffee...");
      //           },
      //         },
      //         {
      //           title: "Subitem 2",
      //           icon: faDizzy,
      //           isAuth: true,
      //           subItems: [
      //             { title: "Subitem 2-1", icon: faAdjust, isAuth: true },
      //             {
      //               title: "Subitem 2-2",
      //               icon: faBell,
      //               isAuth: true,
      //               subItems: [
      //                 {
      //                   title: "Subitem 2-2-1",
      //                   icon: faGhost,
      //                   isAuth: true,
      //                   subItems: [
      //                     {
      //                       title: "Subitem 2-2-2-1",
      //                       icon: faFan,
      //                       isAuth: true,
      //                     },
      //                     {
      //                       title: "Subitem 2-2-2-2",
      //                       icon: faCarSide,
      //                       isAuth: true,
      //                     },
      //                     {
      //                       title: "Subitem 2-2-2-3",
      //                       icon: faJedi,
      //                       isAuth: true,
      //                     },
      //                     {
      //                       title: "Subitem 2-2-2-4",
      //                       icon: faLaughBeam,
      //                       isAuth: true,
      //                     },
      //                   ],
      //                 },
      //                 {
      //                   title: "Subitem 2-2-2",
      //                   icon: faKey,
      //                   isAuth: true,
      //                 },
      //               ],
      //             },
      //             {
      //               title: "Make request",
      //               icon: faCheese,
      //               isAuth: true,
      //               onClick: () => {
      //                 // What you want to do...
      //                 this.setState({ isLoading: true }, () =>
      //                   setTimeout(() => {
      //                     this.setState({ isLoading: false });
      //                   }, 3000)
      //                 );
      //               },
      //             },
      //           ],
      //         },
      //         {
      //           title: "Subitem 3",
      //           icon: faWater,
      //           isAuth: () => {
      //             // Claim authorization logic...
      //             return false;
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       title: "Reports",
      //       icon: faChartPie,
      //       isAuth: true,
      //     },
      //   ]}
      // />
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
            <Nav.Link to="/play" as={NavLink}>Play</Nav.Link>
            <Nav.Link to="/results" as={NavLink}>Result</Nav.Link>

          </Nav>
          <Dropdown>
            {/* <Dropdown.Toggle variant="success" id="dropdown-basic" style={{marginRight: "80px"}}>
              Wallet
            </Dropdown.Toggle> */}

            <Dropdown.Menu>
              <Dropdown.Item to="/transfers" as={NavLink}>Transfer funds</Dropdown.Item>
              <Dropdown.Item to="/results" as={NavLink}>Weekly Results</Dropdown.Item>
              <Dropdown.Item to="/gamehistory" as={NavLink}>Game History</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {this.props.isLoggedIn ?
            <div className={classes.LoginSection}>
              <Button className={classes.Logout} onClick={this.logout} variant="danger">Logout</Button>
              <Funds funds={this.props.funds} showFunds={this.props.showFunds} firstName={this.props.firstName}
                toggleShowFunds={this.props.toggleShowFunds} setIsLoggedIn={this.props.setIsLoggedIn} />
            </div>
            : <Login setPassword={this.props.setPassword} setIsLoggedIn= {this.props.setIsLoggedIn}
              username={this.props.username}  setLoggedInUser= {this.props.setLoggedInUser} />
          }

        </Navbar.Collapse>
      </Navbar>

    );
  }
}
export default withRouter( Navs);