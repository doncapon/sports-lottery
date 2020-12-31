import React, { Component } from "react";
import BetItems from "../../components/betSlip/BetSlip/BetItems";
import Button from "react-bootstrap/Button";
import {
  PlusSquare,
  Trash2Fill,
  ArrowUpRightCircleFill
} from "react-bootstrap-icons";
import classes from "./BetSlip.module.css";
import "./BetSlip.module.css";
import Pagination from "../../components/UI/Pagination/Pagination";
import _ from 'lodash';

class BetSlip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      totalSlips : 12,
      displaySlips: 3,
    };
  }

  handlePageChange = (event) => {
    let newTag = event.target.innerHTML;
    let k = 1;
    switch(newTag){
      case '1 - 3':
        k = 1;
        break;
      case '4 - 6':
        k=2;
        break;
        case '7 - 9':
        k=3;
        break;
        case '10 - 12':
        k=4;
        break;
        default: 
        k =1;
      break;
    }
  
    this.setState({ activePage: k });
  };
  AddBetToTslip = (slipIndex, lastindex) => {
    this.setState({ activePage: Math.floor((this.props.slips.length/this.state.displaySlips)) +1});

    this.props.setAdding(slipIndex, true);
    this.props.addBetSlip(slipIndex);
    this.props.setEditIndex(lastindex);
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
              "col-md-4 "
            }
           
            key={ind}
          >

            <div className='row'>
             

            <div className={ this.props.editIndex === ind ? classes.Edit : null}
               style={{
              borderRadius: "5%",
              background: "#f7f4bc",
              margin: '0 5% 10%',
            }}
              onClick={()=>this.props.setEditIndex(ind)}
            >
            <div className="row">
              <div className="col-md-12 ">
                <div style={{ fontWeight: "bold", marginBottom: '2%' }}>Slip {ind + 1}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <BetItems key={ind} games={slip[slip.id].games} />
              </div>
            </div>

            <div className={"row " + classes.Buttons}>
              <div className="col-sm-3 offset-1">
                <Button
                  size="md"
                  variant="outline-info"
                  onClick={()=>this.props.setEditIndex(ind)}
                >
                  <ArrowUpRightCircleFill />
                </Button>
              </div>

              <div className="col-sm-3 ">
                <Button
                  onClick={() =>
                    this.AddBetToTslip(ind, this.props.slips.length)
                  }
                  size="md"
                  variant="info"
                  disabled={
                    this.props.disableAdd || this.props.slips.length > this.state.totalSlips -1
                  }
                >
                  <PlusSquare size="15" />
                </Button>
              </div>
              <div className="col-sm-3">
                <Button
                  variant="primary"
                  size="md"
                  disabled={slip.disableDelete}
                  onClick={() => this.RemoveBetFromSlip(slip.id)}
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

    let rest = this.props.slips.length % (this.state.totalSlips/this.state.displaySlips);
    let start = ((this.state.activePage-1)) * this.state.displaySlips;  
    let end = start+rest + 1;
    let newBetSlip = _.cloneDeep(betSlip);
     shownSlips = newBetSlip.slice( start ,end);
     console.log(shownSlips, this.state.activePage, start, end);
    return (<>
      <div className={"row " + classes.BetSlip}>
        <div className="col-md-9">
        <Pagination activePage = {this.state.activePage}  
        usedPages = {this.props.slips.length}
        clicked = {(e)=>this.handlePageChange(e)}
        show= {this.state.displaySlips} totalPages = {this.state.totalSlips} />
        </div>
        </div>
          <div className="row ">
          <div className="col-lg-12  " style={{ float: "left" }}>
            <div className="row ">{shownSlips}</div>
          </div>
          </div>
        </>
    );
  }
}

export default BetSlip;
