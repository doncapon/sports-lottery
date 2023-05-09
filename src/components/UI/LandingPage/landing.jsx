import React, { Component } from "react";
import classes from "./landing.module.css";
import { connect } from "react-redux";
import CountDown from "../CountDown/CountDown";
import Footer from "../Footer/Footer";
import firebase from "../../../config/firebase/firebase";
import { Container } from "react-bootstrap";
import { addCommaToAmounts, getNextPlayDate, dateInYYYYMMDD } from "..//../../shared/utility";
import moment from "moment";
import ball from "../../../assets/ball.png";
import * as actions from '../../../store/actions/index';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      gameDateRaw: null,
      jackpot: null,
      isGamesAvailable: true,
      isResetTime: false,
      total: 0,
      gamesPostponedMore: false,
      // myState: false,

      tenWinners: 0,
      elevenWinners: 0,
      twelveWinners: 0,
      thirteenWinners: 0,
    };
  }

  componentDidMount() {
    // if(!this.state.myState){
    //   this.shareJackpot();
    //   this.setState({myState: false})
    // }
    setInterval(() => {
      let kickOffDate;
      kickOffDate = getNextPlayDate(this.props.daysOffset,
        this.props.hourToNextDay);
      let gameTime = kickOffDate + "T" + this.props.kickOffTime;
      if (moment().format("yyyy-MM-DD:hh:mm:ss") === moment(gameTime /*"2021-09-25T19:01:00+00:00"*/).format("yyyy-MM-DD:hh:mm:ss")) {
        setTimeout(() => {
          this.props.onSetCurrentResult(0);
          firebase.database().ref("board").child(kickOffDate).on("value", snapshot => {
            if (snapshot.val() === null) {
              this.handlecConfigureBoard();
              this.setupJackpot(kickOffDate);
              setTimeout(() => {
                this.props.onSetCurrentResult(1);
              }, 10000);
              this.props.onDeleteAndResetAll();
            }
          });

        }, 29000);
      }

      let endTime = null;
      firebase.database().ref("board").child(kickOffDate).once("value").then(snapshot => {
        endTime = snapshot.val().evaluationTime;
      });

      //update Results in the middle of games
      if (moment().isSameOrAfter(moment(gameTime).add(45, "minutes")) && moment().isSameOrBefore(moment(endTime).subtract(1, "hour"))) {
        setInterval(() => {
          this.props.onSetCurrentResult(0);
        }, 45 * 60 * 60)
      }
      //End Evaluation  
      if (moment().format("yyyy-MM-DD:hh:mm:ss") === (moment(endTime /*"2021-09-25T19:56:00+00:00"*/).format("yyyy-MM-DD:hh:mm:ss"))) {
        setTimeout(() => {
          this.props.onSetCurrentResult(0);
        }, 25000)
        setTimeout(() => {
          this.handleUpdateBoard();

        }, 28000)
        setTimeout(() => {
          this.shareJackpot();
        }, 35000)
        setTimeout(() => {
          this.refundUsersGamePostponed();
        }, 42000);
      }
      let version = process.env.REACT_APP_VERSION;
      if (this.props.version !== version) {
        window.localStorage.removeItem("persist:root")
        this.props.onSetVersion(version);
        window.location.reload();
        this.clearCacheData();

      }
    }, 1000);

    if (!this.state.loading) {
      firebase
        .database()
        .ref("board")
        .orderByChild("dateKey")
        .limitToLast(1)
        .once("value")
        .then((snapshot) => {
          let data = Object.keys(snapshot.val())[0];
          this.kickOffDate = data;
          let kickOffDate;
          kickOffDate = getNextPlayDate(
            this.props.daysOffset,
            this.props.hourToNextDay
          );
          if (new Date(data + "T" + this.props.kickOffTime) < new Date(kickOffDate)
          ) {
            this.setState({ isGamesAvailable: false });
          }
          this.getJackpot();
          this.setState({
            gameDateRaw: this.kickOffDate + "T" + this.props.kickOffTime,
          });
        });
    }
    this.setState({ loading: true });
    setTimeout(() => {
      firebase.database().ref("board").off();
      firebase.database().ref("jackpots").off();
      this.interval = setInterval(() => this.getJackpot(), 30 * 60 * 1000);
      this.interval2 = setInterval(() => window.location.reload(), 15 * 60 * 1000);
    }, 2000);
  }


  checkIfMoreThanOneGameIsPostponed = () => {
    firebase.database().ref("board").limitToLast(2).once("value").then(snapshot => {
      let date = Object.keys(snapshot.val())[0];
      firebase.database().ref("match-results").once("value").then(snapshot => {
        let dataKeys = Object.keys(snapshot.val());
        let count = 0;
        dataKeys.forEach(key => {
          let data = snapshot.val()[key];
          if (data.status === "Match Postponed" && moment(data.gameDate).format("yyyy-MM-DD") === date) {
            count++;
          }
        })
        if (count > 3)
          this.setState({ gamesPostponedMore: true })
      })
    })
  }


  fillJackpotWithPreviousLosses = () => {
    let jackpotData;
    firebase.database().ref("jackpots").limitToLast(2).once("value").then(snapshot => {
      let prevJackPotDate = Object.keys(snapshot.val())[0];
      let CurrentJackPotDate = Object.keys(snapshot.val())[1];
      let bothDateDate = snapshot.val();
      let total;

      jackpotData = bothDateDate[prevJackPotDate];

      firebase.database().ref("jackpots").child(CurrentJackPotDate).once("value").then(snapshot => {
        total = snapshot.val().jackpot;

      });
      setTimeout(() => {

        if (jackpotData.tenUser === 0) {
          let percent = this.props.tenPercent * jackpotData.jackpot;
          total += percent;
        }

        if (jackpotData.elevenUser === 0) {
          let percent = this.props.elevenPercent * jackpotData.jackpot;
          total += percent;
        }
        if (jackpotData.twelveUser === 0) {
          let percent = this.props.twelvePercent * jackpotData.jackpot;
          total += percent;
        }
        if (jackpotData.thirteenUser === 0) {
          let percent = this.props.thirteenPercent * jackpotData.jackpot;
          total += percent;
        }
      }, 2000)

      setTimeout(() => {
        firebase.database().ref("jackpots").child(CurrentJackPotDate).update({
          jackpot: total
        })
      }, 3000);
      firebase.database().ref("jackpots").off();
      firebase.database().ref("board").off();
      return null;
    });
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

  refundUsersGamePostponed = () => {
    this.checkIfMoreThanOneGameIsPostponed()
    setTimeout(() => {
      if (this.state.gamesPostponedMore) {
        this.refundHelper();
      } else {
        this.fillJackpotWithPreviousLosses();
      }

    }, 500)
  }


  refundHelper = () => {
    firebase.database().ref("board").limitToLast(2).once("value").then(snapshot => {
      let date = Object.keys(snapshot.val())[0];
      firebase.database().ref("game-history").once("value").then(snapshot => {
        let dataKeys = Object.keys(snapshot.val());

        dataKeys.forEach(key => {
          let data = snapshot.val()[key];
          let innerKeys = Object.keys(data);
          innerKeys.forEach(inKey => {
            let innerData = data[inKey];
            if (data.postponed === false) {
              if (innerData.evaluationDate === date) {
                let userRef = firebase.database().ref("users").child(key);
                userRef.child('funds').transaction((funds) => {
                  return funds + innerData.slipPrice;
                })

                firebase.database().ref("dividends").child(date).child('dividend').transaction((dividend) => {
                  return dividend - innerData.slipPrice;
                })

                firebase.database().ref("game-history").child(key).child(inKey).update({ postponed: true })
                firebase.database().ref("users").off();

              }
            }
          })

          firebase.database().ref("board").child(date).update({ postponed: true })
        })
      });
    });
  }

  shareJackpot = () => {
    firebase.database().ref("board").limitToLast(2).on("value", snapshot => {
      let gameDate = Object.keys(snapshot.val())[0];
      let dataBoard = snapshot.val()[gameDate];
      let matchesPlayedRef = firebase.database().ref("game-history");

      setTimeout(() => {
        if (!dataBoard.isPaid) {
          matchesPlayedRef.once("value").then(snapshot => {
            let data = snapshot.val();
            Object.keys(data).map(keys => {
              let matches = data[keys];
              return Object.keys(matches).map(key => {
                let matchesPlayed = matches[key];
                let endDate = moment(new Date(gameDate + "T" + this.props.kickOffTime));
                let tempDate = new Date(gameDate + "T" + this.props.kickOffTime);

                tempDate.setDate(tempDate.getDate() - 7)
                let startDate = moment(tempDate);
                let matchDate = moment(new Date(matchesPlayed.datePlayed));

                if (matchesPlayed.evaluationDate === gameDate) {
                  if (matchDate.isSameOrBefore(endDate)
                    && matchDate.isSameOrAfter(startDate)) {
                    if (!matchesPlayed.isEvaluated) {
                      let matchRes = this.setMatchResults(gameDate);
                      let hits
                      setTimeout(() => {
                        hits = this.calculateWins(matchesPlayed, matchRes);
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
                      }, 2000);
                    }
                  }
                }
                return null;
              })
            });

            setTimeout(() => {
              firebase.database().ref("jackpots").off();
              firebase.database().ref("match-results").off();
              firebase.database().ref("game-history").off();

            }, 2500)
          });
          setTimeout(() => {
            this.calculaterWiinerAmount();
          }, 30000); //Subject to change with huge data possible to 1 hour

          setTimeout(() => {
            this.registerWinnerData();
          }, 35000)
          firebase.database().ref("board").off();
        }
      }, 2000)
    });

  }

  registerWinnerData = () => {

    firebase.database().ref("board").limitToLast(2).on("value", snapshot => {
      let gameDate = Object.keys(snapshot.val())[0];
      let matchesPlayedRef = firebase.database().ref("game-history");

      matchesPlayedRef.once("value").then(snapshot => {
        let data = snapshot.val();
        Object.keys(data).map(keys => {
          let matches = data[keys];
          return Object.keys(matches).map(key => {
            let matchesPlayed = matches[key];
            let endDate = moment(new Date(gameDate + "T" + this.props.kickOffTime));
            let tempDate = new Date(gameDate + "T" + this.props.kickOffTime);

            tempDate.setDate(tempDate.getDate() - 7);
            let startDate = moment(tempDate);
            let matchDate = moment(new Date(matchesPlayed.datePlayed));
            if (matchesPlayed.evaluationDate === gameDate) {
              if (matchDate.isSameOrBefore(endDate)
                && matchDate.isSameOrAfter(startDate)) {
                if (matchesPlayed.isEvaluated && !matchesPlayed.isPaid) {
                  let matchRes = this.setMatchResults(gameDate);
                  let hits = null;
                  setTimeout(() => {
                    hits = this.calculateWins(matchesPlayed, matchRes);
                  }, 1000);
                  setTimeout(() => {
                    if (hits === 10) {
                      firebase.database().ref("jackpot-win").child(gameDate).child("ten").once("value").then(snapshot => {
                        firebase.database().ref("winners").child(gameDate).child(keys).child(key).update(
                          { amount: snapshot.val() });
                        firebase.database().ref("winners").child(gameDate).child(keys).child(key).update(
                          { hits: 10 });
                        firebase.database().ref("users").child(keys).child("funds").transaction(funds => {
                          return funds + snapshot.val();
                        });
                      });
                    } else if (hits === 11) {
                      firebase.database().ref("jackpot-win").child(gameDate).child("eleven").once("value").then(snapshot => {
                        firebase.database().ref("winners").child(gameDate).child(keys).child(key).update(
                          { amount: snapshot.val() });
                        firebase.database().ref("winners").child(gameDate).child(keys).child(key).update(
                          { hits: 11 });
                        firebase.database().ref("users").child(keys).child("funds").transaction(funds => {
                          return funds + snapshot.val()
                        });
                      });
                    } else if (hits === 12) {
                      firebase.database().ref("jackpot-win").child(gameDate).child("twelve").once("value").then(snapshot => {
                        firebase.database().ref("winners").child(gameDate).child(keys).child(key).update(
                          { amount: snapshot.val() })
                        firebase.database().ref("winners").child(gameDate).child(keys).child(key).update(
                          { hits: 12 });

                        firebase.database().ref("users").child(keys).child("funds").transaction(funds => {
                          return funds + snapshot.val();
                        });
                      });
                    } else if (hits === 13) {
                      firebase.database().ref("jackpot-win").child(gameDate).child("thirteen").once("value").then(snapshot => {
                        firebase.database().ref("winners").child(gameDate).child(keys).child(key).update(
                          { amount: snapshot.val() });
                        firebase.database().ref("winners").child(gameDate).child(keys).child(key).update(
                          { hits: 13 });
                        firebase.database().ref("users").child(keys).child("funds").transaction(funds => {
                          return funds + snapshot.val();
                        })
                      })
                    }
                    firebase.database().ref("game-history").child(keys).child(key).update({ isPaid: true });
                  }, 1500);
                }
              }
            }
            return null;
          })
        })
      })
    })
  }



  calculaterWiinerAmount = () => {
    firebase.database().ref("board").limitToLast(2).on("value", snapshot => {
      let gameDate = Object.keys(snapshot.val())[0];
      let boardRef = firebase.database().ref("board").child(gameDate);
      let jackpotRef = firebase.database().ref("jackpots").child(gameDate);
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
              firebase.database().ref("jackpot-win").child(gameDate).update({ thirteen: thirteen });
            } else {
              firebase.database().ref("jackpot-win").child(gameDate).update({ thirteen: 0 });
            }
            if (data.twelveUser > 0) {
              twelve = (data.jackpot * this.props.twelvePercent) / data.twelveUser;
              firebase.database().ref("jackpot-win").child(gameDate).update({ twelve: twelve });
            } else {
              firebase.database().ref("jackpot-win").child(gameDate).update({ twelve: 0 });
            }
            if (data.elevenUser > 0) {
              eleven = (data.jackpot * this.props.elevenPercent) / data.elevenUser;
              firebase.database().ref("jackpot-win").child(gameDate).update({ eleven: eleven });
            } else {
              firebase.database().ref("jackpot-win").child(gameDate).update({ eleven: 0 });
            }
            if (data.tenUser > 0) {
              ten = (data.jackpot * this.props.tenPercent) / data.tenUser;
              firebase.database().ref("jackpot-win").child(gameDate).update({ ten: ten });
            } else {
              firebase.database().ref("jackpot-win").child(gameDate).update({ ten: 0 });
            }
          }
          boardRef.update({ isPaid: true })
        }

        console.log("I ve been called");

        firebase.database().ref("jackpots").off();
        firebase.database().ref("jackpot-win").off();
        firebase.database().ref("board").off();
      });
    });

  }



  calculateWins = (match, matchRes) => {
    let allNotFinished = 0;
    let sideWon = 0;
    for (let i = 0; i < matchRes.length; i++) {

      if (matchRes[i].status === "Match Postponed") {
        allNotFinished++;
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

    if (allNotFinished <= 3) {
      for (let i = 0; i < allNotFinished; i++) {
        sideWon++;
      }

    }
    return sideWon;
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

  setMatchResults = (gameDate) => {
    let matchResults = [];
    let matchResRef = firebase.database().ref("match-results");
    matchResRef.once("value").then(snapshot => {
      let keys = Object.keys(snapshot.val());
      keys.forEach(key => {
        let matchData = snapshot.val()[key];
        if (matchData.gameDay.substr(0, 10) === gameDate) {
          matchResults.splice(matchResults.length,
            matchResults.length + 1, matchData);
        }
      })
    });

    return matchResults;
  }

  handleUpdateBoard = () => {
    firebase.database().ref("board").orderByChild("dateKey").limitToLast(2)
      .once("value").then(snapshot => {
        let date = Object.keys(snapshot.val())[0];
        let data = snapshot.val()[date];
        let fixturesToPush = [];
        Object.keys(data).map(key => {
          Object.keys(data[key]).map(keys2 => {
            if (keys2 === "fixture_id") {
              fixturesToPush.push(data[key][keys2])
            }
            return null;
          })
          return null;
        })

        this.props.onUpdateBoard(fixturesToPush, date)
      })

  }


  clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  };

  handlecConfigureBoard = () => {
    this.props.onSetIsBoardSet(false);
    let kickOffDate;
    kickOffDate = getNextPlayDate(this.props.daysOffset,
      this.props.hourToNextDay);
    setTimeout(() => {
      this.props.onConfigureBoard(
        this.props.kickOffTime, this.props.endTime, dateInYYYYMMDD(kickOffDate)); //this.state.gameDate
    }, 3000);
  }

  setupJackpot = (key) => {
    firebase.database().ref("jackpots").child(key).on("value", snapshot => {
      let data = snapshot.val();
      setTimeout(() => {
        if (data === null) {
          firebase.database().ref("jackpots").child(key).set({
            jackpot: 0,
            tenUser: 0,
            elevenUser: 0,
            twelveUser: 0,
            thirteenUser: 0
          });
        }
      }, 1000);
      firebase.database().ref("jackpots").off();
      return null;
    })
  }

  getJackpot = () => {
    let data = null;
    firebase.database().ref("jackpots").limitToLast(1).on("value", snapshot => {
      data = Object.keys(snapshot.val())[0]
      firebase
        .database()
        .ref("jackpots")
        .child(moment(data).format("YYYY-MM-DD"))
        .on("value", (snapshot) => {
          this.setState({ jackpot: snapshot.val().jackpot });
        });
    })
  };
  componentWillUnmount() {
    firebase.database().ref("jackpots").off();
    clearInterval(this.interval);
    clearInterval(this.interval2);
  }
  render() {
    return (
      <>
        <Container
          className={classes.wrapperLand}
          style={{ position: "relative" }}
        >
          <div>
            {this.state.jackpot >= 0 && this.state.jackpot != null ? (
              <div className={classes.Jackpot}>
                <div className={classes.JapotText}>Jackpot: </div>
                {this.state.isGamesAvailable
                  ? " ₦ " + addCommaToAmounts(this.state.jackpot)
                  : "Sorry, No games this week"}
              </div>
            ) : null}

            {this.state.loading && this.state.gameDateRaw ? (
              <CountDown gamedate={this.state.gameDateRaw} />
            ) : null}

          </div>
          <img
            className={classes.ball_img}
            src={ball}
            width="200px"
            alt="ball"

          />
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gameDateRaw: state.board.gameDateRaw,
    hourToNextDay: state.config.hourToNextDay,
    daysOffset: state.config.daysOffset,
    kickOffTime: state.config.kickOffTime,
    thirteenPercent: state.config.thirteenPercent,
    twelvePercent: state.config.twelvePercent,
    elevenPercent: state.config.elevenPercent,
    tenPercent: state.config.tenPercent,
    endTime: state.config.endTime,

    version: state.board.version,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetVersion: (version) => dispatch(actions.setVersion(version)),
    onUpdateBoard: (fixturesToPush, kickOffDate) =>
      dispatch(actions.updateBoard(fixturesToPush, kickOffDate)),
    onConfigureBoard: (kickOffTime, endTime, kickOffDate) =>
      dispatch(actions.configureBoard(kickOffTime, endTime, kickOffDate)),
    onSetCurrentResult: (index) =>
      dispatch(actions.setCurrentResult(index)),
    onDeleteAndResetAll: () => dispatch(actions.deleteAndResetAll()),
    onSetIsBoardSet: (isBoardSet) => dispatch(actions.setIsBoardSet(isBoardSet)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
