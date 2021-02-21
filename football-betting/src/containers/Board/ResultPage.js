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
            <Results daysResults={this.props.currentResults} basePrice={this.props.basePrice} thirteen={this.props.thirteen}
                twelve={this.props.twelve} eleven={this.props.eleven} ten={this.props.ten}
                thirteenPercent={this.props.thirteenPercent} twelvePercent={this.props.twelvePercent}
                elevenPercent={this.props.elevenPercent} tenPercent={this.props.tenPercent}
                isLoggedIn={this.props.isLoggedIn}
            />
        </div>
    }

}

const mapstateToProps = (state) => {
    return {
        //match results
        thirteen: state.matchResults.thirteen,
        twelve: state.matchResults.twelve,
        eleven: state.matchResults.eleven,
        ten: state.matchResults.ten,

        //Config
        basePrice: state.config.basePrice,
        loading: state.config.loading,
        currentResults: state.config.currentResults,
        numberofResultsDisplayed: state.config.numberofResultsDisplayed,
        thirteenPercent: state.config.thirteenPercent,
        twelvePercent: state.config.twelvePercent,
        elevenPercent: state.config.elevenPercent,
        tenPercent: state.config.tenPercent,
        insertResult: state.config.insertResult,

        //Login
        isLoggedIn: state.login.isLoggedIn

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchResults: (startDate)=> dispatch(actions.fetchResults(startDate)),
        onSetUpWinners: (jackpot, thirteenpct, twelvepct, elevenpct, tenpct,
            thirteenPieces, twelvePieces, elevenPieces, tenPieces) =>
            dispatch(actions.setUpWinners(jackpot, thirteenpct, twelvepct, elevenpct, tenpct,
                thirteenPieces, twelvePieces, elevenPieces, tenPieces)),
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(ResultPage);