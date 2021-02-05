import * as  actionTypes from './actionTypes';
import axios from '../../axios-fixtures';
import axiosMain from '../../axios-main';
import moment from 'moment';
import _ from  'lodash';


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

export const setUpWinners = (jackpot, thirteenPercent, twelvePercent, elevenPercent, tenPercent,
    thirteenPieces, twelvePieces, elevenPieces, tenPieces) => {
    return {
        type: actionTypes.SETUP_WINNERS,
        jackpot: jackpot,

        thirteenPercent: thirteenPercent,
        twelvePercent: twelvePercent,
        elevenPercent: elevenPercent,
        tenPercent: tenPercent,

        thirteenPieces: thirteenPieces,
        twelvePieces: twelvePieces,
        elevenPieces: elevenPieces,
        tenPieces: tenPieces
    };
}
export const fetchResults = (startDate) => {
    return dispatch => {
        axiosMain.get("match-results")
            .then(response => {
                console.log(response);
                let groupedGameResults = _.groupBy(response.data, 'gameDay');
                console.log("I was called so ",groupedGameResults)
                dispatch(fetchWeeklyResults(groupedGameResults))
                dispatch(stopResultInitialize());

            });
    }
}

export const setCurrentResult = (slipGame, startDate) => {
    return dispatch => {
        const allRequest = slipGame.games.map(game => {
            return axios.get("fixtures/id/" + game.fixture_id,
                {
                    headers: {
                        'x-rapidapi-key': '8275c582bamshd83a3179dd00459p19f0b2jsn94c889368579',
                        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                    }
                })
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
                    if (game.status === "Match Finished") {
                        axiosMain.post("match-results", returnResult)
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                                console.log(error)
                            });
                    }
                })
                .catch(err => {

                });

        });
        Promise.all(allRequest).then(value=>{
            dispatch(fetchResults(startDate))
        })
    }
}