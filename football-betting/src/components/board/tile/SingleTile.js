import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './SingleTile.module.css';

class SingleTile extends Component {
    render(){
        let side = null;
    
        switch ( this.props.type ) {
            case ( 'home' ):
                side = <div className={classes.Home}>1</div>;
                break;
            case ( 'draw' ):
                side = <div className={classes.Draw}>X</div>;
            break;
            case ( 'away' ):
                side = <div className={classes.Away}>2</div>;
                break;
            default:
                side = <div className={classes.Home}>1</div>;
        }
        return <div className = {classes.SingleTile}> 
            {side}
        </div>
            
    }

}

SingleTile.propTypes ={
    type: PropTypes.string.isRequired
};

export default SingleTile;