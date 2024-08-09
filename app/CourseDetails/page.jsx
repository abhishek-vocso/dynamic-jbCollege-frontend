import React from "react";
import { fetchCourseDetails } from "@/lib/data";
import { getStrapiBaseUrl } from "@/lib/utils";
import "bootstrap/dist/css/bootstrap.min.css";

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

    const course = data.data[0].attributes;
    const apiUrl = getStrapiBaseUrl();

    const {
      HeroSection,
      WhyJB,
      CollegeFacilities: collegeFacilities,
      KeyFacts: keyFacts,
      Placement: placement,
      ApplyScholarship: applyScholarship,
    } = course;
    // console.log("🎉",applyScholarship[0].BackgroundImage.data.attributes.url)

    const heroImageUrl =
      HeroSection?.[0]?.HeroImage?.data?.[0]?.attributes?.url || "";

    const whyJbImages = WhyJB?.[0]?.Images?.data || [];
    const whyJbImageUrl1 = whyJbImages?.[1]?.attributes?.url
      ? `${apiUrl}${whyJbImages[1].attributes.url}`
      : null;
    const whyJbImageUrl2 = whyJbImages?.[0]?.attributes?.url
      ? `${apiUrl}${whyJbImages[0].attributes.url}`
      : null;

    return (
      <div>
        {/* Hero Section */}
        {heroImageUrl && (
          <div className="hero-section position-relative">
            <img
              src={`${apiUrl}${heroImageUrl}`}
              alt="Hero"
              className="img-fluid w-100"
              style={{ height: "450px", objectFit: "cover" }}
            />
            <div className="hero-content position-absolute top-50 start-50 translate-middle text-white text-center p-5 bg-dark bg-opacity-50">
              <h1>{HeroSection[0].HeroHeading}</h1>
              <p>{HeroSection[0].HeroSubheading}</p>
              {HeroSection[0].HeroButtonText && (
                <div className="mt-3">
                  <span className="btn btn-danger">
                    {HeroSection[0].HeroButtonText}
                  </span>
                </div>
              )}
              {HeroSection[0].HeroButtonURL && (
                <div className="mt-2">
                  <a href={HeroSection[0].HeroButtonURL} className="text-white">
                    {HeroSection[0].HeroButtonURL}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* WhyJB Section */}
        {WhyJB && (
          <div className="p-4 bg-white shadow-sm rounded mt-5">
            <h1 className="text-primary mb-4">{WhyJB[0].Heading}</h1>
            <ul className="list-unstyled">
              {WhyJB[0].Details[0].children.map((item, index) => (
                <li key={index} className="mb-2 d-flex align-items-start">
                  <span className="me-2 text-primary">✔</span>
                  {item.children.map((child, i) => (
                    <span key={i} className="text-secondary">
                      {child.text}
                    </span>
                  ))}
                </li>
              ))}
            </ul>

            {/* WhyJB Buttons */}
            <div className="d-flex flex-column flex-md-row mt-4">
              {WhyJB[0].ButtonText && (
                <span className="btn btn-primary me-md-2 mb-2 mb-md-0">
                  {WhyJB[0].ButtonText}
                </span>
              )}
              {WhyJB[0].ButtonURL && (
                <a
                  href={WhyJB[0].ButtonURL}
                  className="btn btn-link text-decoration-none text-primary"
                >
                  {WhyJB[0].ButtonURL}
                </a>
              )}
              {WhyJB[0].SecButtonText && (
                <span className="btn btn-primary me-md-2 mb-2 mb-md-0">
                  {WhyJB[0].SecButtonText}
                </span>
              )}
              {WhyJB[0].SecButtonURL && (
                <a
                  href={WhyJB[0].SecButtonURL}
                  className="btn btn-link text-decoration-none text-primary"
                >
                  {WhyJB[0].SecButtonURL}
                </a>
              )}
            </div>

            {/* Display Images if available */}
            <div className="d-flex justify-content-between mt-5">
              {whyJbImageUrl1 && (
                <div className="me-3">
                  <img
                    src={whyJbImageUrl1}
                    alt="WhyJB Image 1"
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
              )}
              {whyJbImageUrl2 && (
                <div>
                  <img
                    src={whyJbImageUrl2}
                    alt="WhyJB Image 2"
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* College Facilities Section */}
        {collegeFacilities && (
          <div className="mt-5">
            <h1 className="text-primary mb-4">
              {collegeFacilities[0]?.Heading}
            </h1>
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
        )}

        {/* Key Facts Section */}
        {keyFacts && (
          <div
            className="container-fluid py-5"
            style={{ backgroundColor: "#2c2c2c" }}
          >
            <div className="row align-items-center">
              <div className="col-md-6">
                <img
                  src={`${apiUrl}${keyFacts[0].Image.data[0].attributes.url}`}
                  alt={keyFacts[0].Heading}
                  className="img-fluid"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div className="col-md-6 text-white">
                <h1>{keyFacts[0].Heading}</h1>
                <ul className="list-unstyled mt-4">
                  {keyFacts[0].Details.map((item, index) => (
                    <li
                      key={index}
                      className="mb-2 p-2"
                      style={{ borderRadius: "4px" }}
                    >
                      {item.children.map((child, i) => (
                        <span key={i} className="text-white">
                          {child.text}
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Placement Section */}
        {placement && (
          <div className="mt-5">
            <div className="row align-items-center">
              {/* Text Section */}
              <div className="col-md-6">
                <h1 className="fw-bold">{placement[0].Heading}</h1>
                <p>{placement[0].Contents}</p>

                {/* Placements Buttons */}
                <div className="d-flex flex-column flex-md-row mt-4 gap-3">
                  {placement[0].ButtonText && (
                    <a
                      href={placement[0].ButtonURL}
                      className="btn btn-outline-primary"
                    >
                      {placement[0].ButtonText}
                    </a>
                  )}
                  {placement[0].SecButtonText && (
                    <a
                      href={placement[0].SecButtonURL}
                      className="btn btn-outline-primary"
                    >
                      {placement[0].SecButtonText}
                    </a>
                  )}
                </div>
              </div>

              {/* Images Section */}
              <div className="col-md-6">
                <div className="row">
                  {placement[0].Image.data.slice(0, 9).map((image, index) => (
                    <div key={index} className="col-4 mb-3">
                      <div className="p-3 bg-white border rounded d-flex align-items-center justify-content-center shadow-sm">
                        <img
                          src={`${apiUrl}${image.attributes.url}`}
                          alt={`Placement Image ${index + 1}`}
                          className="img-fluid"
                          style={{ maxHeight: "80px", objectFit: "contain" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ApplyScholarship */}
        <div
          className="container-fluid text-white text-center p-5"
          style={{
            backgroundImage: `url(${apiUrl}${applyScholarship[0].BackgroundImage.data.attributes.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="mb-3">{applyScholarship[0].Heading}</h1>
          <p className="mb-4">{applyScholarship[0].Contents}</p>
          <div className="d-flex justify-content-center gap-3">
            {applyScholarship[0].ButtonText && (
              <a
                href={applyScholarship[0].ButtonURL}
                className="btn btn-outline-light"
              >
                {applyScholarship[0].ButtonText} →
              </a>
            )}
            {applyScholarship[0].SecButtonText && (
              <a
                href={applyScholarship[0].SecButtonURL}
                className="btn btn-outline-light"
              >
                {applyScholarship[0].SecButtonText} →
              </a>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default CourseDetailsPage;
