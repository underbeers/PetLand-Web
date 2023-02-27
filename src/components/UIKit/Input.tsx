import React, {useState} from 'react';
import cn from 'classnames';

import {RegExpPair} from '../../constants/regularExpressions';

import styles from './Input.module.css';
import Icons from "./Icons";


interface iInputProps {
    label?: string;
    help?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    type: 'text' | 'password' | 'textarea' | 'email' | 'phone' | 'number';
    value: { value: string, ok: boolean, edited: boolean };
    setValue: Function;
    onChangeFn?: Function;
    regularExpressions?: Array<RegExpPair>;
    className?: string;
}

const Input: React.FC<iInputProps> = ({
                                          label,
                                          help,
                                          placeholder,
                                          required = false,
                                          disabled = false,
                                          type,
                                          value,
                                          setValue,
                                          onChangeFn,
                                          regularExpressions,
                                          className
                                      }) => {
    const [pwdShown, setPwdShown] = useState(false);
    const [regExpErrorMsg, setRegExpErrorMsg] = useState('');

    const checkRegularExpression = (value: string): string => {
        if (required && value == '') {
            return 'Обязательное поле';
        }
        if (!regularExpressions) {
            return '';
        }
        for (let i = 0; i < regularExpressions.length; i++) {
            if (!regularExpressions[i].regExp.test(value)) {
                return regularExpressions[i].error;
            }
        }
        return '';
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key == ' ') {
            event.preventDefault();
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const regExpMsg = checkRegularExpression(event.target.value);
        setValue({
            value: event.target.value,
            ok: regExpMsg == '',
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

    return (
        <label className={cn(styles.input_container, className)}>
            {label && <h5 className={styles.label}>{label}{required && <span className={styles.error__message}>*</span>}</h5>}
            <span className={cn(styles.input, regExpErrorMsg && styles.error__input)}>
                {type == 'textarea' ?
                    <textarea
                        className={cn('primary__text', styles.standard_input)}
                        {...inputProps}
                    /> :
                    <input
                        type={pwdShown ? 'text' : type}
                        className={cn('primary__text', styles.standard_input)}
                        {...inputProps}
                        onKeyDown={onKeyDown}
                    />
                }
                {type == 'password' && <Icons icon={pwdShown ? 'eye-slash' : 'eye'} className={styles.icon} onClick={()=>{setPwdShown(!pwdShown)}}/>}
            </span>
            {(regExpErrorMsg || help) &&
                <p className={cn('secondary__text-2', styles.help, regExpErrorMsg && styles.error__message)}>{regExpErrorMsg || help}</p>
            }
        </label>
    );
};

export default Input;
