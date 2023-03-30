import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, A11y, Zoom} from 'swiper';

import 'swiper/swiper.min.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Slider.module.css';


const Slider: React.FC<{ slides: string }> = ({slides}) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y, Zoom]}
            spaceBetween={0}
            slidesPerView={1}
            //onSlideChange={() => console.log('slide change')}
            //onSwiper={(swiper) => console.log(swiper)}
            navigation
            pagination={{clickable: true, type: 'fraction'}}
            zoom={true}
        >
            <SwiperSlide><img src={slides} alt={'photo'} className={styles.photo}/></SwiperSlide>
            <SwiperSlide><img src={slides} alt={'photo'} className={styles.photo}/></SwiperSlide>
            <SwiperSlide><img src={slides} alt={'photo'} className={styles.photo}/></SwiperSlide>
            <SwiperSlide><img src={slides} alt={'photo'} className={styles.photo}/></SwiperSlide>
        </Swiper>
    );
};

export default Slider;
