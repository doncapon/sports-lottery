import * as  actionTypes from './actionTypes';
import axios from '../../axios-fixtures';

export const initializeCurrentResult=(payload)=>{
    return {
        type: actionTypes.INITIALIZE_CURRENT_RESULT,
        payload: payload
    };
}


export const setCurrentResult = (fixtureId) => {
    return dispatch => {
        axios.get("fixtures/id/" + fixtureId
            ,
            {
                headers: {
                    'x-rapidapi-key': '8275c582bamshd83a3179dd00459p19f0b2jsn94c889368579',
                    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                }
            })
            .then(response => {
                let resultFixture = response.data.api.fixtures[0];
                let returnResult = {
                    homeGaols: resultFixture.goalsHomeTeam,
                    awayGaols: resultFixture.goalsAwayTeam,
                    score: resultFixture.score.fulltime, homeTeam: resultFixture.homeTeam.team_name
                    , awayTeam: resultFixture.awayTeam.team_name, gameDate: resultFixture.event_date
                };

                dispatch(initializeCurrentResult(returnResult));

            }).catch(err => {

            });
    }
}