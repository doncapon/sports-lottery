import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import classes from './loginModal.module.css';
import firebase from '../../../config/firebase/firebase';

const LoginModal = (props) => {
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
                if (user.emailVerified) {
                    let userRef = firebase.database().ref("users/" + user.uid);
                    userRef.on('value', (snapshot) => {
                        const dbUser = snapshot.val();
                        setUserData(user);
                        props.setIsLoggedIn(true);
                        popUpFunc();
                        props.setLoggedInUser(dbUser);
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
    };


    const HandleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        if(firebase.auth().currentUser){
            
        props.cancelLoginPopup();
        props.setIsPaying(true);
        }else{
        }
    }

    const HandleCancel = () => {
        props.cancelLoginPopup();
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
         <form onSubmit={(e) => HandleSubmit(e)}>
             <h3>Login</h3>
            <div  className={classes.FormControl}>
                <div className={classes.Label}  >Email:</div>
                <input name="email" type="email" onChange={(e) => setEmail(e.target.value)}
                    value={email} placeholder="email" className= {classes.Input} />
                <br />
            </div>
            <div  className={classes.FormControl}>
                <div className={classes.Label}>Password:</div>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)}
                    value={password} placeholder="password"  className= {classes.Input2}/>
            </div>
            {forgot ?
                <Button className={classes.Forgot} onClick={handleForgot} >forgot password?</Button>
                : null}
                
            <Button onClick={HandleCancel} variant="outline-danger">Cancel</Button>
            <Button type="submit" variant="success">Login</Button>

        </form> 
    </div>);
}



export default LoginModal;