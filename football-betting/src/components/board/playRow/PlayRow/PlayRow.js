import React from 'react';
import SingleTile from  '../../tile/SingleTile/SingleTile';
import Team from "../team/team";
import classes from './PlayRow.module.css';

const PlayRow = (props) =>{

   const  HandlerAdd = (slipIndex, gameIndex, sideIndex , side) =>{
        props.toggleSelectedTile( slipIndex, gameIndex , sideIndex, side);
        props.checkPurchasable(slipIndex)
        props.setDisableAddButtons();
    }  

    let board = [];

    const gameId = "game_";
    board = props.slips[props.editIndex]["slip_" + (props.editIndex + 1)].games.map( ( game, k) => 
    {
        return (<div className= 'row'  style = {{marginBottom: '10px'}} key={k}>
               <div className = 'col-lg-12'  >
                   <div className= 'row '   style= {{ background : 'skyblue', padding: '10px 0px 0px',
                        }}>
                    <div className= {'col-lg-7 ' + classes.Team} >
                        <Team team1 = {game[gameId + (k+1)].team1} team2 = {game[gameId + (k+1)].team2} row = {k+1}  />
                    </div>
                    

                    <div className={'col-lg-1 ' 
                            + classes.RowChild} >
                        <div style ={{width: '140px' , margin: '0px 0px 20px ' ,
                         paddingBottom : '20px'} }>
                            {
                                game[gameId + (k+1)].sides.map((side, i)=>
                                {
                                   let  tile = null;

                                    if( i === 0){
                                        tile = 'home';

                                }else if( i === 1){
                                        tile = 'draw';
                                    }else{
                                        tile = 'away';
                                    }

                                    return    <SingleTile key = { tile+ i}  type = {tile} 
                                     selected = { side.selected}
                                    clicked = {()=>HandlerAdd(props.slips.length-1 ,k,i, side.selected )} />

                                })
                            }
                    </div>
                    </div>     
                    <div>
               
                    </div>  
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

    
 
};

export default PlayRow