// apiService.js
import qs from "qs";
import { configurations, getStrapiBaseUrl } from "./utils";

// Function to fetch data from a given endpoint with the provided query and cache options
async function fetchData(endpoint, query, options = {}) {
  const apiUrl = getStrapiBaseUrl();
  const url = `${apiUrl}${endpoint}?${query}&_=${new Date().getTime()}`; // Cache-busting query parameter

  const res = await fetch(url, {
    headers: {
      'Cache-Control': options.cache || 'no-store, no-cache, must-revalidate',  // More robust cache control
      'Pragma': 'no-cache',  // Disable caching in HTTP/1.0
      'Expires': '0',  // Disable caching in the past
    },
  });

  if (!res.ok) {
    const errorMsg = `Failed to fetch data from ${url}. Status: ${res.status}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  return res.json();
}

// Function to fetch main navigation data
export async function displayMainNavigation() {
  const query = qs.stringify({
    populate: {
      items: {
        populate: {
          path: true,
          title: true,
        },
      },
    },
  });

  return fetchData('/api/navigation/render/main-navigation', query);
}

// Function to fetch hero section data
export async function displayHeroSection() {
  const query = qs.stringify({
    populate: {
      HeroSection: {
        populate: {
          HeroImage: true,
          HeroButtonText: true,
          HeroButtonURL: true,
        },
      },
    },
  });

  return fetchData('/api/homepage', query, { cache: 'no-store' });
}

// Function to fetch courses data
export async function fetchCourses() {
  const query = qs.stringify({
    populate: {
      // Specify the fields you want to populate, if any
    },
  });

  return fetchData('/api/courses', query, { cache: 'no-store' });
}

// Function to fetch course details
export async function fetchCourseDetails() {
  const query = qs.stringify({
    populate: {
      HeroSection: {
        populate: {
          HeroHeading: true,
          HeroSubheading: true,
          HeroImage: {
            populate: true,
          },
          HeroButtonText: true,
          HeroButtonURL: true,
        },
      },
      WhyJB: {
        populate: {
          Heading: true,
          Details: true,
          ButtonText: true,
          ButtonURL: true,
          SecButtonText: true,
          SecButtonURL: true,
          Images: {
            populate: true,
          },
        },
      },
    },
  });

  return fetchData('/api/course-details', query, { cache: 'no-store' });
}

