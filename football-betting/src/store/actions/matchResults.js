import * as  actionTypes from './actionTypes';
import axios from '../../axios-fixtures';
import axiosMain from '../../axios-main';

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

export const fetchResults = (startDate)=>{
    return dispatch=>{
        axios.get("match-result")
        .then(response=>{
            console.log(response)
            dispatch (fetchWeeklyResults(response.data));
            dispatch(stopResultInitialize());

        });
    }
}

export const setCurrentResult = (slipGame) => {
    return dispatch => {
         slipGame.games.map(game => {
            return axios.get("fixtures/id/" + game.fixture_id,
                {
                    headers: {
                        'x-rapidapi-key': '8275c582bamshd83a3179dd00459p19f0b2jsn94c889368579',
                        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                    }
                })
                .then(response => {
                    let resultFixture = response.data.api.fixtures[0];
                    let returnResult = {
                        fixtureId: resultFixture.fixture_id,
                        homeGoals: resultFixture.goalsHomeTeam,
                        awayGoals: resultFixture.goalsAwayTeam,
                        status: resultFixture.status,
                        score: resultFixture.score.fulltime, homeTeam: resultFixture.homeTeam.team_name
                        , awayTeam: resultFixture.awayTeam.team_name, gameDate: resultFixture.event_date
                    };
                    if (game.status === "Match Finished") {
                        axiosMain.post("match-result", returnResult)
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

    }
}