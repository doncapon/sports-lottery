import { React } from "react";
import BetTile from "../board/tile/betTile/BetTitle";
import classes from './BetItems.module.css';

const BetItems = (props) => {
  let betrows = null;
  let gameId = "game_";

  if (props.games.length > 0) {
    betrows = props.games.map((game, k) => {
      return (
        <div
          className={classes.BetrowsWrapper}
          key={k}
       >
              <div className= {classes.Betrows}>
                <div
                  className= {classes.RowNumber}
               >
                  {k < 9? "0" +(k + 1) : k+1}.
                </div>
                <div className ={classes.BetTileS}>
                  <div className={classes.BetItem}>
                    <BetTile 
                      type={"home"}
                      selected={game[gameId + (k + 1)].sides[0].selected}
                    />
                  </div>
                  <div className={classes.BetItem}>
                    <BetTile
                      type={"draw"}
                      selected={game[gameId + (k + 1)].sides[1].selected}
                    />
                  </div>
                  <div className= {classes.BetItem}  >
                    <BetTile
                      type={"away"}
                      selected={game[gameId + (k + 1)].sides[2].selected}
                    />
                  </div>
                </div>
              </div>
            </div>
      );
    });
  }

  return (
    <div className="" style={{ float: "left" }}>
      {betrows}
    </div>
  );
};

export default BetItems;
