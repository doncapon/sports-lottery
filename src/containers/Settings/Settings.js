import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Settings.module.css';
import {
    dateInYYYYMMDD
} from '../../shared/utility';
import firebase from '../../config/firebase/firebase';


class Settings extends Component {
    state = {
        disable: false,
        loading: false,
        tenWinners: 0,
        elevenWinners: 0,
        twelveWinners: 0,
        thirteenWinners: 0,
        email: '',
        gameDate: '',

    }
    componentDidMount() {
        if (!this.state.loading) {
            firebase.database().ref("board").orderByChild("dateKey").limitToLast(1)
                .on("value", snapshot => {
                    this.setState({ gameDate: Object.keys(snapshot.val())[0] });
                })
        }
        this.setState({ loading: true })
    }
    handleUpdateBoard = () => {
        firebase.database().ref("board").orderByChild("dateKey").limitToLast(1)
            .once("value").then(snapshot => {
                let date = Object.keys(snapshot.val())[0];
                let data = snapshot.val();
                let fixturesToPush = [];
                Object.keys(data).map(key => {
                    Object.keys(data[key]).map(keys2 => {
                        if (keys2 !== "dateKey" && keys2 !== "isPaid") {
                            fixturesToPush.push(data[key][keys2])
                        }
                        return null;
                    })
                    return null;
                })
                this.props.onUpdateBoard(fixturesToPush, date)
            })

    }
    // handleSetResultss = () => {
    //     this.props.onSetCurrentResult();
    // }

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
            matchResRef.once("value").then(snapshot => {
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
        boardRef.once("value").then(snapshot => {
            let data = snapshot.val();
            if (!data.isPaid) {
                matchesPlayedRef.once("value").then(snapshot => {
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
                }, 30000); //Subject to change with huge data possible to 1 hour

                boardRef.update({ isPaid: true })
                firebase.database().ref("board").off();
                setTimeout(() => {
                    alert("Jackpot successfully shared")
                }, 30000); //Subject to change

            } else {
                setTimeout(() => {
                    alert("games have already been shared for this day and board")
                }, 2000)
            }

            setTimeout(() => {
                window.location.reload();
            }, 30000)
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
                    if (matchesPlayed.evaluationDate === dateInYYYYMMDD(this.state.gameDate)) {
                        if (matchesPlayed.isEvaluated && !matchesPlayed.isPaid) {
                            let hits = matchesPlayed.hits;
                            let data;

                            firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.state.gameDate))
                                .on("value", snapshot => {
                                    data = snapshot.val();
                                });
                            setTimeout(() => {
                                if (hits === 10) {
                                    firebase.database().ref("users").child(matchesPlayed.userId).child("funds").transaction(funds => {
                                        return funds + data.ten;
                                    });
                                }
                                else if (hits === 11) {
                                    firebase.database().ref("users").child(matchesPlayed.userId).child("funds").transaction(funds => {
                                        return funds + data.eleven;
                                    });
                                } else if (hits === 12) {
                                    firebase.database().ref("users").child(matchesPlayed.userId).child("funds").transaction(funds => {
                                        return funds + data.twelve;
                                    });
                                } else if (hits === 13) {
                                    firebase.database().ref("users").child(matchesPlayed.userId).child("funds").transaction(funds => {
                                        return funds + data.thirteen;
                                    });
                                }

                                matchesPlayedRef.child(matchesPlayed.userId).child(matchesPlayed.gameNumber).update({ isPaid: true })
                                setTimeout(() => {
                                    firebase.database().ref("users").off();
                                }, 1500);
                            }, 2000)
                        }
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

    deleteUserByEmail = (e, email) => {
        e.preventDefault();
        let notfound = true;
        firebase.database().ref("users").on("value", snapshot => {
            let users = snapshot.val();
            Object.keys(users).map(key => {
                let user = users[key];
                if (user.email === email && user.role.toLocaleLowerCase() !== "admin") {
                    firebase.database().ref('users').child(key).remove();
                    notfound = false;
                    alert("deleted");
                    setTimeout(() => {
                        firebase.database().ref("users").off();
                    }, 1000);
                }

                return null;
            })
            if (notfound)
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
                {/* <Button type="button" onClick={this.setupJackpot} disabled={this.state.disable} >Set Starting Jakcpot</Button> */}
                <Button onClick={this.handleSetResultss} >Set Last Results</Button>
            </div>

            <form onSubmit={this.shareJackpot}>
                <input type="text" name="date" value={this.state.gameDate} onChange={(e) => this.setState({ gameDate: e.target.value })} />
                {/* <Button onClick={this.handleUpdateBoard} variant="outline-dark">Update Play Board</Button> */}
                <Button type="submit" variant="outline-success" disabled={this.state.disable} >Share Jackpot</Button>
                <Button type="button" variant="success" onClick={this.payOut} disabled={this.state.disable} >Payout to Winners</Button>

            </form>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        hourToNextDay: state.config.hourToNextDay,
        daysOffset: state.config.daysOffset,
        kickOffTime: state.config.kickOffTime,
        endTime: state.config.endTime,
        gameDate: state.board.gameDate,
        slips: state.board.slips,

        thirteenPercent: state.config.thirteenPercent,
        twelvePercent: state.config.twelvePercent,
        elevenPercent: state.config.elevenPercent,
        tenPercent: state.config.tenPercent,

        isBoardSet: state.config.isBoardSet,

        user: state.login.user,
        isLoggedIn: state.login.isLoggedIn

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        onUpdateBoard: (fixturesToPush, kickOffDate) =>
            dispatch(actions.updateBoard(fixturesToPush, kickOffDate)),
        // onConfigureBoard: ( kickOffTime, endTime, kickOffDate) =>
        //     dispatch(actions.configureBoard( kickOffTime,endTime, kickOffDate)),
        // onSetCurrentResult: (index) =>
        //     dispatch(actions.setCurrentResult(index)),
        // onSetIsBoardSet: (isBoardSet) => dispatch(actions.setIsBoardSet(isBoardSet))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);