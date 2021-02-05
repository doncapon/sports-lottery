import { connect } from 'react-redux';
import React, { Component } from "react";
import * as actions from '../../store/actions/index';
import Results from '../../components/gameHistory/results/results';

class ResultPage extends Component {
    constructor(props) {
        super(props);
        this.props.onSetUpWinners(this.props.jackpot, this.props.thirteenPercent
            , this.props.twelvePercent, this.props.elevenPercent, this.props.tenPercent,
            this.props.thirteenPieces, this.props.twelvePieces, this.props.elevenPieces,
            this.props.tenPieces);

    }
    render() {
        return <div>
            <Results daysResults={this.props.currentResults} basePrice={this.props.basePrice} gamesLength={this.props.gamesLength} thirteen={this.props.thirteen}
                twelve={this.props.twelve} eleven={this.props.eleven} ten={this.props.ten}
                thirteenPcs={this.props.thirteenPieces} twelvePcs={this.props.twelvePieces}
                elevenPcs={this.props.elevenPieces} tenPcs={this.props.tenPieces}
                isLoggedIn={this.props.isLoggedIn}
            />
        </div>
    }

}

const mapstateToProps = (state) => {
    return {
        gamesLength: state.board.gamesLength,
        basePrice: state.config.basePrice,

        loading: state.matchResults.loading,
        currentResults: state.matchResults.currentResults,
        currentSlip: state.matchResults.currentSlip,

        thirteen: state.matchResults.thirteen,
        twelve: state.matchResults.twelve,
        eleven: state.matchResults.eleven,
        ten: state.matchResults.ten,

        jackpot: state.config.jackpot,
        thirteenPieces: state.config.thirteenPieces,
        twelvePieces: state.config.twelvePieces,
        elevenPieces: state.config.elevenPieces,
        tenPieces: state.config.tenPieces,

        thirteenPercent: state.config.thirteenPercent,
        twelvePercent: state.config.twelvePercent,
        elevenPercent: state.config.elevenPercent,
        tenPercent: state.config.tenPercent,
        insertResult: state.config.insertResult,

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