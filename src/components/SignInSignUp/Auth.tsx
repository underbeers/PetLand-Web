import React, {useState} from 'react';
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

export interface iAuthProps {
    switchContent: ()=>void;
}

const Auth: React.FC = () => {
    const [form, setForm] = useState('sign-in');

    switch (form) {
        case 'sign-in':
            return <SignIn switchContent={()=>{setForm('sign-up')}}/>;
        case 'sign-up':
            return <SignUp switchContent={()=>{setForm('sign-in')}}/>;
        default:
            return <p>Oops... Something went wrong.</p>;
    }
};

export default Auth;
