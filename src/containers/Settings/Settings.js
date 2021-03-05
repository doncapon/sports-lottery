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
        disable: false
    }
    handlecCnfigureBoard = () => {
        let kickOffDate
        kickOffDate = getNextPlayDate(this.props.daysOffset,
            this.props.hourToNextDay);
        this.props.onConfigureBoard(this.props.isFACup,
            this.props.kickOffTime, kickOffDate);
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
        let allFisinished = true;
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
        }
        return sideWon;
    }
    calculaterWiinerAmount = () => {
        let jackpotRef = firebase.database().ref("jackpots").child(
            dateInYYYYMMDD(this.props.gameDate));
        jackpotRef.on("value", snapshot => {
            let data = snapshot.val();
            let thirteen = 0;
            let twelve = 0;
            let eleven = 0;
            let ten = 0;
            if (data.thirteenUser > 0) {
                setTimeout(() => {
                    thirteen = (data.jackpot * this.props.thirteenPercent) / data.thirteenUser;
                    firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.props.gameDate)).update({ thirteen: thirteen });
                }, 2000);
            }
            if (data.twelveUser > 0) {
                setTimeout(() => {
                    twelve = (data.jackpot * this.props.twelvePercent) / data.twelveUser;
                    firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.props.gameDate)).update({ twelve: twelve });
                }, 2000);
            }
            if (data.elevenUser > 0) {
                setTimeout(() => {
                    eleven = (data.jackpot * this.props.elevenPercent) / data.elevenUser;
                    firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.props.gameDate)).update({ eleven: eleven });
                }, 2000);

            }
            if (data.tenUser > 0) {
                setTimeout(() => {
                    ten = (data.jackpot * this.props.tenPercent) / data.tenUser;
                    firebase.database().ref("jackpot-win").child(dateInYYYYMMDD(this.props.gameDate)).update({ ten: ten });
                }, 2000);
            }
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
    shareJackpot = () => {
        this.setState({ disable: true })
        let matchesPlayedRef = firebase.database().ref("game-history");
        let allFinished = true;
        firebase.database().ref("match-results")
            .on("value", snapshot => {
                let data = snapshot.val();
                let games = Object.keys(data).map(key => 
                         data[key]
                )
                let wantedGames = games.filter(game =>
                    moment(game.gameDay).format("DD-MM-YYYY") === this.props.gameDate
                )
                for (let i = 0; i < wantedGames.length; i++) {
                    if (wantedGames[i].status === "Not Started") {
                        allFinished = false;
                        break;
                    }
                }

                if (allFinished) {


                    matchesPlayedRef.on("value", snapshot => {
                        let data = snapshot.val();
                        Object.keys(data).map(keys => {
                            let matches = data[keys];
                            return Object.keys(matches).map(key => {
                                let matchesPlayed = matches[key];
        
                                let matchRes = this.setMatchResults(matchesPlayed);
                                setTimeout(() => {
                                    let hits = this.calculateWins(matchesPlayed, matchRes[0]);
                                    setTimeout(() => {
                                        firebase.database().ref("game-history").child(matchesPlayed.userId)
                                            .child(matchesPlayed.gameNumber)
                                            .update({ hits: hits });
                                    }, 2000);
        
                                    if (!matchesPlayed.isEvaluated) {
                                        if (hits === 10) {
                                            setTimeout(() => {
                                                firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).child("tenUser").transaction(tenUsers => {
                                                    return tenUsers + 1;
                                                })
                                            }, 3000);
        
                                        } else if (hits === 11) {
                                            setTimeout(() => {
                                                firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).child("elevenUser").transaction(elevenUsers => {
                                                    return elevenUsers + 1;
                                                })
                                            }, 3000);
        
                                        } else if (hits === 12) {
                                            setTimeout(() => {
                                                firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).child("twelveUser").transaction(twelveUsers => {
                                                    return twelveUsers + 1;
                                                })
                                            }, 3000);
        
                                        } else if (hits === 13) {
                                            setTimeout(() => {
                                                firebase.database().ref("jackpots").child(matchesPlayed.evaluationDate).child("thirteenUser").transaction(thirteenUsers => {
                                                    return thirteenUsers + 1;
                                                })
                                            }, 3000);
        
                                        } else {
        
                                        }
                                        firebase.database().ref("game-history").child(matchesPlayed.userId)
                                            .child(matchesPlayed.gameNumber).update({ isEvaluated: true })
                                    }
                                    this.setState({ disable: false });
                                }, 2000);
                                return null;
                            })
                        })
                    });
                }
        
            });
        this.calculaterWiinerAmount();
    }

    setupJackpot = (totalPrice) => {
        let date = this.props.gameDate.split("-");
        let dateReformed = date[2] + "-" + date[1] + "-" + date[0];
        firebase.database().ref("jackpots").child(dateReformed).child("jackpot")
            .on("value", snapshot => {
                if (!snapshot.val()) {
                    firebase.database().ref("jackpots").child(dateReformed).child("jackpot").transaction(Jackpots => {
                        return Jackpots + totalPrice;
                    })
                    alert("done")
                } else {
                    alert("this is already set, cannot reset");
                }
            })

    }
    render() {
        if (this.props.user.role !== "admin" || !this.props.isLoggedIn) {
            this.props.history.push("/");
        }
        return (<div className={classes.SettingsWrapper}>
            <Button onClick={this.handlecCnfigureBoard} >Configure Play Board</Button>
            <Button onClick={this.handleSetResultss} >Set Last Results</Button>
            <Button onClick={this.shareJackpot} disabled={this.state.disable} >Share Jackpot</Button>
            <Button onClick={() => this.setupJackpot(0)} >Set Starting Jakcpot</Button>
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