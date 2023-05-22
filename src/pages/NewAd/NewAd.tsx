import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {UserContext} from '../../contexts/userContext';
import petService from '../../services/petService';
import AdvertService from '../../services/advertService';
import {withOfferToSignIn} from '../../hoc/withOfferToSignIn';
import {iPetAdCardProps} from '../../components/PetAdCard/PetAdCard';

import TopBar from '../../components/TopBar/TopBar';
import PetAdCard from '../../components/PetAdCard/PetAdCard';

import Button from '../../components/UIKit/Button';
import Input from '../../components/UIKit/Input';
import Checkbox from '../../components/UIKit/Checkbox';
import Radio from '../../components/UIKit/Radio';

import styles from './NewAd.module.css';


const PRICES_RADIO = [
    {id: 0, value: 'Фиксированная'},
    {id: 1, value: 'Бесплатно'},
    {id: 2, value: 'Договорная'},
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
    useEffect(() => {
        if (user.empty) {
            return;
        }
        petService.getShortPetCards(user.userID).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    return null;
            }
        }).then(body => {
            //console.log(body);
            if (body) {
                setPets(body);
            }
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

    const createAd = () => {
        document.querySelectorAll('#new_ad_form input').forEach(el => {
            // @ts-ignore
            el.focus();
        });
        document.querySelectorAll('#new_ad_form textarea').forEach(el => {
            // @ts-ignore
            el.focus();
        });
        let isOk: boolean = true;

        const inputs = [
            {state: description, setState: setDescription},
            {state: city, setState: setCity},
            {state: district, setState: setDistrict},
        ];

        inputs.forEach(({state, setState}) => {
            if (!state.ok) {
                isOk = false;
            }
        });

        if (!isOk) {
            console.log('Field validation error')
            return;
        }

        const selectedCity = cities.find(city_ => city_.city == city.value);
        if (!selectedCity) {
            console.log('Wrong city');
            return;
        }
        const selectedDistrict = districts.find(district_ => district_.district == district.value && district_.cityID == selectedCity.id);
        if (!selectedDistrict) {
            console.log('Wrong district');
            return;
        }

        let params: {
            petCardID: number, price: number, description: string, cityID: number,
            districtID: number, chat: boolean, phone?: string
        } = {
            petCardID: Number(selectedPet),
            price: selectedRadio == 2 ? (-1) : (selectedRadio == 1 ? 0 : Number(price.value)),
            description: description.value,
            cityID: selectedDistrict.cityID,
            districtID: selectedDistrict.id,
            chat
        };
        if (phoneCheck) {
            params.phone = phoneNumber.value;
        }
        AdvertService.createAdvert(params, user.accessToken).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
                case 400:
                    response.json().then(body => {
                        alert(body.message);
                    })
                    return null;
                default:
                    return null;
            }
        }).then(body => {
            if (body) {
                //console.log(body);
                navigate('/bulletin-board');
            }
        });
    }

    return (
        <>
            {isMobile && <TopBar leftButton={'burger'}>
                <h5>Создание нового объявления</h5>
            </TopBar>}
            <form id={'new_ad_form'} className={styles.form}>
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
                        {!isMobile ? <h3>2. Цена (₽)</h3> : <h5>2. Цена (₽)</h5>}
                        <div className={styles.price__selectors}>
                            <Input type={'number'} value={price} setValue={setPrice} placeholder={'Введите цену'}
                                   className={styles.price__input} disabled={selectedRadio !== 0}/>
                            <div className={styles.radio__container}>
                                {PRICES_RADIO.map((v, i) => {
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
                                       placeholder={'Начните вводить название...'}
                                       dropdownItems={cities.map(city => city.city)}
                                       className={styles.city__input} required={true}/>
                                <Input type={'dropdown'} value={district} setValue={setDistrict} label={'Район'}
                                       placeholder={'Начните вводить название...'} className={styles.district__input}
                                       dropdownItems={getCityDistricts(city.value).map(district => district.district)}
                                       required={true}/>
                            </div>
                        </div>

                        <div className={styles.select__communication}>
                            {!isMobile ? <h3>5. Предпочитаемый способ связи</h3> :
                                <h5>5. Способ связи</h5>}
                            <div className={styles.communication__inputs}>
                                <Checkbox isChecked={chat} setChecked={setChat}>Внутренний чат
                                    сервиса</Checkbox>
                                <div className={styles.phone__check__input}>
                                    <Checkbox isChecked={phoneCheck} setChecked={setPhoneCheck}>Номер
                                        телефона</Checkbox>
                                    <Input type={'phone'} value={phoneNumber} setValue={setPhoneNumber}
                                           className={styles.phone__input} placeholder={'Номер телефона'}
                                           disabled={!phoneCheck}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.publish}>
                        <Button type={'primary'} text={'Опубликовать'} color={'orange'} onClick={createAd}/>
                    </div>
                </div>
            </form>
        </>
    );
};

export default withOfferToSignIn(NewAd);
