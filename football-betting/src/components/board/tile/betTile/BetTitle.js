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
     
        return ( <div  className = {'row  '+ classesFul.join(' ')  } style={{width: '2vw'}} 
        onClick = {this.props.clicked}  selected = {this.props.selected} >
            <div className= 'col-sm-1' style={{fontSize: '2vv' , paddingLeft: '0.5vw'}}>  { child}</div></div>);
        

            
    }

}

BetTile.propTypes ={
    type: PropTypes.string.isRequired
};


export default BetTile;