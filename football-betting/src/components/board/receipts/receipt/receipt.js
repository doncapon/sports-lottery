import React from 'react';

const receipt = (props) => {

    return (<div className="row" >
        <div className="col-11 offset-1" style={{ background: 'white' }} >
            <div className="row">
                <div className="col-3" style={{ marginLeft: '20px' }} >MATCHES</div>
                <div className="col-4 offset-4">SELECTIONS</div>
            </div>
            {props.receipt[props.receipt.id].games.map((game, i) => {
                let sides = game[game.id].sides;
                return <div className="row" style={{ fontSize: '0.8em', width: '430px',float: 'left', textAlign: 'left' 
                ,marginLeft: '00px' }}>
                    <div className="col-8" >
                        <div className="row">
                            <div>{i + 1} </div>
                            <div style ={{marginLeft: '10px'}}  >{game[game.id].team1}</div>
                            <div className="col-1" >-</div>
                            <div className="col-">{game[game.id].team2}</div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="row" >
                            {sides[0].selected ? ' 1 \xa0\xa0' : ' - \xa0\xa0'}
                            {sides[1].selected ? ' x \xa0\xa0' : ' - \xa0\xa0'}
                            {sides[2].selected ? ' 2 ' : ' - '}
                        </div>
                    </div>
                </div>

            })}
            <div clasName='row' style = {{marginTop : '50vh'}}>
                <div className="col-12" >
                    <div className="row">
                        <div>Number of Rows : {props.receipt.slipAmount}</div>
                    </div>
                    <div className="row">
                        <div>Price per Row : {props.basePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₦"}</div>
                    </div>
                    <div className="row" >
                        <div>Evaluation date : {props.gameDate}</div>
                    </div>
                    <div className="row" style={{borderBottom: '2px solid black',  textAlign: 'left', float: 'left',}}>
                        <div>Game Id: {props.receipt.gameNumber}</div>
                    </div>
                    <div className="row" style={{  textAlign: 'right', float: 'right' }}>
                        <div>Price: {props.receipt.slipPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₦"}
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
    </div>)
};


export default receipt;