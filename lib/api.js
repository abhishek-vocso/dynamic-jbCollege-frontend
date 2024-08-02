// lib/api.js
const API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

export const fetchAPI = async (path) => {
  const requestUrl = `${API_URL}${path}`;
  console.log(`Fetching: ${requestUrl}`);

  try {
    const response = await fetch(requestUrl, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    console.log(`Response status: ${response.status}`);

    // if (!response.ok) {
    //   throw new Error(`An error occurred: ${response.statusText}`);
    // }

    const data = await response.json();
    console.log("data",data)
    return data;
  } catch (error) {
    console.error(`Fetch API error: ${error.message}`);
    throw error;
  }
};
