import React, {useRef, useState} from "react";
import SignIn from "./Mobile/SignIn/SignIn";
import SignUp from "./Mobile/SignUp/SignUp";
import {SwitchTransition, CSSTransition} from "react-transition-group";


export interface iAuthProps {
    switchContent: () => void;
    closeModal?: () => void;
}

const AuthMobile: React.FC<{ closeModal?: () => void }> = ({closeModal}) => {

    const [formSignIn, setFormSignIn] = useState(true);
    const signInRef = useRef(null);
    const signUpRef = useRef(null);
    const nodeRef = formSignIn ? signInRef : signUpRef;

    return (
            <>
                    {formSignIn ?
                        <SignIn switchContent={() => {setFormSignIn(false)}} closeModal={closeModal}/>
                        :
                        <SignUp switchContent={() => {setFormSignIn(true)}} closeModal={closeModal}/>
                    }
            </>
    );
};

export default AuthMobile;
