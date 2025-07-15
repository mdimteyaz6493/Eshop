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
          <img src="./allbanner.jpg" alt="Banner 1" />
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <img src="./mobbanner.jpg" alt="Banner 2" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HomeBanner;
