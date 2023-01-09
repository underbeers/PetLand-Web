import React, {useState} from 'react';

import styles from './Input.module.css';
import cn from "classnames";
import header from "../Header/Header";

import showPwd from './img/showPwd.svg';
import hidePwd from './img/hidePwd.svg';

interface iInputProps {
    type: "text" | "password" | "textarea" | "email" | "phone",
    placeholder?: string,
    width: string,
    height?: string,
    setValue: Function
}

const Input: React.FC<iInputProps> = ({type, placeholder, width, height, setValue}) => {
    const [pwdShown, setPwdShown] = useState(false);
    switch (type) {
        case "textarea":
            return (
                <textarea
                    className={cn(styles.input)}
                    style={{width: `calc(${width} - 40px)`, height: `calc(${height} - 24px)`}}
                    placeholder={placeholder}
                    onChange={event => {setValue(event.target.value)}}/>
            );
        case "password":
            return (
                <span style={{position: "relative", display: "inline-flex", alignItems: "center"}}>
                    <input className={cn(styles.input, styles[type])}
                           style={{width: `calc(${width} - 60px)`}}
                           type={pwdShown ? "text" : type}
                            placeholder={placeholder}
                            onChange={event => {setValue(event.target.value)}}/>
                    <img
                        className={styles.showHidePwd}
                        src={pwdShown ? hidePwd : showPwd}
                        onClick={() => {setPwdShown(!pwdShown)}}
                        alt={""}/>
                </span>
            );
        default:
            return (
                <input
                    className={cn(styles.input)}
                    style={{width: `calc(${width} - 40px)`}}
                    type={type}
                    placeholder={placeholder}
                    onChange={event => {setValue(event.target.value)}}/>
            );
    }
};

export default Input;
