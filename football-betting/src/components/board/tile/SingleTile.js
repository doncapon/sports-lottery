import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './SingleTile.module.css';

class SingleTile extends Component {
    render(){
        let side = null;
        const classesFul = [];
        const style = [classes.SingleTile];
        if(this.props.selected){
            classesFul.push(classes.Selected);
            style.push(classes.Selected);

        }
        switch ( this.props.type ) {
            case ( 'home' ):
                classesFul.push(classes.Home);
                side = <div className = {classesFul.join(' ')}
                >1</div>;
                break;
            case ( 'draw' ):
                classesFul.push(classes.Draw);
                side = <div className = {classesFul.join(' ')}>X</div>;
            break;
            case ( 'away' ):
                classesFul.push(classes.Away);
                side = <div className = {classesFul.join(' ')}>2</div>;
                break;
            default:
                side = <div className = {classesFul.join(' ')}>1</div>;
        }
     
        return <div className = {style.join(' ')} 
         onClick = {this.props.clicked} selected = {this.props.selected}> 
            {side}
        </div>
            
    }

}

SingleTile.propTypes ={
    type: PropTypes.string.isRequired
};

export default SingleTile;