import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './OrderTilee.module.css';

class OrderTiles extends Component {
    render(){
        let side = null;
        const classesFul = [];
        const majorClass = [];
        majorClass.push(classes.OrderTiles);

        if(this.props.selected){
            majorClass.push(classes.Selected);
        }

        switch ( this.props.type ) {
            case ( 'home' ):
                classesFul.push(classes.Home);
                side = <div className = {classesFul.join(' ')}
                >1</div>;
                break;
            case ( 'draw' ):
                classesFul.push(classes.Draw);
                side = <div 
                className = {classesFul.join(' ')}>X</div>;
            break;
            case ( 'away' ):
                classesFul.push(classes.Away);
                side = <div
                className = {classesFul.join(' ')}>2</div>;
                break;
            default:
                side = <div className = {classesFul.join(' ')}>1</div>;
        }
     
        return <div onClick = {this.props.clicked} 
         className= {majorClass.join(' ')}>     
            {side}
            </div>

            
    }

}

OrderTiles.propTypes ={
    type: PropTypes.string.isRequired
};

export default OrderTiles;