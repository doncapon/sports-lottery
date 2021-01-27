import React,{Component} from 'react';
import {Navbar,Nav
    // ,Button,FormControl,Form 
} from 'react-bootstrap';
import classes from './landing.module.css';
class Landing extends Component {
    
    render(){
        return(
            <div className={classes.LandingWrapper}>
        
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    
                    </Nav>
                    {/* <Form inline>
                    <FormControl type="email" placeholder="Email" className="mr-sm-2" />
                    <FormControl type="password" placeholder="password" className="mr-sm-2" />
                    <Button variant="outline-success">Login</Button>
                    
                    <Button variant="outline-success">SignUp</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Navbar>
               
            </div>
        );
    }
}
export default Landing;