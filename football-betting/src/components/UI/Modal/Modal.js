import React, { useState } from "react";
import Odds from "../../predictions/odds/odds";
import classes from "./Modal.module.css";
import H2h from "../../predictions/h2h/h2h";
import Forms from "../../predictions/forms/forms";

const Modal = (props) => {
  const [selectedLink, setSelectedLink] = useState(0);
  const HandleLinkClick = (e) => {
    switch (e.target.innerHTML) {
        
      case "Win percentage":
        setSelectedLink(0);
        break;
      case "Form":
        setSelectedLink(1);
        break;
      case "Recent meetiings (H2H)":
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
          <h6 className="modal-title" style={{ color: "blue" }}>
         
                <span
                  className={(selectedLink === 0) ? classes.Selected: null}
                  onClick={(e) => HandleLinkClick(e)}
                >
                  Win percentage
                </span> {" | "}

                <span
                  className={(selectedLink === 1) ? classes.Selected: null}
                  onClick={(e) => HandleLinkClick(e)}
                >
                  Form
                </span>
                {" | "}
            
                <span
                  className={(selectedLink === 2) ? classes.Selected: null}
                  onClick={(e) => HandleLinkClick(e)}
                >
                  Recent meetiings (H2H)
                </span>
            
        
          </h6>
        </div>
        <div className="modal-body row" style={{ textAlign: "center" }}>
          {showedObject}
        </div>

        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default Modal;
