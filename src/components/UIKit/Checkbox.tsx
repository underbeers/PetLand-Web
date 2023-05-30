import React from 'react';
import cn from 'classnames';

import Icons from './Icons';

import styles from './Checkbox.module.css';


interface iCheckboxProps {
    children: React.ReactNode;
    isChecked: boolean;
    setChecked: (isChecked: boolean) => void;
    required?: boolean;
    disabled?: boolean;
}

const Checkbox: React.FC<iCheckboxProps> = ({children, isChecked, setChecked, required = false, disabled = false}) =>
    <label className={cn(styles.checkbox, isChecked && styles.checked, disabled && styles.disabled)}>
        <Icons icon={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} className={styles.checkbox__icon}
               onClick={() => !disabled && setChecked(!isChecked)}/>
        <span className={'primary__text'}>{children}{required && <span className={styles.required}>*</span>}</span>
    </label>;

export default Checkbox;
