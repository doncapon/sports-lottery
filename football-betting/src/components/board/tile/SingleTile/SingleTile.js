import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './SingleTile.module.css';

class SingleTile extends Component {
    render(){
        let side = null;
        const classesFul = [];
        const majorClass = [];
        majorClass.push(classes.SingleTile);

        if(this.props.selected){
            majorClass.push(classes.Selected);
        }
        let child = null;
        switch ( this.props.type ) {
            case ( 'home' ):
                classesFul.push(classes.Home);
              child = '1';
                break;
            case ( 'draw' ):
                classesFul.push(classes.Draw);
                child = 'X';
            break;
            case ( 'away' ):
                classesFul.push(classes.Away);
                child = '2';
                break;
            default:
                child = '2';
            
                classesFul.push(classes.Home);
                break;
        }
        side = <div className = {classesFul.join(' ')} selected = {this.props.selected}
        >{child}</div>;
        return <div onClick = {this.props.clicked} 
         className= {majorClass.join(' ')}>     
            {side}
            </div>

            
    }

}

SingleTile.propTypes ={
    type: PropTypes.string.isRequired
};

export default SingleTile;