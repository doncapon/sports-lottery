import React from 'react';
import Auxy from '../../../hoc/Auxy/Auxy'
import classes from "./footer.module.css";
const Footer = (props) =>{
    return(
        <Auxy>
            <div className={classes.footer}>I am footer</div>
        </Auxy>
        
    );
    
}

export default Footer;