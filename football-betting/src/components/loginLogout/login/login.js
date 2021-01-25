import { Button, FormControl, Form } from 'react-bootstrap';

const Login = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello there" ,props.username, props.password )
        props.login(props.username, props.password)
    }

    return (<div>
        <Form inline onSubmit={(e) => handleSubmit(e)}>
            <FormControl type="text" onChange={(e) => props.setUsername(e.target.value)} placeholder="username" className="mr-sm-2" />
            <FormControl type="password" onChange={(e) => props.setPassword(e.target.value)}
                placeholder="password" className="mr-sm-2" />
            <Button type="submit" variant="outline-light" disabled={props.username === "" || props.password===""}>Login</Button>

            <Button variant="outline-light">SignUp</Button>
        </Form>
    </div>);
}



export default Login;