import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Icons from '../UIKit/Icons';

import styles from './TopBar.module.css';


interface iTopBarProps {
    children: React.ReactNode;
    leftButton: 'burger' | 'arrow';
}


const TopBar: React.FC<iTopBarProps> = ({children, leftButton}) => {
    const [openedBurger, setOpenedBurger] = useState(false);
    const toggleBurger = () => setOpenedBurger(!openedBurger);

    const navigate = useNavigate();

    const handleGoBack: React.MouseEventHandler<SVGSVGElement> = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <div className={styles.bar}>
            {leftButton === 'burger' ?
                <>
                    <Icons icon={'burger'} onClick={toggleBurger} className={styles.icon__left}/>
                    <BurgerMenu openedBurger={openedBurger} toggleBurger={toggleBurger}/>
                </> :
                <>
                    <Icons icon={'arrow-left'} onClick={handleGoBack} className={styles.icon__left}/>
                </>
            }
            {children}
        </div>
    );
};

export default TopBar;
