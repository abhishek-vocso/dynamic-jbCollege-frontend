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
    const apiUrl = getStrapiBaseUrl();

    const heroSection = course.attributes.HeroSection;
    const WhyJB = course.attributes.WhyJB;
    const collegeFacilities = course.attributes.CollegeFacilities;

    if (!heroSection || heroSection.length === 0 || !heroSection[0].HeroImage || heroSection[0].HeroImage.data.length === 0) {
      return (
        <div>
          <h1>Course Details</h1>
          <p>No hero image found.</p>
        </div>
      );
    }

    const heroImageUrl = heroSection[0].HeroImage.data[0].attributes.url;

    // Check if images exist and if the specified index is valid
    const whyJbImageUrl1 = WhyJB[0].Images?.data?.[1]?.attributes?.url ? `${apiUrl}${WhyJB[0].Images.data[1].attributes.url}` : null;
    const whyJbImageUrl2 = WhyJB[0].Images?.data?.[0]?.attributes?.url ? `${apiUrl}${WhyJB[0].Images.data[0].attributes.url}` : null;

    return (
      <div>
        {/* Hero Section */}
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
        </div>

        {/* WhyJB Section */}
        <div className="p-4 bg-white shadow-sm rounded mt-5">
          <h1 className="text-primary mb-4">{WhyJB[0].Heading}</h1>
          <ul className="list-unstyled">
            {WhyJB[0].Details[0].children.map((item, index) => (
              <li key={index} className="mb-2 d-flex align-items-start">
                <span className="me-2 text-primary">✔</span>
                {item.children.map((child, i) => (
                  <span key={i} className="text-secondary">{child.text}</span>
                ))}
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="d-flex flex-column flex-md-row mt-4">
            {WhyJB[0].ButtonText && (
              <span className="btn btn-primary me-md-2 mb-2 mb-md-0">
                {WhyJB[0].ButtonText}
              </span>
            )}
            {WhyJB[0].ButtonURL && (
              <a href={WhyJB[0].ButtonURL} className="btn btn-link text-decoration-none text-primary">
                {WhyJB[0].ButtonURL}
              </a>
            )}
            {WhyJB[0].SecButtonText && (
              <span className="btn btn-primary me-md-2 mb-2 mb-md-0">
                {WhyJB[0].SecButtonText}
              </span>
            )}
            {WhyJB[0].SecButtonURL && (
              <a href={WhyJB[0].SecButtonURL} className="btn btn-link text-decoration-none text-primary">
                {WhyJB[0].SecButtonURL}
              </a>
            )}
          </div>

          {/* Display Images if available */}
          <div className="d-flex justify-content-between mt-5">
            {whyJbImageUrl1 && (
              <div className="me-3">
                <img src={whyJbImageUrl1} alt="WhyJB Image 1" className="img-fluid rounded shadow-sm" />
              </div>
            )}
            {whyJbImageUrl2 && (
              <div>
                <img src={whyJbImageUrl2} alt="WhyJB Image 2" className="img-fluid rounded shadow-sm" />
              </div>
            )}
          </div>
        </div>

        {/* College Facilities Section */}
        <div className="mt-5">
          <h1 className="text-primary mb-4">{collegeFacilities[0]?.Heading}</h1>
          {collegeFacilities.map((facility, index) => (
            <div key={index} className="mt-5">
              {facility?.Images?.data?.[0]?.attributes?.url && (
                <div className="me-3">
                  <img 
                    src={`${apiUrl}${facility.Images.data[0].attributes.url}`} 
                    alt={`College Facility ${index + 1}`} 
                    className="img-fluid rounded shadow-sm" 
                  />
                </div>
              )}
              <h2 className="text-secondary mt-3">{facility?.SubHeadings}</h2>
              <p>{facility?.Contents}</p>
            </div>
          ))}
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
