// strapi api token configurations
export function configurations(options = {}, headers = {}) {
    return {
      ...options,
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        ...headers,
      },
    };
  }

  // strapi base url
export function getStrapiBaseUrl() {
    return process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_STRAPI_BASE_URL
      : process.env.NEXT_PUBLIC_STRAPI_FALLBACK_URL;
  }