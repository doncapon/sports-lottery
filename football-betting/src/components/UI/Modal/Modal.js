import React from 'react';
import classes from './Modal.module.css';
const Modal = (props) =>{
    return ( <div className = {classes.modal} > 
    <div className= "modal-content">
    <div className="modal-header">
            <h6 className= "modal-title" > Form Checker | last Five Meetings | Win chance</h6>
        </div>
        <div className="modal-body">
            Modal Content will go here
        </div>

        <div className="modal-footer">
        </div>
    </div>
</div>    );
}

export default Modal;