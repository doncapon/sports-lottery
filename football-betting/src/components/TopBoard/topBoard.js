import React from 'react';
import Button from 'react-bootstrap/Button';
import {Trash2Fill} from 'react-bootstrap-icons';

const topBoard = (props) =>{

    return (<div className = 'col-56'>
        <div style  ={{ margin: '10px 0', fontWeight : 'bold'}}>
                <Button
                        variant="outline-primary"
                        disabled = {!props.isStarted}
                        onClick = {props.clicked }
                        size="md"
                      >
                          EMPTY SELECTIONS ? : <Trash2Fill />
                      </Button>
                      </div>
    </div>);

}


export default topBoard;