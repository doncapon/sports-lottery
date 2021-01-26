import React from 'react';
import Auxy from '../../../hoc/Auxy/Auxy';
import SignupModal from '../../UI/SignupModal/SignupModoal';
import SignupForm from "../signup/signupForm/signupForm";

const Signup = (props) =>{

    return (<Auxy>
        <SignupModal 
        show={true} modalClosed={()=>{}}> 
                    <SignupForm />
        </SignupModal>
    </Auxy>);
}


export default Signup;