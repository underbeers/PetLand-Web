import React, {useState} from 'react';
import cn from "classnames";

import showPwd from './img/showPwd.svg';
import hidePwd from './img/hidePwd.svg';

import styles from './Input.module.css';

interface iInputProps {
    type: "text" | "password" | "textarea" | "email" | "phone"
    placeholder?: string
    width: string
    height?: string
    value: { value: string, ok: boolean, edited: boolean }
    setValue: Function
    onChangeFn?: Function
    regularExpressions: Array<{ regExp: RegExp, error: string }>,
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
                                          regularExpressions,
                                          required,
                                          disabled
                                      }) => {
    const [pwdShown, setPwdShown] = useState(false);
    const [regExpErrorMsg, setRegExpErrorMsg] = useState("");

    const checkRegularExpression = (value: string): string => {
        if (required && value == "") {
            return "Обязательное поле";
        }
        for (let i = 0; i < regularExpressions.length; i++) {
            if (!regularExpressions[i].regExp.test(value)) {
                return regularExpressions[i].error;
            }
        }
        return "";
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key == " ") {
            event.preventDefault();
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const regExpMsg = checkRegularExpression(event.target.value);
        setValue({
            value: event.target.value,
            ok: regExpMsg == "",
            edited: true
        });
        setRegExpErrorMsg(regExpMsg);
        onChangeFn && onChangeFn();
    }

    const onFocus = () => {
        setValue({value: value.value, ok: value.ok, edited: true});
        setRegExpErrorMsg(checkRegularExpression(value.value));
    }

    const inputProps = {onChange, onFocus, disabled, placeholder};
    const spanProps = {className: cn(styles.span, value.edited && !value.ok ? styles.wrong : "")};

    switch (type) {
        case "textarea":
            return (
                <span {...spanProps}>
                    <div className={styles.error__msg}>{regExpErrorMsg}</div>
                    <textarea
                        className={cn(styles.input)}
                        style={{width: `calc(${width} - 40px)`, height: `calc(${height} - 24px)`}}
                        {...inputProps}
                    />
                </span>
            );
        case "password":
            return (
                <span {...spanProps} style={{position: "relative", display: "inline-flex", alignItems: "center"}}>
                    <div className={styles.error__msg}>{regExpErrorMsg}</div>
                    <input
                        className={cn(styles.input, styles[type])}
                        style={{width: `calc(${width} - 60px)`}}
                        type={pwdShown ? "text" : type}
                        onKeyDown={onKeyDown}
                        {...inputProps}/>
                    <img
                        className={styles.showHidePwd}
                        src={pwdShown ? hidePwd : showPwd}
                        onClick={() => {
                            setPwdShown(!pwdShown)
                        }}
                        title={"Показать/скрыть пароль"}
                        alt={"Показать/скрыть пароль"}/>
                </span>
            );
        default:
            return (
                <span {...spanProps}>
                    <div className={styles.error__msg}>{regExpErrorMsg}</div>
                    <input
                        className={cn(styles.input)}
                        style={{width: `calc(${width} - 40px)`}}
                        type={type}
                        onKeyDown={onKeyDown}
                        {...inputProps}/>
                </span>
            );
    }
};

export default Input;
