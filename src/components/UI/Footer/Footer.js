import React from 'react';
import { Container } from 'react-bootstrap'
import Auxy from '../../../hoc/Auxy/Auxy'
import classes from "./footer.module.css";
const Footer = (props) => {
    return (
        <Auxy >
            <div className={classes.footer}>
                <Container>
                    <p className='text-white'>Footer</p>
                </Container>
            </div>
        </Auxy>

    );

}

export default Footer;