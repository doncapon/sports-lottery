import classes from "./UserPlayHistory.module.css";
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import moment from 'moment';
import Jackpot from "../jackpot/jackpot";
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import firebase from '../../../config/firebase/firebase';
import _ from "lodash";
import Spinner from '../../../components/UI/Spinner/Spinner';
import {addCommaToAmounts} from '../../../shared/utility';
class UserPlayHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchesPlayed: [],
            matchResults: [],
            loading: false,
            showHistory: []
        }

        this.setMatchResults = this.setMatchResults.bind(this);
    }


    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let playedRef = firebase.database().ref("game-history").child(user.uid);
                playedRef.on("value", (snapshot) => {
                    let data = snapshot.val();
                    let grouped = _.groupBy(data, 'gameNumber');
                    let groupedArray = Object.keys(grouped).map(keys => grouped[keys]);

                    let myShow = []
                    Object.keys(grouped).map(grp =>
                        myShow.push(false)
                    );

                    this.setState({ matchesPlayed: groupedArray });
                    this.setState({ showHistory: myShow })
                })
            } else {

            }

        })
    }
    setMatchResults = (matchesPlayed) => {

        let matchResults = [];
        matchesPlayed.forEach((matches, i) => {
            let inner = []
            matches[0].games.forEach((match, k) => {
                let matchRes = firebase.database().ref("match-results").child(match.fixture_id);
                matchRes.once("value", snapshot => {
                    inner.splice(inner.length,
                        inner.length + 1, snapshot.val())
                });
                matchResults.splice(matchResults.length,
                    matchResults.length + 1, inner)
            })
        })
        this.setState({ matchResults: matchResults });
    }
    componentDidMount() {
        if (!this.state.loading) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    let playedRef = firebase.database().ref("game-history").child(user.uid);
                    playedRef.on("value", (snapshot) => {
                        let data = snapshot.val();
                        let grouped = _.groupBy(data, 'gameNumber');
                        let groupedArray = Object.keys(grouped).map(keys => grouped[keys]);

                        let myShow = []
                        Object.keys(grouped).map(grp =>
                            myShow.push(false)
                        );
                        this.setMatchResults(groupedArray)
                        this.setState({ matchesPlayed: groupedArray });
                        this.setState({ showHistory: myShow })
                    });
                } else {

                }

            })

        }
        this.setState({ loading: true })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.matchResults.length !== prevState.matchResults.length) {
            let groupedArray = [...this.state.matchesPlayed]
            this.setMatchResults(groupedArray);

            let height = ReactDOM.findDOMNode(this).offsetHeight;
            if (this.state.height !== height) {
                this.setState({ internalHeight: height });
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.matchResults.length === nextState.matchResults.length
            && this.state.matchResults.length > 0 && this.state.matchResults[0].awayGoals) {
            return false;
        }
        return true;
    }
    toggleShowHistory = (index) => {
        let smallShow = [...this.state.showHistory];
        smallShow[index] = !smallShow[index];
        this.setState({ showHistory: smallShow });
    }
    findSelection = (goalHome, goalAway, status) => {
        if (status === "Match Finished") {
            if (goalHome > goalAway) {
                return "H";
            } else if (goalHome < goalAway) {
                return "A";
            } else {
                return "D";
            }
        } else {
            return "-";
        }

    }
    determineSelection = (choice, position) => {
        if (choice) {
            if (position === 0) {
                return "H"
            } else if (position === 1) {
                return "D"
            } else {
                return "A";
            }
        } else {
            return "-";
        }
    }

    render() {
        let matchesPlayed = [...this.state.matchesPlayed];
        let matchResults = [...this.state.matchResults];
        let userPlayHistoryTrannsformed = this.state.loading && this.state.matchResults.length > 0 ?
            matchesPlayed.map((match, k) => {

                let matchRes = matchResults.filter(res => res.fixtureId === match[0].fixture_id)[0];
                return <div className={classes.userPlayHistoryAndShare} key={k}>
                        <div className={classes.MainHeader}>
                            <div className={classes.DateHead}>Entry date : {moment(match.gameDay).format("DD.MM.YYYY")}</div>
                            <div className={classes.PriceHead}>Price: {"₦" +addCommaToAmounts(""+match[0].slipPrice)}</div>
                            <div className={classes.DateHead}>Evaluation date : {moment(match[0].evaluationDate).format("DD.MM.YYYY")}</div>
                            <Button className={classes.BtToggle} size="sm" onClick={() => this.toggleShowHistory(k)}>
                                {!this.state.showHistory[k] ? <CaretDownFill className={classes.Icon} /> :
                                    <CaretUpFill className={classes.Icon} />} </Button>
                        </div>
                        {this.state.showHistory[k] ?
                            <div className={classes.ResultHead} >
                                {
                                    matchRes.length > 0 ? <div className={classes.userPlayHistory}>

                                        <div className={classes.ResultBody} >
                                            <div className={classes.BodyHeader}>
                                                <div className={classes.Head1}>Match</div>
                                                <div className={classes.Head}>Result</div>
                                                <div className={classes.Head}>Selection</div>
                                            </div >
                                            <div className={classes.BodyMain}>
                                                {matchRes.map((eachRes, i) => {
                                                    return <div key={i} className={classes.SelectionRow}>
                                                        <div className={classes.Teams}>
                                                            <div className={classes.RowNumber}>{i + 1} </div>
                                                            <div className={classes.TeamNames}>
                                                                <div>{eachRes.homeTeam + "  -  "}</div>
                                                                <div>{eachRes.awayTeam}</div>
                                                            </div>
                                                        </div>
                                                        <div className={classes.ScoreResult}>
                                                            <div className={classes.Score}>{eachRes.status === "Match Finished" ? eachRes.score : "-"}</div>
                                                            <div >{this.findSelection(eachRes.homeGoals, eachRes.awayGoals, eachRes.status) || "-"}</div>
                                                        </div>
                                                        <div className={classes.Selections}>
                                                            {match[0].games[i].selections.map((select, y) =>
                                                                <div key={y} className={this.findSelection(eachRes.homeGoals, eachRes.awayGoals, eachRes.status) === this.determineSelection(select.selected, y) ?
                                                                    classes.Winner : classes.Selected} >{this.determineSelection(select.selected, y)}</div>)}
                                                        </div>
                                                    </div>
                                                })}

                                            </div>

                                        </div>
                                        <div className={classes.JackPotShare}>
                                            <Jackpot basePrice={this.props.basePrice} gamesLength={this.props.gamesLength} thirteen={this.props.thirteen}
                                                twelve={this.props.twelve} eleven={this.props.eleven} ten={this.props.ten}
                                                thirteenPcs={this.props.thirteenPcs} twelvePcs={this.props.twelvePcs}
                                                elevenPcs={this.props.elevenPcs} tenPcs={this.props.tenPcs}
                                            />
                                        </div>
                                    </div> : <Spinner />
                                }
                            </div>
                            : null}

                </div>
            })
            : <Spinner />

        return (<div className={classes.userPlayHistoryWrapper}>{userPlayHistoryTrannsformed}</div>);
    }
}


const mapstateToprops = (state) => {
    return {
        //board
        gamesLength: state.board.gamesLength,


        //match results
        thirteen: state.matchResults.thirteen,
        twelve: state.matchResults.twelve,
        eleven: state.matchResults.eleven,
        ten: state.matchResults.ten,

        //Config
        basePrice: state.config.basePrice,
        loading: state.config.loading,
        daysuserPlayHistory: state.board.receipts,
        resultsFrom: state.config.resultsFrom,

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

        //Login
        isLoggedIn: state.login.isLoggedIn

    }
};

const mapDispatchToprops = (dispatch) => {
    return {
        onFetchResults: (startDate) => dispatch(actions.fetchResults(startDate)),
        onSetUpWinners: (jackpot, thirteenpct, twelvepct, elevenpct, tenpct,
            thirteenPieces, twelvePieces, elevenPieces, tenPieces) =>
            dispatch(actions.setUpWinners(jackpot, thirteenpct, twelvepct, elevenpct, tenpct,
                thirteenPieces, twelvePieces, elevenPieces, tenPieces)),
    }
}
export default connect(mapstateToprops, mapDispatchToprops)(UserPlayHistory);