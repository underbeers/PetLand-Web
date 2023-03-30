import React, {useState} from 'react';
import cn from 'classnames';

import {RegExpPair} from '../../constants/regularExpressions';

import styles from './Input.module.css';
import Icons from './Icons';


interface iInputProps {
    label?: string;
    help?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    type: 'text' | 'password' | 'textarea' | 'email' | 'phone' | 'number' | 'dropdown' | 'date' | 'file' | 'search';
    value: { value: string, ok: boolean, edited: boolean };
    setValue: (value: { value: string, ok: boolean, edited: boolean }) => void;
    onChangeFn?: Function;
    regularExpressions?: Array<RegExpPair>;
    dropdownItems?: Array<String>;
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
                                          dropdownItems,
                                          className
                                      }) => {
    const [pwdShown, setPwdShown] = useState(false);
    const [regExpErrorMsg, setRegExpErrorMsg] = useState('');

    const checkRegularExpression = (value: string): string => {
        if (required && (value == '')) {
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

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {

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

    const onFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const regExpMsg = checkRegularExpression(event.target.value);
        value.value = event.target.value;
        value.ok = regExpMsg == '';
        value.edited = true;
        value.ok = regExpMsg == '';
        setValue(value);
        setRegExpErrorMsg(regExpMsg);
    }

    const inputProps = {onChange, onFocus, disabled, placeholder};

    const id = Math.random();
    const renderInput: () => JSX.Element = () => {
        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        className={cn('primary__text', styles.standard_input)}
                        {...inputProps}
                    />
                );
            case 'dropdown':
                return (
                    <>
                        <input
                            list={`${styles.data}${id}`}
                            type={pwdShown ? 'text' : type}
                            className={cn('primary__text', styles.standard_input)}
                            {...inputProps}
                            onKeyDown={onKeyDown}
                        />
                        <datalist id={`${styles.data}${id}`} className={styles.dropdown__datalist}>
                            {dropdownItems?.map((value, index) => (<option key={index} value={value.toString()}/>))}
                        </datalist>
                    </>
                );
            default:
                return (
                    <>
                        {type === 'search' && <Icons icon={'search-rounded'} className={styles.search__icon} />}
                        <input
                            type={pwdShown ? 'text' : type}
                            className={cn('primary__text', styles.standard_input)}
                            {...inputProps}
                            onKeyDown={onKeyDown}
                        />
                        {type == 'password' &&
                            <Icons icon={pwdShown ? 'eye' : 'eye-slash'} className={styles.icon} onClick={() => {
                                setPwdShown(!pwdShown)
                            }}/>}
                    </>
                );
        }
    }

    return (
        <label className={cn(styles.input_container, className)}>
            {label &&
                <h5 className={styles.label}>{label}{required && <span className={styles.error__message}>*</span>}</h5>}
            <span className={cn(styles.input, regExpErrorMsg && styles.error__input)}>
                {renderInput()}
            </span>
            {(regExpErrorMsg || help) &&
                <p className={cn('secondary__text-2', styles.help, regExpErrorMsg && styles.error__message)}>{regExpErrorMsg || help}</p>
            }
        </label>
    );
};

export default Input;
