import React, { use } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from './ReviewCard';

const Reviews = ({reviewsPromise}) => {
    const reviews = use(reviewsPromise);
    console.log(reviews)
    return (
        <div className='my-20'>
            <div className='text-center my-8'>
                <h1 className='text-4xl font-semibold'>What our customers are sayings</h1>
                <p className='my-3'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            
            
                <Swiper
                    loop={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    coverflowEffect={{
                    rotate: 10,
                    stretch: '50%',
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow,Autoplay]}
                    className="mySwiper"
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                >
                    {
                        reviews.map(review => 
                            <SwiperSlide key={review.id}>
                                <ReviewCard review={review}></ReviewCard>
                                {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            </SwiperSlide>
                        )
                    }
                    
                </Swiper>
        </div>
    );
};

export default Reviews;