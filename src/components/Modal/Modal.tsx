import React, {useRef, useState} from 'react';
import cn from 'classnames';
import {CSSTransition} from 'react-transition-group';

import styles from './Modal.module.css';

type ModalProps = {
    content: ModalContent;
    contentProps: { isMobile: boolean, isFormSignIn?: boolean, closeModal?: () => void };
    button: JSX.Element;
}

export type ModalContent = React.FC<ModalProps['contentProps']>;

const Modal: React.FC<ModalProps> = ({content, contentProps, button}) => {
    const [isOpened, setIsOpened] = useState(false);
    const Content: ModalContent = content;
    const nodeRef = useRef(null);

    return (
        <>
            <a onClick={() => {setIsOpened(true)}}>{button}</a>
            <div id={'modal_overlay'}
                 className={cn(styles.overlay, isOpened ? styles.opened : styles.closed)}
                 onClick={() => {setIsOpened(false)}}
            />
            <CSSTransition in={isOpened} nodeRef={nodeRef} timeout={contentProps.isMobile ? 0 : 200} classNames='modal' unmountOnExit>
                <div className={styles.wrapper}>
                    <div className={styles.modal} ref={nodeRef}>
                        <Content closeModal={() => {setIsOpened(false)}} {...contentProps} />
                    </div>
                </div>
            </CSSTransition>
        </>
    );
};

export default Modal;
