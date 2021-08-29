
import axios from '../../axios-fixtures';
import moment from 'moment';
import * as  actionTypes from './actionTypes';
import _ from 'lodash';
import firebase from "../../config/firebase/firebase";
import { checkDateRange } from '../../shared/utility';

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
export const updateBoard = (fixturesToPush, kickOffDate) => {
    return dispatch => {
        fixturesToPush.forEach((fixture, index) => {
                axios.get("fixtures", {params: { id: fixture}})
                .then(response => {
                    firebase.database().ref("board").child(kickOffDate).child(index)
                        .update({ status: response.data.response[0].fixture.status.long });
                    firebase.database().ref("board").off();
                });
        });
        firebase.database().ref("board").off();
        return null;
    }
}


const gamePicker = (response, startTIme, endTime, wantedFixturesArray, country, leagueNames, gamesPerLeague) => {
    if (wantedFixturesArray.length < 13) {
        for (let i = 0; i < leagueNames.length; i++) {
            let league = leagueNames[i];
            if (wantedFixturesArray.length > 13) {
                break;
            }
            let fixtureAtTime = response.data.response.filter(
                fixture => checkDateRange(fixture.fixture.date, startTIme, endTime));
            let countryFixtures = fixtureAtTime.filter(fixture => fixture.league.country === country);

            let leagueFixture = countryFixtures.filter(fixture => fixture.league.name === league);
            wantedFixturesArray = wantedFixturesArray.concat(leagueFixture.splice(0, gamesPerLeague));

        }

    }
    if (wantedFixturesArray.length > 13)
        wantedFixturesArray = wantedFixturesArray.splice(0, 13);
    return wantedFixturesArray;
}

export const configureBoard = (kickOffTime, endTime, kickOffDate) => {
    return dispatch => {
        axios.get("fixtures", {
            params: {
                date: kickOffDate
            }
        })
            .then(response => {
                let startTime = (kickOffDate + "T" + kickOffTime);
                endTime = (kickOffDate + "T" + endTime);
                let wantedFixtures = gamePicker(response, startTime, endTime, [], "England", ["Premier League", "Championship", "FA Cup", "League One", "League Two"], 7);

                // let fixtureAtTime = response.data.response.filter(
                //     fixture => checkDateRange(fixture.fixture.date, startTime, endTime));

                //     fixtureAtTime.forEach(fix =>{
                //         console.log(fix.league.country+ " "+ fix.teams.home.name+ " league nname: "+ fix.league.name);

                //     })

                let fixturesToPush = [];
                for (let i = 0; i < wantedFixtures.length; i++) {
                    fixturesToPush.splice(fixturesToPush.length, fixturesToPush.length + 1,
                        {
                            leagueName: wantedFixtures[i].league.name,
                            fixture_id: wantedFixtures[i].fixture.id,
                            status: wantedFixtures[i].fixture.status.long,
                            homeTeam_id: wantedFixtures[i].teams.home.id, homeTeam: wantedFixtures[i].teams.home.name,
                            awayTeam_id: wantedFixtures[i].teams.away.id, awayTeam: wantedFixtures[i].teams.away.name,
                            event_date: startTime
                            // end_time: moment(endTime).add(3, 'hours').format("YYYY-MM-DDTHH:mm:SS+00:00"),
                        })
                }
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
                    }
                })
                dispatch(setIsBoardSet(true));
                firebase.database().ref("board").off();
            }).catch(error => {
                console.log(error);
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
            }
            return null;
        });
    }
}

export const setCurrentResult = () => {
    return dispatch => {
        firebase.database().ref("board").limitToLast(2).on("value", snapshot => {
            let date = Object.keys(snapshot.val())[0];
            let boardGame = snapshot.val();
            let gameData = boardGame[date];
            Object.keys(gameData).map(key => {
                if (key >= 0 && key <= 12) {
                    let targetFixture = gameData[key].fixture_id;

                    return axios.get("fixtures", { params: { id: targetFixture } })
                        .then(response => {
                            let resultFixture = response.data.response[0];
                            let gameDay = moment(resultFixture.fixture.date).format("YYYY-MM-DD") + "T00:00:00+00:00";
                            console.log(gameDay)
                            let returnResult = {
                                status: resultFixture.fixture.status.long,
                                fixtureId: resultFixture.fixture.id,
                                homeGoals: resultFixture.goals.home,
                                awayGoals: resultFixture.goals.away,
                                score: resultFixture.score.fulltime,
                                homeTeam: resultFixture.teams.home.name,
                                awayTeam: resultFixture.teams.away.name,
                                gameDate: resultFixture.fixture.date,
                                gameDay: gameDay
                            };
                            console.log(returnResult);
                            let userRef = firebase.database().ref('match-results/' + resultFixture.fixture.id);
                            userRef.on('value', (snapshot) => {
                                const resultData = snapshot.val();
                                if (resultData === null) {
                                    firebase.database().ref('match-results/' + resultFixture.fixture.id).set({
                                        returnResult
                                    });
                                } else {
                                    let updates = {};
                                    updates['match-results/' + resultFixture.fixture.id] = returnResult;
                                    firebase.database().ref().update(updates)
                                }
                            })
                        })
                        .catch(err => {

                        });
                }
                return null;
            });
        })
        setTimeout(() => {
            firebase.database().ref("board").off();
            firebase.database().ref("match-results").off();
        }, 5000)

    }
}