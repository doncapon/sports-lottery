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
            gameNumber: ''
        }

        this.setMatchResults = this.setMatchResults.bind(this);
    }

    componentWillUnmount() {
        firebase.database().ref("game-history").off();
        firebase.database().ref("match-results").off();
        firebase.database().ref("jackpot-win").off();
        this.setState({ matchResults: [] });
        this.setState({ matchesPlayed: [] });
        this.setState({ loading: false });
    }
    componentDidMount() {
        if (!this.state.loading) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user && user.emailVerified) {
                    let playedRef = firebase.database().ref("game-history").child(user.uid);
                    playedRef.once("value")
                        .then(snapshot => {
                            let data = snapshot.val();
                            let grouped = _.groupBy(data, 'gameNumber');
                            let groupedArray = Object.keys(grouped).map(keys => grouped[keys]);

                            let myShow = []
                            Object.keys(grouped).map(grp =>
                                myShow.push(false)
                            );
                            this.setMatchResults(groupedArray);
                            this.setState({ matchesPlayed: groupedArray });
                            this.setState({ showHistory: myShow });
                            this.setWinAmount();
                        });
                }
            })

        }
        this.setState({ loading: true })
    }
    setMatchResults = (gamesPlayed) => {
        let distinctGames = []
        let matchResults = [];
        for (let i = 0; i < gamesPlayed.length; i++) {
            let found = distinctGames.some(match => distinctGames.length === 0 || match.evaluationDate === gamesPlayed[i][0].evaluationDate);
            if (found === false) {
                distinctGames.splice(distinctGames.length,
                    distinctGames.length + 1, gamesPlayed[i][0]);
            }
        }

        for (let k = 0; k < distinctGames.length; k++) {
            let matchResRef = firebase.database().ref("match-results");
            matchResRef.once("value").then(snapshot => {
                let keys = Object.keys(snapshot.val());
                keys.forEach(key => {
                    let matchData = snapshot.val()[key];
                    if (matchData.gameDay.substr(0, 10) === distinctGames[k].evaluationDate)
                        matchResults.splice(matchResults.length,
                            matchResults.length + 1, matchData);
                })
            });
        }

        setTimeout(() => {
            this.setState({ matchResults: matchResults });
        }, 2000)

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

    rseetShowHistory = () => {
        let smallShow = [...this.state.showHistory];
        let newHistory = []
        smallShow.forEach(history => {
            history = false;
            newHistory.push(history);
        });
        this.setState({ showHistory: newHistory });

    }
    toggleShowHistory = (index) => {
        let smallShow = [...this.state.showHistory];
        smallShow[index] = !smallShow[index];
        this.setState({ showHistory: smallShow });
    }
    translateResult = (goalHome, goalAway, endTime) => {
        if (Date.now() > endTime) {
            if (goalHome !== undefined && goalAway !== undefined) {
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

        } else {
            return "";
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
            return "—";
        }
    }

    calculateWins = (match, matchHits) => {
        let win = "No wins";

        let searchTerm = "";
        if (matchHits === 10) {
            searchTerm = "ten";
        } else if (matchHits === 11) {
            searchTerm = "eleven"
        } else if (matchHits === 12) {
            searchTerm = "twelve"
        } else if (matchHits === 13) {
            searchTerm = "thirteen";
        } else {
            if (match.isEvaluated) {
                return "No wins";
            }
            else {
                return "Not evaluated yet";
            }
        }

        let potRef = firebase.database().ref("jackpot-win").child(match.evaluationDate).child(searchTerm);
        potRef.on("value", snapshot => {
            let data = snapshot.val();
            win = "₦" + addCommaToAmounts("" + data)
        });
        return win;
    }
    submitHandler = (e) => {
        let value = e.target.value;
        if (value !== "select") {
            let matchesPlayed = [...this.state.matchesPlayed];
            let matchesTransformed = matchesPlayed.sort((a, b) => {

                return a[0][value] < b[0][value] ? 1 : -1
            });
            this.setState({ matchesPlayed: matchesTransformed });
        }
    }

    handleFilterByGame = (e) => {
        e.preventDefault();
        let value = e.target.value;
        this.setState({ gameNumber: value })
        let matchesPlayed = [...this.state.matchesPlayed];
        console.log(value)
        let matcheFiltered = matchesPlayed.filter(match => match[0].gameNumber.includes(value.trim()));
        this.setState({ matchesPlayed: matcheFiltered });

    }
    handleWinsOnly = () => {
        this.rseetShowHistory();
        let matchesPlayed = [...this.state.matchesPlayed];
        let matchFiltered = matchesPlayed.filter(match => match[0].hits >= 10);
        this.setState({ matchesPlayed: matchFiltered });

    }
    handleAll = () => {
        this.rseetShowHistory();
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
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

    keydown = (e) => {
        if (e.keyCode === 8) {
            window.location.reload();
        }
    }

    getMatchResults = (matchResults, match) => {
        let finalMatches = [];
        for (let i = 0; i < match.games.length; i++) {
            let res = _.filter(matchResults, res => res.fixtureId === match.games[i].fixture_id);
            finalMatches.splice(finalMatches.length, finalMatches.length + 1, res);
        }
        return finalMatches;
    }

    handleNoGames = () => {
        this.props.history.push("/play")
    }

    render() {
        if (!this.props.isLoggedIn)
            this.props.history.push("/");

        let matchesPlayed = [...this.state.matchesPlayed];
        let matchResults = [...this.state.matchResults];
        let userPlayHistoryTrannsformed = this.state.loading && matchesPlayed[0] && matchResults.length > 0 ?
            matchesPlayed.sort((a, b) => a[0]["datePlayed"] < b[0]["datePlayed"] ? 1 : -1).map((match, k) => {
                let matchRes = this.getMatchResults(matchResults, match[0]);
                return matchRes[0].homeTeam !== "" && matchRes[0].length > 0 ? <div className={classes.userPlayHistoryAndShare} key={k}>
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
                                            <div className={classes.Head2}>Your Selections</div>
                                        </div >
                                        <div className={classes.BodyMain}>
                                            {matchRes.map((eachRes, i) => {
                                                return <div key={i} className={classes.SelectionRow}>
                                                    <div className={classes.Teams}>
                                                        <div className={classes.RowNumber}>{i + 1} </div>
                                                        <div className={classes.TeamNames}>
                                                            <div>{eachRes[0].homeTeam + "  -  "}</div>
                                                            <div>{eachRes[0].awayTeam}</div>
                                                        </div>
                                                    </div>
                                                    <div className={classes.ScoreResult}>
                                                        <div className={classes.Score}>{eachRes[0].status === "Match Finished" ? eachRes[0].score.home + "-" + eachRes[0].score.away : Date.now() > moment(match[0].endTime) ? eachRes[0].status : "-"}</div>
                                                        <div >{this.translateResult(eachRes[0].homeGoals, eachRes[0].awayGoals, moment(match[0].endTime))}</div>
                                                    </div>
                                                    <div className={classes.Selections}>
                                                        {match[0].games[i].selections.map((select, y) =>
                                                            <div key={y} className={this.translateResult(eachRes[0].homeGoals, eachRes[0].awayGoals, moment(match[0].endTime)) ===
                                                                this.determineSelection(select.selected, y) ?
                                                                Date.now() > moment(match[0].endTime) ? classes.Winner : null : classes.Selected} >{this.determineSelection(select.selected, y)}</div>)}
                                                    </div>

                                                </div>
                                            })}
                                        </div>
                                        <div className={classes.AmountWon}>
                                            <div>Number of hits:  {match[0].isEvaluated ? match[0].hits : "-"}</div>
                                            <div>Amount won: {match[0].postponed === true ? "game nullified/voided - refunded" : this.calculateWins(match[0], match[0].hits)}</div>
                                        </div>
                                    </div>
                                    <div className={classes.JackPotShare}>
                                        {match[0].isEvaluated ?
                                            <Jackpot basePrice={this.props.basePrice} gameDay=
                                                {moment(match[0].evaluationDate).format("YYYY-MM-DD")}
                                                gamesLength={match[0].games.length}
                                            />
                                            : null}
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

                </div> : <Spinner />
            })
            : <div className={classes.GamesNotPlayed}><p>No Games found or played yet</p><Button className={classes.NoGameButton} onClick={this.handleNoGames}>PLAY</Button></div>

        return (<div className={classes.userPlayHistoryWrapper}>
            <div className={classes.OrderByHeader}>
                <form>
                    <div className={classes.WinsOnly}>
                        <div className={classes.View}>
                            VIEW
                        </div>
                        <div className={classes.Buttons} ><input className={classes.AllButton} type="button" value="All" onClick={this.handleAll} />
                            <input className={classes.WinsButton} type="button" value="Wins only" onClick={this.handleWinsOnly} />
                        </div>
                    </div>
                    <div className={classes.FilterByWrap}>
                        <div className={classes.FilterByWrapInner} >
                            <input onKeyDown={this.keydown} className={classes.FilterBy} onChange={this.handleFilterByGame} type="text" placeholder="filter by game number" value={this.state.gameNumber} />
                        </div>
                    </div>
                    <div className={classes.OrderByWrap}>
                        <select className={classes.OrderBy} onChange={this.submitHandler} >
                            <option value="select">ORDER BY</option>
                            <option value="datePlayed">Entry date</option>
                            <option value="evaluationDate" >Evaluation date</option>
                        </select>
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