import React, {useState} from 'react';

import styles from './Input.module.css';
import cn from "classnames";

import showPwd from './img/showPwd.svg';
import hidePwd from './img/hidePwd.svg';

interface iInputProps {
    type: "text" | "password" | "textarea" | "email" | "phone"
    placeholder?: string
    width: string
    height?: string
    value: { value: string, ok: boolean, edited: boolean }
    setValue: Function
    onChangeFn?: Function
    regExp: RegExp,
    required: boolean,
    disabled?: boolean
}


const Input: React.FC<iInputProps> = ({
                                          type,
                                          placeholder,
                                          width,
                                          height,
                                          value,
                                          setValue,
                                          onChangeFn,
                                          regExp,
                                          required,
                                          disabled
                                      }) => {
    const [pwdShown, setPwdShown] = useState(false);

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == " ") {
            event.preventDefault();
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeFn && onChangeFn();
        setValue({
            value: event.target.value,
            ok: regExp.test(event.target.value),
            edited: true
        })
    }

    switch (type) {
        case "textarea":
            return (
                <span
                    className={cn(styles.span, value.edited ? required && value.value.length == 0 ? styles.empty : (value.ok ? "" : styles.wrong) : "")}>
                    <textarea
                        disabled={disabled}
                        className={cn(styles.input)}
                        style={{width: `calc(${width} - 40px)`, height: `calc(${height} - 24px)`}}
                        placeholder={placeholder}
                        onChange={onChange}/>
                </span>
            );
        case "password":
            return (
                <span
                    className={cn(styles.span, value.edited ? required && value.value.length == 0 ? styles.empty : (value.ok ? "" : styles.wrong) : "")}
                    style={{position: "relative", display: "inline-flex", alignItems: "center"}}>
                    <input
                        disabled={disabled}
                        className={cn(styles.input, styles[type])}
                        style={{width: `calc(${width} - 60px)`}}
                        type={pwdShown ? "text" : type}
                        placeholder={placeholder}
                        onChange={onChange}
                        onFocus={() => {
                            setValue({value: value.value, ok: value.ok, edited: true})
                        }}
                        onKeyDown={onKeyDown}/>
                    <img
                        className={styles.showHidePwd}
                        src={pwdShown ? hidePwd : showPwd}
                        onClick={() => {
                            setPwdShown(!pwdShown)
                        }}
                        alt={""}/>
                </span>
            );
        default:
            return (
                <span
                    className={cn(styles.span, value.edited ? required && value.value.length == 0 ? styles.empty : (value.ok ? "" : styles.wrong) : "")}>
                    <input
                        disabled={disabled}
                        className={cn(styles.input)}
                        style={{width: `calc(${width} - 40px)`}}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        onFocus={() => {
                            setValue({value: value.value, ok: value.ok, edited: true})
                        }}
                        onKeyDown={onKeyDown}/>
                </span>
            );
    }
};

export default Input;
