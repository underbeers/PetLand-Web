import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import Icons from '../UIKit/Icons';

import styles from './SpecialistCard.module.css';


interface iSpecialistProps {
    id: string,
    name: string,
    rating: number,
    speciality: string,
    experience: string,
    pets: string,
    city: number,
    place: string,
    phone: string,
    photo: string
}

const SpecialistCard: React.FC<iSpecialistProps> = ({
                                                        id,
                                                        name,
                                                        rating,
                                                        speciality,
                                                        experience,
                                                        pets,
                                                        city,
                                                        place,
                                                        phone,
                                                        photo
                                                    }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <NavLink to={`/services/specialists/specialist?id=${id}`} className={styles.card}>
            <img className={styles.photo}
                 src={photo}
                 alt={'Фото специалиста'}/>
            <div className={styles.specInfo}>
                <div className={styles.name__like}>
                    <h5>{name}</h5>
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
                        <p>{rating}</p>
                    </div>
                }

                {!isMobile ?
                    <div className={styles.additional__info}>
                        <div className={styles.info__row}><p
                            className={cn('secondary__text-1', styles.title)}>Специальность: </p><p
                            className={cn('secondary__text-1', styles.data)}>{speciality}</p></div>
                        <div className={styles.info__row}><p className={cn('secondary__text-1', styles.title)}>Стаж: </p>
                            <p className={cn('secondary__text-1', styles.data)}>{experience}</p></div>
                        <div className={styles.info__row}><p
                            className={cn('secondary__text-1', styles.title)}>Животные: </p> <p
                            className={cn('secondary__text-1', styles.data)}>{pets}</p></div>
                    </div> :
                    <p className={'secondary__text-2'}>Специальность:<br/>{speciality}</p>
                }
            </div>
        </NavLink>
    )
}
export default SpecialistCard;
