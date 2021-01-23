import React, { Component } from "react";
import './Navs.css';
import {Navbar,Nav,Button,FormControl,Form } from 'react-bootstrap';
//import Navbar from "reactjs-navbar";
import logo from "./logo.JPG";
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
      <Navbar bg="dark" expand="lg">
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
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Result</Nav.Link>
          
          </Nav>
          <Form inline>
          <FormControl type="email" placeholder="Email" className="mr-sm-2" />
          <FormControl type="password" placeholder="password" className="mr-sm-2" />
          <Button variant="outline-success">Login</Button>
          
          <Button variant="outline-success">SignUp</Button>
          </Form>
      </Navbar.Collapse>
  </Navbar>
     
    );
  }
}
export default Navs;