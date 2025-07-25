import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import './productCategslider.css';

import ProductCard from '../../ProductCard';

const ProductCategSlider = ({ products = [] ,slidername}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="slider-container">
      <h3 className="slider-title">{slidername}</h3>

      {/* Custom navigation buttons */}
      <div className="custom-nav-buttons">
        <button ref={prevRef} className="custom-prev"><GrFormPrevious />
</button>
        <button ref={nextRef} className="custom-next"><GrFormNext /></button>
      </div>

      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        freeMode={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
    0: {
      slidesPerView: 2
    },
    480: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 5,
    },
  }}
        modules={[FreeMode, Navigation]}
        className="categSwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id} className='cardslide'>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCategSlider;
