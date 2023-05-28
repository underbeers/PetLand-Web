import React, {useState} from 'react';

import Icons from '../../../components/UIKit/Icons';
import SpecialistCard from '../../../components/SpecialistCard/SpecialistCard';
import TopBar from '../../../components/TopBar/TopBar';

import styles from './Specialists.module.css';
import {useIsMobileContext} from "../../../contexts/isMobileContext";


export const specialists = [
    {
        id: '1',
        name: 'Елена Максимович',
        rating: 4.8,
        speciality: 'ветеринар',
        experience: '8 лет',
        pets: 'собаки и кошки, мелкие домашние животные',
        city: 1,
        place: 'ветеринарный центр «Созвездие»',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683887881/go-cloudinary/Veterinary_clinics_specialists/XXL_samign.webp',
    },
    {
        id: '2',
        name: 'Роман Малашин',
        rating: 4.6,
        speciality: 'ветеринарный хирург',
        experience: '17 лет',
        pets: 'кошки, собаки, экзотические животные',
        city: 1,
        place: 'Ветеринарный центр «Единорог», Ветеринарный центр «Клиника Кошек»',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683888000/go-cloudinary/Veterinary_clinics_specialists/i_tiq4jq.webp',
    },
    {
        id: '3',
        name: 'Анна Безобразова',
        rating: 4.5,
        speciality: 'ветеринар, УЗИ, нефролог-уролог',
        experience: '23 лет',
        pets: 'кошки, собаки',
        city: 1,
        place: 'Ветеринарный центр «Айленд», Ветеринарная клиника «Мартовский кот»',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683887917/go-cloudinary/Veterinary_clinics_specialists/i_pqb8py.webp',
    },
    {
        id: '4',
        name: 'Имран Юнси',
        rating: 4.7,
        speciality: 'ветеринарный хирург, невролог, ортопед, травматолог',
        experience: '13 лет',
        pets: 'кошки, собаки',
        city: 1,
        place: 'Ветеринарный центр «ИВЦ МВА Запад»',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683889207/go-cloudinary/Veterinary_clinics_specialists/i_wq5pxk.webp',
    },
    {
        id: '5',
        name: 'Виктория Кузняк',
        rating: 0,
        speciality: 'выгульщик собак',
        experience: '3 года',
        pets: 'собаки',
        city: 1,
        place: 'Самозанятый',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683887960/go-cloudinary/Veterinary_clinics_specialists/i_et1veg.webp',
    },
    {
        id: '6',
        name: 'Ирина Переслегина',
        rating: 4.9,
        speciality: 'ветеринар, УЗИ',
        experience: '27 лет',
        pets: 'мелкие домашние животные',
        city: 1,
        place: 'Клиника «Панвет»',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683889268/go-cloudinary/Veterinary_clinics_specialists/i_xbitj5.webp',
    },
    {
        id: '7',
        name: 'Никита Манаенков',
        rating: 4.1,
        speciality: 'Аквариумист, ветеринарный врач-дерматолог, ветеринарный врач-терапевт, ветеринарный стоматолог',
        experience: '7 лет',
        pets: 'птицы, кошки, собаки',
        city: 1,
        place: 'Самозанятый',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683889304/go-cloudinary/Veterinary_clinics_specialists/i_xpmf4b.webp',
    },
    {
        id: '8',
        name: 'Галина Тулякова',
        rating: 4.8,
        speciality: 'грумер-стилист',
        experience: '10 лет',
        pets: 'собаки',
        city: 1,
        place: 'Ветеринарный центр «Созвездие»',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683889416/go-cloudinary/Veterinary_clinics_specialists/i_xilc7l.webp',
    },
    {
        id: '9',
        name: 'Олеся Шморина',
        rating: 4.7,
        speciality: 'Урология, терапия, акушерство, гинекология, репродукция, абдоминальная хирургия, УЗИ-диагностика, анестезиология',
        experience: '8 лет',
        pets: 'собаки',
        city: 1,
        place: 'Ветеринарная клиника «ЗооАкадемия»',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683889373/go-cloudinary/Veterinary_clinics_specialists/i_j6voxa.webp',
    },
    {
        id: '10',
        name: 'Надежда Грянник',
        rating: 4.7,
        speciality: 'Кинолог',
        experience: '6 лет',
        pets: 'собаки',
        city: 1,
        place: 'Самозанятый',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683889474/go-cloudinary/Veterinary_clinics_specialists/i_ekc8x3.webp',
    },
    {
        id: '11',
        name: 'Анна Трояновская',
        rating: 5.0,
        speciality: 'Кинолог',
        experience: '5 лет',
        pets: 'собаки',
        city: 1,
        place: 'Самозанятый',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683889782/go-cloudinary/Veterinary_clinics_specialists/p8ukhhilfsgoo4ow0g4_okaxx2.jpg',
    },
    {
        id: '12',
        name: 'Наталья Романова',
        rating: 5.0,
        speciality: 'Передержка',
        experience: '10 лет',
        pets: 'мелкие домашние животные',
        city: 1,
        place: 'Самозанятый',
        phone: '8 800 111 22 33',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683889504/go-cloudinary/Veterinary_clinics_specialists/i_ipiigj.webp',
    },
]


const Specialists = () => {
    const isMobile = useIsMobileContext();

    return (
        <>
            {isMobile &&
                <TopBar leftButton={'burger'}>
                    <h5>Специалисты</h5>
                    <Icons icon={'geo'}/>
                </TopBar>}
            {!isMobile ?
                <div className={styles.title__geo}>
                    <h1>Лучшие специалисты</h1>
                    <div className={styles.geo}>
                        <Icons icon={'geo'}/>
                        <p>Город</p>
                    </div>
                </div> :
                <h3 className={styles.title}>Лучшие специалисты</h3>
            }
            <div className={styles.cards}>
                {specialists.map((s, index) => <SpecialistCard key={index} {...s}/>)}
            </div>
        </>
    );
};

export default Specialists;
