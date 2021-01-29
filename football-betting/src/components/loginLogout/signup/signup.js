import React from 'react';
import Auxy from '../../../hoc/Auxy/Auxy';
import SignupModal from '../../UI/SignupModal/SignupModoal';
import SignupForm from "../signup/signupForm/signupForm";
import { connect } from 'react-redux';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Signup extends Component {
    state = {
        showForm: true,
    }
    setShowForm(val) {
        this.setState({ showForm: val });
    }
    render() {
        if (this.props.isLoggedIn) {
            return (
                <Redirect to="/" />
            )
        }
        return (<Auxy>
            <SignupModal
                show={this.state.showForm} modalClosed={() => { }}>
                <SignupForm setShowForm={this.setShowForm} />
            </SignupModal>
        </Auxy>);
    };

}

const mapstateToProps = (state) => {
    return {
        isLoggedIn: state.login.isLoggedIn
    }
}
export default connect(mapstateToProps)(Signup);