import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import './homebanner.css';

const HomeBanner = () => {
  return (
    <>
      <Swiper
        navigation={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="bannerSwiper"
      >
        <SwiperSlide className='bannerslide'>
          <img src="./b1.jpg" alt="Banner 1" />
        </SwiperSlide>
        <SwiperSlide className='bannerslide'>
          <img src="./b2.jpg" alt="Banner 2" />
        </SwiperSlide>
         <SwiperSlide className='bannerslide'>
          <img src="./b3.jpg" alt="Banner 3" />
        </SwiperSlide>
         <SwiperSlide className='bannerslide'>
          <img src="./b4.jpg" alt="Banner 4" />
        </SwiperSlide>
         <SwiperSlide className='bannerslide'>
          <img src="./b5.jpg" alt="Banner 5" />
        </SwiperSlide>
        <SwiperSlide className='bannerslide'>
          <img src="./b6.jpg" alt="Banner 6" />
        </SwiperSlide>
        <SwiperSlide className='bannerslide'>
          <img src="./b7.jpg" alt="Banner 7" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HomeBanner;
