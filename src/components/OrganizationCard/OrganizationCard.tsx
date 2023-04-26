import React, {useState} from 'react';

import Icons from '../UIKit/Icons';

import styles from './OrganizationCard.module.css';


const OrganizationCard = () => {

    const [isLiked, setIsLiked] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <div className={styles.card}>
            <img className={styles.photo}
                 src={'https://i5.photo.2gis.com/images/branch/58/8162774339773163_2c25.jpg'}
                 alt={'Фото организации'}/>
            <div className={styles.orgInfo}>
                <div className={styles.name__like}>
                    <h5>Названия организации</h5>
                    {isLiked ?
                        <Icons icon={'cards-heart'} className={styles.heart} onClick={(event) => {
                            event.preventDefault();
                            setIsLiked(!isLiked);
                        }}/> : <Icons icon={'cards-heart-outline'} className={styles.heart}
                                      onClick={(event) => {
                                          event.preventDefault();
                                          setIsLiked(!isLiked);
                                      }}/>}
                </div>
                {!isMobile ?
                    <div className={styles.rating__stars}>
                        <Icons icon={'round-star'} className={styles.star}/>
                        <Icons icon={'round-star'} className={styles.star}/>
                        <Icons icon={'round-star'} className={styles.star}/>
                        <Icons icon={'round-star'} className={styles.star}/>
                        <Icons icon={'round-star'} className={styles.star}/>
                    </div> :
                    <div className={styles.star__number}>
                        <Icons icon={'round-star'} className={styles.star}/>
                        <p>4,5</p>
                    </div>
                }

                {!isMobile ?
                    <div className={styles.additional__info}>
                        <p>Тип: </p>
                        <p>Адрес: </p>
                    </div> :
                    <p className={'secondary__text-2'}>Тип:<br/>Ветеринарная клиника</p>
                }
            </div>
        </div>
    )
}
export default OrganizationCard;
