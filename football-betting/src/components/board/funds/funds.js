import classes from "./funds.module.css";
import React, {Component} from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import firebase from '../../../config/firebase/firebase'; 
class  Funds extends Component {

    state = {
        loading: false,
        funds: 0
    }
    componentDidMount(){
        if(!this.stateloading){
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    let userRef = firebase.database().ref("users/" + user.uid)
                    userRef.on('value', (snapshot) => {
                        const data = snapshot.val();
                        this.setState({funds : data.funds})
                    });
                }
            })
        }
        this.setState({loading: true})
    }
    render(){
    let title = this.props.firstName;
    let titleLarge = this.props.firstName;
    if (this.props.showFunds) {
        title += "\xa0\xa0\xa0\xa0 Wallet: ₦" + this.state.funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        title += "\xa0\xa0\xa0\xa0 wallet hidden";
    }

    if (this.props.showFunds) {
        titleLarge += "\xa0\xa0\xa0\xa0" +
            "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Wallet: ₦" +
            this.state.funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        titleLarge += "\xa0\xa0\xa0" +
            "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +

            " wallet hidden";
    }

    return (

        <div style={{ clear: 'both' }}>
            <div className={classes.FundsNormal}>
                <DropdownButton id="dropdown-item-button"
                    title={title} menuAlign='right' size="lg" variant="success">
                    <Dropdown.Item to="/transfers" as={NavLink}>Transfer funds</Dropdown.Item>
                    <Dropdown.Item to="/history" as={NavLink}>Game History</Dropdown.Item>
                    <Dropdown.Item onClick={this.props.toggleShowFunds} as="button">
                        {!this.props.showFunds ? 'Show wallet' : 'Hide wallet'}</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className={classes.FundsLarge}>
                <DropdownButton id="dropdown-item-button"
                    title={titleLarge} menuAlign='right' size="lg" variant="success">
                    {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
                    <Dropdown.Item to="/transfers" as={NavLink}>Transfer funds</Dropdown.Item>
                    <Dropdown.Item to="/history"  as={NavLink} >Game History</Dropdown.Item>
                    <Dropdown.Item onClick={this.props.toggleShowFunds} as="button">
                        {!this.props.showFunds ? 'Show wallet' : 'Hide wallet'}</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>


    );
    }
}


export default Funds;