import { connect } from 'react-redux';
import React, { Component } from "react";
import WithErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import axios from "../../axios-fixtures";
import * as actions from '../../store/actions/index';
import {groupArrayByDate} from '../../shared/utility';
import Results from '../../components/gameHistory/results/results';

class ResultPage extends Component {
    constructor(props) {
        super(props);
            this.props.slips[0]["slip_1"].games.forEach((game, i) => {
                this.props.onSetCurrentResult(game.fixture_id);
            });
    }
    // groupGameResults =()=>{
    //     setTimeout(() => {
    //         return groupArrayByDate(this.props.currentResult);
    //     }, 3000);

    // }

    render() {
        return <div>
            <Results results = {this.groupGameResults} />
            </div>
    }

}

const mapstateToProps = (state) => {
    return {
        slips: state.board.slips,
        currentResults: state.matchResults.currentResults,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetCurrentResult: (fixture_id) =>
            dispatch(actions.setCurrentResult(fixture_id)),
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(WithErrorHandler(ResultPage, axios));