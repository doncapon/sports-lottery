import { Button, FormControl, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import classes from './login.module.css';
import firebase from '../../../config/firebase/firebase';

const Login = (props) => {
    const [showPopup, setShowPopUp] = useState(false);
    const [email, setEmail] = useState('lordshegz@gmail.com');
    const [password, setPassword] = useState('Emmanuel1987');
    const [userData, setUserData] = useState({});
    const [forgot, setForgot] = useState(false);
    let history = useHistory();
    const login = (email, password) => {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                if(user.emailVerified){
                    let userRef = firebase.database().ref("users/" + user.uid);
                    userRef.on('value', (snapshot) => {
                        const dbUser = snapshot.val();
                        setUserData(user);
                        props.setIsLoggedIn(dbUser);
                        popUpFunc();
                        props.setLoggedInUser(dbUser);
                        if (props.slips !== null)
                            props.deleteAndResetAll();
                        history.push("/play");
                      });
                }
              
            })
            .catch((error) => {
                setUserData(error);
                popUpFunc();
                setForgot(true);
                props.setIsLoggedIn(false);
            });

        // const loginuserData = {
        //     email: email,
        //     password: password,
        // };

        // let res = await axios.post("users/login", loginuserData, { withCredentials: true });
        // return await res.userData;
    };


    const HandleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
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
        setForgot(false);
        history.push("/forgot-password");
    }
    let alerts = ["alert", "alert-danger"]
    showPopup ? alerts.push(classes.alertShown) : alerts.push(classes.alertHidden);
    return (<div>
        {showPopup ?
            !userData.email ?
                <div className={alerts.join(" ")}>
                    <strong>Failure!</strong> Please check email or password!
                </div>
                : null
            : null

        }
        <Form inline onSubmit={(e) => HandleSubmit(e)}>
            <FormControl type="email" onChange={(e) => setEmail(e.target.value)}
                value={email} placeholder="email" className="mr-sm-2" />
            <FormControl type="password" onChange={(e) => setPassword(e.target.value)}
                value={password} placeholder="password" className="mr-sm-2" />
            {forgot ?
                <Button className={classes.Forgot} onClick={handleForgot} >forgot password?</Button>
                : null}
            <Button type="submit" variant="outline-light">Login</Button>

            <Button onClick={HandleSignup} variant="outline-light">SignUp</Button>
        </Form>
    </div>);
}



export default Login;