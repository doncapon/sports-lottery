
import axios from '../../axios-fixtures';
import moment from 'moment';
import * as  actionTypes from './actionTypes';
import _ from 'lodash';
import firebase from "../../config/firebase/firebase";

export const setIsBoardSet = (isBoardSet) => {
    return {
        type: actionTypes.SET_IS_BOARD_SET,
        isBoardSet: isBoardSet
    }
}
export const stopResultInitialize = () => {
    return {
        type: actionTypes.STOP_RESULT_INITIALIZE,
    };
}

export const fetchWeeklyResults = (payload) => {
    return {
        type: actionTypes.FETCH_RESULTS,
        payload: payload
    }
}

export const setEventDate = (eventDate) => {
    return {
        type: actionTypes.SET_EVENTDATE,
        eventDate: eventDate
    }
}
export const updateBoard = (fixturesToPush, kickOffDate)=>{
    return dispatch=> {
        console.log("i got called here");
        fixturesToPush.forEach((fixture, index) => {
            axios.get("fixtures/id/" + fixture.fixture_id)
                .then(response => {
                    firebase.database().ref("board").child(kickOffDate).child(index)
                        .update({ status: response.data.api.fixtures[0].status });
                    firebase.database().ref("board").off();
                });
        })
        firebase.database().ref("board").off();
       
        alert("board updated");
        return null;
    }
}
export const configureBoard = (isFaCup, kickOffTime, kickOffDate) => {
    return dispatch => {
        console.log(kickOffDate);
        axios.get("fixtures/date/" + kickOffDate)
            .then(response => {
               
                let dateTime = (kickOffDate + "T" + kickOffTime);
                let fixtureAtTime = response.data.api.fixtures.filter(
                    fixture => fixture.event_date === dateTime);
                let EnglandFixtures = fixtureAtTime.filter(fixture => fixture.league.country === "England");

                let PremierShipOrFACup;
                if (!isFaCup) {
                    PremierShipOrFACup = EnglandFixtures.filter(fixture => fixture.league.name === "Premier League");
                } else {
                    PremierShipOrFACup = EnglandFixtures.filter(fixture => fixture.league.name === "FA Cup");
                }

                let Championship = EnglandFixtures.filter(fixture => fixture.league.name === "Championship");
                let countWanted;

                if ((Championship.length + PremierShipOrFACup.length) < 13) {
                    countWanted = Championship.length + PremierShipOrFACup.length;
                }
                else {
                    countWanted = 13;
                }

                let premCount = 7;
                let ChamCount = 6;
                if (countWanted === 13) {
                    if (Championship.length < 6)
                        premCount = countWanted - Championship.length;
                    if (PremierShipOrFACup.length < 7)
                        ChamCount = countWanted - PremierShipOrFACup.length;
                } else {
                    if (Championship.length < 5)
                        premCount = countWanted - Championship.length;
                    if (PremierShipOrFACup < 6)
                        ChamCount = countWanted - PremierShipOrFACup.length;
                }
                let wantedFixtures = PremierShipOrFACup.splice(0, premCount).concat(Championship.splice(0, ChamCount));
                let countAfter = wantedFixtures.length;

                if (wantedFixtures.length < 13) {
                    let leagueOneFixture = EnglandFixtures.filter(fixture => fixture.league.name === "League One");
                    wantedFixtures = wantedFixtures.concat(leagueOneFixture.splice(0, (13 - countAfter)));
                }

                let counterAFterLeagueOne = wantedFixtures.length;
                if (wantedFixtures.length < 13) {
                    let leagueTwoFixture = EnglandFixtures.filter(fixture => fixture.league.name === "League Two");
                    wantedFixtures = wantedFixtures.concat(leagueTwoFixture.splice(0, (13 - counterAFterLeagueOne)));
                }
                let fixturesToPush = [];
                for (let i = 0; i < wantedFixtures.length; i++) {
                    fixturesToPush.splice(fixturesToPush.length, fixturesToPush.length + 1,
                        {
                            leagueName: wantedFixtures[i].league.name,
                            fixture_id: wantedFixtures[i].fixture_id,
                            status: wantedFixtures[i].status,
                            homeTeam_id: wantedFixtures[i].homeTeam.team_id, homeTeam: wantedFixtures[i].homeTeam.team_name,
                            awayTeam_id: wantedFixtures[i].awayTeam.team_id, awayTeam: wantedFixtures[i].awayTeam.team_name,
                            event_date: wantedFixtures[i].event_date,
                            end_time: moment(dateTime).add(3, 'hours').format("YYYY-MM-DDTHH:mm:SS+00:00"),
                        })
                }
                if (fixturesToPush.length === 13) {
                    console.log("i got called here3");
                    let boardRef = firebase.database().ref("board").child(kickOffDate);
                    let data;
                    boardRef.on("value", snapshot => {
                        data = snapshot.val();
                        if (!data) {
                            firebase.database().ref("board").child(kickOffDate).update(fixturesToPush);
                            firebase.database().ref("board").child(kickOffDate).update({ isPaid: false });
                            firebase.database().ref("board").child(kickOffDate).update({ dateKey: kickOffDate });
                            firebase.database().ref("board").off();
                            dispatch(setEventDate(fixturesToPush[0].event_date));
                            alert("board initialized");
                        }
                    })
                    dispatch(setIsBoardSet(true));
                    firebase.database().ref("board").off();
                }
            }).catch(error => {
                alert("no games for this day");
            });
    };
}


export const fetchResults = (numberOfGames) => {
    return dispatch => {
        let matchRef = firebase.database().ref().child("match-results").orderByChild('gameDay')
            .limitToLast(numberOfGames);
        matchRef.on('value', (snapshot) => {
            const resultData = snapshot.val();
            let finalResults = [];
            let groupedGameResults = _.groupBy(resultData, 'gameDay');
            let result = Object.keys(groupedGameResults).map((key) => [key, groupedGameResults[key]]);

            let newArr = [];
            for (let i = result.length - 1; i >= 0; i--) {
                newArr.push(result[i]);
            }
            newArr.forEach((arr, k) => {
                let i = arr[1].sort((a, b) => a.fixtureId > b.fixtureId ? 1 : -1);
                finalResults.splice(finalResults.length, finalResults.length + 1, i);

            })
            let resoultModified = finalResults

            if (finalResults.length > 0) {
                dispatch(fetchWeeklyResults(resoultModified));
                dispatch(stopResultInitialize());
            } else {
                alert("Content Not Found");
            }

        });
    }
}

export const setCurrentResult = (slipGame) => {
    return dispatch => {
        slipGame.games.map(game => {
            return axios.get("fixtures/id/" + game.fixture_id)
                .then(response => {
                    let resultFixture = response.data.api.fixtures[0];
                    let gameDay = moment(resultFixture.event_date).format("YYYY-MM-DD") + "T00:00:00+00:00";
                    let returnResult = {
                        status: resultFixture.status,
                        fixtureId: resultFixture.fixture_id,
                        homeGoals: resultFixture.goalsHomeTeam,
                        awayGoals: resultFixture.goalsAwayTeam,
                        score: resultFixture.score.fulltime,
                        homeTeam: resultFixture.homeTeam.team_name,
                        awayTeam: resultFixture.awayTeam.team_name,
                        gameDate: resultFixture.event_date,
                        gameDay: gameDay
                    };

                    let userRef = firebase.database().ref('match-results/' + resultFixture.fixture_id);
                    userRef.on('value', (snapshot) => {
                        const resultData = snapshot.val();
                        if (resultData === null) {
                            firebase.database().ref('match-results/' + resultFixture.fixture_id).set({
                                returnResult
                            });
                        } else {
                            let updates = {};
                            updates['match-results/' + resultFixture.fixture_id] = returnResult;
                            firebase.database().ref().update(updates)
                        }
                    })


                })
                .catch(err => {

                });

        });
    }
}