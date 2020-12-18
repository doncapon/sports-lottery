import React from  'react';
import SingleTile from  '../../tile/SingleTile/SingleTile';
import Team from "../team/team";
import classes from './PlayRow.module.css';
import Auxy from '../../../../hoc/Auxy/Auxy';

const PlayRow = (props) =>{

    let board = [];

    board = props.teams.map( (team , k) => {
        // console.log(props.teams[0].sides['home']);
        console.log(props.teams[0].rowValid);
        return ( <Auxy key={k}>
            <Team team1 = {team.team1} team2 = {team.team2}  />
            <div style ={{width: '110%', minWidth: '250px' ,  } }>
             {   Object.keys( team.sides ).map( igKey => {

            return [...Array( team.sides[igKey])].map( ( _, i ) => {
                return <SingleTile key={igKey + k} type={igKey} 
                        selected = { team.sides[igKey]}
                        clicked = {()=>props.clicked(igKey, k) }   />;
                    }) 
                })
                .reduce((arr, el) => {
                    return arr.concat(el)
                }, []) 
            }
            </div>
            </Auxy>
        );
        
    });

    return (
        <div className = {classes.PlayRow}>
            {board}
        </div>
    );
}


export default PlayRow;