import React, {useRef, useState} from 'react';
import {SwitchTransition, CSSTransition} from 'react-transition-group';

import {ModalContent} from '../Modal/Modal';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

export interface iAuthProps {
    switchContent: () => void;
    closeModal?: () => void;
    isMobile: boolean;
}

const Authorization: ModalContent = ({closeModal, isMobile, isFormSignIn}) => {
    const [formSignIn, setFormSignIn] = useState<boolean>(isFormSignIn === undefined ? true : isFormSignIn);
    const signInRef = useRef(null);
    const signUpRef = useRef(null);
    const nodeRef = formSignIn ? signInRef : signUpRef;
    const signInUpProps = {closeModal, isMobile};

    return (
        <SwitchTransition mode='out-in'>
            <CSSTransition
                // @ts-ignore
                key={formSignIn}
                nodeRef={nodeRef}
                // @ts-ignore
                addEndListener={(done: () => void) => {nodeRef.current.addEventListener('transitionend', done, false)}}
                classNames='fade'>
                <div ref={!isMobile ? nodeRef : null}>
                    {formSignIn ?
                        <SignIn switchContent={() => {setFormSignIn(false)}} {...signInUpProps}/> :
                        <SignUp switchContent={() => {setFormSignIn(true)}} {...signInUpProps}/>
                    }
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
};

export default Authorization;
