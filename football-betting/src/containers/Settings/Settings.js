import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Settings.module.css';
class Settings extends Component{
  
    handleSetButtonClick=()=>{
        this.props.onSetCurrentResult(this.props.slips[0]["slip_1"]);
    }
    render(){
        return(<div className= {classes.SettingsWrapper}>
            <Button onClick = {this.handleSetButtonClick} >Set Last Results</Button>
        </div>)
    }
}

const mapStateToProps = (state) =>{
    return {
        slips: state.board.slips,

    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onSetCurrentResult: (slip) =>
            dispatch(actions.setCurrentResult(slip)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);