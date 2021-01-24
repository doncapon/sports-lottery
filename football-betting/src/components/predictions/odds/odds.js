import React  from 'react';
import classes from './odds.module.css';

const odds = (props) =>{
    return (<div className={classes.OddsWrapper}>

        <div className = 'row' >
            <div className='col-4'>Home(H)</div><div className='col-4'>Draw(D)</div><div className='col-4'>Away(A)</div>
        </div>
        <div className = 'row' style ={{color: 'grey'}} >
            <div className='col-4'>{props.home}</div><div className='col-4'>{props.draw}</div><div className='col-4'>{props.away}</div>
        </div>
    </div>)
}

export default odds;