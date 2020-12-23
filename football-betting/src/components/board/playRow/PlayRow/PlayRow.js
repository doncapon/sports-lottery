import { render } from '@testing-library/react';
import React,{ Component } from 'react';
import SingleTile from  '../../tile/SingleTile/SingleTile';
import Team from "../team/team";
import classes from './PlayRow.module.css';
// import Auxy from '../../../../hoc/Auxy/Auxy';

class  PlayRow extends Component{
    state = {
        sides :  [
    
                [ {selected : false}, {selected : false}, {selected : false} ],
                [ {selected : false}, {selected : false}, {selected : false} ],
                [ {selected : false}, {selected : false}, {selected : false} ],
            
        ]   
    }
    switchside= (betrow, row , column)=>{
        var updatedState = [...this.state.sides];
        updatedState[row][column].selected = !updatedState[row][column].selected ;

        this.setState({sides: updatedState});
        this.props.clicked(betrow, updatedState);

    }

    componentDidMount(){
        
    }
    

        
        render(){ 
            
    let board = [];
    board = this.props.teams.map( (team , k) => 
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
                                this.state.sides[k].map((side, i)=>
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
                                    clicked = {()=>this.switchside(this.props.betrow.length-1,k,i)} />

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
 
}

export default PlayRow