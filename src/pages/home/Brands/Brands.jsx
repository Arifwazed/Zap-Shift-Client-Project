import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'


const Brands = () => {
    const brands = [amazon,amazon_vector,casio,moonstar,randstad,star,start_people];
    return (
        <div className='border my-10 md:my-20'>
            <h1 className='text-3xl font-semibold mb-10 text-center'>We've helped thousands of sales teams</h1>
            <Swiper 
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                    delay: 100,
                    disableOnInteraction: false,
                }}
            >
                {
                    brands.map((logo,index) => <SwiperSlide key={index}><img src={logo} alt="" /></SwiperSlide>)
                }
                
            </Swiper>
        </div>
    );
};

export default Brands;