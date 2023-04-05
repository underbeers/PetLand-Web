import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import petService from '../../services/petService';
import {UserContext} from '../../userContext';
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
    photo: string,
    sterilization: boolean,
    userID: string,
    vaccinations: boolean
}

const PetPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const userID = searchParams.get('user-id') || '';
    const petID = searchParams.get('pet-id') || '';

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    const [info, setInfo] = useState<iPetInfo>({
        petName: '', photo: '', petType: '', userID: '', petCharacter: '', breed: '', id: -1,
        breedID: -1, care: '', petTypeID: -1, color: '', gender: '',
        male: false, pedigree: '', birthDate: '', sterilization: false, vaccinations: false
    });

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
                    <div className={styles.name__button}>
                        <h2>{info.petName}</h2>
                        <Button color={'orange'} type={'secondary'} onClick={() => {
                        }} text={'Редактировать страницу'}/>
                    </div>
                    {chips}
                </>
                :
                <TopBar leftButton={'arrow'}>
                    <h5>{info.petName}</h5>
                    <Icons icon={'share'}/>
                    <Icons icon={'dots-vertical'}/>
                </TopBar>
            }
            <div className={styles.photo__info}>
                {!isMobile ? <Gallery items={[{thumbnail: info.photo, original: info.photo}, {
                        thumbnail: info.photo,
                        original: info.photo
                    }]}/> :
                    <div className={styles.slider__name}>
                        <Slider slides={[info.photo, info.photo]}/>
                        <h2>{info.petName}</h2>
                        {chips}
                    </div>}
                <div className={styles.full__info}>
                    <div className={styles.description}>
                        <div className={styles.color}>
                            <h5>Окрас:</h5>
                            <p className={'primary__text'}>{info.color}</p>
                        </div>
                        <div className={styles.care}>
                            <h5>Особенности ухода:</h5>
                            <p className={'primary__text'}>{info.care}</p>
                        </div>
                        <div className={styles.pedigree}>
                            <h5>Родословная:</h5>
                            <p className={'primary__text'}>{info.pedigree}</p>
                        </div>
                        <div className={styles.traits}>
                            <h5>Черты характера:</h5>
                            <p className={'primary__text'}>{info.petCharacter}</p>
                        </div>
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
