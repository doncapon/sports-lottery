import SingleTile from "../../components/board/tile/SingleTile/SingleTile";
import Team from "../../components/board/team/team";
import classes from "./PlayRow.module.css";
import Button from 'react-bootstrap/Button';
import { Component } from "react";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import Stats from '../../components/board/Stats/Stats';
import WithErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import axios from '../../axios-fixtures';
class PlayRow extends Component {
  state = {
    isLoaded: false
  }
  HandlePredictions = (gameIndex, fixture_id) => {
    this.props.fetchPredictionsAll(fixture_id, gameIndex);
    this.props.toggleShowHistory(gameIndex);

  }
  HandlerAdd = (slipIndex, gameIndex, sideIndex, side, basePrice) => {
    this.props.toggleSelectedTile(slipIndex, gameIndex, sideIndex, side);
    this.props.checkPurchasable(slipIndex);
    this.props.setPurchaseAll();
    this.props.CalculateOverAllPrice(slipIndex, gameIndex, sideIndex, basePrice);
    this.props.checkPurchasable(slipIndex);

  };
  render() {
    let board = [];

    const gameId = "game_";
    board = this.props.slips[this.props.editIndex][
      "slip_" + (this.props.editIndex + 1)
    ].games.map((game, k) => {
      return (
        <div className={classes.PlayRow} key={k}>
          <div className={classes.TeamAndSelection} >
            <div className={classes.Teams} >
              <Team
                team1={game[gameId + (k + 1)].team1}
                team2={game[gameId + (k + 1)].team2}
                row={k + 1}
              />
            </div>
            <div className={classes.SingleTiles} >
              {
                <div className={classes.SingleTilesInner}  >
                  <div className={classes.SingleTile}>
                    <SingleTile
                      type={"home"}
                      selected={game[gameId + (k + 1)].sides[0].selected}
                      clicked={() =>
                        this.HandlerAdd(
                          this.props.editIndex,
                          k,
                          0,
                          game[gameId + (k + 1)].sides[0].selected,
                          this.props.basePrice
                        )
                      }
                    />
                  </div>

                  <div className={classes.SingleTile}>
                    <SingleTile
                      type={"draw"}
                      selected={game[gameId + (k + 1)].sides[1].selected}
                      clicked={() =>
                        this.HandlerAdd(
                          this.props.editIndex,
                          k,
                          1,
                          game[gameId + (k + 1)].sides[1].selected,
                          this.props.basePrice
                        )
                      }
                    />
                  </div>
                  <div className={classes.SingleTileLast}>

                    <SingleTile
                      type={"away"}
                      selected={game[gameId + (k + 1)].sides[2].selected}
                      clicked={() =>
                        this.HandlerAdd(
                          this.props.editIndex,
                          k,
                          2,
                          game[gameId + (k + 1)].sides[2].selected,
                          this.props.basePrice
                        )
                      }
                    />
                  </div>
                  <div className={classes.Toggler} >
                    <Button className={classes.BtToggle} size="sm" onClick={() => this.HandlePredictions(k, game.fixture_id)}>
                      {!game.showHistory ? <CaretDownFill className={classes.Icon} /> : <CaretUpFill className={classes.Icon} />} </Button>
                  </div>
                </div>
              }
            </div>
          </div>
          {(game.showHistory && this.props.predictions !== null) ? <div className="">
              <Stats predictions={this.props.predictions.filter((pred, i) => {
                return pred.gameIndex === k
              })}

              /></div> : null}
        </div>
      );
    });
    return <>{board}</>;
  }
};

export default WithErrorHandler(PlayRow, axios);
