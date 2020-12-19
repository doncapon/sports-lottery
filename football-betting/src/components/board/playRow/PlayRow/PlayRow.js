import React from  'react';
import SingleTile from  '../../tile/SingleTile/SingleTile';
import Team from "../team/team";
import classes from './PlayRow.module.css';
// import Auxy from '../../../../hoc/Auxy/Auxy';

const PlayRow = (props) =>{

    let board = [];

    board = props.teams.map( (team , k) => {
        return (<div key={k}>

            <Team team1 = {team.team1} team2 = {team.team2}  />
            <div style ={{width: '110%', minWidth: '250px' } }>
                <SingleTile key = {'home' + k}  type = 'home' selected = { props.teams[k]['home']}
                clicked = {()=>props.clicked("home" , k) } >1</SingleTile>
                <SingleTile key = {'draw' + k}   type = 'draw' selected = { props.teams[k]['draw']}
                clicked = {()=>props.clicked("draw"  , k) } >X</SingleTile>
                <SingleTile  key = {'away' + k}  type = 'away'selected = {props.teams[k]['away']}
                clicked = {()=>props.clicked("away" , k) } >2</SingleTile>
            </div>
            </div>
        );
        
    });

    return (
        <div className = {classes.PlayRow}>
            {
            board
        }
        </div>
    );
}


export default PlayRow;