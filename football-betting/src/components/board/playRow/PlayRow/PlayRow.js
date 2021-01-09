import SingleTile from "../../tile/SingleTile/SingleTile";
import Team from "../team/team";
import classes from "./PlayRow.module.css";
import Button from 'react-bootstrap/Button';
import { Component } from "react";
import {  CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import Modal from '../../../UI/Modal/Modal';
class  PlayRow  extends Component {
  state = {
    isLoaded: false
  }
  HandlePredictions =(gameIndex, fixture_id)=>{
    this.props.fetchPredictionsAll(fixture_id, gameIndex );  
    this.props.toggleShowHistory(gameIndex);

  }
   HandlerAdd = (slipIndex, gameIndex, sideIndex, side) => {
    this.props.toggleSelectedTile(slipIndex, gameIndex, sideIndex, side);
    this.props.checkPurchasable(slipIndex);
    this.props.setPurchaseAll();
    this.props.calculateTotalPrice(slipIndex,gameIndex, sideIndex);
    this.props.checkPurchasable(slipIndex);

  };
  render(){
  let board = [];

  const gameId = "game_";
  board = this.props.slips[this.props.editIndex][
    "slip_" + (this.props.editIndex + 1)
  ].games.map((game, k) => {
    return (
      <div className={" col-12 " + classes.PlayRow} style={{marginBottom: '1%'}} key={k}>
        <div className="row " >

          <div className={"col-6"}  >
            <Team
              team1={game[gameId + (k + 1)].team1}
              team2={game[gameId + (k + 1)].team2}
              row={k + 1}
            />
          </div>
          <div className='col-6  ' >
            {
               <div className="row" >
                <div className='col-3 ' >
                  <SingleTile
                    type={"home"}
                    selected={game[gameId + (k + 1)].sides[0].selected}
                    clicked={() =>
                      this.HandlerAdd(
                        this.props.editIndex,
                        k,
                        0,
                        game[gameId + (k + 1)].sides[0].selected
                      )
                    }
                  />
                </div>
                <div className= {'col-3 '}>
                  <SingleTile
                    type={"draw"}
                    selected={game[gameId + (k + 1)].sides[1].selected}
                    clicked={() =>
                      this.HandlerAdd(
                        this.props.editIndex,
                        k,
                        1,
                        game[gameId + (k + 1)].sides[1].selected
                      )
                    }
                  />
                </div>
                <div className= {'col-3 '}>
                  
                  <SingleTile
                    type={"away"}
                    selected={game[gameId + (k + 1)].sides[2].selected}
                    clicked={() =>
                      this.HandlerAdd(
                        this.props.editIndex,
                        k,
                        2,
                        game[gameId + (k + 1)].sides[2].selected
                      )
                    }
                  />
                </div>
                <div className='col-1 '> 
                  <Button size="md" onClick = {()=>this.HandlePredictions(k, game.fixture_id)}>
                {!game.showHistory? <CaretDownFill  />: <CaretUpFill />} </Button>
                </div>
                
              </div>

            }

          </div>
     
        {(game.showHistory && this.props.predictions !== null)?<div className="col-12">
           <Modal predictions ={this.props.predictions.filter((pred, i) => {
           return  pred.gameIndex === k
        })}
        
        /></div>: null}

        </div>
        <div></div>
      </div>
    );
  });
  return <>{board}</>;
}
};

export default PlayRow;
