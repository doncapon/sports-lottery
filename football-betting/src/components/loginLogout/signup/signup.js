import React, { useState} from 'react';
import Auxy from '../../../hoc/Auxy/Auxy';
import SignupModal from '../../UI/SignupModal/SignupModoal';
import SignupForm from "../signup/signupForm/signupForm";

const Signup = (props) =>{
    const [showForm, setShowForm] = useState(true);
    return (<Auxy>
        <SignupModal 
        show={showForm} modalClosed = {()=>{}}> 
                    <SignupForm setShowForm = {setShowForm} />
        </SignupModal>
    </Auxy>);
}


export default Signup;