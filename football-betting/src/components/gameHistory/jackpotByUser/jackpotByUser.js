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
            twelveAmount: 0,
            thirteenAmount: 0
        }
    }

    componentDidMount() {
        if (!this.state.loading) {
            let dataUser;
            let data;
            let jackpotRef = firebase.database().ref("jackpots").child(this.props.gameDay);
            jackpotRef.on("value", snapshot => {
                dataUser = snapshot.val();
            });
            setTimeout(() => {
                this.setState({ jackpotData: dataUser });
            }, 500);
                let jackpotWinRef = firebase.database().ref("jackpot-win").child(this.props.gameDay);
                jackpotWinRef.on("value" , snapshot=>{
                    data = snapshot.val();
                });
                setTimeout(() => {
                this.setState({ elevenAmount: data.eleven });
                this.setState({ tenAmount: data.ten });
                this.setState({ twelveAmount: data.twelve });
                this.setState({ thirteenAmount: data.thirteen });
                }, 500);
        }
        this.setState({ loading: true });

    }
    checkAmount = (amount) => {
        return (amount >= this.props.basePrice) ? "₦" + addCommaToAmounts(amount.toString(10))
            : " Nil "
    }

    render() {
        return this.state.loading ? <div className={classes.Jackpot}>
            <div className={classes.Header}>
                <h6>JACKPOT SHARE</h6>
            </div>
            <div className={classes.Main}>
                <div className={classes.Row}>
                    <div className={classes.Correct}><div className={classes.GameNumber}>{this.props.gamesLength}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.thirteenUser}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>winner(s)</div></div>
                    <div className={classes.Pot}> {this.checkAmount(this.state.thirteenAmount)} </div>
                </div>
                <div className={classes.Row} >
                    <div className={classes.Correct}><div className={classes.GameNumber}>{this.props.gamesLength - 1}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.twelveUser}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>winner(s)</div></div>
                    <div className={classes.Pot}> {this.checkAmount(this.state.twelveAmount)} </div>
                </div>
                <div className={classes.Row}>
                    <div className={classes.Correct} ><div className={classes.GameNumber}>{this.props.gamesLength - 2}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.elevenUser}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>winner(s)</div></div>
                    <div className={classes.Pot} > {this.checkAmount(this.state.elevenAmount)} </div>
                </div>
                <div className={classes.Row}>
                    <div className={classes.Correct}><div className={classes.GameNumber}>{this.props.gamesLength - 3}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.tenUser}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>winner(s) </div></div>
                    <div className={classes.Pot} > {this.checkAmount(this.state.tenAmount)}
                    </div>
                </div>
            </div>

        </div> : <Spinner />
    }
}

export default Jackpot;