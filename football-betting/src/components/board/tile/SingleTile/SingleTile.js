import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './SingleTile.module.css';

class SingleTile extends Component {
    render(){
        let side = null;
        const classesFul = [];
        const majorClass = [];
       
        let child = null;
        switch ( this.props.type ) {
            case ( 'home' ):
                classesFul.push(classes.Side);
              child = '1';
                break;
            case ( 'draw' ):
                classesFul.push(classes.Side);
                child = 'X';
            break;
            case ( 'away' ):
                classesFul.push(classes.Side);
                child = '2';
                break;
            default:
                child = '2';
            
                classesFul.push(classes.Side);
                break;
        }
        if(this.props.selected){
            classesFul.push(classes.Selected);
        }
        majorClass.push(classes.SingleTile);
        side = <div  onClick = {this.props.clicked}  className= {majorClass.join(' ') + ' ' + classesFul.join(' ') }  
         selected = {this.props.selected} 
        >{child}
        </div>;
        return <div >     
            {side}
            </div>

            
    }

}

SingleTile.propTypes ={
    type: PropTypes.string.isRequired
};

export default SingleTile;