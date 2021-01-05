import { React } from "react";
import BetTile from "../../board/tile/betTile/BetTitle";

const BetItems = (props) => {
  let betrows = null;
  let gameId = "game_";

  if (props.games.length > 0) {
    betrows = props.games.map((game, k) => {
      return (
        <div
          className={"col-10"}
          key={k}
          style={{
            float: "left",
            marginBottom: "8%",
          }}
        >
          <div className="row">
            <div className="col-9  offset-2 ">
              <div className="row">
                <div
                  className="col-1  "
                  style={{
                    fontWeight: "bold",
                    margin: "0",
                    marginLeft: "5px",
                    padding: "0",
                  }}
                >
                  {k + 1}.
                </div>
                <div className="col-1 offset-2 " style={{ padding: "0" }}>
                  <BetTile
                    type={"home"}
                    selected={game[gameId + (k + 1)].sides[0].selected}
                  />
                </div>
                <div className="col-1 offset-2"   style={{ padding: "0" }}>
                  <BetTile
                    type={"draw"}
                    selected={game[gameId + (k + 1)].sides[1].selected}
                  />
                </div>
                <div className="col-1  offset-2"  style={{ padding: "0" }}>
                  <BetTile
                    type={"away"}
                    selected={game[gameId + (k + 1)].sides[2].selected}
                  />
                </div>
              </div>
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
