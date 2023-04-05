import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, A11y, Zoom} from 'swiper';

import styles from './Slider.module.css';


const Slider: React.FC<{ slides: Array<string> }> = ({slides}) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y, Zoom]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{type: 'fraction'}}
            zoom={true}>
            {slides.map(slide =>
                <SwiperSlide key={slide}><img src={slide} alt={'photo'} className={styles.photo}/></SwiperSlide>
            )}
        </Swiper>
    );
};

export default Slider;
