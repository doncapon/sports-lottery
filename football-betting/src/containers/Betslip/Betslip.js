import React, { Component } from "react";
import BetItem from "../../components/betSlip/BetSlip/BetItem";
import Button from "react-bootstrap/Button";
import {
  PlusSquare,
  Trash2Fill,
  ArrowRightCircle,
} from "react-bootstrap-icons";
import classes from "./BetSlip.module.css";
import "./BetSlip.module.css";
import Pagination from "react-js-pagination";

class BetSlip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handlePageChange = (event) => {
    this.setState({ activePage: event });
  };
  AddBetToTslip = (slipIndex, lastindex) => {
    this.props.setAdding(slipIndex, true);
    this.props.addBetSlip(slipIndex);
    this.props.setEditIndex(lastindex);
    this.setState({ activePage: Math.floor(this.props.editIndex / 4) });
  };
  RemoveBetFromSlip = (oldIndex, newIndex) => {
    this.props.removeSlipSingle(oldIndex);
    this.props.setEditIndex(this.props.slips.length - 2);
  };
  render() {
    let betSlip = null;
    if (this.props.slips.length > 0) {
      betSlip = this.props.slips.map((slip, ind) => {
        return (
          <div
            className={
              "col-lg-4 col-md4 " + this.props.editIndex === ind
                ? classes.Edit
                : null
            }
            style={{
              borderRadius: "15px",
              background: "#f7f4bc",
            }}
            key={ind}
          >
            <div className="row">
              <div className="col-lg-5 offset-6">
                <div style={{ fontWeight: "bold" }}>SLIP_{ind + 1}</div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-12"
                style={{ display: "flex", float: "left" }}
              >
                <BetItem key={ind} games={slip[slip.id].games} />
              </div>
            </div>

            <div className="row" style={{marginTop: '15px'}}>
              <div className="col-md-3">
                <Button
                   size="md"
                  variant="info"
                  onClick={() => this.props.SetEditIndex(ind)}
                >
                  <ArrowRightCircle />
                </Button>
              </div>

              <div className="col-md-3">
                <Button
                    size="lg"
                  onClick={() =>this.AddBetToTslip(ind, this.props.slips.length)
                  }
                  size="md"
                  variant="success"
                  disabled={
                    this.props.disableAdd || this.props.slips.length > 9
                  }
                >
                  <PlusSquare size="15" />{" "}
                </Button>
              </div>
              <div className="col-md-3">
                <Button
                  variant="primary"
                  size="md"
                  disabled={slip.disableDelete}
                  onClick={() => this.RemoveBetFromSlip(slip.id)}
                >
                  <Trash2Fill />{" "}
                </Button>
              </div>
            </div>
          </div>
        );
      });
    }

    let shownSlips = [];
    for (let i = 0; i < 4; i++) {
      let y = this.state.activePage + i - 1;
      shownSlips.push(betSlip[y]);
    }
    let pages = this.props.slips.length / 4 + 1;
    return (
      <div className={"row " + classes.BetSlip}>
        <div className="col-md-12">
          <Pagination
            className={classes.Pagination}
            activePage={this.state.activePage}
            itemsCountPerPage={4}
            totalItemsCount={12}
            pageRangeDisplayed={pages}
            onChange={(event) => this.handlePageChange(event)}
            hideDisabled={true}
          />
        </div>
        <div className="col-md-4  ">
          <div className="row justify-content-center">{shownSlips}</div>
        </div>
      </div>
    );
  }
}

export default BetSlip;
