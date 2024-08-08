"use client";

import { displayHeroSection } from "@/lib/data";
import '../styles/HeroSection.module.css';
import { getStrapiBaseUrl } from '../lib/utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import SwiperCore, { Pagination, Navigation } from 'swiper';

// Install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const HeroSection = async () => {
    const { data } = await displayHeroSection();
    const { attributes } = data;

    const apiUrl = getStrapiBaseUrl();
    const cacheBuster = new Date().getTime(); // Cache-busting parameter

    const heroImageUrl1 = attributes.HeroSection.HeroImage?.data?.[0]?.attributes?.url || '';
    const heroImageUrl2 = attributes.HeroSection.HeroImage?.data?.[1]?.attributes?.url || '';

    const slides = [
        {
            heading: attributes.HeroSection.HeroHeading,
            subheading: attributes.HeroSection.HeroSubheading,
            buttonText: attributes.HeroSection.HeroButtonText,
            buttonURL: attributes.HeroSection.HeroButtonURL,
            imageUrl: heroImageUrl1
        },
        // Duplicate the content for demonstration purposes
        {
            heading: attributes.HeroSection.HeroHeading,
            subheading: attributes.HeroSection.HeroSubheading,
            buttonText: attributes.HeroSection.HeroButtonText,
            buttonURL: attributes.HeroSection.HeroButtonURL,
            imageUrl: heroImageUrl2
        }
    ];
    console.log("😂",slides)

    return (
        <Swiper
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            className="mySwiper"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className="hero-section position-relative">
                        {slide.imageUrl && (
                            <img
                                src={`${apiUrl}${slide.imageUrl}?cb=${cacheBuster}`} // Adding cache-busting parameter
                                alt="Hero"
                                className="img-fluid w-100"
                                style={{ height: 'auto', objectFit: 'cover' }}
                            />
                        )}
                        <div className="hero-text position-absolute top-50 start-50 translate-middle text-dark p-5 bg-white">
                            <h1>{slide.heading}</h1>
                            <h2>{slide.subheading}</h2>
                            {slide.buttonText && slide.buttonURL && (
                                <a href={slide.buttonURL} className="btn btn-danger mt-3">
                                    {slide.buttonText}
                                </a>
                            )}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default HeroSection;
