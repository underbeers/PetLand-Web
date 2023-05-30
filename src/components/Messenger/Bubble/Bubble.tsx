import React from 'react';
import cn from 'classnames';

import styles from './Bubble.module.css';


export type BubbleProps = {
    type: 'my' | 'alien';
    text: string;
    time: string;
    printDate: boolean;
    date: string;
};

const Bubble: React.FC<BubbleProps> = ({type, text, time, printDate, date}) => {
    const angle =
        <svg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'
             className={cn(styles.angle, styles[type])}>
            <path d='M6.37195 7.6243C3.39114 6.93642 1.06358 4.60886 0.375702 1.62804L0 0V8H8L6.37195 7.6243Z'/>
        </svg>;

    function addURLs(text: string) {
        let urlRegex = /(https?:\/\/[^\s]+)/g;

        return text.replace(urlRegex, function (url) {
            return '<a target="_blank" href="' + url + '">' + url + '</a>';
        });
    }

    return (
        <>
            <div className={cn(styles.bubble, styles[type])}>
                <p dangerouslySetInnerHTML={{__html: addURLs(text).replaceAll('\n', '<br/>')}}></p>
                {angle}
                <p className={cn('secondary__text-2', styles.time, styles[type])}>{time}</p>
            </div>
            {printDate &&
                <div className={styles.date__wrapper}>
                    <p className={cn(styles.date, 'secondary__text-1')}>{date}</p>
                </div>
            }
        </>
    );
};

export default Bubble;
