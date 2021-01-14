import React from "react";

const forms = (props) => {
  let last5Home = props.home.last_5_matches;
  let allLastHome = props.home.all_last_matches;

  let last5away = props.away.last_5_matches;
  let allLastAway = props.away.all_last_matches;
  return (
    <div className="row"  style={{fontSize: "0.8em"}}>
      <div className="col-12">
        <div className="row">
          <h5>{props.home.team_name}</h5>
        </div>
        <div className="row">
          <div className="col-6">
            <h5>Last 5 Matches</h5>
          </div>
          <div className="col-6">
            <h5>All last Matches</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-6">Form</div>
              <div className="col-4">{last5Home.forme}</div>
            </div>
            <div className="row">
              <div className="col-6">Attack</div>
              <div className="col-4">{last5Home.att}</div>
            </div>
            <div className="row">
              <div className="col-6">Defence</div>
              <div className="col-4">{last5Home.def}</div>
            </div>
            <div className="row">
              <div className="col-6">Goals</div>
              <div className="col-4">{last5Home.goals}</div>
            </div>
            <div className="row">
              <div className="col-6">Goals average</div>
              <div className="col-4">{last5Home.goals_avg}</div>
            </div>
            <div className="row">
              <div className="col-6">Goals against</div>
              <div className="col-4">{last5Home.goals_against}</div>
            </div>
            <div className="row">
              <div className="col-6">Goals against average</div>
              <div className="col-4">{last5Home.goals_against_avg}</div>
            </div>
          </div>
          {/* All matches home */}
          <div className="col-6">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">Home</div>
                  <div className="col-3">Away</div>
                  <div className="col-3">Total</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">Played</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">
                    {allLastHome.matchs.matchsPlayed.home}
                  </div>
                  <div className="col-3">
                    {allLastHome.matchs.matchsPlayed.away}
                  </div>
                  <div className="col-3">
                    {allLastHome.matchs.matchsPlayed.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">Wins</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastHome.matchs.wins.home}</div>
                  <div className="col-3">{allLastHome.matchs.wins.away}</div>
                  <div className="col-3">{allLastHome.matchs.wins.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">Draws</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastHome.matchs.draws.home}</div>
                  <div className="col-3">{allLastHome.matchs.draws.away}</div>
                  <div className="col-3">{allLastHome.matchs.draws.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">Losses</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastHome.matchs.loses.home}</div>
                  <div className="col-3">{allLastHome.matchs.loses.away}</div>
                  <div className="col-3">{allLastHome.matchs.loses.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <h5>Goals</h5>
              </div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">Home</div>
                  <div className="col-3">Away</div>
                  <div className="col-3">Total</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">Goals For</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastHome.goals.goalsFor.home}</div>
                  <div className="col-3">{allLastHome.goals.goalsFor.away}</div>
                  <div className="col-3">
                    {allLastHome.goals.goalsFor.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">Against</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">
                    {allLastHome.goals.goalsAgainst.home}
                  </div>
                  <div className="col-3">
                    {allLastHome.goals.goalsAgainst.away}
                  </div>
                  <div className="col-3">
                    {allLastHome.goals.goalsAgainst.total}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div className="row"   style={{marginTop: '20px'}}>
          <h5>{props.away.team_name}</h5>
        </div>
        <div className="row">
          <div className="col-6">
            <h5>Last 5 Matches</h5>
          </div>
          <div className="col-6">
            <h5>All last Matches</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-6">Form</div>
              <div className="col-4">{last5away.forme}</div>
            </div>
            <div className="row">
              <div className="col-6">Attack</div>
              <div className="col-4">{last5away.att}</div>
            </div>
            <div className="row">
              <div className="col-6">Defence</div>
              <div className="col-4">{last5away.def}</div>
            </div>
            <div className="row">
              <div className="col-6">Goals</div>
              <div className="col-4">{last5away.goals}</div>
            </div>
            <div className="row">
              <div className="col-6">Goals average</div>
              <div className="col-4">{last5away.goals_avg}</div>
            </div>
            <div className="row">
              <div className="col-6">Goals against</div>
              <div className="col-4">{last5away.goals_against}</div>
            </div>
            <div className="row">
              <div className="col-6">Goals against average</div>
              <div className="col-4">{last5away.goals_against_avg}</div>
            </div>
          </div>
          {/* All matches home */}
          <div className="col-6">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">Home</div>
                  <div className="col-3">Away</div>
                  <div className="col-3">Total</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">Played</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">
                    {allLastAway.matchs.matchsPlayed.home}
                  </div>
                  <div className="col-3">
                    {allLastAway.matchs.matchsPlayed.away}
                  </div>
                  <div className="col-3">
                    {allLastAway.matchs.matchsPlayed.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">Wins</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastAway.matchs.wins.home}</div>
                  <div className="col-3">{allLastAway.matchs.wins.away}</div>
                  <div className="col-3">{allLastAway.matchs.wins.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">Draws</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastAway.matchs.draws.home}</div>
                  <div className="col-3">{allLastAway.matchs.draws.away}</div>
                  <div className="col-3">{allLastAway.matchs.draws.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">Losses</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastAway.matchs.loses.home}</div>
                  <div className="col-3">{allLastAway.matchs.loses.away}</div>
                  <div className="col-3">{allLastAway.matchs.loses.total}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <h5>Goals</h5>
              </div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">Home</div>
                  <div className="col-3">Away</div>
                  <div className="col-3">Total</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">Goals For</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">{allLastAway.goals.goalsFor.home}</div>
                  <div className="col-3">{allLastAway.goals.goalsFor.away}</div>
                  <div className="col-3">
                    {allLastAway.goals.goalsFor.total}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">Against</div>
              <div className="col-8">
                <div className="row">
                  <div className="col-3">
                    {allLastAway.goals.goalsAgainst.home}
                  </div>
                  <div className="col-3">
                    {allLastAway.goals.goalsAgainst.away}
                  </div>
                  <div className="col-3">
                    {allLastAway.goals.goalsAgainst.total}
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
