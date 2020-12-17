import React from  'react';
import SingleTile from  '../../tile/SingleTile';
import Team from "../team/team";
import classes from './PlayRow.module.css';
import Auxy from '../../../../hoc/Auxy/Auxy';

const PlayRow = (props) =>{

    let board = [];

    board = props.teams.map( (team , k) => {
        return <Auxy key={k}>
            <Team team1 = {team.team1} team2 = {team.team2}  />
            <div style ={{width: '110%', minWidth: '200px'  } }>
                <SingleTile  type = 'home' selected = {props.teams[k].sides['home'].selected}
                clicked = {()=>props.clicked("home" , k) } >1</SingleTile>
                <SingleTile  type = 'draw' selected = {props.teams[k].sides['draw'].selected}
                clicked = {()=>props.clicked("draw" , k) } >X</SingleTile>
                <SingleTile  type = 'away'selected = {props.teams[k].sides['away'].selected}
                clicked = {()=>props.clicked("away" , k) } >2</SingleTile>
            </div>
            </Auxy>
        
    });

    return (
        <div className = {classes.PlayRow}>
            {board}
        </div>
    );
}


export default PlayRow;