import React from "react";
import SingleTile from "../../tile/SingleTile/SingleTile";
import Team from "../team/team";
import classes from "./PlayRow.module.css";

const PlayRow = (props) => {
  const HandlerAdd = (slipIndex, gameIndex, sideIndex, side) => {
    props.toggleSelectedTile(slipIndex, gameIndex, sideIndex, side);
    props.checkPurchasable(slipIndex);
    props.setPurchaseAll();
    props.calculateTotalPrice(slipIndex,gameIndex, sideIndex);
    props.checkPurchasable(slipIndex);

  };
    console.log(props.editIndex)
  let board = [];

  const gameId = "game_";

  board = props.slips[props.editIndex][
    "slip_" + (props.editIndex + 1)
  ].games.map((game, k) => {
    return (
      <div className={"col-lg-12 col-lg-7 " + classes.PlayRow} style={{marginBottom: '1%'}} key={k}>
        <div className="row " style={{ background: "skyblue", padding: '0%' }}>
          <div className={"col-lg-7 " + classes.Team}  style= {{padding: '1% 0'}}>
            <Team
              team1={game[gameId + (k + 1)].team1}
              team2={game[gameId + (k + 1)].team2}
              row={k + 1}
            />
          </div>
          <div className={"col-lg-4 " + classes.RowChild}>
            {
              <div className="row"  style={{paddingTop: '2%'}} >
                <div className="col-md-3 offset-1 " >
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
                <div className="col-md-3 offset-1">
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
                <div className="col-md-3 offset-1">
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
              </div>
            }
          </div>
        </div>
        <div></div>
      </div>
    );
  });
  return <>{board}</>;
};

export default PlayRow;
