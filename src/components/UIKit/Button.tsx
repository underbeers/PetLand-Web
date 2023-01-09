import React from 'react';

import styles from './Button.module.css';
import cn from "classnames";

interface iButtonProps {
    onClick: Function,
    label: string,
    size: 'small' | 'medium',
    color: 'orange' | 'green',
    type: 'fill' | 'transparent'
}

const Button: React.FC<iButtonProps> = ({onClick, label, size, color, type}) => {

    console.log(label);
    return (
        <button
            className={cn(styles.button, styles[size], styles[color], styles[type])}
            onClick={event => {onClick()}}
        >{label}</button>
    );

};

export default Button;
