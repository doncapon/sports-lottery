import { Component, React } from "react";
import classes from './Board.module.css';
import Button from "../UI/Button/Button";
import PlayRow from "./playRow/PlayRow/PlayRow.js";

class Board extends Component {
    state = {
   
        teams : [
            {
                team1 : 'Manchester United',
                team2: 'Watford FC' ,
                sides : {
                    home: {selected: false},
                    draw : {selected: false},
                    away: {selected: false}
                },
                rowValid: false,
                rowAmount: 0
            }, 
            
            {
                team1 : 'Chelsea',
                team2: 'Arsenal',
                sides : {
                    home: {selected: false},
                    draw : {selected: false},
                    away: {selected: false},
                 },
                 rowValid: false,
                 rowAmount: 0
            },
            {
                team1 : 'Real Madrid', 
                team2: 'Barcelona',
                sides : {
                    home: {selected: false},
                    draw : {selected: false},
                    away: {selected: false},
                },
                rowValid: false,
                rowAmount: 0
            },

            {
                team1 : 'Leicester city', 
                team2: 'Manchester city', 
                sides : {
                    home: {selected: false},
                    draw : {selected: false},
                    away: {selected: false},
                },
                rowValid: false,
                rowAmount: 0
            },
            {
                team1 : 'Wolverhampton wonderers', 
                team2: 'Stoke city',     
                sides : {
                    home: {selected: false},
                    draw : {selected: false},
                    away: {selected: false},
                },
                rowValid: false,
                rowAmount: 0
            },
            {
                team1 : 'Liverpool', 
                team2: 'Newcastle United',
                sides : {
                    home: {selected: false},
                    draw : {selected: false},
                    away: {selected: false},
                },
                rowValid: false,
                rowAmount: 0
            },
            {
                team1 : 'Watford', 
                team2: 'Burnley FC',     
                sides : {
                    home: {selected: false},
                    draw : {selected: false},
                    away: {selected: false},
                },
                rowValid: false,
                rowAmount: 0
            },
            {
                team1 : 'Everton', 
                team2: 'Tottenham HotSpur',   
                sides : {
                    home: {selected: false},
                    draw : {selected: false},
                    away: {selected: false},
                },
                rowValid: false,
                rowAmount: 0
            },
            {
                team1 : 'Birmingham City', 
                team2: 'Fulham', 
                    sides : {
                        home: {selected: false},
                        draw : {selected: false},
                        away: {selected: false},
                },
                rowValid: false,
                rowAmount: 0
            },
            {
                team1 : 'Crystal Palace', 
                team2: 'HuddersField',     
                sides : {
                    home: {selected: false},
                    draw : {selected: false},
                    away: {selected: false},
                },
                rowValid: false,
                rowAmount: 0
            },
            {
                team1 : 'West Bromich Abion', 
                team2: 'WestHam United',     
                sides : {
                    home: {selected: false},
                    draw : {selected: false},
                    away: {selected: false},
                },
                rowValid: false,
                rowAmount: 0
            },
            {
                team1 : 'Southhampton', 
                team2: 'BrentFord',     
                sides : {
                    home: {selected: false},
                    draw : {selected: false},
                    away: {selected: false},
                },
                rowValid: false,
                rowAmount: 0
            },
        ],
        totalPrice : 0,
        allRowsValid: false
    }

    toggleTileSelect =(key, index) =>{
        const updatedTeams = this.state.teams;
        let multiplier = 0;
        updatedTeams[index].sides[key].selected =
         !this.state.teams[index].sides[key].selected;
    
       //increasing the amount per click
        if(updatedTeams[index].sides[key].selected){
            updatedTeams[index].rowAmount += 1;
        }else{
            updatedTeams[index].rowAmount -= 1;

        }
        //setting the row values
        if(this.state.teams[index].sides['home'].selected ||
            this.state.teams[index].sides['draw'].selected ||
            this.state.teams[index].sides['away'].selected 
            ){
                updatedTeams[index].rowValid = true;
            }else{
                updatedTeams[index].rowValid = false;
            }
        let allRowsValid = true;
        for(let team of this.state.teams){
            if(!team.rowValid){
                allRowsValid = false;
            }
        }

              //setting up whether of  not to s show the rows
              let updaatedPrice = this.state.totalPrice;
              let totalAmout = 0;
              if(allRowsValid )
              totalAmout =  25;
        for(let team of this.state.teams){
            
            if(team.rowAmount === 1){
                multiplier = 1;
            }else if( team.rowAmount === 2){
                multiplier = 2;
            }else if(team.rowAmount === 3){
                multiplier = 3
            }
                totalAmout = totalAmout * multiplier;
            
        } 
              updaatedPrice = totalAmout;

       this.setState({ teams: updatedTeams ,
         totalPrice : updaatedPrice ,
        allRowsValid : allRowsValid
        });
    }


    render (){
     
    
           
        return <div className = {classes.Board}>
             <PlayRow  clicked = {this.toggleTileSelect} 
             teams = {this.state.teams}
             />
            <div style={{display:'block',float: 'left', width: '150%',fontSize: '1.4em'}}>
             {true > 0 ? <p >Total : {this.state.totalPrice} <span style={{color: 'green'}}>Naira</span></p>  : null }
            
            <Button btnType= "Primary" disabled = {!this.state.allRowsValid}
            >PLAY NOW</Button>
             </div>
            </div>
        
    }
}

export default Board;