import React, {useState} from 'react';

import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Icons from "../UIKit/Icons";

import styles from './TopBar.module.css';


interface iTopBarProps {
    children: React.ReactNode;
    leftButton: 'burger' | 'arrow';
}


const TopBar: React.FC<iTopBarProps> = ({children, leftButton}) => {
    const [openedBurger, setOpenedBurger] = useState(false);
    const toggleBurger = () => setOpenedBurger(!openedBurger);

    return (
        <div className={styles.bar}>
            {leftButton === 'burger' ?
                <>
                    <Icons icon={"burger"} onClick={toggleBurger} className={styles.icon__left}/>
                    <BurgerMenu openedBurger={openedBurger} toggleBurger={toggleBurger}/>
                </> :
                <>
                    <Icons icon={"arrow-left"} onClick={() => {}} className={styles.icon__left}/>
                </>
            }
            {children}
        </div>
    )
}

export default TopBar;
