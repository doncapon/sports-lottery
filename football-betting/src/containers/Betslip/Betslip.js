import React, { useState } from "react";
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

const BetSlip = (props) =>{

  const [activePage, setActivePage] = useState(1);
  const [totalSlips, setTotalSlips] = useState(12);
  const [displaySlips, setDisplaySlips] = useState(3);

  const handlePageChange = (event) => {
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
  
    setActivePage(k);
  };
  const AddBetToTslip = (slipIndex, lastindex) => {

    props.setAdding(slipIndex, true);
    props.addBetSlip(slipIndex);
    props.setEditIndex(props.slips.length);
    setActivePage(Math.floor((props.slips.length/displaySlips)) +1);
  };

  const setEditIndex= (ind)=>{
    if(ind !== props.editIndex){
      props.setEditIndex(ind);
    }
  }
  const RemoveBetFromSlip = (oldIndex) => {
    props.removeSlipSingle(oldIndex);
    props.setEditIndex(props.slips.length-1);
  };
    let betSlip = null;

    if (props.slips.length > 0) {
      betSlip = props.slips.map((slip, ind) => {
        return (
          <div
            className={
              "col-md-4 "
            }
           
            key={ind}
          >

            <div className='row'>

            <div className={ props.editIndex === ind ? classes.Edit : null}
               style={{
              borderRadius: "5%",
              background: "#f7f4bc",
              margin: '0 5% 10%',
            }}
           
            >
              {console.log(props.editIndex)}
            <div className="row">
              <div className="col-md-12 ">
                <div style={{ fontWeight: "bold", marginBottom: '2%' }}>Slip {ind + 1}</div>
              </div>
            </div>

            <div className="row"    onClick={()=>setEditIndex(ind)}>
              <div className="col-sm-12">
                <BetItems key={ind} games={slip[slip.id].games} />
              </div>
            </div>

            <div className={"row " + classes.Buttons}>
              <div className="col-sm-3 offset-1">
                <Button
                  size="md"
                  variant="outline-info"
                 onClick={()=>setEditIndex(ind)}
                >
                  <ArrowUpRightCircleFill />
                </Button>
              </div>

              <div className="col-sm-3 ">
                <Button
                  onClick={() =>
                    AddBetToTslip(ind, props.slips.length)
                  }
                  size="md"
                  variant="info"
                  disabled={
                    props.disableAdd || props.slips.length > totalSlips -1
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
                  onClick={() => RemoveBetFromSlip(slip.id)}
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

    let start = ((activePage-1)) * displaySlips;  
    let end = start+ displaySlips;
    let newBetSlip = betSlip;
     shownSlips = newBetSlip.slice( start ,end );
    return (<>
      <div className={"row " + classes.BetSlip}>
        <div className="col-md-9">
        <Pagination activePage = {activePage}  
        usedPages = {props.slips.length}
        clicked = {(e)=>handlePageChange(e)}
        show= {displaySlips} totalPages = {totalSlips} />
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


export default BetSlip;
