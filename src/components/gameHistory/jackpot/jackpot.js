import React, { Component } from "react";
import classes from './jackpot.module.css';
import { addCommaToAmounts } from '../../../shared/utility';
import firebase from '../../../config/firebase/firebase';
import Spinner from '../../../components/UI/Spinner/Spinner';
import dice from '../../../assets/dice.png'

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
            jackpotWinRef.on("value", snapshot => {
                data = snapshot.val();
            });
            setTimeout(() => {
                if (data) {
                    this.setState({ elevenAmount: data.eleven });
                    this.setState({ tenAmount: data.ten });
                    this.setState({ twelveAmount: data.twelve });
                    this.setState({ thirteenAmount: data.thirteen });
                }
            }, 500);
        }
        this.setState({ loading: true });
        firebase.database().ref("jackpot-win").off();
        firebase.database().ref("jackpots").off();
    }
    checkAmount = (amount) => {
        return amount >= this.props.basePrice ? "₦" + addCommaToAmounts(amount.toString(10))
            : " Nil "
    }

    render() {
        return this.state.loading ? this.state.jackpotData ? <div className={classes.Jackpot}>
            <div className={classes.Header}>
            <img src={dice} width='50px' alt='dice'/>
                <h6>JACKPOT SHARE</h6>
                <img src={dice} width='50px' alt='dice'/>
            </div>
            <div className={classes.Main}>
                <div className={classes.Row}>
                    <div className={classes.Correct}><div className={classes.GameNumber}>{this.props.gamesLength}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.thirteenUser
                        !== null ? this.state.jackpotData.thirteenUser : "-"}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>{this.state.jackpotData.thirteenUser ? "winner(s)" : "-"}</div></div>
                    <div className={classes.Pot}> {this.checkAmount(this.state.thirteenAmount)} </div>
                </div>
                <div className={classes.Row} >
                    <div className={classes.Correct}><div className={classes.GameNumber}>{this.props.gamesLength - 1}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.twelveUser
                        !== null ? this.state.jackpotData.twelveUser : "-"}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>{this.state.jackpotData.twelveUser ? "winner(s)" : "-"}</div></div>
                    <div className={classes.Pot}> {this.checkAmount(this.state.twelveAmount)} </div>
                </div>
                <div className={classes.Row}>
                    <div className={classes.Correct} ><div className={classes.GameNumber}>{this.props.gamesLength - 2}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.elevenUser
                        !== null ? this.state.jackpotData.elevenUser : "-"}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>{this.state.jackpotData.elevenUser ? "winner(s)" : "-"}</div></div>
                    <div className={classes.Pot} > {this.checkAmount(this.state.elevenAmount)} </div>
                </div>
                <div className={classes.Row}>
                    <div className={classes.Correct}><div className={classes.GameNumber}>{this.props.gamesLength - 3}</div>
                        <div className={classes.Greyed}>correct</div></div>
                    <div className={classes.Pieces}><div className={classes.PiecesNumber}>{this.state.jackpotData.tenUser
                        !== null ? this.state.jackpotData.tenUser : "-"}</div>{"\xa0\xa0"}
                        <div className={classes.Greyed}>{this.state.jackpotData.tenUser ? "winner(s)" : "-"} </div></div>
                    <div className={classes.Pot} > {this.checkAmount(this.state.tenAmount)}
                    </div>
                </div>
                <div className={classes.Row}>
                        <div className={classes.GameNumber1}>
                            {this.props.gamesLength === 12 ? "+1 postponed/nulled" : null}
                    </div>
                </div>
            </div>

        </div> : null : <Spinner />
    }
}

export default Jackpot;