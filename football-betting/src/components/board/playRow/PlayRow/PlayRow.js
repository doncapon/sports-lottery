import SingleTile from "../../tile/SingleTile/SingleTile";
import Team from "../team/team";
import classes from "./PlayRow.module.css";
import Button from 'react-bootstrap/Button';
import { ViewList } from "react-bootstrap-icons";
import Modal from '../../../UI/Modal/Modal';
const PlayRow = (props) => {
  const HandlerAdd = (slipIndex, gameIndex, sideIndex, side) => {
    props.toggleSelectedTile(slipIndex, gameIndex, sideIndex, side);
    props.checkPurchasable(slipIndex);
    props.setPurchaseAll();
    props.calculateTotalPrice(slipIndex,gameIndex, sideIndex);
    props.checkPurchasable(slipIndex);

  };
  let board = [];

  const gameId = "game_";

  board = props.slips[props.editIndex][
    "slip_" + (props.editIndex + 1)
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
          <div className='col-5  ' >
            {
               <div className="row" >
                <div className='col-3 offset-1' >
                  <SingleTile
                    type={"home"}
                    selected={game[gameId + (k + 1)].sides[0].selected}
                    clicked={() =>
                      HandlerAdd(
                        props.editIndex,
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
                      HandlerAdd(
                        props.editIndex,
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
                      HandlerAdd(
                        props.editIndex,
                        k,
                        2,
                        game[gameId + (k + 1)].sides[2].selected
                      )
                    }
                  />
                </div>
                <div className='col-1' style={{marginLeft: '20px'}}> 
                  <Button onClick = {()=>props.toggleShowHistory(k)}><ViewList  /></Button>
                </div>
                
              </div>

            }
          </div>
        {game.showHistory?<div className="col-12"> <Modal /></div>: null}

        </div>
        <div></div>
      </div>
    );
  });
  return <>{board}</>;
};

export default PlayRow;
