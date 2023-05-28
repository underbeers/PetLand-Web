import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useUserContext} from '../../contexts/userContext';

import {useIsMobileContext} from '../../contexts/isMobileContext';
import petService from '../../services/petService';
import {getAge} from '../../components/PetCard/PetCard';

import Chips from '../../components/UIKit/Chips';
import Icons from '../../components/UIKit/Icons';
import Button from '../../components/UIKit/Button';
import TopBar from '../../components/TopBar/TopBar';
import Slider from '../../components/Slider/Slider';
import Gallery from '../../components/Gallery/Gallery';

import styles from './PetPage.module.css'


export interface iPetInfo {
    birthDate: string,
    breed: string,
    breedID: number,
    care: string,
    color: string,
    gender: string,
    id: number,
    male: boolean,
    pedigree: string,
    petCharacter: string,
    petName: string,
    petType: string,
    petTypeID: number,
    photos: Array<{original: string, thumbnail: string}>,
    sterilization: boolean,
    userID: string,
    vaccinations: boolean
}

const PetPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const userID = searchParams.get('user-id') || '';
    const petID = searchParams.get('pet-id') || '';

    const {user, setUser} = useUserContext();
    const isMobile = useIsMobileContext();

    const [info, setInfo] = useState<iPetInfo>({
        petName: '', photos: [], petType: '', userID: '', petCharacter: '', breed: '', id: -1,
        breedID: -1, care: '', petTypeID: -1, color: '', gender: '',
        male: false, pedigree: '', birthDate: '', sterilization: false, vaccinations: false
    });

    const navigate = useNavigate();
    const handleGoBack: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const load = async () => {
        petService.getFullPetCard(userID, petID).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
            }
        }).then(body => {
            //console.log(body);
            setInfo(body[0]);
        });
    };

    useEffect(() => {
        load();
    }, []);

    const chips = (
        <div className={styles.chips}>
            <Chips color={'green'} size={'medium'} label={info.petType}/>
            <Chips color={'green'} size={'medium'} label={info.gender}/>
            <Chips color={'green'} size={'medium'} label={info.breed}/>
            <Chips color={'green'} size={'medium'} label={getAge(info.birthDate)}/>
        </div>
    );

    return (
        <>
            {!isMobile ?
                <>
                    <div className={styles.back__name__button}>
                        <div className={styles.arrow__container} onClick={handleGoBack}>
                            <Icons icon={'arrow-left'} className={styles.arrow__back}/>
                        </div>
                        <h2 className={styles.name}>{info.petName}</h2>
                        {userID === user.userID && <Button color={'orange'} type={'secondary'} onClick={() => {
                        }} text={'Редактировать страницу'}/>}

                    </div>
                    {chips}
                </>
                :
                <TopBar leftButton={'arrow'}>
                    <h5>{info.petName}</h5>
                    <Icons icon={'share'}/>
                    {userID === user.userID ? <Icons icon={'edit'}/> : <Icons icon={'dots-vertical'}/>}
                </TopBar>
            }
            <div className={styles.photo__info}>
                {!isMobile ? <Gallery items={info.photos}/> :
                    <div className={styles.slider__name}>
                        <Slider slides={info.photos.map(photo => photo.original)}/>
                        <h2>{info.petName}</h2>
                        {chips}
                    </div>}
                <div className={styles.full__info}>
                    {userID !== user.userID && <div className={styles.owner__info}>
                        <div className={styles.owner}>
                            <h5>Владелец:</h5>
                            <a href={'#'}>Имя Фамилия</a>
                            <div className={styles.stars}>
                                <Icons icon={'round-star'} className={styles.star}/>
                                <Icons icon={'round-star'} className={styles.star}/>
                                <Icons icon={'round-star'} className={styles.star}/>
                                <Icons icon={'round-star'} className={styles.star}/>
                                <Icons icon={'round-star'} className={styles.star}/>
                            </div>
                        </div>

                        <Button color={'orange'} type={'primary'} text={'Написать'} onClick={() => {
                        }} className={styles.button__text}/>
                    </div>}

                    <div className={styles.description}>
                        {info.color ?
                            <div className={styles.color}>
                                <h5>Окрас:</h5>
                                <p className={'primary__text'}>{info.color}</p>
                            </div> :
                        userID === user.userID &&
                            <div className={styles.color}>
                                <h5>Окрас:</h5>
                                <p className={'primary__text'}>Описание окраса не добавлено. Добавьте его в
                                    редактировании страницы.</p>
                            </div>
                        }
                        {info.care ?
                            <div className={styles.care}>
                                <h5>Особенности ухода:</h5>
                                <p className={'primary__text'}>{info.care}</p>
                            </div> :
                            userID === user.userID &&
                            <div className={styles.care}>
                                <h5>Особенности ухода:</h5>
                                <p className={'primary__text'}>Описание ухода не добавлено. Добавьте его в
                                    редактировании страницы.</p>
                            </div>
                        }
                        {info.pedigree ?
                            <div className={styles.pedigree}>
                                <h5>Родословная:</h5>
                                <p className={'primary__text'}>{info.pedigree}</p>
                            </div> :
                            userID === user.userID &&
                            <div className={styles.pedigree}>
                                <h5>Родословная:</h5>
                                <p className={'primary__text'}>Описание родословной не добавлено. Добавьте его в
                                    редактировании страницы.</p>
                            </div>
                        }
                        {info.petCharacter ?
                            <div className={styles.traits}>
                                <h5>Черты характера:</h5>
                                <p className={'primary__text'}>{info.petCharacter}</p>
                            </div> :
                            userID === user.userID &&
                            <div className={styles.traits}>
                                <h5>Черты характера:</h5>
                                <p className={'primary__text'}>Описание характера не добавлено. Добавьте его в
                                    редактировании страницы.</p>
                            </div>
                        }
                    </div>
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
        </>
    );
};

export default PetPage;
