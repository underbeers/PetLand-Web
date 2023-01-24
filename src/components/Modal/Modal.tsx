import React, {useRef, useState} from 'react';
import cn from 'classnames';
import {CSSTransition} from 'react-transition-group';

import styles from './Modal.module.css';


interface iModalProps {
    content: React.FC;
    button: JSX.Element;
}

const Modal: React.FC<iModalProps> = ({content, button}) => {
    const [isOpened, setIsOpened] = useState(false);
    const Content: React.FC<{ closeModal?: () => void }> = content;
    const nodeRef = useRef(null);

    return (
        <>
            <a onClick={() => {setIsOpened(true)}}>{button}</a>
            <div id={'modal_overlay'}
                 className={cn(styles.overlay, isOpened ? styles.opened : styles.closed)}
                 onClick={() => {setIsOpened(false)}}
            />
            <CSSTransition in={isOpened} nodeRef={nodeRef} timeout={200} classNames='modal' unmountOnExit>
                <div className={styles.wrapper}>
                    <div className={styles.modal} ref={nodeRef}>
                        <Content closeModal={() => {setIsOpened(false)}}/>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
};

export default Modal;
