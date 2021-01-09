import React  from 'react';


const odds = (props) =>{
    return (<>

        <div className = 'row' >
            <div className='col-4'>Home(1)</div><div className='col-4'>Draw(X)</div><div className='col-4'>Away(2)</div>
        </div>
        <div className = 'row' style ={{color: 'grey'}} >
            <div className='col-4'>{props.home}</div><div className='col-4'>{props.draw}</div><div className='col-4'>{props.away}</div>
        </div>
    </>)
}

export default odds;