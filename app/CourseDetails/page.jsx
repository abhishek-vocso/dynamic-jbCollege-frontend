import React from "react";
import { fetchCourseDetails } from "@/lib/data";
import { getStrapiBaseUrl } from "@/lib/utils";
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseDetailsPage = async () => {
  try {
    const data = await fetchCourseDetails();

    if (!data || !data.data || !data.data[0]) {
      return (
        <div>
          <h1>Course Details</h1>
          <p>No course details found.</p>
        </div>
      );
    }

    const course = data.data[0];
    const heroSection = course.attributes.HeroSection;
    const WhyJB = course.attributes.WhyJB;
    const apiUrl = getStrapiBaseUrl();
    // console.log("😂",WhyJB[0].Details,{depth:null})
    console.dir(WhyJB[0].Heading)
   

    if (!heroSection || heroSection.length === 0 || !heroSection[0].HeroImage || heroSection[0].HeroImage.data.length === 0) {
      return (
        <div>
          <h1>Course Details</h1>
          <p>No hero image found.</p>
        </div>
      );
    }

    const heroImageUrl = heroSection[0].HeroImage.data[0].attributes.url;

    return (
      <div className="hero-section position-relative">
        <img 
          src={`${apiUrl}${heroImageUrl}`} 
          alt="Hero" 
          className="img-fluid w-100" 
          style={{ height: '450px', objectFit: 'cover' }} 
        />
        <div className="hero-content position-absolute top-50 start-50 translate-middle text-white text-center p-5 bg-dark bg-opacity-50">
          <h1>{heroSection[0].HeroHeading}</h1>
          <p>{heroSection[0].HeroSubheading}</p>
          {heroSection[0].HeroButtonText && (
            <div className="mt-3">
              <span className="btn btn-danger">{heroSection[0].HeroButtonText}</span>
            </div>
          )}
          {heroSection[0].HeroButtonURL && (
            <div className="mt-2">
              <a href={heroSection[0].HeroButtonURL} className="text-white">
                {heroSection[0].HeroButtonURL}
              </a>
            </div>
          )}
        </div>
        <div>
          <h1>{WhyJB[0].Heading}</h1>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Course Details</h1>
        <p>Failed to load course details: {error.message}</p>
      </div>
    );
  }
};

export default CourseDetailsPage;
