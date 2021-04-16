import React, {Component} from "react";
import classes from './AcceptACard.module.css';
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
class AcceptACard extends Component {

    render(){
        if (!this.props.isLoggedIn) {
            return (
                <Redirect to="/" />
            )
        }
        return(<div className= { classes.CardWrapper}>Hello world</div>);
    }
}



const mapstateToProps = (state) => {
    return {
  
      isLoggedIn: state.login.isLoggedIn
  
    };
  };
export default connect(mapstateToProps) (AcceptACard);