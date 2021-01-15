import React, { useState } from "react";
import BetItems from "../../components/betItems/BetItems";
import Button from "react-bootstrap/Button";
import {
  PlusSquareFill,
  Trash2Fill,
  XCircle,
} from "react-bootstrap-icons";
import classes from "./Betslips.module.css";
import Pagination from "../../components/UI/Pagination/Pagination";
import { Trash } from "react-bootstrap-icons";

const Betslips = React.memo(
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
    };
    const addEmptySlip = () => {
      props.addEmptySlip();
      setEditIndex(props.slips.length);

      props.setPurchaseAll();
      ActivePageAddHandler();
      props.setTotalPrice();
    };

    const ActivePageRemoveHandler = () => {
      let rest = props.slips.length - 1;
      if (rest === 3 || rest === 6 || rest === 9 || rest === 12) {
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
    };

    const setEditIndex = (ind) => {
      props.setEditIndex(ind);
    };
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
          <div className={classes.Betslip} key={ind}>


            <div
              className={(props.editIndex === ind) ? classes.Edit : classes.BetSlipInner}
            >
                <div className={classes.SlipNumber} >Slip {ind + 1}</div>
              <div className={classes.BetItems} onClick={() => setEditIndex(ind)}>
                <BetItems key={ind} games={slip[slip.id].games} />
              </div>

              <div className={classes.Buttons}>
                <div>
                  <Button
                    size="md"
                    style={{ margin: '20px 0  10px' }}
                    disabled={!slip.purchasable}
                    variant="outline-primary"
                    onClick={() => setEditIndex(ind)}
                  >
                    <XCircle />
                  </Button>
                </div>
                <div>
                  <Button
                    style={{ margin: '0px 0  10px' }}
                    onClick={() => copyBetSlip(ind, props.slips.length)}
                    size="md"
                    variant="outline-primary"
                    disabled={
                      !props.purchaseAll ||
                      props.slips.length > totalSlips - 1
                    }
                  >
                    <PlusSquareFill />
                  </Button>
                </div>
                <div>
                  <Button
                    style={{ margin: '0px 0  10px' }}
                    variant="outline-primary"
                    size="md"
                    disabled={slip.disableDelete}
                    onClick={() => RemoveBetFromSlip(ind)}
                  >
                    <Trash2Fill />
                  </Button>
                </div>
              </div>



              <div className={classes.ButtonsLarge}>
                <div>
                  <Button
                    size="lg"
                    style={{ margin: '20px 0  10px' }}
                    disabled={!slip.purchasable}
                    variant="outline-primary"
                    onClick={() => setEditIndex(ind)}
                  >
                    <XCircle />
                  </Button>
                </div>
                <div>
                  <Button
                    style={{ margin: '0px 0  10px' }}
                    onClick={() => copyBetSlip(ind, props.slips.length)}
                    size="lg"
                    variant="outline-primary"
                    disabled={
                      !props.purchaseAll ||
                      props.slips.length > totalSlips - 1
                    }
                  >
                    <PlusSquareFill />
                  </Button>
                </div>
                <div>
                  <Button
                    style={{ margin: '0px 0  10px' }}
                    variant="outline-primary"
                    size="lg"
                    disabled={slip.disableDelete}
                    onClick={() => RemoveBetFromSlip(ind)}
                  >
                    <Trash2Fill />
                  </Button>
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
        <div className={classes.BetSlipWrapper}>
          <div
            className={classes.SlipButtons}
          >
            <div className={classes.NewButton}>
              <Button
                variant="secondary"
                className={classes.NewSlipButton}
                onClick={addEmptySlip}
                disabled={!props.purchaseAll}
              >
                ADD NEW SLIP
                </Button>
            </div>
            <div >
              {props.slips.length > 0 ? (
                <div className={classes.EmptyWrapper} >
                  <div className={classes.BetslipText} >
                    BETSLIPS
                      </div>

                  <div className={classes.Empty} >
                    <Button
                      className={classes.EmptyButton}
                      onClick={HandleDeleteAllFromSlip}
                      size="sm"
                      variant="outline-muted"
                    > <span className={classes.EmptyText}>EMPTY </span>
                      <Trash size="25" />
                    </Button>
                  </div>

                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={classes.Pagination}>
          <Pagination
            activePage={activePage}
            usedPages={props.slips.length}
            clicked={(e) => handlePageChange(e)}
            previousCheck={props.slips[props.slips.length - 1].removing}
            show={displaySlips}
            totalPages={totalSlips}
          />
        </div>
        <div className={classes.Betslips}>{shownSlips}</div>

      </>
    );
  },
  (prev, next) => {
    return prev.activePage !== next.activePage;
  }
);

export default Betslips;
