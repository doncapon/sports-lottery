import  SingleTile from "../tile/SingleTile";
import { React  } from "react";
import Auxy from "../../../hoc/Auxy/Auxy";
import classes from './SingleRow.module.css';


const SingleRow = (props)=>{
    let transformedResult = 
    Object.keys( props.rowTiles )
        .map( igKey => {
            return [...Array( props.rowTiles[igKey] )].map( ( _, i ) => {
                return ( 
                    
                <Auxy>
                    <SingleTile key={igKey+ i} type={igKey} />
                </Auxy>
                );
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    return (
        <div className = {classes.SingleRow} >
        {transformedResult}
        </div>
    );
}

export default SingleRow;