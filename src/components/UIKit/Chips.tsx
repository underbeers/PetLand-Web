import React from 'react';
import cn from 'classnames';

import styles from './Chips.module.css';


interface iChipsProps {
    onClick?: Function,
    label: string,
    size: 'small' | 'medium' | 'large',
    color: 'orange' | 'green' | 'grey'
}

const Chips: React.FC<iChipsProps> = ({label, size, color}) => {
    return (
        <div className={cn(styles.chips, styles[size], styles[color])}>
            {label}
        </div>
    );
};
export default Chips;
