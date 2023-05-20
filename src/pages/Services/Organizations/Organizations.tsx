import React, {useState} from 'react';

import Icons from '../../../components/UIKit/Icons';
import TopBar from '../../../components/TopBar/TopBar';
import OrganizationCard from '../../../components/OrganizationCard/OrganizationCard';

import styles from './Organizations.module.css';


export const organizations = [
    {
        id: '1',
        name: 'ЗооГалерея',
        rating: 4.9,
        type: 'Ветеринарная клиника',
        schedule: 'пн-пт: 9:00-21:00 сб-вс: 9:00-21:00',
        city: 1,
        address: 'г. Москва, ул. Часовая, 18с3',
        phone: '+7 (904) 568-05-14',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683890440/go-cloudinary/Veterinary_clinics_specialists/image26_el7ckq.png',
    },
    {
        id: '2',
        name: 'КотОся',
        rating: 4.9,
        type: 'Ветеринарная клиника',
        schedule: 'пн-пт: 10:00-21:00 сб-вс: 10:00-21:00',
        city: 1,
        address: 'МО, г. Реутов, ул. Гагарина, 5',
        phone: '+7 (495) 275-17-41',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683890474/go-cloudinary/Veterinary_clinics_specialists/i_mfxuj8.webp',
    },
    {
        id: '3',
        name: 'Игуана',
        rating: 4.8,
        type: 'Ветеринарная клиника',
        schedule: 'пн-пт: 10:00-22:00 сб-вс: 10:00-22:00',
        city: 1,
        address: 'г. Москва, ул. Смольная, 26',
        phone: '+7 (904) 567-37-54',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683890597/go-cloudinary/Veterinary_clinics_specialists/XXL_height_q1pbtk.webp',
    },
    {
        id: '4',
        name: 'Ветлайф',
        rating: 4.8,
        type: 'Ветеринарная клиника',
        schedule: 'пн-пт: круглосуточно сб-вс: круглосуточно',
        city: 1,
        address: 'г. Москва, бульвар Бескудниковский, 12',
        phone: '+7 (904) 567-12-26',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683890677/go-cloudinary/Veterinary_clinics_specialists/image3_czzf8i.png',
    },
    {
        id: '5',
        name: 'Биоконтроль',
        rating: 4.8,
        type: 'Ветеринарная клиника, зоогостиница',
        schedule: 'пн: 13:00-21:00 вт-вс: 9:00-21:00',
        city: 1,
        address: 'г. Москва, шоссе Каширское, 24с10',
        phone: '+7 (926) 922-05-27',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683890752/go-cloudinary/Veterinary_clinics_specialists/7_rfmgje.jpg',
    },
    {
        id: '6',
        name: 'А.М.Вет',
        rating: 4.8,
        type: 'Ветеринарная клиника',
        schedule: 'пн-пт: 10:00-22:00 сб-вс: 10:00-22:00',
        city: 1,
        address: 'г. Москва, ул. Пудовкина, 6к3',
        phone: '+7 (495) 032-04-18',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683890880/go-cloudinary/Veterinary_clinics_specialists/i_goc5by.webp',
    },
    {
        id: '7',
        name: 'Ветеринарный центр Ирины Оныщук',
        rating: 4.7,
        type: 'Ветеринарная клиника, зоогостиница',
        schedule: 'пн-пт: круглосуточно сб-вс: круглосуточно',
        city: 1,
        address: 'г. Москва, ул. Молодцова, 4а',
        phone: '+7 (495) 324-27-34',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683890936/go-cloudinary/Veterinary_clinics_specialists/i_iuiquv.webp',
    },
    {
        id: '8',
        name: 'Зоопорт',
        rating: 4.8,
        type: 'Ветеринарная клиника, зоогостиница',
        schedule: 'пн-пт: 10:00-22:00 сб-вс: 10:00-22:00',
        city: 1,
        address: 'г. Москва, пер. Даев, 14',
        phone: '+7 (495) 085-61-61',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683891025/go-cloudinary/Veterinary_clinics_specialists/image9_qf22g5.png',
    },
    {
        id: '9',
        name: 'ЗооАкадемия',
        rating: 4.7,
        type: 'Ветеринарная клиника',
        schedule: 'пн-пт: круглосуточно сб-вс: круглосуточно',
        city: 1,
        address: 'г. Москва, ул. Ялтинская, 1Б',
        phone: '+7 (495) 275-19-73',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683891128/go-cloudinary/Veterinary_clinics_specialists/i_a3ngim.webp',
    },
    {
        id: '10',
        name: 'Клиника Кошек',
        rating: 4.7,
        type: 'Ветеринарная клиника',
        schedule: 'пн-пт: 9:00-21:00 сб-вс: 9:00-21:00',
        city: 1,
        address: 'г. Москва, ул. Короленко, 8',
        phone: '+7 (901) 256-90-23',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683891155/go-cloudinary/Veterinary_clinics_specialists/image27_yf9g6t.png',
    },
    {
        id: '11',
        name: 'Дубовая роща',
        rating: 4.5,
        type: 'Приют, стационар',
        schedule: 'пн: выходной вт-вс: 10:00-19:00',
        city: 1,
        address: 'г. Москва, пр-д Дубовой Рощи, 25Ас4',
        phone: '+7 (926) 607-18-53',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683891213/go-cloudinary/Veterinary_clinics_specialists/image8_u7xa0e.png',
    },
    {
        id: '12',
        name: 'Красная сосна',
        rating: 4.8,
        type: 'Приют',
        schedule: 'пн: выходной вт-вс: 10:00-17:00',
        city: 1,
        address: 'г. Москва, ул. Красная Сосна',
        phone: '+7 (909) 667 08 87',
        photo: 'https://res.cloudinary.com/dojhrhddc/image/upload/v1683891236/go-cloudinary/Veterinary_clinics_specialists/image12_s0gpno.png',
    },
]

const Organizations = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <>
            {isMobile &&
                <TopBar leftButton={'burger'}>
                    <h5>Организации</h5>
                    <Icons icon={'geo'}/>
                </TopBar>}

            {!isMobile ?
                <div className={styles.title__geo}>
                    <h1>Популярные организации</h1>
                    <div className={styles.geo}>
                        <Icons icon={'geo'}/>
                        <p>Город</p>
                    </div>
                </div> :
                <h3 className={styles.title}>Популярные организации</h3>
            }

            <div className={styles.cards}>
                {organizations.map((o, index) => <OrganizationCard key={index} {...o} />)}
            </div>
        </>
    );
};

export default Organizations;
