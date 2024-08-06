import qs from "qs";
import { configurations, getStrapiBaseUrl } from "./utils";

// Function to fetch data from a given endpoint with the provided query
async function fetchData(endpoint, query) {
  const apiUrl = getStrapiBaseUrl();
  const url = `${apiUrl}${endpoint}?${query}`; 

  const res = await fetch(url);

  if (!res.ok) {
    const errorMsg = `Failed to fetch data from ${url}. Status: ${res.status}`;
    console.error(errorMsg); // Log the specific error
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
