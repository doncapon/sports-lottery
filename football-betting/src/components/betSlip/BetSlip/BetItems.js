import { React } from "react";
import BetTile from "../../board/tile/betTile/BetTitle";
import classes from "./BetItems.module.css";

const BetItems = (props) => {
  let betrows = null;
  let gameId = "game_";

  if (props.games.length > 0) {
    betrows = props.games.map((game, k) => {
      return (
        <div
          className={"col-lg-12 " + classes.BetItems}
          key={k}
          style={{
            float: "left", marginBottom: '10%'
          }}
        >
          <div className="row" style= {{marginLeft: '0.1vw'}}>
            <div className="col-sm-2  ">
              <span style={{ float: "left", fontWeight: "bold" , marginBottom: '2%'}}>
                {k + 1}.
              </span>
            </div>
            <div className="col-sm-2 ">
              <BetTile
                type={"home"}
                selected={game[gameId + (k + 1)].sides[0].selected}
              />
            </div>
            <div className="col-sm-2 ">
              <BetTile
                type={"draw"}
                selected={game[gameId + (k + 1)].sides[1].selected}
              />
            </div>
            <div className="col-sm-2 ">
              <BetTile
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

export default BetItems;
