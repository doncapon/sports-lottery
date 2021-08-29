import { connect } from 'react-redux';
import React, { Component } from "react";
import * as actions from '../../store/actions/index';
import Results from '../../components/gameHistory/results/results';
import { Spinner } from 'react-bootstrap';
import firebase from '../../config/firebase/firebase';

class ResultPage extends Component {
    componentDidMount(){
        if(!this.props.loading)
        this.props.onFetchResults(this.props.numberofResultsDisplayed);
    }
    componentWillUnmount(){
        firebase.database().ref("match-results").off();
    }
    render() {
        return  !this.props.loading? <Spinner /> : <div>
            <Results daysResults={this.props.currentResults} basePrice={this.props.basePrice}
                isLoggedIn={this.props.isLoggedIn}
            />
        </div>
    }

}

const mapstateToProps = (state) => {
    return {

        //Config
        basePrice: state.config.basePrice,
        loading: state.config.loading,
        currentResults: state.config.currentResults,
        numberofResultsDisplayed: state.config.numberofResultsDisplayed,
        insertResult: state.config.insertResult,

        //Login
        isLoggedIn: state.login.isLoggedIn

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchResults: (numberofResultsDisplayed)=> dispatch(actions.fetchResults(numberofResultsDisplayed)),
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(ResultPage);