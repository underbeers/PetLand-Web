import React from "react";

import styles from './Bubble.module.css';
import cn from "classnames";


export type BubbleProps = {
    type: 'my' | 'alien';
    text: string;
    time: string;
};

const Bubble: React.FC<BubbleProps> = ({type, text, time}) => {
    const angle =
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn(styles.angle, styles[type])}>
            <path d="M6.37195 7.6243C3.39114 6.93642 1.06358 4.60886 0.375702 1.62804L0 0V8H8L6.37195 7.6243Z" fill="#EAEEF9"/>
        </svg>
    return (
        <div className={cn(styles.bubble, styles[type])}>
            <p>{text}</p>
            {angle}
            <p className={cn('secondary__text-2', styles.time, styles[type])}>{time}</p>
        </div>
    );
};

export default Bubble;
