import React from 'react';
import { Container } from 'react-bootstrap'
import Auxy from '../../../hoc/Auxy/Auxy'
import classes from "./footer.module.css";
const Footer = (props) => {
    return (
        <Auxy >
            <div className={classes.footer}>
                <Container>
                    <p className='text-white text-center pt-2'>&copy; 2021 BetSoka {" - "} <i>version: {process.env.REACT_APP_VERSION}</i></p>
                </Container>
            </div>
        </Auxy>

    );

}

export default Footer;