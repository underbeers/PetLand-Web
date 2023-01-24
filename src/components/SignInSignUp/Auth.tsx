import React, {useRef, useState} from 'react';
import {SwitchTransition, CSSTransition} from 'react-transition-group';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';


export interface iAuthProps {
    switchContent: () => void;
    closeModal?: () => void;
}

const Auth: React.FC<{ closeModal?: () => void }> = ({closeModal}) => {
    const [formSignIn, setFormSignIn] = useState(true);
    const signInRef = useRef(null);
    const signUpRef = useRef(null);
    const nodeRef = formSignIn ? signInRef : signUpRef;

    return (
        <SwitchTransition mode='out-in'>
            <CSSTransition
                // @ts-ignore
                key={formSignIn}
                nodeRef={nodeRef}
                // @ts-ignore
                addEndListener={(done: () => void) => {nodeRef.current.addEventListener('transitionend', done, false)}}
                classNames='fade'>
                <div ref={nodeRef}>
                    {formSignIn ?
                        <SignIn switchContent={() => {setFormSignIn(false)}} closeModal={closeModal}/> :
                        <SignUp switchContent={() => {setFormSignIn(true)}} closeModal={closeModal}/>
                    }
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
};

export default Auth;
