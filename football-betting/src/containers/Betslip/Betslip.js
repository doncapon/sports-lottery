import React, { useState } from "react";
import BetItems from "../../components/betSlip/BetSlip/BetItems";
import Button from "react-bootstrap/Button";
import {
  PlusSquareFill,
  Trash2Fill,
  ArrowUpRightCircleFill,
} from "react-bootstrap-icons";
import classes from "./BetSlip.module.css";
import "./BetSlip.module.css";
import Pagination from "../../components/UI/Pagination/Pagination";
import { Trash } from "react-bootstrap-icons";

const BetSlip = React.memo(
  (props) => {
    let [activePage, setActivePage] = useState(1);
    let [startPage, setStartPage] = useState(0);
    let [endPage, setEndPage] = useState(3);
    const totalSlips = useState(12)[0];
    const displaySlips = useState(3)[0];

    const handlePageChange = (event) => {
      let newTag = event.target.innerHTML;
      let k = 1;
      switch (newTag) {
        case "1 - 3":
          k = 1;
          break;
        case "4 - 6":
          k = 2;
          break;
        case "7 - 9":
          k = 3;
          break;
        case "10 - 12":
          k = 4;
          break;
        default:
          k = 1;
          break;
      }
      let start = (k - 1) * displaySlips;
      let end = start + displaySlips;

      setStartPage(start);
      setEndPage(end);

      setActivePage(k);
    }
    const addEmptySlip =()=>{
      props.addEmptySlip();
      setEditIndex(props.slips.length);

      props.setPurchaseAll();
      ActivePageAddHandler();
      props.setTotalPrice();
    }

    const ActivePageRemoveHandler = () => {
      let rest = props.slips.length - 1;
      if (rest === 3 || rest === 6 || rest === 7 || rest === 12) {
        setStartPage(startPage - displaySlips);
        setEndPage(endPage - displaySlips);
        setActivePage(activePage - 1);
      }
    };

    const ActivePageAddHandler = () => {
      let rest = props.slips.length;
      if (rest === 3 || rest === 6 || rest === 9) {
        setStartPage(startPage + displaySlips);
        setEndPage(endPage + displaySlips);
        setActivePage(activePage + 1);
      }
    };
    const HandleDeleteAllFromSlip = () => {
      props.deleteAndResetAll();
      props.setEditIndex(0);

      setStartPage(0);
      setEndPage(3);
    };
    const copyBetSlip = (slipIndex, lastindex) => {
      props.setAdding(slipIndex, true);
      props.addBetSlip(slipIndex);

      setEditIndex(lastindex);

      setActivePage(Math.floor(props.slips.length / displaySlips) + 1);
      props.setPurchaseAll();
      ActivePageAddHandler();
      props.setTotalPrice();
    }

    const setEditIndex = (ind) => {
      props.setEditIndex(ind);
    }
    const RemoveBetFromSlip = (oldIndex) => {
      if (oldIndex > 0) props.setRemoving(oldIndex, true);

      props.removeSlipSingle(oldIndex);
      if (props.slips.length > 1) setEditIndex(props.slips.length - 2);
      props.setPurchaseAll();

      ActivePageRemoveHandler();
    };
    let betSlip = null;
    if (props.slips.length > 0) {
      betSlip = props.slips.map((slip, ind) => {
        return (
          <div className={" col-4 "} key={ind}>
            <div className="row">
              <div
                className=  {( props.editIndex === ind) ? classes.Edit : null}
                style={{
                  borderRadius: "5%",
                  background: "#f7f4bc",
                  margin: "0 1% 5% 0",
                }}
              >
                  <div className="row">
                    <div className="col-12 ">
                      <div style={{ fontWeight: "bold" }}>
                        Slip {ind + 1}
                      </div>
                    </div>
                  </div>

                  <div className="row" onClick={() => setEditIndex(ind)}>
                      <BetItems key={ind} games={slip[slip.id].games} />
                  </div>

                  <div className={"row  justify-content-center " + classes.Buttons}>
                    <div className="col-2 ">
                      <Button
                        size="md"
                        disabled={!slip.purchasable}
                        variant="outline-primary"
                        onClick={() => setEditIndex(ind)}
                      >
                        <ArrowUpRightCircleFill />
                      </Button>
                    </div>
                  </div>

                  <div className="row justify-content-center  ">
                    <div className="col-2  ">
                      <Button
                        onClick={() => copyBetSlip(ind, props.slips.length)}
                        size="md"
                        variant="outline-primary"
                        disabled={
                          !props.purchaseAll ||
                          props.slips.length > totalSlips - 1
                        }
                      >
                        <PlusSquareFill  />
                      </Button>
                    </div>
                  </div>

                  <div className="row justify-content-center">
                    <div className="col-2 ">
                      <Button
                        variant="outline-primary"
                        size="md"
                        disabled={slip.disableDelete}
                        onClick={() => RemoveBetFromSlip(ind)}
                      >
                        <Trash2Fill />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        );
      });
    }

    let shownSlips = [];
    let newBetSlip = betSlip;
    shownSlips = newBetSlip.slice(startPage, endPage);

    return (
      <>
        {props.slips.length > 0 ? (
          <div className="row" style={{ paddingTop: "5px" }}>
            <div className="offset-6">
              {" "}
              <span style={{ color: "grey", fontWeight: "bold" }}>
                EMPTY
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    marginRight: "4px",
                  }}
                >
                  ?
                </span>{" "}
              </span>
              <Button
                onClick={HandleDeleteAllFromSlip}
                size="sm"
                variant="outline-danger"
              >
                <Trash />
              </Button>
            </div>
          </div>
        ) : null}
        <div className={"row " + classes.BetSlip}>
          <div style={{marginBottom: '0.5vh'}}>
            <Button
              variant= 'secondary'
              style={{ fontSize: '0.9em' ,width:'80vw', maxWidth : '350px'}}
              onClick = {addEmptySlip}
              disabled = {!props.purchaseAll}
             >ADD NEW ROW TO BETSLIP</Button>
          </div>
          </div>
          <div className= 'row'>
          <div>
            <Pagination
              activePage={activePage}
              usedPages={props.slips.length}
              clicked={(e) => handlePageChange(e)}
              previousCheck={props.slips[props.slips.length - 1].removing}
              show={displaySlips}
              totalPages={totalSlips}
            />
          </div>
        </div>
        <div className="row ">
          <div className="col-12  " style={{ float: "left" }}>
            <div className="row ">{shownSlips}</div>
          </div>
        </div>
      </>
    );
  },
  (prev, next) => {
    return prev.activePage !== next.activePage;
  }
);

export default BetSlip;
