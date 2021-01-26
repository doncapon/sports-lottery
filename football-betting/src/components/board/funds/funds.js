import classes from "./funds.module.css";
import React from "react";
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {Redirect} from 'react-router';
const Funds = (props) => {

    let title = props.firstName;
    let titleLarge = props.firstName;
    if (props.showFunds) {
        title += "\xa0\xa0\xa0\xa0 Wallet: ₦" + props.funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        title += "\xa0\xa0\xa0\xa0 wallet hidden";
    }

    if (props.showFunds) {
        titleLarge +=  "\xa0\xa0\xa0\xa0"+
        "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Wallet: ₦"+
        props.funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        titleLarge += "\xa0\xa0\xa0"+
        "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+

         " wallet hidden";
    }
    const logout = ()=>{
        props.setIsLoggedIn(false);
        return <Redirect to="/" />
    }
    return (

        <div style={{ clear: 'both' }}>
            <div className={classes.FundsNormal}>
            <Button onClick={logout} variant="danger">Logout</Button>
                <DropdownButton id="dropdown-item-button"
                    title={title} menuAlign='right' size="lg" variant="success">
                    {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
                    <Dropdown.Item to= "/payment" as={NavLink}>Transfer funds</Dropdown.Item>
                    <Dropdown.Item to= "/results" as={NavLink}>Weekly Results</Dropdown.Item>
                    <Dropdown.Item as="button">Game History</Dropdown.Item>
                    <Dropdown.Item onClick={props.toggleShowFunds} as="button">{!props.showFunds?'Show wallet':'Hide wallet'}</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className={classes.FundsLarge}>
            <Button onClick={logout} variant="danger">Logout</Button>
                <DropdownButton id="dropdown-item-button"
                    title={titleLarge} menuAlign='right' size="lg"  variant="success">
                    {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
                    <Dropdown.Item to= "/payment" as={NavLink}>Transfer funds</Dropdown.Item>
                    <Dropdown.Item to= "/results" as={NavLink}>Weekly Results</Dropdown.Item>
                    <Dropdown.Item as="button">Game History</Dropdown.Item>
                    <Dropdown.Item onClick={props.toggleShowFunds} as="button">{!props.showFunds?'Show wallet':'Hide wallet'}</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>


    );
}


export default Funds;