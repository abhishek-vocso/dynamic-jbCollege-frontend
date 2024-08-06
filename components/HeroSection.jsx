// "use client"

// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
// import FetchAPI from '../lib/api'; // Adjust the path as necessary

// SwiperCore.use([Navigation, Pagination, Autoplay]);

// const HeroSection = () => {
//   const [slides, setSlides] = useState([]);

//   useEffect(() => {
//     const loadSlides = async () => {
//       try {
//         const data = await FetchAPI('/'); // Ensure this endpoint matches your setup
//         setSlides(data);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };

//     loadSlides();
//   }, []);

//   return (
//     <div className="hero-slider">
//       <Swiper
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         loop={true}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div style={{
//               backgroundImage: `url(${slide.image.url})`,
//               height: '100vh',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center'
//             }}>
//               <div className="text-overlay">
//                 <h1>{slide.title}</h1>
//                 <p>{slide.subtitle}</p>
//                 <button onClick={() => window.location.href = slide.buttonLink}>
//                   {slide.buttonText}
//                 </button>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default HeroSection;
