import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import {useUserContext} from '../../contexts/userContext';
import AdvertService from '../../services/advertService';
import {getAge} from '../../components/PetCard/PetCard';
import {prettyAdPrice, prettyPublicationTime} from '../../components/AdCard/AdCard';

import Chips from '../../components/UIKit/Chips';
import Icons from '../../components/UIKit/Icons';
import Button from '../../components/UIKit/Button';
import TopBar from '../../components/TopBar/TopBar';
import Slider from '../../components/Slider/Slider';
import Gallery from '../../components/Gallery/Gallery';

import styles from './AdPage.module.css'
import {useIsMobileContext} from "../../contexts/isMobileContext";


const AdPage = () => {
    const [color, setColor] = useState(false);
    const [care, setCare] = useState(false);
    const [pedigree, setPedigree] = useState(false);
    const [traits, setTraits] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const isMobile = useIsMobileContext();

    const navigate = useNavigate();
    const handleGoBack: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const {user, setUser} = useUserContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id') || '';

    const [info, setInfo] = useState<{
        birthDate: string,
        breed: string,
        care: string,
        chat: boolean,
        city: string,
        color: string,
        description: string,
        district: string,
        gender: string,
        id: number,
        pedigree: string,
        petCardID: number,
        petCharacter: string,
        petName: string,
        petType: string,
        phone: string,
        photos: Array<{
            original: string,
            thumbnail: string
        }>
        price: number,
        publication: string,
        status: string,
        sterilization: boolean,
        userID: string,
        vaccinations: boolean
    } | null>(null);

    useEffect(() => {
        AdvertService.getFullAdvert(id).then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    return null;
            }
        }).then(body => {
            //console.log(body);
            if (body) {
                setInfo(body);
            }
        });
    }, []);

    if (!info) {
        return <div></div>;
    }

    return (
        <div>
            {!isMobile ?
                <>
                    <div className={styles.back__name__price}>
                        <div className={styles.arrow__container} onClick={handleGoBack}>
                            <Icons icon={'arrow-left'} className={styles.arrow__back}/>
                        </div>
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
                <TopBar leftButton={'arrow'}>
                    <h5>{info.petName}</h5>
                    <Icons icon={'share'}/>
                    {id === user.userID ? <Icons icon={'edit'}/> : !isLiked ?
                        <Icons icon={'cards-heart-outline'} onClick={() => {
                            setIsLiked(!isLiked)
                        }} className={styles.heart__topbar}/> : <Icons icon={'cards-heart'} onClick={() => {
                            setIsLiked(!isLiked)
                        }} className={styles.heart__topbar}/>}
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
                        <h5>Владелец:</h5>
                        <a href={'#'}>{info.userID}</a>
                        <div className={styles.stars}>
                            <Icons icon={'round-star'} className={styles.star}/>
                            <Icons icon={'round-star'} className={styles.star}/>
                            <Icons icon={'round-star'} className={styles.star}/>
                            <Icons icon={'round-star'} className={styles.star}/>
                            <Icons icon={'round-star'} className={styles.star}/>
                        </div>
                    </div>

                    <div className={styles.text__like}>
                        <Button color={'orange'} type={'primary'} text={'Написать'} onClick={() => {
                        }} className={styles.button__text}/>
                        <div className={styles.heart__container} onClick={() => {
                            setIsLiked(!isLiked)
                        }}>
                            {!isLiked ? <Icons icon={'cards-heart-outline'} className={styles.heart}/> :
                                <Icons icon={'cards-heart'} className={styles.heart}/>}
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
                    <div className={styles.stars}>
                        <Icons icon={'round-star'} className={styles.star}/>
                        <Icons icon={'round-star'} className={styles.star}/>
                        <Icons icon={'round-star'} className={styles.star}/>
                        <Icons icon={'round-star'} className={styles.star}/>
                        <Icons icon={'round-star'} className={styles.star}/>
                    </div>
                </div>

                <div className={styles.text__like}>
                    <Button color={'orange'} type={'primary'} text={'Написать'} onClick={() => {
                    }} className={styles.button__text}/>
                    <div className={styles.heart__container} onClick={() => {
                        setIsLiked(!isLiked)
                    }}>
                        {!isLiked ? <Icons icon={'cards-heart-outline'} className={styles.heart}/> :
                            <Icons icon={'cards-heart'} className={styles.heart}/>}
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
