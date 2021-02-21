import React, { Component } from "react";
import classes from './jackpotByUser.module.css';
import { addCommaToAmounts } from '../../../shared/utility';
import firebase from '../../../config/firebase/firebase';
import Spinner from '../../UI/Spinner/Spinner';

class Jackpot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            jackpotData: {},
            tenAmount: 0,
            elevenAmount: 0,
            twelveAmount: 0 ,
            thirteenAmount:0
        }
    }

    componentDidMount(){
        if(!this.state.loading){
            let jackpotRef = firebase.database().ref("jackpots").child(this.props.gameDay);
            jackpotRef.on("value" , snapshot =>{
                let data = snapshot.val();

                
        let thirteen = (data.jackpot * this.props.thirteenPercent) / data.thirteen;
        let twelve = (data.jackpot * this.props.twelvePercent) / data.twelve;
        let eleven = (data.jackpot * this.props.elevenPercent) / data.eleven;
        let ten = (data.jackpot * this.props.tenPercent) / data.ten;

        let winData = {thirteen: thirteen, twelve: twelve, eleven: eleven, ten: ten}
        let jackpotWinRef = firebase.database().ref("jackpot-win").child(this.props.gameDay);
        jackpotWinRef.set(winData); 
                this.setState({jackpotData: data});
                this.setState({elevenAmount: eleven});
                this.setState({tenAmount: ten});
                this.setState({twelveAmount: twelve});
                this.setState({thirteenAmount: thirteen});
            })
        }
        this.setState({loading: true});

    }
    checkAmount = (amount) =>{
        return amount >= this.props.basePrice ? "₦" + addCommaToAmounts(amount.toString(10))
            : " Nil "
    }

    render() {
        return this.state.loading?<div className={classes.Jackpot}>
            <div className={classes.Header}>
                <h6>JACKPOT SHARE</h6>
            </div>
            <div className={classes.Main}>
                <div className={classes.Row}>
                    <div className={classes.Correct}><div className={classes.GameNumber}>{this.props.gamesLength}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.thirteen}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>winners</div></div>
                    <div className={classes.Pot}> {this.checkAmount(this.state.thirteenAmount)} </div>
                </div>
                <div className={classes.Row} >
                    <div className={classes.Correct}><div className={classes.GameNumber}>{this.props.gamesLength - 1}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.twelve}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>winners</div></div>
                    <div className={classes.Pot}> {this.checkAmount(this.state.twelveAmount)} </div>
                </div>
                <div className={classes.Row}>
                    <div className={classes.Correct} ><div className={classes.GameNumber}>{this.props.gamesLength - 2}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.eleven}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>winners</div></div>
                    <div className={classes.Pot} > {this.checkAmount(this.state.elevenAmount)} </div>
                </div>
                <div className={classes.Row}>
                    <div className={classes.Correct}><div className={classes.GameNumber}>{this.props.gamesLength - 3}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.ten}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>winners </div></div>
                    <div className={classes.Pot} > {this.checkAmount(this.state.tenAmount)}
                    </div>
                </div>
            </div>

        </div>: <Spinner />
    }
}

export default Jackpot;