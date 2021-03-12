import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Settings.module.css';
import { getNextPlayDate, dateInYYYYMMDD } from '../../shared/utility';
import firebase from '../../config/firebase/firebase';
import moment from 'moment';
class Settings extends Component {
    state = {
        disable: false,
        gameDate: '',
        loading: false,
        tenWinners: 0,
        elevenWinners: 0,
        twelveWinners: 0,
        thirteenWinners: 0,
    }
    componentDidMount() {
        if (!this.state.loading) {
            this.setState({ gameDate: this.props.gameDate })
        }
        this.setState({ loading: true })
    }
    handlecCnfigureBoard = () => {
        let kickOffDate;
        kickOffDate = getNextPlayDate(this.props.daysOffset,
            this.props.hourToNextDay);
        this.props.onConfigureBoard(this.props.isFACup,
            this.props.kickOffTime, dateInYYYYMMDD(kickOffDate)); //this.state.gameDate
    }
    handleSetResultss = () => {
        this.props.onSetCurrentResult(this.props.slips[0]["slip_1"]);
        alert("results hae been set or updated")
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
        let allFinished = 0;
        let sideWon = 0;
        for (let i = 0; i < matchRes.length; i++) {
            if (matchRes[i].status !== "Match Finished" && matchRes[i].status !== undefined) {
                allFinished++;
                break;
            }
        }
        for (let i = 0; i < matchRes.length; i++) {
            for (let k = 0; k < 3; k++) {
                console.log("yeah yeah");
                let left = this.translateResult(matchRes[i].homeGoals, matchRes[i].awayGoals, matchRes[i].status);
                let right = this.determineSelection(match.games[i].selections[k].selected, k,);
                console.log("right", left, right)
                if (left === right && left !== "-" && right !== "-") {
                    sideWon++;
                }
            }
        }
        if (allFinished === 1) {
            sideWon++;
        }

        return sideWon;
    }
    calculaterWiinerAmount = () => {
        let jackpotRef = firebase.database().ref("jackpots").child(
            dateInYYYYMMDD(this.state.gameDate));
        jackpotRef.on("value", snapshot => {
            let data = snapshot.val();
            let thirteen = 0;
            let twelve = 0;
            let eleven = 0;
            let ten = 0;
            if (data !== null) {
                if (data.jackpot > 0) {
                    if (data.thirteenUser > 0) {
                        console.log("get me out")
                        thirteen = (data.jackpot * this.props.thirteenPercent) / data.thirteenUser;
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ thirteen: thirteen });
                    } else {
                        console.log("get me out1")
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ thirteen: 0 });
                    }
                    if (data.twelveUser > 0) {
                        console.log("get me out2")
                        twelve = (data.jackpot * this.props.twelvePercent) / data.twelveUser;
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ twelve: twelve });
                    } else {
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ twelve: 0 });
                    }
                    if (data.elevenUser > 0) {
                        console.log("get me out3")
                        eleven = (data.jackpot * this.props.elevenPercent) / data.elevenUser;
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ eleven: eleven });
                    } else {
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ eleven: 0 });
                    }
                    if (data.tenUser > 0) {
                        console.log("get me out4")
                        ten = (data.jackpot * this.props.tenPercent) / data.tenUser;
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ ten: ten });
                    } else {
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ ten: 0 });
                    }
                } else {
                    alert("there's no Jacpot, no players")
                }
            } else {
                alert("No games recorded for  chosen day " + this.state.gameDate);
            }
            firebase.database().ref("jackpots").off();
            firebase.database().ref("jackpot-win").off();
        });
    }

    setMatchResults = (matchesPlayed) => {
        let matchResults = [];
        let inner = [];
        matchesPlayed.games.forEach((match, k) => {
            let matchResRef = firebase.database().ref("match-results").child(match.fixture_id);
            matchResRef.once("value", snapshot => {
                let data = Object.assign({}, snapshot.val());
                inner.push(data)
            });
            matchResults.splice(matchResults.length,
                matchResults.length + 1, inner)
        });
        return matchResults;
    }

    shareJackpot = (e) => {
        e.preventDefault();
        this.setState({ disable: true });
        let matchesPlayedRef = firebase.database().ref("game-history");
        let boardRef = firebase.database().ref("board").child(dateInYYYYMMDD(this.state.gameDate));
        boardRef.on("value", snapshot => {
            let data = snapshot.val();
            if (data.isPaid !== true) {
                let i = 0;
                matchesPlayedRef.on("value", snapshot => {
                    let data = snapshot.val();
                    Object.keys(data).map(keys => {
                        let matches = data[keys];
                        return Object.keys(matches).map(key => {
                            let matchesPlayed = matches[key];
                            let endDate = new Date(this.state.gameDate);
                            let startDate = endDate.getDate() - 7;
                            let matchDate = new Date(matchesPlayed.datePlayed);
                            console.log("sdfdf", matchDate <= endDate);
                            console.log("heodloweee", matchDate >= startDate);
                            console.log(moment(matchesPlayed.datePlayed));
                            if (matchDate <= endDate
                                && matchDate >= startDate) {
                                if (!matchesPlayed.isEvaluated) {
                                    i++;
                                    console.log(i);

                                    let matchRes = this.setMatchResults(matchesPlayed);
                                    let hits
                                    setTimeout(() => {
                                        hits = this.calculateWins(matchesPlayed, matchRes[0]);
                                    }, 1500)
                                    setTimeout(() => {
                                        firebase.database().ref("game-history").child(matchesPlayed.userId)
                                            .child(matchesPlayed.gameNumber)
                                            .update({ hits: hits });
                                        if (hits === 10) {
                                            this.setState({ tenWinners: this.state.tenWinners + 1 });
                                        } else if (hits === 11) {
                                            this.setState({ elevenWinners: this.state.elevenWinners + 1 });
                                        } else if (hits === 12) {
                                            this.setState({ twelveWinners: this.state.twelveWinners + 1 });
                                        } else if (hits === 13) {
                                            this.setState({ thirteenWinners: this.state.thirteenWinners + 1 });
                                        }
                                        firebase.database().ref("game-history").child(matchesPlayed.userId)
                                            .child(matchesPlayed.gameNumber).update({ isEvaluated: true })
                                        firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).update({ tenUser: this.state.tenWinners })
                                        firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).update({ elevenUser: this.state.elevenWinners })
                                        firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).update({ twelveUser: this.state.twelveWinners })
                                        firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).update({ thirteenUser: this.state.thirteenWinners })
                                    }, 3000)
                                }
                            }
                            return null;

                        })
                    });
                    firebase.database().ref("jackpots").off();
                    firebase.database().ref("match-results").off();
                    firebase.database().ref("game-history").off();
                });
                setTimeout(() => {
                    this.calculaterWiinerAmount();
                    this.setState({ disable: false });
                }, 30000); //Subject to change with huge data possible to 1 hour

                boardRef.update({ isPaid: true })
                firebase.database().ref("board").off();
                setTimeout(() => {
                    alert("Jackpot successfully shared")
                }, 30000); //Subject to change

            } else {
                setTimeout(() => {
                    alert("games have already been shared for this day and board")
                }, 1000)
            }

            setTimeout(() => {
                window.location.reload();
            }, 20000)
        })

    }

    payOut = (e) => {
        e.preventDefault();
        this.setState({ disable: true });
        let matchesPlayedRef = firebase.database().ref("game-history");
        matchesPlayedRef.on("value", snapshot => {
            let data = snapshot.val();
            Object.keys(data).map(keys => {
                let matches = data[keys];
                return Object.keys(matches).map(key => {
                    let matchesPlayed = matches[key];
                    if (matchesPlayed.isEvaluated && !matchesPlayed.isPaid) {
                        let hits = matchesPlayed.hits;
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate))
                            .on("value", snapshot => {
                                let data = snapshot.val();
                                console.log(data);
                                let winRef = firebase.database().ref("users").child(matchesPlayed.userId)
                                if (hits === 10) {
                                    winRef.child("funds").transaction(funds => {
                                        return funds + data.ten;
                                    });
                                }
                                 else if (hits === 11) {
                                    winRef.child("funds").transaction(funds => {
                                        return funds + data.eleven;
                                    });
                                } else if (hits === 12) {
                                    winRef.child("funds").transaction(funds => {
                                        return funds + data.twelve;
                                    });
                                } else if (hits === 13) {
                                    winRef.child("funds").transaction(funds => {
                                        return funds + data.thirteen;
                                    });
                                }
                                matchesPlayedRef.child(matchesPlayed.userId).child(matchesPlayed.gameNumber).update({ isPaid: true })

                            });
                    }
                    return null;
                })
            });
            firebase.database().ref("jackpot-win").off();
            firebase.database().ref("users").off();
            firebase.database().ref("game-history").off();
        });
        setTimeout(() => {
            window.location.reload();
        }, 10000)

    }

    setupJackpot = (e) => {
        e.preventDefault();
        let dateReformed = dateInYYYYMMDD(this.state.gameDate);
        let jackpotData;
        firebase.database().ref("jackpots").child(dateReformed)
            .on("value", snapshot => {
                jackpotData = snapshot.val();
            })
        setTimeout(() => {
            if (jackpotData === null) {
                firebase.database().ref("jackpots").child(dateReformed).set({
                    jackpot: 0,
                    tenUser: 0,
                    elevenUser: 0,
                    twelveUser: 0,
                    thirteenUser: 0
                })
                alert("done");
            } else {
                alert("this is already set, cannot reset");
            }
        }, 3000)
        firebase.database().ref("jackpots").off();
    }
    render() {
        if (this.props.user.role !== "admin" || !this.props.isLoggedIn) {
            this.props.history.push("/");
        }
        return (<div className={classes.SettingsWrapper}>
            <Button onClick={this.handlecCnfigureBoard} >Configure Play Board</Button>
            <Button onClick={this.handleSetResultss} >Set Last Results</Button>

            <form onSubmit={this.shareJackpot}>
                <input type="text" name="date" value={this.state.gameDate} onChange={(e) => this.setState({ gameDate: e.target.value })} />
                <Button type="button" onClick={this.setupJackpot} disabled={this.state.disable} >Set Starting Jakcpot</Button>
                <Button type="submit" variant="outline-success" disabled={this.state.disable} >Share Jackpot</Button>
                <Button type="button" variant="success" onClick={this.payOut} disabled={this.state.disable} >Payout to Winners</Button>

            </form>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        hourToNextDay: state.config.hourToNextDay,
        isFACup: state.config.isFACup,
        isFACupNextWeek: state.config.isFACupNextWeek,
        daysOffset: state.config.daysOffset,
        daysOffsetNextWeek: state.config.daysOffsetNextWeek,
        kickOffTime: state.config.kickOffTime,
        gameDate: state.board.gameDate,

        thirteenPercent: state.config.thirteenPercent,
        twelvePercent: state.config.twelvePercent,
        elevenPercent: state.config.elevenPercent,
        tenPercent: state.config.tenPercent,

        slips: state.board.slips,

        user: state.login.user,
        isLoggedIn: state.login.isLoggedIn

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        onConfigureBoard: (isFaCup, kickOffTime, kickOffDate) =>
            dispatch(actions.configureBoard(isFaCup, kickOffTime, kickOffDate)),
        onSetCurrentResult: (slip) =>
            dispatch(actions.setCurrentResult(slip)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);