import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Settings.module.css';
import {
    getNextPlayDate,
    dateInYYYYMMDD
} from '../../shared/utility';
import firebase from '../../config/firebase/firebase';
class Settings extends Component {
    state = {
        disable: false,
        gameDate: '',
        loading: false,
        tenWinners: 0,
        elevenWinners: 0,
        twelveWinners: 0,
        thirteenWinners: 0,
        email: ''
    }
    componentDidMount() {
        if (!this.state.loading) {
            this.setState({ gameDate: this.props.gameDate })
        }
        this.setState({ loading: true })
    }
    handlecConfigureBoard = () => {
        let kickOffDate;
        kickOffDate = getNextPlayDate(this.props.daysOffset,
            this.props.hourToNextDay);
        this.props.onConfigureBoard(this.props.isFACup,
            this.props.kickOffTime, dateInYYYYMMDD(kickOffDate)); //this.state.gameDate
        setTimeout(() => {
            window.localStorage.removeItem('firebase:host:betsoka-4b359-default-rtdb.europe-west1.firebasedatabase.app');
            window.localStorage.removeItem('persist:root');
            window.location.reload();
        }, 5000);
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
                let left = this.translateResult(matchRes[i].homeGoals, matchRes[i].awayGoals, matchRes[i].status);
                let right = this.determineSelection(match.games[i].selections[k].selected, k,);
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
                        thirteen = (data.jackpot * this.props.thirteenPercent) / data.thirteenUser;
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ thirteen: thirteen });
                    } else {
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ thirteen: 0 });
                    }
                    if (data.twelveUser > 0) {
                        twelve = (data.jackpot * this.props.twelvePercent) / data.twelveUser;
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ twelve: twelve });
                    } else {
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ twelve: 0 });
                    }
                    if (data.elevenUser > 0) {
                        eleven = (data.jackpot * this.props.elevenPercent) / data.elevenUser;
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ eleven: eleven });
                    } else {
                        firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate)).update({ eleven: 0 });
                    }
                    if (data.tenUser > 0) {
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
            if (!data.isPaid) {
                matchesPlayedRef.on("value", snapshot => {
                    let data = snapshot.val();
                    Object.keys(data).map(keys => {
                        let matches = data[keys];
                        return Object.keys(matches).map(key => {
                            let matchesPlayed = matches[key];
                            let endDate = new Date(dateInYYYYMMDD(this.state.gameDate) + "T" + this.props.kickOffTime);
                            let startDate = endDate.getDate() - 7;
                            let matchDate = new Date(matchesPlayed.datePlayed);
                            if (matchesPlayed.evaluationDate === dateInYYYYMMDD(this.state.gameDate)) {
                                if (matchDate <= endDate
                                    && matchDate >= startDate) {
                                    if (!matchesPlayed.isEvaluated) {
                                        let matchRes = this.setMatchResults(matchesPlayed);
                                        let hits
                                        setTimeout(() => {
                                            hits = this.calculateWins(matchesPlayed, matchRes[0]);
                                        }, 500)
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
                                        }, 2000)
                                    }
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
                }, 20000); //Subject to change with huge data possible to 1 hour

                boardRef.update({ isPaid: true })
                firebase.database().ref("board").off();
                setTimeout(() => {
                    alert("Jackpot successfully shared")
                }, 20000); //Subject to change

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
    deleteUserByEmail = (e, email) => {
        e.preventDefault();
        let notfound = true;
        firebase.database().ref("users").on("value", snapshot => {
            let users = snapshot.val();
            Object.keys(users).map(key => {
                let user = users[key];
                if (user.email === email && user.role.toLocaleLowerCase() !== "admin") {
                    firebase.database().ref('users').child(key).remove();
                    notfound= false;
                    alert("deleted");
                    setTimeout(() => {
                        firebase.database().ref("users").off();
                    }, 1000);
                }
               
                return null;
            })
            if(notfound)
            alert("User not found");

        })
        setTimeout(() => {
            firebase.database().ref("users").off();
        }, 5000);
    }
    render() {
        if (this.props.user.role !== "admin" || !this.props.isLoggedIn) {
            this.props.history.push("/");
        }
        return (<div className={classes.SettingsWrapper}>
            <form>
                <input type="email" placeholder="user email to logut" onChange={(e) => this.setState({ email: e.target.value })} />
                <Button type="button" onClick={(e) => this.deleteUserByEmail(e, this.state.email)} variant="outline-danger">Delete User</Button>
            </form>
            <div>
                <Button onClick={this.handlecConfigureBoard} >Configure Play Board</Button>
                <Button onClick={this.handleSetResultss} >Set Last Results</Button>
            </div>

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