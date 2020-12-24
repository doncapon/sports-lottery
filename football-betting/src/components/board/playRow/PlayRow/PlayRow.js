import React from 'react';
import SingleTile from  '../../tile/SingleTile/SingleTile';
import Team from "../team/team";
import classes from './PlayRow.module.css';

const  PlayRow = (props)=>{
    const HandlerAdd = (slipIndex, gameIndex, sideIndex) =>{
        props.toggleSelectedTile(slipIndex, gameIndex , sideIndex)
        if(props.adding) {
            const newSlip = [...props.changingSlip.value]
            props.addSlip(props.changingSlip.index, newSlip );
        }
    }  
    let board = [];
    board = props.teams.map( (team , k) => 
    {
        return (<div className= 'row'  style = {{marginBottom: '10px' , paddingRight: '30px'}} key={k}>
               <div className = 'col-lg-12' >
                   <div className= 'row '   style= {{background : 'skyblue', padding: '10px 0px 0px',
                            margin: '0px'
                        }}>
                    <div className= {'col-lg-7 ' + classes.Team} >
                        <Team team1 = {team.team1} team2 = {team.team2} row = {k+1}  />
                    </div>

                    <div className={'col-lg-1 ' 
                            + classes.RowChild} >
                        <div style ={{width: '140px' , margin: '0px 20px 20px ' ,
                         paddingBottom : '20px'} }>
                            {
                                
                                props.slips[props.slips.length - 1][k].map((side, i)=>
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
                                    clicked = {()=>HandlerAdd(props.slips.length-1 ,k,i)} />

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

    }
 


export default PlayRow