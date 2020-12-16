import { Component, React } from "react";
import SingleRow from "./SingleRow/SingleRow";
import Team from "./playRow/team/team";
import classes from './Board.module.css';
import Button from "../UI/Button/Button";
import Auxy from "../../hoc/Auxy/Auxy";

class Board extends Component {
    state = {
        rowTiles : {
            home: 1,
            draw : 1,
            away: 1,
        },
        teams : [
            {team1 : 'Manchester United', team2: 'Watford FC'},
            {team1 : 'Chelsea', team2: 'Arsenal'},
            {team1 : 'Real Madrid', team2: 'Barcelona'},
            {team1 : 'Leicester city', team2: 'Manchester city'},
            {team1 : 'Wolverhampton wonderers', team2: 'Stoke city'},
            {team1 : 'Liverpool', team2: 'Newcastle United'},
            {team1 : 'Watford', team2: 'Burnley FC'},
            {team1 : 'Everton', team2: 'Tottenham HotSpur'},
            {team1 : 'Birmingham City', team2: 'Fulham'},
            {team1 : 'Crystal Palace', team2: 'HuddersField'},
            {team1 : 'West Bromich Abion', team2: 'WestHam United'},
            {team1 : 'Southhampton', team2: 'BrentFord'},
        ],
        totalPrice : 0
    }


    render (){
        let board = [];

        board = this.state.teams.map( (team , k) => {
            return <Auxy>
                <Team key={Math.random()} team1 = {team.team1} team2 = {team.team2}  />
                <SingleRow key = {Math.random}
                teams = { this.state.teams} 
                rowTiles = {this.state.rowTiles} />
                
            </Auxy>
            
        });
    
           
        return <div className = {classes.Board}>
            {board}
            <Button btnType= "Primary" >SUBMIT</Button>
            </div>
        
    }
}

export default Board;