import React from 'react';
import cn from 'classnames';

import styles from './Button.module.css';


interface iButtonProps {
    onClick: Function,
    label: string,
    size: 'small' | 'medium',
    color: 'orange' | 'green',
    type: 'fill' | 'transparent',
    disabled?: boolean,
    loading?: boolean
}

const Button: React.FC<iButtonProps> = ({onClick, label, size, color, type, disabled, loading}) => {
    return (
        <button disabled={disabled || loading}
                className={cn(styles.button, styles[size], styles[color], styles[type])}
                onClick={event => {event.preventDefault();onClick()}}>
            {label}{loading && <div className={styles.loading_spinner}/>}
        </button>
    );
};

export default Button;
