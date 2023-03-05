import React from 'react';

import styles from './Checkbox.module.css';
import Icons from "./Icons";
import cn from "classnames";


interface iCheckboxProps {
    children: React.ReactNode;
    isChecked: boolean;
    setChecked: (isChecked: boolean) => void;
    required?: boolean;
    disabled?: boolean;
}

const Checkbox: React.FC<iCheckboxProps> = ({
                                                children,
                                                isChecked,
                                                setChecked,
                                                required = false,
                                                disabled = false
                                            }) => {
    return (
        <label className={cn(styles.checkbox, isChecked && styles.checked, disabled && styles.disabled)}>
            <Icons icon={isChecked ? 'checkbox-marked' : "checkbox-blank-outline"}
                   onClick={()=>{!disabled && setChecked(!isChecked)}}
                   className={styles.checkbox__icon}/>
            <span className={'primary__text'}>{children}{required && <span className={styles.required}>*</span>}</span>
        </label>
    );
};

export default Checkbox;
