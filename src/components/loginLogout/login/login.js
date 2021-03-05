import { Button, FormControl, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import classes from './login.module.css';

const Login = (props) => {
    const [showPopup, setShowPopUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerts, setAlerts] = useState([]);
    let history = useHistory();
    const login = () => {
        if (!props.loading) {
            props.login(email, password);
        }

    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        login();
        setTimeout(() => {
            if (!props.isLoggedIn) {
                setAlerts(["alert", "alert-danger"])
                popUpFunc();
            } else {
                setAlerts(["alert", "alert-success"])
                popUpFunc();
                history.push("/play");
            }
        }, 3000);
    }

    const HandleSignup = () => {
        history.push("/signup");
    }
    const popUpFunc = () => {
        setShowPopUp(true);

        setTimeout(() => {
            setShowPopUp(false);
        }, 2000);
        setShowPopUp(true);
    }
    const handleForgot = () => {
        props.setForgot(false);
        history.push("/forgot-password");
    }
    showPopup ? alerts.push(classes.alertShown) : alerts.push(classes.alertHidden);
    return (<div>
        {showPopup ?
            alerts[1] === "alert-danger" ?
                <div className={alerts.join(" ")}>
                    <strong>Failure!</strong> Please check email or password!
                </div>
                : <div className={alerts.join(" ")}>
                    <strong>Success!</strong> Login successful!
            </div>
            : null

        }
        <Form inline onSubmit={(e) => HandleSubmit(e)}>
            <FormControl type="email" onChange={(e) => setEmail(e.target.value)}
                value={email} placeholder="email" className="mr-sm-2" />
            <FormControl type="password" onChange={(e) => setPassword(e.target.value)}
                value={password} placeholder="password" className="mr-sm-2" />
            {props.forgotPassword ?
                <Button className={classes.Forgot} onClick={handleForgot} >forgot password?</Button>
                : null}
            <Button type="submit" variant="outline-light">Login</Button>

            <Button onClick={HandleSignup} variant="outline-light">SignUp</Button>
        </Form>
    </div>);
}



export default Login;