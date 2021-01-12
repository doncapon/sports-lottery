import React from "react";
import { DropdownButton, Dropdown} from 'react-bootstrap';
const funds = (props) =>{
    
    let title = props.firstName;
        if(props.showFunds){
            title += "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + props.funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            title += "₦"
        }else{
            title += "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 funds hidden";
        }

        
    return (
     
        <div>
            
            <DropdownButton id="dropdown-item-button" title={ title }>
            {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
            <Dropdown.Item as="button">Transer funds</Dropdown.Item>
            <Dropdown.Item as="button">Game History</Dropdown.Item>
            <Dropdown.Item onClick = {props.toggleShowFunds} as="button">toggleShowFunds</Dropdown.Item>
            </DropdownButton>
        </div>
    ) ;
}


export default funds;