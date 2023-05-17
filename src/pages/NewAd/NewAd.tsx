import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../../userContext';
import {useNavigate} from 'react-router-dom';
import petService from '../../services/petService';
import {withOfferToSignIn} from '../../hoc/withOfferToSignIn';
import {iPetAdCardProps} from '../../components/PetAdCard/PetAdCard';

import Button from '../../components/UIKit/Button';
import Input from '../../components/UIKit/Input';
import Checkbox from '../../components/UIKit/Checkbox';
import Radio from '../../components/UIKit/Radio';
import TopBar from '../../components/TopBar/TopBar';
import PetAdCard from '../../components/PetAdCard/PetAdCard';

import styles from './NewAd.module.css';
import AdvertService from "../../services/advertService";


const prices_radio = [
    {id: 0, value: 'Фиксированная'},
    {id: 1, value: 'Договорная'},
    {id: 2, value: 'Бесплатно'},
];

type CityType = {
    city: string;
    id: number;
};

type DistrictType = {
    cityID: number;
    district: string;
    id: number;
};

const NewAd = () => {
    const {user, setUser} = useContext(UserContext);
    const [pets, setPets] = useState(Array<iPetAdCardProps>);
    const navigate = useNavigate();

    const [cities, setCities] = useState<Array<CityType>>([]);
    const [districts, setDistricts] = useState<Array<DistrictType>>([]);

    const getCityDistricts = (cityName: string) => {
        const city = cities.find(city_ => city_.city == cityName);
        if (city) {
            return districts.filter(district => district.cityID == city.id);
        } else {
            return [];
        }
    }

    useEffect(() => {
        AdvertService.getCities().then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    return null;
            }
        }).then(body => {
            if (body) {
                setCities(body);
            }
        });
        AdvertService.getDistricts().then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    return null;
            }
        }).then(body => {
            if (body) {
                setDistricts(body);
            }
        });
    }, []);
    console.log(cities, districts);
    useEffect(() => {
        if (user.empty) {
            return;
        }
        petService.getShortPetCards(user.userID).then(response => {
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

    const initialInputState = {value: '', ok: false, edited: false};
    const [price, setPrice] = useState(initialInputState);
    const [description, setDescription] = useState(initialInputState);
    const [city, setCity] = useState(initialInputState);
    const [district, setDistrict] = useState(initialInputState);
    const [chat, setChat] = useState(true);
    const [phoneCheck, setPhoneCheck] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(initialInputState);
    const [selectedRadio, setSelectedRadio] = useState(0);
    const [selectedPet, setSelectedPet] = useState('');

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700);
    });

    return (
        <>
            {isMobile && <TopBar leftButton={'burger'}>
                <h5>Создание нового объявления</h5>
            </TopBar>}
            <div className={styles.form}>
                {!isMobile && <h1>Создание нового объявления</h1>}
                <div className={styles.selectors}>
                    <div className={styles.select__pet}>
                        {!isMobile ? <h3>1. Выберите питомца</h3> : <h5>1. Выберите питомца</h5>}
                        <div className={styles.pet__cards}>
                            {
                                pets.map((pet, index) =>
                                    <PetAdCard
                                        key={index}
                                        id={pet.id}
                                        petName={pet.petName}
                                        photo={pet.photo}
                                        isSelected={selectedPet === pet.id}
                                        setSelected={() => setSelectedPet(pet.id)}/>
                                )
                            }
                        </div>
                        <div>
                            <Button type={'secondary'} color={'orange'} text={'Добавить питомца'}
                                    onClick={() => navigate('/new-pet')}/>
                        </div>
                    </div>

                    <div className={styles.select__price}>
                        {!isMobile ? <h3>2. Цена</h3> : <h5>2. Цена</h5>}
                        <div className={styles.price__selectors}>
                            <Input type={'number'} value={price} setValue={setPrice} placeholder={'Введите цену'}
                                   className={styles.price__input} disabled={selectedRadio !== 0}/>
                            <div className={styles.radio__container}>
                                {prices_radio.map((v, i) => {
                                    return (
                                        <div
                                            key={i}
                                            onClick={(e) => setSelectedRadio(v.id)}
                                            className={styles.radio__btn + ' ' + (selectedRadio === v.id ? styles.selected : '')}>
                                            <Radio isChecked={selectedRadio === v.id}
                                                   setChecked={() => {
                                                       setSelectedRadio(v.id);
                                                   }}>{v.value}</Radio>
                                        </div>)
                                })}
                            </div>
                        </div>
                        <div className={styles.select__description}>
                            {!isMobile ? <h3>3. Описание</h3> : <h5>3. Описание</h5>}
                            <Input type={'textarea'} value={description} setValue={setDescription}
                                   placeholder={'Введите описание'} required={true}
                                   className={styles.description__input}/>
                        </div>
                        <div className={styles.select__address}>
                            {!isMobile ? <h3>4. Адрес</h3> : <h5>4. Адрес</h5>}
                            <div className={styles.address__inputs}>
                                <Input type={'dropdown'} value={city} setValue={setCity} label={'Город'}
                                       placeholder={'Начните вводить название...'} dropdownItems={cities.map(city => city.city)}
                                       className={styles.city__input} required={true}/>
                                <Input type={'dropdown'} value={district} setValue={setDistrict} label={'Район'}
                                       placeholder={'Начните вводить название...'} className={styles.district__input}
                                       dropdownItems={getCityDistricts(city.value).map(district => district.district)}
                                       required={true}/>
                            </div>
                        </div>

                        <div className={styles.select__communication}>
                            {!isMobile ? <h3>5. Предпочитаемый способ связи</h3> :
                                <h5>5. Предпочитаемый способ связи</h5>}
                            <div className={styles.communication__inputs}>
                                <Checkbox isChecked={chat} setChecked={setChat}>Внутренний чат
                                    сервиса</Checkbox>
                                <div className={styles.phone__check__input}>
                                    <Checkbox isChecked={phoneCheck} setChecked={setPhoneCheck}>Номер
                                        телефона</Checkbox>
                                    <Input type={'phone'} value={phoneNumber} setValue={setPhoneNumber}
                                           className={styles.phone__input} placeholder={'Номер телефона'} disabled={!phoneCheck}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.publish}>
                        <Button type={'primary'} text={'Опубликовать'} color={'orange'} onClick={() => {
                        }}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withOfferToSignIn(NewAd);
