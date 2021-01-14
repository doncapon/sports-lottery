import React from 'react';
import Button from 'react-bootstrap/Button';
import { Trash2Fill } from 'react-bootstrap-icons';
import Funds from '../../components/board/funds/funds';
import classes from './topBoard.module.css';

const topBoard = (props) => {
  const genrateSlip = (event) => {
    let i = event.target.innerHTML;
    props.genrateSlip(i, props.editIndex);
  }
  return (<div className= {classes.TopBoard}>
    <div className={classes.Funds} >
      <Funds funds={props.funds} showFunds={props.showFunds} firstName={props.firstName}
        toggleShowFunds={props.toggleShowFunds}
      />
    </div>
    <div className={classes.PlayWith} style={{  textAlign: 'left', color: 'blue', fontWeight: 'bold' }}
    >play with <div style={{ color: 'green', display: 'inline'}}>
        {props.basePrice}</div> ₦aira
    </div>
    <div>   
    <div className={classes.Quick} >Quick Random Play: </div>

      <div className={classes.Buttons}>
        <Button
          style={{ marginRight: '5px' }}
          
          variant="success"
          size="md"
          onClick={(e) => genrateSlip(e)}
        >
          480 ₦
        </Button>

        <Button
          style={{ marginRight: '5px' }}
          onClick={(e) => genrateSlip(e)}
          variant="success"
          size="md"
        >
          960 ₦
        </Button>

        <Button
          variant="success"
          onClick={(e) => genrateSlip(e)}
          size="md"
        >
          1,440 ₦
       </Button>

      </div>
    </div>

    <div className={classes.EmptySelection}  >
      <div className={classes.EmptyText} >
      REMOVE SELECTIONS: 
      </div>
      <div className={classes.EmptyButton}>
        <Button
          variant="outline-black"
          disabled={!props.isStarted}
          onClick={props.clicked}
          size="md"
        >
          <Trash2Fill  size= "20" />
        </Button>
      </div>
    </div>
  </div>);

}


export default topBoard;