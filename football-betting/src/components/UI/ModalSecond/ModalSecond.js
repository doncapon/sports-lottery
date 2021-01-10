import React, { Component } from 'react';

import classes from './ModalSecond.module.css';
import Auxy from '../../../hoc/Auxy/Auxy';
import Backdrop from '../Backdrop/Backdrop';

class ModalSecond extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render () {
        return (
            <Auxy>
                <Backdrop show={this.props.show} clicked={this.props.ModalSecondClosed} />
                <div
                    className={classes.ModalSecond}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '2' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxy>
        )
    }
}

export default ModalSecond;