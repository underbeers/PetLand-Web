import React, {useState} from 'react';
import cn from 'classnames';

import Icons from './Icons';

import styles from './Radio.module.css';


interface iRadioProps {
    children: React.ReactNode;
    isChecked: boolean;
    setChecked: (isChecked: boolean) => void;
}

const Radio: React.FC<iRadioProps> = ({
                                          children,
                                          isChecked,
                                          setChecked,
                                      }) => {
    return (
        <label className={cn(styles.radiobox, isChecked && styles.checked)}>
            <Icons icon={isChecked ? 'radio-button-marked' : 'radio-button-blank'}
                   onClick={()=>{setChecked(!isChecked)}}
                   className={styles.radio__icon}/>
            <span className={'text'}>{children}</span>
        </label>
    )
}
export default Radio;