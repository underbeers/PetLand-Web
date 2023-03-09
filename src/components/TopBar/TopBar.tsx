import React from 'react';

import styles from './TopBar.module.css';

interface iTopBarProps {
    children: React.ReactNode;
}


const TopBar: React.FC<iTopBarProps> = ({children}) => {
    return (
        <div className={styles.bar}>
            {children}
        </div>
    )
}

export default TopBar;
