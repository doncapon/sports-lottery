import React from 'react';
import classes from './Receipt.module.css';

const receipt = (props) => {

    return (<div className={classes.ReceiptWrapper} >
        <div className={classes.HeaderWrapper} >
            <div className={classes.MatchHeader}>MATCHES</div>
            <div className={classes.SelectionHeader}>SELECTIONS</div>
        </div>
        <div className={classes.ResultWrapper}>
            {props.receipt[props.receipt.id].games.map((game, i) => {
                let sides = game[game.id].sides;
                return <div key={game.id} className={classes.MatchResult+" row"} >
                    <div className={classes.TeamsName + " col-8"}>
                        <div>{i + 1}.</div>
                        <div style={{ marginLeft: '3px' }}>
                            {game[game.id].team1}
                            {"  "}- {"  "}
                            {game[game.id].team2}
                        </div>
                    </div>
                    <div className={classes.TeamResult + " col-3"}>
                        {sides[0].selected ? '1 \xa0\xa0' : ' -\xa0\xa0'}
                        {sides[1].selected ? 'x \xa0\xa0' : ' -\xa0\xa0'}
                        {sides[2].selected ? '2 ' : '- '}
                    </div>
                </div>

            })}
        </div>

        <div className={classes.BottomSection}>
            <div>
                <div style={{ width: '100%', clear: 'both' }}>
                    <div>Rows played : {props.receipt.slipAmount}</div>
                </div>
                <div style={{ width: '100%' }}>
                    <div>Price per Row : {props.basePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₦"}</div>
                </div>
                <div style={{ width: '100%' }}>
                    <div>Evaluation date : {props.gameDate}</div>
                </div>
                <div style={{ width: '100%', textAlign: 'left' }}>
                    <div>Game Id: {props.receipt.gameNumber}</div>
                </div>


            </div>

        </div>
        <div style={{ marginLeft: '0px' }}>Price: {props.receipt.slipPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₦"}
        </div>
    </div>)
};


export default receipt;