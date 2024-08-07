import qs from "qs";
import { configurations, getStrapiBaseUrl } from "./utils";

// Function to fetch data from a given endpoint with the provided query and cache options
async function fetchData(endpoint, query, options = {}) {
  const apiUrl = getStrapiBaseUrl();
  const url = `${apiUrl}${endpoint}?${query}`;

  const res = await fetch(url, {
    headers: {
      'Cache-Control': options.cache || 'default',
    },
  });

  if (!res.ok) {
    const errorMsg = `Failed to fetch data from ${url}. Status: ${res.status}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  return res.json();
}

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

export async function displayHeroSection() {
  const query = qs.stringify({
    populate: {
      HeroSection: {
        populate: {
          HeroImage : true
        }
      }
    },
  });

  return fetchData('/api/homepage', query, { cache: 'no-store' });
}
