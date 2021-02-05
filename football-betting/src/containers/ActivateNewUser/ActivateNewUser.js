import { Component } from "react";
import React from "react";
import axios from "../../axios-main";

class ActivateNewUser extends Component {


    componentDidMount() {
        const { token } = this.props.match.params;
        axios.post("users/email-activate", { "token": token.trim() })
            .then(response => {
                alert(response.data + ". Login");
            })
            .catch(error => {
                alert(error);
            })

        // this.props.history.push("/")

    }
    render() {
        return (<div></div>)
    }
}


export default ActivateNewUser;