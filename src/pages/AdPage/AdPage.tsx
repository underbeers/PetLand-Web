import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Chips from '../../components/UIKit/Chips';
import Icons from '../../components/UIKit/Icons';
import Button from '../../components/UIKit/Button';
import TopBar from '../../components/TopBar/TopBar';
import Slider from '../../components/Slider/Slider';
import Gallery from '../../components/Gallery/Gallery';

import cat from './img/cat.jpg';

import styles from './AdPage.module.css'


const AdPage = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    const navigate = useNavigate();
    const handleGoBack: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const images = [
        {
            original: cat,
            thumbnail: cat,
        },
        {
            original: cat,
            thumbnail: cat,
        },
        {
            original: cat,
            thumbnail: cat,
        },
        {
            original: cat,
            thumbnail: cat,
        },
        {
            original: cat,
            thumbnail: cat,
        },

        {
            original: cat,
            thumbnail: cat,
        },
        {
            original: cat,
            thumbnail: cat,
        },
        {
            original: cat,
            thumbnail: cat,
        },
        {
            original: cat,
            thumbnail: cat,
        },
        {
            original: cat,
            thumbnail: cat,
        },

    ];


    return (
        <div>
            {!isMobile ?
                <>
                    <div className={styles.back__name__price}>
                        <div className={styles.arrow__container} onClick={handleGoBack}>
                            <Icons icon={'arrow-left'} className={styles.arrow__back}/>
                        </div>
                        <h1 className={styles.name}>Кличка</h1>
                        <h1>Цена ₽</h1>
                    </div>
                    <div className={styles.chips}>
                        <Chips color={'green'} size={'medium'} label={'вид'}/>
                        <Chips color={'green'} size={'medium'} label={'пол'}/>
                        <Chips color={'green'} size={'medium'} label={'порода'}/>
                        <Chips color={'green'} size={'medium'} label={'возраст'}/>
                    </div>
                </>
                :
                <TopBar leftButton={'arrow'}>
                    <h5>Кличка</h5>
                    <Icons icon={'share'}/>
                    <Icons icon={'dots-vertical'}/>
                </TopBar>
            }

            <div className={styles.photo__info}>
                {!isMobile ? <Gallery images={images}/> :
                    <div className={styles.slider__name}>
                        <Slider slides={cat}/>
                        <div className={styles.name__price}>
                            <h2>Кличка</h2>
                            <h4>Цена ₽</h4>
                        </div>
                        <div className={styles.chips}>
                            <Chips color={'green'} size={'medium'} label={'вид'}/>
                            <Chips color={'green'} size={'medium'} label={'пол'}/>
                            <Chips color={'green'} size={'medium'} label={'порода'}/>
                            <Chips color={'green'} size={'medium'} label={'возраст'}/>
                        </div>
                    </div>}

                {!isMobile && <div className={styles.owner__info}>
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

                    <div className={styles.date__address}>
                        <div className={styles.date}>
                            <h5>Дата публикации:</h5>
                            <p>10.4.2023</p>
                        </div>
                        <div className={styles.address}>
                            <h5>Адрес:</h5>
                            <p>г. Нижний Новгород, Нижегородский р-н</p>
                        </div>
                    </div>
                </div>}
            </div>

            <div className={styles.pet__info}>
                <div className={styles.column}>
                    <div className={styles.info__piece}>
                        <h5>Описание:</h5>
                        <p>Продается очаровательная кошка породы. Она имеет короткую шерсть и зеленые глаза, которые
                            привлекают внимание. Кошка очень дружелюбная и ласковая, любит играть и общаться с людьми.
                            Она привита и стерилизована, что делает ее идеальным питомцем для семьи. Кошка привыкла к
                            лотку и когтеточке, идеально подходит для жизни в квартире. Если вы ищете верного друга и
                            надежного компаньона, то эта кошка для вас!</p>
                    </div>
                    <div className={styles.info__piece}>
                        <h5>Окрас:</h5>
                        <p className={'primary__text'}>Бело-серый, пушистый. Длинная шерсть</p>
                    </div>
                    <div className={styles.info__piece}>
                        <h5>Особенности ухода:</h5>
                        <p className={'primary__text'}>Приучен к лотку и когтеточке. Ест сухой и влажный корм Purina
                            One.</p>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.pedigree}>
                        <h5>Родословная:</h5>
                        <p className={'primary__text'}>Родословной не знаем. Забирали кота из приюта.</p>
                    </div>
                    <div className={styles.info__piece}>
                        <h5>Черты характера:</h5>
                        <p className={'primary__text'}>Ласковый, ленивый, очень любит покушать. Играет нечасто, но
                            любит
                            взбираться на свою высокую когтеточку</p>
                    </div>


                    <div className={styles.sterilization__vaccination}>
                        <div className={styles.info__check}>
                            <Icons icon={'check'} className={styles.icon}/>
                            <h5>Стерилизация</h5>
                        </div>

                        <div className={styles.info__check}>
                            <Icons icon={'cross'} className={styles.icon}/>
                            <h5>Прививки</h5>
                        </div>
                    </div>
                </div>
            </div>

            {isMobile && <div className={styles.owner__info}>
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

                <div className={styles.date__address}>
                    <div className={styles.date}>
                        <h5>Дата публикации:</h5>
                        <p>10.4.2023</p>
                    </div>
                    <div className={styles.address}>
                        <h5>Адрес:</h5>
                        <p>г. Нижний Новгород, Нижегородский р-н</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default AdPage;
