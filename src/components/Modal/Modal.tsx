import React, {useState} from "react";

import cross from '../../static/cross.svg';

import styles from './Modal.module.css';

export interface iModalContentProps {
    close: Function;
}

interface iModalProps {
    content: React.FC<iModalContentProps>;
    button: JSX.Element;
}

const Modal: React.FC<iModalProps> = ({content, button}) => {
    const [isOpened, setIsOpened] = useState(false);
    const Content: React.FC<iModalContentProps> = content;

    return (
        <>
            <a onClick={() => {setIsOpened(true)}}>{button}</a>
            {isOpened &&
                <div className={styles.wrapper}>
                    <div className={styles.overlay} onClick={() => {setIsOpened(false)}}></div>
                    <div className={styles.modal}>
                        <img src={cross} alt={"Закрыть"} onClick={() => {setIsOpened(false)}} className={styles.cross}/>
                        <Content close={()=>{setIsOpened(false)}}/>
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;
