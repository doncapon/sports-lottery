import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './BetTitle.module.css';

class BetTile extends Component {
     render(){
        const classesFul = [];
        classesFul.push(classes.BetTile);
        let child = null;
        if(this.props.selected){
            classesFul.push(classes.Selected);
        }
        switch ( this.props.type ) {
            case ( 'home' ):
                classesFul.push(classes.Home);
              child = 'H';
                break;
            case ( 'draw' ):
                classesFul.push(classes.Draw);
                child = 'D';
            break;
            case ( 'away' ):
                classesFul.push(classes.Away);
                child = 'A';
                break;
            default:
                child = 'A';
            
                classesFul.push(classes.Home);
                break;
        }
     
        return ( <div className= {classesFul.join(' ') }
                 selected = {this.props.selected}
            >  { child}</div>);
        

            
    }

}

BetTile.propTypes ={
    type: PropTypes.string.isRequired
};


export default BetTile;