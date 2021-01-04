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
          className={"col-md-12 " + classes.BetItems}
          key={k}
          style={{
            float: "left", marginBottom: '10%'
          }}
        >
          <div className="row" >
            <div className="col-sm-1  ">
              <span style={{ float: "left", fontWeight: "bold" , marginBottom: '2%'}}>
                {k + 1}.
              </span>
            </div>
            <div className="col-sm-1 " style={{ marginLeft: '0.1vw'}}>
              <BetTile
                type={"home"}
                selected={game[gameId + (k + 1)].sides[0].selected}
              />
            </div>
            <div className="col-sm-1" style={{ marginLeft: '0.1vw'}}>
              <BetTile
                type={"draw"}
                selected={game[gameId + (k + 1)].sides[1].selected}
              />
            </div>
            <div className="col-sm-1 " style={{ marginLeft: '0.1vw'}}> 
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
