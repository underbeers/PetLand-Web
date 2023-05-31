import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {useUserContext} from '../../../contexts/userContext';
import {useIsMobileContext} from '../../../contexts/isMobileContext';
import UserService from '../../../services/userService';
import PetService from '../../../services/petService';

import PetCard, {iPetCardProps} from '../../../components/PetCard/PetCard';
import Image from '../../../components/Image/Image';
import TopBar from '../../../components/TopBar/TopBar';

import Button from '../../../components/UIKit/Button';

import styles from './UserProfile.module.css';


const UserProfile: React.FC = () => {
    const {user, setUser} = useUserContext();
    const isMobile = useIsMobileContext();

    const navigate = useNavigate();

    const [pets, setPets] = useState<Array<iPetCardProps['petInfo']>>([]);

    useEffect(() => {
        if (user.empty) {
            return;
        }
        PetService.getShortPetCards(user.userID).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
            }
        }).then(body => {
            //console.log(body);
            setPets(body);
        });
    }, [user]);

    const getRegistration = (date: string) => new Date(date)
        .toDateString()
        .split(' ')
        .filter((s, i) => i % 2 != 0)
        .map(s => {
            switch (s) {
                case 'Jan':
                    return 'января';
                case 'Feb':
                    return 'февраля';
                case 'Mar':
                    return 'марта';
                case 'Apr':
                    return 'апреля';
                case 'May':
                    return 'мая';
                case 'Jun':
                    return 'июня';
                case 'Jul':
                    return 'июля';
                case 'Aug':
                    return 'августа';
                case 'Sep':
                    return 'сентября';
                case 'Nov':
                    return 'ноября';
                case 'Dec':
                    return 'декабря';
                default:
                    return s;
            }
        }).join(' ');

    return (
        <>
            {isMobile &&
                <TopBar leftButton={'burger'}>
                    <h5>Профиль</h5>
                </TopBar>
            }
            {!isMobile && <h1>Профиль</h1>}
            <p className={styles.date}>На PetLand с {getRegistration(user.date_registration)}</p>
            {isMobile &&
                <div className={styles.photo__name}>
                    <label>
                        <Image
                            imageProps={{src: user.photo, alt: '', width: '100px', height: '100px'}}
                            borderRadius={'50%'}/>
                        <input
                            hidden={true}
                            type={'file'}
                            id={styles.user_photo}
                            accept={'image/png, image/jpeg'}
                            onChange={(e) => {
                                console.log(e);
                                const fileInput = document.querySelector(`#${styles.user_photo}`);
                                if (!fileInput) {
                                    console.log(styles.user_photo)
                                    return;
                                }
                                const formData = new FormData();
                                // @ts-ignore
                                formData.append('file', fileInput.files[0]);
                                formData.append('accessToken', user.accessToken);
                                // @ts-ignore
                                console.log(formData.get('file'));
                                // @ts-ignore
                                UserService.updateAvatar(formData).then(response => {
                                    console.log(response);
                                    UserService.syncUser(user, setUser);
                                });
                            }}
                        />
                    </label>
                    <h5>{user.firstName}<br/>{user.surName}</h5>
                </div>
            }
            {user.description ?
                <div className={styles.description}>
                    <h5>Описание: </h5>
                    <p>{user.description}</p>
                </div> :
                <div className={styles.description}>
                    <h5>Описание: </h5>
                    <p style={{marginBottom: '8px'}}>Вы еще не добавили описание</p>
                    <Button color={'green'} text={'Настроить профиль'} type={'primary'}
                            onClick={() => navigate('/profile/settings')}/>
                </div>
            }
            <div className={styles.statistic}>
                {pets ?
                    <div className={styles.stat__pets}>
                        <h5 className={styles.title__pets}>Питомцы</h5>
                        <div className={styles.pets__block}>
                            {
                                pets.map((pet, index) =>
                                    <PetCard petInfo={pet} size={'small'} key={index}
                                             url={`/pet?user-id=${user.userID}&pet-id=${pet.id}`}/>)
                            }
                        </div>
                    </div>
                    :
                    <div className={styles.stat__pets}>
                        <h5 className={styles.title__pets}>Питомцы</h5>
                        <p style={{marginBottom: '8px'}}>У вас еще не добавлены питомцы на
                            PetLand</p>
                        <Button color={'orange'} text={'Добавить питомца'} onClick={() => navigate('/new-pet')}
                                type={'primary'}/>
                    </div>
                }
                {
                    //false &&
                    //<div className={styles.statistic__specialist}>
                    //    <div className={styles.rating__reviews}>
                    //        <>
                    //            {
                    //                isRating ?
                    //                    <div className={styles.stat__rating}>
                    //                        <h5>Рейтинг</h5>
                    //                        <div className={styles.stars__reviews}>
                    //                            <div className={styles.stars}>
                    //                                <Icons icon={'round-star'}/>
                    //                                <Icons icon={'round-star'}/>
                    //                                <Icons icon={'round-star'}/>
                    //                                <Icons icon={'round-star'}/>
                    //                                <Icons icon={'round-star'}/>
                    //                            </div>
                    //                            <span>4,0</span>
                    //                            <a href={'#'}>2 отзыва</a>
                    //                        </div>
                    //                        <p>3 завершенных сделки</p>
                    //                    </div>
                    //                    :
                    //                    <div className={styles.stat__rating}>
                    //                        <h5>Рейтинг</h5>
                    //                        <p>Вы еще не совершали сделок</p>
                    //                    </div>
                    //            }
                    //            {isReviews ?
                    //                <div className={styles.reviews}>
                    //                    <h5>Объявления</h5>
                    //                    <a>1 активное объявление</a>
                    //                </div>
                    //                :
                    //                <div className={styles.reviews}>
                    //                    <h5>Объявления</h5>
                    //                    <p>Нет активных объявлений</p>
                    //                </div>
                    //            }
                    //        </>
                    //    </div>
                    //    isSpecialist &&
                    //    <div className={styles.specialist}>
                    //        <h5>Является специалистом</h5>
                    //        <Chips label={'Кинолог'} size={'medium'} color={'grey'}/>
                    //        <a href={'#'} className={styles.to__page__spec}>Страница специалиста</a>
                    //    </div>
                    //</div>
                }
            </div>
        </>
    );
};

export default UserProfile;
