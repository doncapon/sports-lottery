import React from 'react';
import Button from 'react-bootstrap/Button';
import { Trash2Fill } from 'react-bootstrap-icons';
import classes from './topBoard.module.css';

const topBoard = (props) => {
  const genrateSlip = (event) => {
    let i = event.target.innerHTML;
    props.genrateSlip(i, props.editIndex, props.basePrice);
  }
  return (<div className= {classes.TopBoard}>
   
    <div className= {classes.TopBoardTextsAndButtons} >
    <div className={classes.PlayWith} style={{  textAlign: 'left', color: '#0890ff', fontWeight: 'bold' }}
    >play with <div style={{ color: 'green', display: 'inline'}}>
        {props.basePrice}</div> ₦aira
    </div>
    <div className={classes.Quick} >Quick Random Play: </div>
    </div>
      <div className={classes.Buttons}>
        <Button
          
          variant="success"
          size="md"
          onClick={(e) => genrateSlip(e)}
        >
          480 ₦
        </Button>

        <Button
          onClick={(e) => genrateSlip(e)}
          variant="success"
          size="md"
        >
          1000 ₦
        </Button>

        <Button
          variant="success"
          onClick={(e) => genrateSlip(e)}
          size="md"
        >
          1,440 ₦
       </Button>
       <div>   

      </div>
    </div>

{/* medium buttons */}
<div className={classes.ButtonsLarge}>
        <Button
          
          variant="success"
          size="lg"
          onClick={(e) => genrateSlip(e)}
        >
          480 ₦
        </Button>

        <Button
          onClick={(e) => genrateSlip(e)}
          variant="success"
          size="lg"
        >
          1000 ₦
        </Button>

        <Button
          variant="success"
          onClick={(e) => genrateSlip(e)}
          size="lg"
        >
          1,440 ₦
       </Button>
       <div>   

      </div>
    </div>


    <div className={classes.EmptySelection}  >
      <div className= {classes.EmptyText}>REMOVE SELECTIONS: </div>
        <Button
          className={classes.DeleteButton}
          variant="outline-dark"
          disabled={!props.isStarted}
          onClick={props.clicked}
          size="sm"
        >
          <div className= {classes.TrashSmall}><Trash2Fill  size= "25" /></div>
          <div className= {classes.TrashMedium}><Trash2Fill  size= "35" /></div>
          <div className= {classes.TrashLarge} ><Trash2Fill  size= "25" /></div>
        </Button>
    </div>
  </div>);

}


export default topBoard;