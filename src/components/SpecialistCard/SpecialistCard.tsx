import React from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import {useIsMobileContext} from '../../contexts/isMobileContext';

import Stars from '../Stars/Stars';

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
    const isMobile = useIsMobileContext();

    return (
        <NavLink target={'_blank'} to={`/services/specialists/specialist?id=${id}`} className={styles.card}>
            <img className={styles.photo} src={photo} alt={'Фото специалиста'}/>
            <div className={styles.specInfo}>
                <div className={styles.name__like}>
                    <h5>{name}</h5>
                </div>
                {!isMobile ?
                    <Stars rating={rating}/>
                    :
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
                        <div className={styles.info__row}><p
                            className={cn('secondary__text-1', styles.title)}>Стаж: </p>
                            <p className={cn('secondary__text-1', styles.data)}>{experience}</p></div>
                        <div className={styles.info__row}><p
                            className={cn('secondary__text-1', styles.title)}>Животные: </p> <p
                            className={cn('secondary__text-1', styles.data)}>{pets}</p></div>
                    </div>
                    :
                    <p className={'secondary__text-2'}>Специальность:<br/>{speciality}</p>
                }
            </div>
        </NavLink>
    );
};

export default SpecialistCard;
