import { Component, React } from "react";
import Team from "./playRow/team/team";
import classes from './Board.module.css';
import Button from "../UI/Button/Button";
import SingleTile from "./tile/SingleTile";

class Board extends Component {
    state = {
   
        teams : [
            {team1 : 'Manchester United', team2: 'Watford FC' ,
            sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },
            },
            {team1 : 'Chelsea', team2: 'Arsenal',
            sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },
            },
            {team1 : 'Real Madrid', team2: 'Barcelona',
            sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },},
            {team1 : 'Leicester city', team2: 'Manchester city', 
            sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },},
            {team1 : 'Wolverhampton wonderers', team2: 'Stoke city',     sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },},
            {team1 : 'Liverpool', team2: 'Newcastle United',
            sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },},
            {team1 : 'Watford', team2: 'Burnley FC',     
            sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },},
            {team1 : 'Everton', team2: 'Tottenham HotSpur',   
              sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },},
            {team1 : 'Birmingham City', team2: 'Fulham', 
                 sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },},
            {team1 : 'Crystal Palace', team2: 'HuddersField',     
            sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },},
            {team1 : 'West Bromich Abion', team2: 'WestHam United',     sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },},
            {team1 : 'Southhampton', team2: 'BrentFord',     sides : {
                home: {selected: false},
                draw : {selected: false},
                away: {selected: false},
            },},
        ],
        totalPrice : 0
    }

    toggleTileSelect =(key, index) =>{
        const updatedTeams = this.state.teams;
        updatedTeams[index].sides[key].selected = !this.state.teams[index].sides[key].selected;
        console.log(updatedTeams);
        this.setState({teams: updatedTeams});
    }
    render (){
        let board = [];

        board = this.state.teams.map( (team , k) => {
            return <div key={k}>
                <Team team1 = {team.team1} team2 = {team.team2}  />
                
                <SingleTile  type = 'home' selected = {this.state.teams[k].sides['home'].selected}
                 clicked = {()=>this.toggleTileSelect("home" , k) } >1</SingleTile>
                <SingleTile  type = 'draw' selected = {this.state.teams[k].sides['draw'].selected}
                 clicked = {()=>this.toggleTileSelect("draw" , k) } >X</SingleTile>
                <SingleTile  type = 'away'selected = {this.state.teams[k].sides['away'].selected}
                clicked = {()=>this.toggleTileSelect("away" , k) } >2</SingleTile>
                </div>
            
        });
    
           
        return <div className = {classes.Board}>
            {board}
            
            <Button btnType= "Primary" >SUBMIT</Button>
            
            </div>
        
    }
}

export default Board;