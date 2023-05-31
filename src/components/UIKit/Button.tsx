import React from 'react';
import cn from 'classnames';

import styles from './Button.module.css';


interface iButtonProps {
    type: 'primary' | 'secondary' | 'text',
    color: 'orange' | 'green';
    text: string,
    onClick: Function,
    disabled?: boolean,
    loading?: boolean,
    className?: string
}

const Button: React.FC<iButtonProps> = ({type, color, text, onClick, disabled, loading, className}) =>
    <button disabled={disabled}
            className={cn(styles.button, styles[color], styles[type], loading && styles.loading, className)}
            onClick={event => {
                event.preventDefault();
                onClick()
            }}>
        {text}{loading && <div className={styles.loading_spinner}/>}
    </button>;

export default Button;
