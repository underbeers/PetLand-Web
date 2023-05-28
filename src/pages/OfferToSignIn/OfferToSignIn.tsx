import React from 'react';

import {useIsMobileContext} from '../../contexts/isMobileContext';

import Authorization from '../../components/Authorization/Authorization';
import Modal from '../../components/Modal/Modal';
import TopBar from '../../components/TopBar/TopBar';

import cat from './img/cat.png'

import styles from './OfferToSignIn.module.css'


const OfferToSignIn: React.FC = () => {
    const isMobile = useIsMobileContext();

    return (
        <div>
            {isMobile &&
                <TopBar leftButton={'arrow'}>
                    <h5>PetLand</h5>
                </TopBar>
            }
            <div className={styles.wrapper}>
                <div className={styles.text__block}><img src={cat} alt='Кот' className={styles.cat}/></div>
                <div className={styles.text__block}>
                    {!isMobile ?
                        <>
                            <h3 className={styles.text}>Это доступно только <br/> для авторизованных пользователей</h3>
                            <h4 className={styles.text}>
                                <Modal
                                    button={<span className={styles.ref}>Войдите</span>}
                                    content={Authorization}
                                    contentProps={{isFormSignIn: true}}/>
                                &nbsp;или&nbsp;
                                <Modal
                                    button={<span className={styles.ref}>зарегистрируйтесь</span>}
                                    content={Authorization}
                                    contentProps={{isFormSignIn: false}}/>
                                <br/>
                                для полного доступа к функционалу PetLand
                            </h4>
                        </> :
                        <>
                            <h1 className={styles.text}>Это доступно только <br/> для авторизованных пользователей</h1>
                            <h3 className={styles.text}>
                                <Modal
                                    button={<span className={styles.ref}>Войдите</span>}
                                    content={Authorization}
                                    contentProps={{isFormSignIn: true}}/>
                                &nbsp;или&nbsp;
                                <Modal
                                    button={<span className={styles.ref}>зарегистрируйтесь</span>}
                                    content={Authorization}
                                    contentProps={{isFormSignIn: false}}/>
                                <br/>
                                для полного доступа к функционалу PetLand
                            </h3>
                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default OfferToSignIn;
