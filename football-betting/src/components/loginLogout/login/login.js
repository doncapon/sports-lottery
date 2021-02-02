import { Button, FormControl, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import axios from '../../../axios-users';
import classes from './login.module.css'; 

const Login = (props) => {
    const [showPopup, setShowPopUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState({});
    const [forgot, setForgot] = useState(false);
    let history = useHistory();
    const login = async () => {
        const loginData = {
            username: username,
            password: password,
        };

        let res = await axios.post("login", loginData, { withCredentials: true });
        return await res.data;
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        login().then(data => {
            setData(data);
            
            props.setIsLoggedIn(true);
            popUpFunc();
            props.setLoggedInUser(data);
            history.push("/play");

        }).catch(err => {
            setData(err);
            popUpFunc();
            setForgot(true);
            props.setIsLoggedIn(false);


        })
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
    const handleForgot=()=>{
        setForgot(false);
        history.push("forgot-password");
    }
    return (<div>

        {showPopup ?
            !data.username ?
                <div className={`alert alert-danger ${showPopup && data.username ? 'alert-shown' : 'alert-hidden'}`}>
                    <strong>Failure!</strong> Please check username or password!
        </div>
                : null
            : null

        }
        {/* {showPopup ?
            data.username ?
                <div className={`alert alert-success ${showPopup && data.username ? 'alert-shown' : 'alert-hidden'}`}>
                    <strong>Success!</strong> Login successful!
        </div>
                : null
            : null

        } */}
        <Form inline onSubmit={(e) => HandleSubmit(e)}>
            <FormControl type="text" onChange={(e) => setUsername(e.target.value)}
                value={username} placeholder="username" className="mr-sm-2" />
            <FormControl type="password" onChange={(e) => setPassword(e.target.value)}
                value={password} placeholder="password" className="mr-sm-2" />
                {forgot? 
                <Button className={classes.Forgot} onClick={handleForgot} >forgot password?</Button>
                : null}
            <Button type="submit" variant="outline-light" disabled={username === "" || password === ""}>Login</Button>

            <Button onClick={HandleSignup} variant="outline-light">SignUp</Button>
        </Form>
    </div>);
}



export default Login;