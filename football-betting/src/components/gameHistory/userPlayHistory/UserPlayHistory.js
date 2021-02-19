import classes from "./UserPlayHistory.module.css";
import React, { Component } from "react";
import moment from 'moment';
import Jackpot from "../jackpot/jackpot";
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import firebase from '../../../config/firebase/firebase';
import _ from "lodash";
import { Spinner } from "react-bootstrap";

class UserPlayHistory extends Component {
    state ={
        matchesPlayed: [],
        loading: false,
        showHistory: []
    }
    componentDidMount(){
        if(!this.state.loading){
            firebase.auth().onAuthStateChanged((user) =>{
                if(user){
                    let playedRef = firebase.database().ref("game-history").child(user.uid);
                    playedRef.on("value" , (snapshot) =>{
                        let data = snapshot.val();
                        let grouped = _.groupBy(data, 'gameNumber');
                        let groupedArray = Object.keys(grouped).map(keys=> grouped[keys])
                        this.setState({matchesPlayed : groupedArray});
                        let myShow = []
                        Object.keys(grouped).map(grp => {
                            myShow.push(false)
                        });
                        this.setState({showHistory: myShow})
                    })

                  
                }else{

                }
          
            })
           
        }

        this.setState({loading: true})
    }

    toggleShowHistory =(index)=>{
        let smallShow = [...this.state.showHistory];
        smallShow[index] =  !smallShow[index];
        this.setState({showHistory: smallShow});

    }
    findSelection = (goalHome, goalAway, status) => {
        if (status === "Match Finished") {
            if (goalHome > goalAway) {
                return "H";
            } else if (goalHome < goalAway) {
                return "A";
            } else {
                return "D";
            }
        } else {
            return "-";
        }

    }
    render() {
        let userPlayHistoryTrannsformed =this.state.loading? this.state.matchesPlayed.map((match, k) => {
           return <div className={classes.userPlayHistoryAndShare} key={k}>
               {console.log("SFSDf" , match)}
                <div className={classes.MainHeader}>
                    <div className={classes.DateHead}> Date resolved : {moment(match.gameDay).format("DD.MM.YYYY")}</div>
                    <div className={classes.PriceHead}>Price: {match[0].slipPrice}</div>

                    <Button className={classes.BtToggle} size="sm" onClick = {()=>this.toggleShowHistory(k)}>
                    {!this.state.showHistory[k] ? <CaretDownFill className={classes.Icon} /> :
                     <CaretUpFill className={classes.Icon} />} </Button>
                </div>
                <div className={classes.ResultHead} >
                    
                </div>
                {/* <div className={classes.userPlayHistory}>

                    <div className={classes.ResultBody} >
                        <div className={classes.BodyHeader}>
                            <div className={classes.Match}>Match</div>
                            <div className={classes.MoveMiddle}>Result</div>
                            <div className={classes.MoveRight}>Correct</div>
                        </div >
                        <div className={classes.BodyMain}>
                            {userPlayHistory.map((eachRes, i) => {
                                return <div key={i} className={classes.SelectionRow}>
                                    <div className={classes.Teams}>
                                        <div className={classes.RowNumber}>{i + 1} </div>
                                        <div className={classes.TeamNames}>
                                            <div>{eachRes.homeTeam + "  -  "}</div>
                                            <div>{eachRes.awayTeam}</div>
                                        </div>
                                    </div>
                                    <div className={classes.Score}>{eachRes.status === "Match Finished" ? eachRes.score : "in progress"}</div>
                                    <div >{this.findSelection(eachRes.homeGoals, eachRes.awayGoals, eachRes.status)}</div>
                                </div>
                            })}

                        </div>

                    </div>
                    <div className={classes.JackPotShare}>
                        <Jackpot basePrice={this.props.basePrice} gamesLength={this.props.gamesLength} thirteen={this.props.thirteen}
                            twelve={this.props.twelve} eleven={this.props.eleven} ten={this.props.ten}
                            thirteenPcs={this.props.thirteenPcs} twelvePcs={this.props.twelvePcs}
                            elevenPcs={this.props.elevenPcs} tenPcs={this.props.tenPcs}
                        />
                    </div>
                </div> */}

            </div>
        })
        :<Spinner />

        return (<div className={classes.userPlayHistoryWrapper}>{userPlayHistoryTrannsformed}</div>);
    }
}


const mapstateToprops = (state) => {
    return {
        //board
        gamesLength: state.board.gamesLength,


        //match results
        thirteen: state.matchResults.thirteen,
        twelve: state.matchResults.twelve,
        eleven: state.matchResults.eleven,
        ten: state.matchResults.ten,

        //Config
        basePrice: state.config.basePrice,
        loading: state.config.loading,
        daysuserPlayHistory: state.board.receipts,
        resultsFrom: state.config.resultsFrom,

        jackpot: state.config.jackpot,
        thirteenPieces: state.config.thirteenPieces,
        twelvePieces: state.config.twelvePieces,
        elevenPieces: state.config.elevenPieces,
        tenPieces: state.config.tenPieces,

        thirteenPercent: state.config.thirteenPercent,
        twelvePercent: state.config.twelvePercent,
        elevenPercent: state.config.elevenPercent,
        tenPercent: state.config.tenPercent,
        insertResult: state.config.insertResult,

        //Login
        isLoggedIn: state.login.isLoggedIn

    }
};

const mapDispatchToprops = (dispatch) => {
    return {
        onFetchResults: (startDate) => dispatch(actions.fetchResults(startDate)),
        onSetUpWinners: (jackpot, thirteenpct, twelvepct, elevenpct, tenpct,
            thirteenPieces, twelvePieces, elevenPieces, tenPieces) =>
        dispatch(actions.setUpWinners(jackpot, thirteenpct, twelvepct, elevenpct, tenpct,
            thirteenPieces, twelvePieces, elevenPieces, tenPieces)),
    }
}
export default connect(mapstateToprops, mapDispatchToprops)(UserPlayHistory);