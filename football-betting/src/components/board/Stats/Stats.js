import React, { useState } from "react";
import Odds from "../../predictions/odds/odds";
import classes from "./Stats.module.css";
import H2h from "../../predictions/h2h/h2h";
import Forms from "../../predictions/forms/forms";

const Stats = (props) => {
  const [selectedLink, setSelectedLink] = useState(0);
  const HandleLinkClick = (e) => {
    switch (e.target.innerHTML) {
        
      case "Odds":
        setSelectedLink(0);
        break;
      case "Form":
        setSelectedLink(1);
        break;
      case "H2H":
        setSelectedLink(2);
        break;
      default:
        break;
    }
  };

  let showedObject = null;
  props.predictions.forEach((pre) => {
    let pred = pre.prediction[0];
    let winPercent = pred.winning_percent;
    let head2Head = pred.h2h;
    let home = pred.teams.home;
    let away = pred.teams.away;

    if (selectedLink === 1) {
      showedObject = (
        <div className="col-12">
          <Forms home={home} away={away} />
        </div>
      );
    } else if (selectedLink === 2) {
      showedObject = (
        <>
          <H2h head2Head={head2Head}></H2h>
        </>
      );
    } else {
      showedObject = (
        <div className="col-8" style={{ margin: "auto" }}>
          <Odds
            home={winPercent.home}
            draw={winPercent.draws}
            away={winPercent.away}
          />
        </div>
      );
    }
  });

  return (
    <div className={classes.modal}>
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title" style={{ color: "blue", display: 'flex' }}>
         
                <div
                  className={(selectedLink === 0) ? classes.Selected: classes.Rest}
                  onClick={(e) => HandleLinkClick(e)}
                >
                  Odds
                </div> {" | "}

                <div
                  className={(selectedLink === 1) ? classes.Selected: classes.Rest}
                  onClick={(e) => HandleLinkClick(e)}
                >
                  Form
                </div>
                {" | "}
            
                <div
                  className={(selectedLink === 2) ? classes.Selected: classes.Rest}
                  onClick={(e) => HandleLinkClick(e)}
                >
                  H2H
                </div>
            
        
          </h6>
        </div>
        <div className="modal-body" style={{ textAlign: "center" }}>
          {showedObject}
        </div>

        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default Stats;
