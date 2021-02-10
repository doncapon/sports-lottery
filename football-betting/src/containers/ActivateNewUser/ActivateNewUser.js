import { Component } from "react";
import React from "react";
import axios from "../../axios-main";

class ActivateNewUser extends Component {
    state = {
        loading: false
    }
    setloadingTotrue = () => {
        this.setState({ loading: true });
    }
    componentDidMount() {
        if (!this.state.loading) {
            const { token } = this.props.match.params;
            console.log(token);
            axios.post("users/email-activate", { "token": token })
                .then(response => {
                    alert(response.data + ". Login");
                })
                .catch(error => {
                    alert(error);
                })

            // this.props.history.push("/")
        }

        this.setloadingTotrue();
    }
    render() {
        return (<div>hello</div>)
    }
}


export default ActivateNewUser;