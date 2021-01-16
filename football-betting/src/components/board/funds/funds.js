import classes from "./funds.module.css";
import React from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
const funds = (props) => {

    let title = props.firstName;
    let titleLarge = props.firstName;
    if (props.showFunds) {
        title += "\xa0\xa0\xa0\xa0 Wallet: ₦" + props.funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        title += "\xa0\xa0\xa0\xa0 wallet hidden";
    }

    if (props.showFunds) {
        titleLarge +=  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+
        "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Wallet: ₦"+
        props.funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        titleLarge += "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+
        "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+

         " wallet hidden";
    }

    return (

        <div style={{ clear: 'both' }}>
            <div className={classes.FundsNormal}>
                <DropdownButton id="dropdown-item-button"
                    title={title} menuAlign='right' size="lg">
                    {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
                    <Dropdown.Item to= "/payment" as={NavLink}></Dropdown.Item>
                    <Dropdown.Item as="button">Game History</Dropdown.Item>
                    <Dropdown.Item onClick={props.toggleShowFunds} as="button">{!props.showFunds?'Show wallet':'Hide wallet'}</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className={classes.FundsLarge}>
                <DropdownButton id="dropdown-item-button"
                    title={titleLarge} menuAlign='right' size="lg">
                    {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
                    <Dropdown.Item to= "/payment" as={NavLink}>Transfer funds</Dropdown.Item>
                    <Dropdown.Item as="button">Game History</Dropdown.Item>
                    <Dropdown.Item onClick={props.toggleShowFunds} as="button">{!props.showFunds?'Show wallet':'Hide wallet'}</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>


    );
}


export default funds;