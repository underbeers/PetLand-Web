import React, {useState} from 'react';

import Chips from '../../components/UIKit/Chips';
import Icons from '../../components/UIKit/Icons';
import Button from '../../components/UIKit/Button';
import TopBar from '../../components/TopBar/TopBar';
import Slider from '../../components/Slider/Slider';
import Gallery from '../../components/Gallery/Gallery';

import cat from './img/cat.jpg';

import styles from './PetPage.module.css'


const PetPage = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

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
                    <div className={styles.name__button}>
                        <h2>Кличка</h2>
                        <Button color={'orange'} type={'primary'} onClick={() => {
                        }} text={'Редактировать страницу'}/>
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
                        <h2>Кличка</h2>
                        <div className={styles.chips}>
                            <Chips color={'green'} size={'medium'} label={'вид'}/>
                            <Chips color={'green'} size={'medium'} label={'пол'}/>
                            <Chips color={'green'} size={'medium'} label={'порода'}/>
                            <Chips color={'green'} size={'medium'} label={'возраст'}/>
                        </div>
                    </div>}
                <div className={styles.full__info}>
                    <div className={styles.description}>
                        <div className={styles.color}>
                            <h5>Окрас:</h5>
                            <p className={'primary__text'}>Бело-серый, пушистый. Длинная шерсть</p>
                        </div>
                        <div className={styles.care}>
                            <h5>Особенности ухода:</h5>
                            <p className={'primary__text'}>Приучен к лотку и когтеточке. Ест сухой и влажный корм Purina
                                One.</p>
                        </div>
                        <div className={styles.pedigree}>
                            <h5>Родословная:</h5>
                            <p className={'primary__text'}>Родословной не знаем. Забирали кота из приюта.</p>
                        </div>
                        <div className={styles.traits}>
                            <h5>Черты характера:</h5>
                            <p className={'primary__text'}>Ласковый, ленивый, очень любит покушать. Играет нечасто, но
                                любит
                                взбираться на свою высокую когтеточку</p>
                        </div>
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

        </div>
    )
}

export default PetPage;
