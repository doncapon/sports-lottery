import { connect } from 'react-redux';
import React, { Component } from "react";
import WithErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import axios from "../../axios-fixtures";
import * as actions from '../../store/actions/index';
import Results from '../../components/gameHistory/results/results';
import Spinner from '../../components/UI/Spinner/Spinner';

class ResultPage extends Component {
    constructor(props) {
        super(props);
        this.props.onSetUpWinners(this.props.jackpot, this.props.thirteenPercent
            , this.props.twelvePercent, this.props.elevenPercent, this.props.tenPercent,
            this.props.thirteenPieces, this.props.twelvePieces, this.props.elevenPieces,
            this.props.tenPieces);
    }
    componentDidMount() {
        if (!this.props.loading) {
            let resultSlips = [this.props.slips[0]["slip_1"], this.props.slips[0]["slip_1"]]
            this.props.onSetCurrentResult(resultSlips);
        }
    }

    render() {

        // if (!this.props.isLoggedIn)
        //     this.props.history.push("/play");

        return !this.props.loading ? <Spinner /> : <div>
            <Results results={this.props.currentResults} basePrice={this.props.basePrice} gamesLength={this.props.gamesLength} thirteen={this.props.thirteen}
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
        slips: state.board.slips,
        gamesLength: state.board.gamesLength,
        basePrice: state.config.basePrice,

        loading: state.matchResults.loading,
        currentResults: state.matchResults.currentResults,

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

        isLoggedIn: state.login.isLoggedIn

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetCurrentResult: (fixture_id) =>
            dispatch(actions.setCurrentResult(fixture_id)),
        onSetUpWinners: (jackpot, thirteenpct, twelvepct, elevenpct, tenpct,
            thirteenPieces, twelvePieces, elevenPieces, tenPieces) =>
            dispatch(actions.setUpWinners(jackpot, thirteenpct, twelvepct, elevenpct, tenpct,
                thirteenPieces, twelvePieces, elevenPieces, tenPieces)),
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(WithErrorHandler(ResultPage, axios));