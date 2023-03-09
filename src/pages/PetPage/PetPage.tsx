import React, {useState} from 'react';

import Button from "../../components/UIKit/Button";

import styles from './PetPage.module.css'
import Chips from "../../components/UIKit/Chips";
import Icons from "../../components/UIKit/Icons";

const PetPage = () => {
    return (
        <div>
            <div className={styles.name__button}>
                <h2>Кличка</h2>
                <Button color={"orange"} type={"primary"} onClick={() => {
                }} text={'Редактировать страницу'}/>
            </div>

            <div className={styles.chips}>
                <Chips color={"green"} size={"medium"} label={'вид'}/>
                <Chips color={"green"} size={"medium"} label={'пол'}/>
                <Chips color={"green"} size={"medium"} label={'порода'}/>
                <Chips color={"green"} size={"medium"} label={'возраст'}/>
            </div>

            <div className={styles.photos}>
                <div className={styles.main__photo}/>
                <div className={styles.other__photos__button}>
                    <div className={styles.other__photos}>
                        <div className={styles.another__photo}/>
                        <div className={styles.another__photo}/>
                        <div className={styles.another__photo}/>
                        <div className={styles.another__photo}/>
                        <div className={styles.another__photo}/>
                    </div>
                    <Button color={'green'} type={'primary'} onClick={() => {
                    }} text={'Добавить фотографии'} className={styles.add__photos}/>
                </div>

            </div>

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
                        <p className={'primary__text'}>Ласковый, ленивый, очень любит покушать. Играет нечасто, но любит
                            взбираться на свою высокую когтеточку</p>
                    </div>
                </div>

                <div className={styles.sterilization__vaccination}>
                    <div className={styles.info}>
                        <Icons icon={"check"} className={styles.icon}/>
                        <h5>Стерилизация</h5>
                    </div>

                    <div className={styles.info}>
                        <Icons icon={"cross"} className={styles.icon}/>
                        <h5>Прививки</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetPage;
