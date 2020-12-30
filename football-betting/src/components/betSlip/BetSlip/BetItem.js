import { React } from "react";
import BetTiles from "../../board/tile/betTile/BetTitles";
import classes from "./BetItem.module.css";

const BetItem = (props) => {
  let betrows = null;
  let gameId = "game_";

  if (props.games.length > 0) {
    betrows = props.games.map((game, k) => {
      return (
        <div
          className={"col-md-10  " + classes.BetItem}
          key={k}
          style={{
            float: "left",
          }}
        >
          <div className="row">
            <div className="col-md-1  ">
              <span style={{ float: "left", fontWeight: "bold" }}>
                {k + 1}.
              </span>
            </div>
            <div className="col-md-3 ">
              <BetTiles
                type={"home"}
                selected={game[gameId + (k + 1)].sides[0].selected}
              />
            </div>
            <div className="col-md-3 ">
              <BetTiles
                type={"draw"}
                selected={game[gameId + (k + 1)].sides[1].selected}
              />
            </div>
            <div className="col-md-3 ">
              <BetTiles
                type={"away"}
                selected={game[gameId + (k + 1)].sides[2].selected}
              />
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="row" style={{ float: "left" }}>
      {betrows}
    </div>
  );
};

export default BetItem;
