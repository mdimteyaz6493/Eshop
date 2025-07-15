import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './categslider.css';
import categories from './categories';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

const CategoriesSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="categ-slider-container">
      <h3 className="slider-title">Explore Catogeries</h3>
      {/* Custom navigation buttons */}
      <div className="custom-nav-buttons">
        <button ref={prevRef} className="custom-prev">
          <GrFormPrevious />
        </button>
        <button ref={nextRef} className="custom-next">
          <GrFormNext />
        </button>
      </div>

      <Swiper
        slidesPerView={9}
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
        modules={[FreeMode, Navigation]}
        className="categSwiper"
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index} className="category-slide">
            <Link to={`/category/${cat.name.toLowerCase()}`} className='link'>
              <div className="category-card">
                <div className="img_part">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <p className="categ_name">{cat.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;
