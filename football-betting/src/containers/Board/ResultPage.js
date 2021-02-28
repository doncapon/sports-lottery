import { connect } from 'react-redux';
import React, { Component } from "react";
import * as actions from '../../store/actions/index';
import Results from '../../components/gameHistory/results/results';
import { Spinner } from 'react-bootstrap';

class ResultPage extends Component {
    componentDidMount(){
        if(!this.props.loading)
        this.props.onFetchResults(this.props.numberofResultsDisplayed);
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
        onFetchResults: (startDate)=> dispatch(actions.fetchResults(startDate)),
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(ResultPage);