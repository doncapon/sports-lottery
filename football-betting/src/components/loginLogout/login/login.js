import { Button, FormControl, Form } from 'react-bootstrap';
import {  useHistory } from 'react-router-dom';

const Login = (props) => {
    let history = useHistory();
    const HandleSubmit = (e) => {
        e.preventDefault();
        props.login(props.username, props.password)
        // console.log("i am been called ",props.loginSuccess,  props.loginSuccess === "success");
        // if( props.loginSuccess === "success"){
        //     alert.success("Logged in successfully");
        // }else{
        //     alert.error("Could not log in"); 
        // }
        setTimeout(() => {
        history.push("/play");
            
        }, 1000);
    }

    const HandleSignup = () => {
        let history= useHistory();
        history.push("/signup");
    }
    return (<div>

        <Form inline onSubmit={(e) => HandleSubmit(e)}>
            <FormControl type="text" onChange={(e) => props.setUsername(e.target.value)} placeholder="username" className="mr-sm-2" />
            <FormControl type="password" onChange={(e) => props.setPassword(e.target.value)}
                placeholder="password" className="mr-sm-2" />
            <Button type="submit" variant="outline-light" disabled={props.username === "" || props.password === ""}>Login</Button>
          
            <Button onClick={HandleSignup} variant="outline-light">SignUp</Button>
        </Form>
    </div>);
}



export default Login;