import React, { Component } from 'react';
import classes from './landing.module.css';
import { connect } from "react-redux";
class Landing extends Component {

    render() {

        return (
            <div className={classes.LandingWrapper}>


            </div>
        );
    }
}

const mapStateToProps =(state) =>{
    return{
        // gameDate: state.
    }
}

export default connect(mapStateToProps)(Landing);