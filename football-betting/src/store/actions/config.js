
import axios from '../../axios-fixtures';
import moment from 'moment';
import * as  actionTypes from './actionTypes';
import _ from 'lodash';
import firebase from "../../config/firebase/firebase";

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


export const fetchResults = (nnumberOfGames = 26) => {
    return dispatch => {
        let matchRef = firebase.database().ref().child("match-results").orderByChild('gameDay')
        .limitToLast(nnumberOfGames);
        matchRef.on('value', (snapshot) => {
            const resultData = snapshot.val();
            let finalResults = [];
            let groupedGameResults = _.groupBy(resultData, 'gameDay');
            let result = Object.keys(groupedGameResults).map((key) => [key, groupedGameResults[key]]);

            let newArr = [];
            for(let i =  result.length -1 ; i >=0; i--){
                newArr.push(result[i]);
            }
            newArr.forEach((arr, k)=>{
                let i   = arr[1].sort((a, b) => a.fixtureId > b.fixtureId ? 1 : -1);
                finalResults.splice(finalResults.length, finalResults.length + 1, i);
               
            })

            dispatch(fetchWeeklyResults(finalResults));
            dispatch(stopResultInitialize());

               

        });
    }
}

export const setCurrentResult = (slipGame, startDate) => {
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