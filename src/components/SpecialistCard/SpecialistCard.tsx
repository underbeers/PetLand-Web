import React, {useState} from 'react';

import Icons from '../UIKit/Icons';

import styles from './SpecialistCard.module.css';


const SpecialistCard = () => {

    const [isLiked, setIsLiked] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <div className={styles.card}>
            <img className={styles.photo}
                 src={'http://phonoteka.org/uploads/posts/2021-05/1622256095_25-phonoteka_org-p-veterinar-art-krasivo-34.jpg'}
                 alt={'Фото специалиста'}/>
            <div className={styles.specInfo}>
                <div className={styles.name__like}>
                    <h5>Имя Фамилия</h5>
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
                        <p>Специальность: </p>
                        <p>Стаж: </p>
                        <p>Животные: </p>
                    </div> :
                    <p className={'secondary__text-2'}>Специальность:<br/>Ветеринар</p>
                }
            </div>
        </div>
    )
}
export default SpecialistCard;
