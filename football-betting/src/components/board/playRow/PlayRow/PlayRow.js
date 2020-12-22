import React from  'react';
import SingleTile from  '../../tile/SingleTile/SingleTile';
import Team from "../team/team";
import classes from './PlayRow.module.css';
// import Auxy from '../../../../hoc/Auxy/Auxy';

const PlayRow = (props) =>{

    let board = [];

    board = props.teams.map( (team , k) => {
        return (<div className= 'row'  style = {{marginBottom: '10px' , paddingRight: '30px'}} key={k}>
            <div className= {'col-lg-8 col-lg-6 col-md-4 col-sm-6  col-sm56 col-sm-1 ' + classes.Team} >
            <span style={{float: 'left'}}>{k+1}. </span>
            <Team team1 = {team.team1} team2 = {team.team2}  />
            </div>
            <div className={'col-lg-4 col-md-4 col-md-5 col-sm-5 col-sm-1 ' 
                            + classes.RowChild} >
                <div style ={{width: '140px' , margin: '7px 20px 0px '} }>
                <span style={{float: 'left',
                 fontWeight: 'bold', marginRight: '3px' ,
                 color: 'black'
                 }}>{k+1} . </span>
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