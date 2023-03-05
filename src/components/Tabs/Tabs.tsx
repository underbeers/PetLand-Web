import React from 'react';

import styles from './Tabs.module.css';


type TabsProps = {children: Array<JSX.Element>};

const Tabs: React.FC<TabsProps> = ({children}) => {
    return (
        <div className={styles.tabs}>
            {children}
        </div>
    );
};

export default Tabs;
