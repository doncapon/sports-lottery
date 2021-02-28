import classes from "./UserPlayHistory.module.css";
import React, { Component } from "react";
import moment from 'moment';
import Jackpot from "../jackpotByUser/jackpotByUser";
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import firebase from '../../../config/firebase/firebase';
import _ from "lodash";
import Spinner from '../../../components/UI/Spinner/Spinner';
import { addCommaToAmounts } from '../../../shared/utility';
class UserPlayHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchesPlayed: [],
            matchResults: [],
            winAmount: [],
            loading: false,
            showHistory: [],
            numOfHits: []
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
            let inner = [];
            matches[0].games.forEach((match, k) => {
                let matchResRef = firebase.database().ref("match-results").child(match.fixture_id);
                matchResRef.once("value", snapshot => {
                    let data = Object.assign({}, snapshot.val());
                    inner.push(data)
                });
                matchResults.splice(matchResults.length,
                    matchResults.length + 1, inner)
            })
        })
        this.setState({ matchResults: matchResults });
    }
    setWinAmount = () => {

        if (this.state.winAmount.length <= 0) {

            let matchesPlayed = [...this.state.matchesPlayed];
            let matchResults = [...this.state.matchResults];
            let winAmount = [];
            if (this.state.winAmount.length <= 0 && matchResults.length > 0) {
                for (let i = 0; i < matchesPlayed.length; i++) {
                    let matchRes = matchResults.filter(res => res.fixtureId === matchesPlayed[i][0].fixture_id)[0]
                    winAmount.push(this.calculateWins(matchesPlayed[i][0], matchRes).win);
                }
                this.setState({ winAmount: winAmount });
            }
        }
    }

    setNumberOfHits = () => {

        if (this.state.winAmount.length <= 0) {

            let matchesPlayed = [...this.state.matchesPlayed];
            let matchResults = [...this.state.matchResults];
            let numOfHits = [];
            if (this.state.winAmount.length <= 0 && matchResults.length > 0) {
                for (let i = 0; i < matchesPlayed.length; i++) {
                    let matchRes = matchResults.filter(res => res.fixtureId === matchesPlayed[i][0].fixture_id)[0]
                    numOfHits.push(this.calculateWins(matchesPlayed[i][0], matchRes).hits);
                }
                this.setState({ numOfHits: numOfHits });
            }
        }
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
                        this.setState({ showHistory: myShow });
                        this.setNumberOfHits();
                        this.setWinAmount();
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
        }
    }
    componentWillUnmount() {
        firebase.database().ref("game-history").off('value', this.someCallback);
        firebase.database().ref("match-results").off('value', this.someCallback);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.matchResults.length === nextState.matchResults.length
            && this.state.matchResults.length > 0 && this.state.matchResults[0].awayGoals
        ) {
            return false;
        }
        return true;
    }
    toggleShowHistory = (index) => {
        let smallShow = [...this.state.showHistory];
        smallShow[index] = !smallShow[index];
        this.setState({ showHistory: smallShow });
    }
    translateResult = (goalHome, goalAway, status) => {
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

    calculateWins = (match, matchRes) => {
        let allFisinished = true;
        let win = "No wins";
        let sideWon = 0;

        for (let i = 0; i < matchRes.length; i++) {
            if (matchRes[i].status !== "Match Finished") {
                allFisinished = false;
                break;
            }

        }
        if (allFisinished) {
            for (let i = 0; i < matchRes.length; i++) {
                for (let k = 0; k < 3; k++) {
                    if (this.translateResult(matchRes[i].homeGoals, matchRes[i].awayGoals, matchRes[i].status)
                        === this.determineSelection(match.games[i].selections[k].selected, k)
                    ) {
                        sideWon++;
                    }
                }

            }
            let searchTerm = "";
            if (sideWon === 10) {
                searchTerm = "ten";
            } else if (sideWon === 11) {
                searchTerm = "eleven"
            } else if (sideWon === 12) {
                searchTerm = "twelve"
            } else if (sideWon === 13) {
                searchTerm = "thirteen";
            } else {
                return "No wins";
            }

            let potRef = firebase.database().ref("jackpot-win").child(match.evaluationDate).child(searchTerm);
            potRef.on("value", snapshot => {
                let data = snapshot.val();
                win = "₦" + addCommaToAmounts("" + data)
            });
        }
        return win;
    }
    submitHandler = (e) => {
        let value = e.target.value;
        let matchesPlayed = [...this.state.matchesPlayed];
        let matchesTransformed = matchesPlayed.sort((a, b) => {

            return a[0][value] < b[0][value] ? 1 : -1
        });
        this.setState({ matchesPlayed: matchesTransformed });
    }
    handleWinsOnly = () => {
        let matchesPlayed = [...this.state.matchesPlayed];
        let matchFiltered = matchesPlayed.filter(match => match[0].hits >= 10);
        this.setState({ matchesPlayed: matchFiltered });

    }
    handleAll = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let playedRef = firebase.database().ref("game-history").child(user.uid);
                playedRef.on("value", (snapshot) => {
                    let data = snapshot.val();
                    let grouped = _.groupBy(data, 'gameNumber');
                    let groupedArray = Object.keys(grouped).map(keys => grouped[keys]);
                    this.setState({ matchesPlayed: groupedArray })
                });
            }
        });
    }
    render() {
        if (!this.props.isLoggedIn)
            this.props.history.push("/");

        let matchesPlayed = [...this.state.matchesPlayed];
        let matchResults = [...this.state.matchResults];
        let userPlayHistoryTrannsformed = this.state.loading && this.state.matchResults.length > 0 ?
            matchesPlayed.map((match, k) => {
                let matchRes = matchResults.filter(res => res.fixtureId === match[0].fixture_id)[0];
                return <div className={classes.userPlayHistoryAndShare} key={k}>
                    <div className={classes.MainHeader} onClick={() => this.toggleShowHistory(k)} >
                        <div className={classes.DateHead}>Entry date : {moment(match[0].datePlayed).format("DD.MM.YYYY")}</div>
                        <div className={classes.PriceHead}>Price: {"₦" + addCommaToAmounts("" + match[0].slipPrice)}</div>
                        <div className={classes.DateHead1}>Evaluation date : {moment(match[0].evaluationDate).format("DD.MM.YYYY")}</div>
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
                                            <div className={classes.Head}>Score</div>
                                            <div className={classes.Head2}>Your Result</div>
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
                                                        <div >{this.translateResult(eachRes.homeGoals, eachRes.awayGoals, eachRes.status)}</div>
                                                    </div>
                                                    <div className={classes.Selections}>
                                                        {match[0].games[i].selections.map((select, y) =>
                                                            <div key={y} className={this.translateResult(eachRes.homeGoals, eachRes.awayGoals, eachRes.status) ===
                                                                this.determineSelection(select.selected, y) ?
                                                                classes.Winner : classes.Selected} >{this.determineSelection(select.selected, y)}</div>)}
                                                    </div>

                                                </div>
                                            })}
                                        </div>
                                        <div className={classes.AmountWon}>
                                            <div>Number of hits:  {match[0].hits}</div>
                                            <div>Amount won: {this.calculateWins(match[0], matchRes)}</div>
                                        </div>
                                    </div>
                                    <div className={classes.JackPotShare}>
                                        <Jackpot basePrice={this.props.basePrice} gameDay=
                                            {moment(match[0].evaluationDate).format("YYYY-MM-DD")}
                                            gamesLength={match[0].games.length}
                                        />
                                    </div>
                                    <div className={classes.Footer}>
                                        <h6>Game Info</h6>
                                        <div className={classes.FooterPrices}>
                                            <div className={classes.FooterPriceInner}>Price: {"₦" + addCommaToAmounts("" + match[0].slipPrice)}</div>
                                            <div>Row Price: {"₦" + addCommaToAmounts("" + match[0].basePrice)}</div>
                                        </div>
                                        <div>Played on : {moment(match[0].datePlayed).format("DD.MM.YYYY HH:mm")}</div>
                                        <div>Game Id: {match[0].gameNumber}</div>
                                    </div>
                                </div> : <Spinner />
                            }
                        </div>
                        : null}

                </div>
            })
            : <Spinner />

        return (<div className={classes.userPlayHistoryWrapper}>
            <div className={classes.OrderByHeader}>
                <form>
                    <div className={classes.WinsOnly}>
                        <div className={classes.View}>
                            VIEW
                        </div>
                        <div ><input className={classes.AllButton} type="button" value="All" onClick={this.handleAll} />
                            <input className={classes.WinsButton} type="button" value="Wins only" onClick={this.handleWinsOnly} />
                        </div>
                    </div>
                    <div>
                        <div> <select onChange={this.submitHandler} >
                            <option value="select">ORDER BY</option>
                            <option value="datePlayed">Entry date</option>
                            <option value="evaluationDate" >Evaluation date</option>
                        </select>
                        </div>
                    </div>
                </form>
            </div>
            {userPlayHistoryTrannsformed}</div>);
    }
}


const mapstateToprops = (state) => {
    return {
        //board
        gamesLength: state.board.gamesLength,

        //Config
        basePrice: state.config.basePrice,
        loading: state.config.loading,
        daysuserPlayHistory: state.board.receipts,
        resultsFrom: state.config.resultsFrom,

        insertResult: state.config.insertResult,

        //Login
        isLoggedIn: state.login.isLoggedIn

    }
};

const mapDispatchToprops = (dispatch) => {
    return {
        onFetchResults: (startDate) => dispatch(actions.fetchResults(startDate)),
    }
}
export default connect(mapstateToprops, mapDispatchToprops)(UserPlayHistory);