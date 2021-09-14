import classes from "./forms.module.css";
import React from "react";

const forms = (props) => {
  let last5Home = props.home.last_5;
  let allLastHome = props.home.league;

  let last5away = props.away.last_5;
  let allLastAway = props.away.league;
  const convertStringToArray = (initial) => {
    let arr = [];
    for (let i = 0; i < initial.length; i++) {
      arr[i] = initial[i];
    }
    return arr;
  }

  const findClass = (i) => {
    if (i === "W") {
      return classes.WinForm;
    } else if (i === "L") {
      return classes.LossForm;
    } else {
      return classes.DrawForm
    }

  }
  return (
    <div className={"row " + classes.FormsWrapper} >
      <div className="col-12">
        <div className="row">
          <h5 className={classes.H5s}>{props.home.team_name}</h5>
        </div>
        <div className="row">
          <div className="col-6">
            <h5 className={classes.H5s}>Last 5 Matches</h5>
          </div>
          <div className="col-6">
            <h5 className={classes.H5s}>All Matches</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-5">

            <div style={{ fontWeight: 'bolder', display: 'flex' }}>
              Form meter - {" "}
              {convertStringToArray(props.homeForm).map(i => {

                return <div key={Math.random()} className={findClass(i)}>{i}</div>
              })}
            </div>

            <div className="row" >
              <div style={{ fontWeight: 'bolder' }} className="col-8">Form</div>
              <div className="col-4">{last5Home.form}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">Attack</div>
              <div className="col-4">{last5Home.att}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">Defence</div>
              <div className="col-4">{last5Home.def}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">Goals tot</div>
              <div className="col-4">{last5Home.goals.for.total}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">Goals_avg</div>
              <div className="col-4">{last5Home.goals.for.average}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">conceded</div>
              <div className="col-4">{last5Home.goals.against.total}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">concd_avg</div>
              <div className="col-4">{last5Home.goals.against.average}</div>
            </div>
          </div>
          {/* All matches home */}
          <div className="col-7">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8">
                <div className="row">
                  <div style={{ fontWeight: 'bolder' }} className="col-3">H</div>
                  <div style={{ fontWeight: 'bolder' }} className="col-3">A</div>
                  <div style={{ fontWeight: 'bolder' }} className="col-3">Tot.</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Played</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">
                    {allLastHome.fixtures.played.home}
                  </div>
                  <div className="col-3">
                    {allLastHome.fixtures.played.away}
                  </div>
                  <div className="col-3">
                    {allLastHome.fixtures.played.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Wins</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastHome.fixtures.wins.home}</div>
                  <div className="col-3">{allLastHome.fixtures.wins.away}</div>
                  <div className="col-3">{allLastHome.fixtures.wins.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Draws</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastHome.fixtures.draws.home}</div>
                  <div className="col-3">{allLastHome.fixtures.draws.away}</div>
                  <div className="col-3">{allLastHome.fixtures.draws.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Losses</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastHome.fixtures.loses.home}</div>
                  <div className="col-3">{allLastHome.fixtures.loses.away}</div>
                  <div className="col-3">{allLastHome.fixtures.loses.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <h6 className={classes.Goals}>Goals</h6>
              </div>
              <div className="col-8">
                <div className="row">
                  <div style={{ fontWeight: 'bolder' }} className="col-3">H</div>
                  <div style={{ fontWeight: 'bolder' }} className="col-3">A</div>
                  <div style={{ fontWeight: 'bolder' }} className="col-3">Tot.</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Gaols tot</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastHome.goals.for.total.home}</div>
                  <div className="col-3">{allLastHome.goals.for.total.away}</div>
                  <div className="col-3">
                    {allLastHome.goals.for.total.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Gaols Avg</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastHome.goals.for.average.home}</div>
                  <div className="col-3">{allLastHome.goals.for.average.away}</div>
                  <div className="col-3">
                    {allLastHome.goals.for.average.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Concd tot</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">
                    {allLastHome.goals.against.total.home}
                  </div>
                  <div className="col-3">
                    {allLastHome.goals.against.total.away}
                  </div>
                  <div className="col-3">
                    {allLastHome.goals.against.total.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Concd Avg</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">
                    {allLastHome.goals.against.average.home}
                  </div>
                  <div className="col-3">
                    {allLastHome.goals.against.average.away}
                  </div>
                  <div className="col-3">
                    {allLastHome.goals.against.average.total}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Away Team */}
        <div className="row" style={{ marginTop: '20px' }}>
          <h5 className={classes.H5s}>{props.away.team_name}</h5>
        </div>
        <div className="row">
          <div className="col-6">
            <h5 className={classes.H5s}>Last 5 Matches</h5>
          </div>
          <div className="col-6">
            <h5 className={classes.H5s}>All Matches</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <div style={{ fontWeight: 'bolder', display: 'flex' }}>
              Form meter - {" "}
              {convertStringToArray(props.awayForm).map(i => {

                return <div key={Math.random()} className={findClass(i)}>{i}</div>
              })}
            </div>
            <div className="row" style={{ paddingTop: '20px' }}>
              <div style={{ fontWeight: 'bolder' }} className="col-8">Form</div>
              <div className="col-4">{last5away.forme}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">Attack</div>
              <div className="col-4">{last5away.att}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">Defence</div>
              <div className="col-4">{last5away.def}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">Goals</div>
              <div className="col-4">{last5away.goals.for.total}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">goals_avg</div>
              <div className="col-4">{last5away.goals.for.average}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">conceded</div>
              <div className="col-4">{last5away.goals.against.total}</div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-8">concd_avg</div>
              <div className="col-4">{last5away.goals.against.average}</div>
            </div>
          </div>
          {/* All matches home */}
          <div className="col-7">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8">
                <div className="row">
                  <div style={{ fontWeight: 'bolder' }} className="col-3">H</div>
                  <div style={{ fontWeight: 'bolder' }} className="col-3">A</div>
                  <div style={{ fontWeight: 'bolder' }} className="col-3">Tot.</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Played</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">
                    {allLastAway.fixtures.played.home}
                  </div>
                  <div className="col-3">
                    {allLastAway.fixtures.played.away}
                  </div>
                  <div className="col-3">
                    {allLastAway.fixtures.played.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Wins</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastAway.fixtures.wins.home}</div>
                  <div className="col-3">{allLastAway.fixtures.wins.away}</div>
                  <div className="col-3">{allLastAway.fixtures.wins.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Draws</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastAway.fixtures.draws.home}</div>
                  <div className="col-3">{allLastAway.fixtures.draws.away}</div>
                  <div className="col-3">{allLastAway.fixtures.draws.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Losses</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastAway.fixtures.loses.home}</div>
                  <div className="col-3">{allLastAway.fixtures.loses.away}</div>
                  <div className="col-3">{allLastAway.fixtures.loses.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <h6 className={classes.Goals}>Goals</h6>
              </div>
              <div className="col-8">
                <div className="row">
                  <div style={{ fontWeight: 'bolder' }} className="col-3">H</div>
                  <div style={{ fontWeight: 'bolder' }} className="col-3">A</div>
                  <div style={{ fontWeight: 'bolder' }} className="col-3">Tot.</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Scored tot</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastAway.goals.for.total.home}</div>
                  <div className="col-3">{allLastAway.goals.for.total.away}</div>
                  <div className="col-3">
                    {allLastAway.goals.for.total.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Scored Avg</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastAway.goals.for.average.home}</div>
                  <div className="col-3">{allLastAway.goals.for.average.away}</div>
                  <div className="col-3">
                    {allLastAway.goals.for.average.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Concd tot</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">
                    {allLastAway.goals.against.total.home}
                  </div>
                  <div className="col-3">
                    {allLastAway.goals.against.total.away}
                  </div>
                  <div className="col-3">
                    {allLastAway.goals.against.total.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ fontWeight: 'bolder' }} className="col-4">Concd Avg</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">
                    {allLastAway.goals.against.average.home}
                  </div>
                  <div className="col-3">
                    {allLastAway.goals.against.average.away}
                  </div>
                  <div className="col-3">
                    {allLastAway.goals.against.average.total}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
  );
};

export default forms;
