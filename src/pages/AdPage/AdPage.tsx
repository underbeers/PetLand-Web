import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import {useUserContext} from '../../contexts/userContext';
import {useIsMobileContext} from '../../contexts/isMobileContext';
import AdvertService from '../../services/advertService';
import FavoritesService from '../../services/favoritesService';
import {getAge} from '../../components/PetCard/PetCard';
import {prettyAdPrice, prettyPublicationTime, UserInfoType} from '../../components/AdCard/AdCard';

import Chips from '../../components/UIKit/Chips';
import Icons from '../../components/UIKit/Icons';
import Button from '../../components/UIKit/Button';
import TopBar from '../../components/TopBar/TopBar';
import Slider from '../../components/Slider/Slider';
import Gallery from '../../components/Gallery/Gallery';

import styles from './AdPage.module.css'
import UserService from "../../services/userService";

export type AdInfoType = {
    birthDate: string,
    breed: string,
    care: string,
    chat: boolean,
    city: string,
    color: string,
    description: string,
    district: string,
    favoritesID: number,
    gender: string,
    id: number,
    inFavorites: string,
    pedigree: string,
    petCardID: number,
    petCharacter: string,
    petName: string,
    petType: string,
    phone: string,
    photos: Array<{
        original: string,
        thumbnail: string
    }>,
    price: number,
    publication: string,
    status: string,
    sterilization: boolean,
    userID: string,
    vaccinations: boolean,
}

const AdPage = () => {
    const [color, setColor] = useState(false);
    const [care, setCare] = useState(false);
    const [pedigree, setPedigree] = useState(false);
    const [traits, setTraits] = useState(false);

    const {user, setUser} = useUserContext();
    const isMobile = useIsMobileContext();

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id') || '';

    const [info, setInfo] = useState<AdInfoType>();
    const [userInfo, setUserInfo] = useState<UserInfoType>();

    useEffect(() => {
        if (user.empty) {
            AdvertService.getFullAdvert(id).then(response => {
                switch (response.status) {
                    case 200:
                        return response.json();
                    default:
                        return null;
                }
            }).then((body: AdInfoType) => {
                //console.log(body);
                if (body) {
                    setInfo(body);
                }
            });
        } else {
            AdvertService.getAuthorizedFullAdvert(id, user.accessToken).then(response => {
                switch (response.status) {
                    case 200:
                        return response.json();
                    default:
                        return null;
                }
            }).then((body: AdInfoType) => {
                //console.log(body);
                if (body) {
                    setInfo(body);
                }
            });
        }
    }, [user]);

    useEffect(() => {
        if (!info) {
            return;
        }
        UserService.getUserInfoByID(`?userID=${info.userID}`).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    return null;
            }
        }).then(body => {
            if (body) {
                setUserInfo(body);
            }
        })
    }, [info]);

    if (!info) {
        return <></>;
    }

    return (
        <div>
            {!isMobile ?
                <>
                    <div className={styles.back__name__price}>
                        <h1 className={styles.name}>{info.petName}</h1>
                        <h1>{prettyAdPrice(info.price)}</h1>
                    </div>
                    <div className={styles.chips}>
                        <Chips color={'green'} size={'medium'} label={info.petType}/>
                        <Chips color={'green'} size={'medium'} label={info.gender}/>
                        <Chips color={'green'} size={'medium'} label={info.breed}/>
                        <Chips color={'green'} size={'medium'} label={getAge(info.birthDate)}/>
                    </div>
                </>
                :
                <TopBar leftButton={'burger'}>
                    <h5>{info.petName}</h5>
                    {!user.empty &&
                        <Icons icon={info.inFavorites ? 'cards-heart' : 'cards-heart-outline'}
                               className={styles.heart}
                               onClick={(e) => {
                                   e.preventDefault();
                                   setTimeout(() => setUser({...user}), 100);
                                   if (info.inFavorites) {
                                       FavoritesService.deleteFromFavorites({id: info.favoritesID}, user.accessToken);
                                   } else {
                                       FavoritesService.addToFavorites({
                                           type: 'advert',
                                           id: info.id
                                       }, user.accessToken);
                                   }
                               }}
                        />
                    }
                    {info.userID === user.userID && <Icons icon={'edit'}/>}
                </TopBar>
            }
            <div className={styles.photo__info}>
                {!isMobile ? <Gallery items={info.photos}/> :
                    <div className={styles.slider__name}>
                        <Slider slides={info.photos.map(photo => photo.original)}/>
                        <div className={styles.name__price}>
                            <h2>{info.petName}</h2>
                            <h4>{prettyAdPrice(info.price)}</h4>
                        </div>
                        <div className={styles.chips}>
                            <Chips color={'green'} size={'medium'} label={info.petType}/>
                            <Chips color={'green'} size={'medium'} label={info.gender}/>
                            <Chips color={'green'} size={'medium'} label={info.breed}/>
                            <Chips color={'green'} size={'medium'} label={getAge(info.birthDate)}/>
                        </div>
                    </div>}
                {!isMobile && <div className={styles.owner__info}>
                    <div className={styles.owner}>
                        {userInfo &&
                            <>
                                <h5>Владелец:</h5>
                                <p>{userInfo.firstName} {userInfo.surName}</p>
                            </>
                        }
                    </div>
                    <div className={styles.text__like}>
                        {info.userID != user.userID && userInfo &&
                            <Button color={'orange'} type={'primary'} text={'Написать'}
                                    onClick={() => navigate(`/messenger?chat=${userInfo.chatID}`)}
                                    className={styles.button__text}/>
                        }
                        <div className={styles.heart__container}>
                            {!user.empty &&
                                <Icons icon={info.inFavorites ? 'cards-heart' : 'cards-heart-outline'}
                                       className={styles.heart}
                                       onClick={(e) => {
                                           e.preventDefault();
                                           setTimeout(() => setUser({...user}), 100);
                                           if (info.inFavorites) {
                                               FavoritesService.deleteFromFavorites({id: info.favoritesID}, user.accessToken);
                                           } else {
                                               FavoritesService.addToFavorites({
                                                   type: 'advert',
                                                   id: info.id
                                               }, user.accessToken);
                                           }
                                       }}
                                />
                            }
                        </div>
                    </div>
                    <div className={styles.date__address}>
                        <div className={styles.date}>
                            <h5>Дата публикации:</h5>
                            <p>{prettyPublicationTime(info.publication).date}</p>
                        </div>
                        <div className={styles.address}>
                            <h5>Адрес:</h5>
                            <p>г. {info.city}, {info.district} р-н</p>
                        </div>
                    </div>
                </div>}
            </div>
            <div className={styles.pet__info}>
                <div className={styles.column}>
                    <div className={styles.info__piece}>
                        <h5>Описание:</h5>
                        <p>{info.description}</p>
                    </div>
                    {color && <div className={styles.info__piece}>
                        <h5>Окрас:</h5>
                        <p className={'primary__text'}>{info.color}</p>
                    </div>}
                    {care && <div className={styles.info__piece}>
                        <h5>Особенности ухода:</h5>
                        <p className={'primary__text'}>{info.care}</p>
                    </div>}
                </div>
                <div className={styles.column}>
                    {pedigree && <div className={styles.pedigree}>
                        <h5>Родословная:</h5>
                        <p className={'primary__text'}>{info.pedigree}</p>
                    </div>}
                    {traits && <div className={styles.info__piece}>
                        <h5>Черты характера:</h5>
                        <p className={'primary__text'}>{info.petCharacter}</p>
                    </div>}
                    <div className={styles.sterilization__vaccination}>
                        <div className={styles.info__check}>
                            <Icons icon={info.sterilization ? 'check' : 'cross'} className={styles.icon}/>
                            <h5>Стерилизация</h5>
                        </div>
                        <div className={styles.info__check}>
                            <Icons icon={info.vaccinations ? 'check' : 'cross'} className={styles.icon}/>
                            <h5>Прививки</h5>
                        </div>
                    </div>
                </div>
            </div>
            {isMobile && <div className={styles.owner__info}>
                <div className={styles.owner}>
                    <h5>Владелец:</h5>
                    <a href={'#'}>{info.userID}</a>
                </div>
                <div className={styles.text__like}>
                    <Button color={'orange'} type={'primary'} text={'Написать'} onClick={() => {
                    }} className={styles.button__text}/>
                    <div className={styles.heart__container}>
                        {!user.empty &&
                            <Icons icon={info.inFavorites ? 'cards-heart' : 'cards-heart-outline'}
                                   className={styles.heart}
                                   onClick={(e) => {
                                       e.preventDefault();
                                       setTimeout(() => setUser({...user}), 100);
                                       if (info.inFavorites) {
                                           FavoritesService.deleteFromFavorites({id: info.favoritesID}, user.accessToken);
                                       } else {
                                           FavoritesService.addToFavorites({
                                               type: 'advert',
                                               id: info.id
                                           }, user.accessToken);
                                       }
                                   }}
                            />
                        }
                    </div>
                </div>
                <div className={styles.date__address}>
                    <div className={styles.date}>
                        <h5>Дата публикации:</h5>
                        <p>{prettyPublicationTime(info.publication).date}</p>
                    </div>
                    <div className={styles.address}>
                        <h5>Адрес:</h5>
                        <p>г. {info.city}, {info.district} р-н</p>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default AdPage;
