import * as  actionTypes from './actionTypes';
import axios from '../../axios-fixtures';

export const initializeCurrentResult = (payload) => {
    return {
        type: actionTypes.INITIALIZE_CURRENT_RESULT,
        payload: payload
    };
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


export const setCurrentResult = (slipsGames) => {
    return dispatch => {
        let allResults = slipsGames.map((slipGame, i) => {
            const allRequests = slipGame.games.map(game => {
                return axios.get("fixtures/id/" + game.fixture_id,
                    {
                        headers: {
                            'x-rapidapi-key': '8275c582bamshd83a3179dd00459p19f0b2jsn94c889368579',
                            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                        }
                    })
                    .then(response => {
                        let resultFixture = response.data.api.fixtures[0];
                        console.log(resultFixture);
                        let returnResult = {
                            fixtureId: resultFixture.fixture_id,
                            homeGoals: resultFixture.goalsHomeTeam,
                            awayGoals: resultFixture.goalsAwayTeam,
                            score: resultFixture.score.fulltime, homeTeam: resultFixture.homeTeam.team_name
                            , awayTeam: resultFixture.awayTeam.team_name, gameDate: resultFixture.event_date
                        };
                        return returnResult;
                    }).catch(err => {

                    })
                    ;
            });
            return Promise.all(allRequests).then(value => {
                return value;
            });
        })

        Promise.all(allResults).then(value =>{
            dispatch(initializeCurrentResult(value));
        });

    }
}