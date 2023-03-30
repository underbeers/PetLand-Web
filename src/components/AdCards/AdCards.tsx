import React, {useState} from 'react';
import cn from 'classnames';

import Icons from '../UIKit/Icons';
import Chips from '../UIKit/Chips';

import styles from './AdCards.module.css';


interface iAdCardProps {
    size: 'big' | 'small'
}

const AdCards: React.FC<iAdCardProps> = ({size}) => {

    const [isLiked, setIsLiked] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <div className={cn(styles.card, styles[size])}>
            <img className={styles.photo}
                 src={'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80'}/>
            <div className={styles.ad__content}>
                <div className={styles.name__like}>
                    <div className={styles.name__price}>
                        <h4>Кличка</h4>
                        <p>Цена ₽</p>
                    </div>
                    {isLiked ?
                        <Icons icon={'cards-heart'} className={styles.heart} onClick={() => setIsLiked(!isLiked)}/> :
                        <Icons icon={'cards-heart-outline'} className={styles.heart}
                               onClick={() => setIsLiked(!isLiked)}/>}
                </div>
                {size === 'big' &&
                    <div className={styles.chips}>
                        <Chips color={'green'} size={'small'} label={'вид'}/>
                        <Chips color={'green'} size={'small'} label={'порода'}/>
                        <Chips color={'green'} size={'small'} label={'пол'}/>
                        <Chips color={'green'} size={'small'} label={'возраст'}/>
                    </div>
                }
                <div className={styles.description__info}>
                    {size === 'big' &&
                        <p className={styles.description}>
                            Кошка очень дружелюбная и ласковая, любит играть и общаться с людьми. Она привита и
                            стерилизована, что делает ее идеальным питомцем для семьи. Кошка привыкла к лотку и
                            когтеточке,
                            идеально подходит для...
                        </p>}
                    <div className={styles.info}>
                        {size === 'big' && <p className={styles.name__owner}>Имя Фамилия</p>}
                        <p className={styles.address__date}>Район р-н</p>
                        <p className={styles.address__date}>дд месяц, чч:мм</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdCards;
