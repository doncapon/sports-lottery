import React from  'react';
import SingleTile from  '../../tile/SingleTile/SingleTile';
import Team from "../team/team";
import classes from './PlayRow.module.css';
// import Auxy from '../../../../hoc/Auxy/Auxy';

const PlayRow = (props) =>{

    let board = [];

    board = props.teams.map( (team , k) => {
        return (<div className= 'row' key={k}>
            <div className= {'col-lg-8  col-md-4' + classes.Team} >
            <Team team1 = {team.team1} team2 = {team.team2}  />
            </div>
            <div className={'col-lg-4 ' + classes.RowChild} >
                <div style ={{width: '300px' } }>
                    {
                            team.sides.map((side, i)=>{
                            let  tile = null;
                                if( i === 0){
                                    tile = 'home';
                                }else if( i === 1){
                                    tile = 'draw';
                                }else{
                                    tile = 'away';
                                }
                    
                                return    <SingleTile key = { tile+ i}  type = {tile}  selected = { side.selected}
                                clicked = {()=>props.clicked(k , i ) } />

                              })
                    }
                </div>
            </div>
            </div>
        );
        
    });

    return (
        <div className = {classes.PlayRow}>
            {board}

        </div>
    );
}


export default PlayRow;