import { Button, FormControl, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const Login = (props) => {
    let history = useHistory();

    const HandleSubmit = (e) => {
        e.preventDefault();
        console.log("hello there" ,props.username, props.password )
        props.login(props.username, props.password)
    }
    const HandleSignup = ()=>{
        console.log("Yellow boys");
        history.push("/signup");
    }
    return (<div>
        <Form inline onSubmit={(e) => HandleSubmit(e)}>
            <FormControl type="text" onChange={(e) => props.setUsername(e.target.value)} placeholder="username" className="mr-sm-2" />
            <FormControl type="password" onChange={(e) => props.setPassword(e.target.value)}
                placeholder="password" className="mr-sm-2" />
            <Button type="submit" variant="outline-light" disabled={props.username === "" || props.password===""}>Login</Button>

            <Button onClick = {HandleSignup} variant="outline-light">SignUp</Button>
        </Form>
    </div>);
}



export default Login;