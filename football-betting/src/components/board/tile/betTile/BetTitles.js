import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './BetTitles.module.css';

class BetTiles extends Component {
     render(){
        let side = null;
        const classesFul = [];

        classesFul.push(classes.BetTiles);
        let child = null;
        if(this.props.selected){
            classesFul.push(classes.Selected);
        }
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
     

        side = <div  className = {classesFul.join(' ')  } 
            onClick = {this.props.clicked}  selected = {this.props.selected}
        >{child}</div>;
        return <div >     
            {side}
            </div>

            
    }

}

BetTiles.propTypes ={
    type: PropTypes.string.isRequired
};


export default BetTiles;