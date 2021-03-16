import React, { useState } from 'react';
import classes from './ConfirmPassword.module.css';
import firebase from 'firebase';

const ConfirmPassword = (props) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [counter, setCounter] = useState(3);

    const HandleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
                var credential = firebase.auth.EmailAuthProvider.credential(
                    user.email, password.trim());
                user.reauthenticateWithCredential(credential)
                    .then((cred) => {
                        if (props.isWithDraw) {
                            props.handleWithdraw();
                        } else {
                            props.HandleSave();
                        }
                        props.cancel();
                    })
                    .catch((error) => {
                        if (counter <= 1)
                            props.cancel();
                        setCounter(counter - 1);
                        setError("Invalid Password");
                    })


            }

        })
    }

    return <div>

        <h3>Enter Your Password: </h3>
        {error ? <div style={{ color: 'red' }}>{error + " " + counter + " more attempts"}</div> : null}
        <form onSubmit={(e) => HandleSubmit(e)}>
            <div>
                <input className={classes.Input} type="password" onChange={(e) => setPassword(e.target.value)}
                    value={password} placeholder="password" />
            </div>
            <button type="button" onClick={props.cancel}
                className={classes.CancelButton} variant="light">Cancel</button>
            <button type="submit" className={classes.ConfirmButton} style={{ background: 'green', color: 'white' }} variant="success">Confirm</button>
        </form>

    </div>
}

export default ConfirmPassword;
