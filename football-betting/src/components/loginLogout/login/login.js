import React, { useState } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
      
        setErrors(errors)
        props.login(username, password)
    }

    return (<div>
        <Form inline onSubmit={(e) => handleSubmit(e)}>
            <FormControl type="text" onChange={(e) => setUsername(e.target.value)} placeholder="username" className="mr-sm-2" />
            <FormControl type="password" onChange={(e) => setPassword(e.target.value)}
                placeholder="password" className="mr-sm-2" />
            <Button type="submit" variant="outline-light" disabled={username === "" || password===""}>Login</Button>

            <Button variant="outline-light">SignUp</Button>
        </Form>
    </div>);
}



export default Login;