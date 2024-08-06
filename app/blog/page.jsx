import React from "react";
import qs from "qs";
import { configurations, getStrapiBaseUrl } from "../../lib/utils";

async function fetchBlogs() {
  const query = qs.stringify({
    populate: {
      CoverImage: true,
      blog_category: true,
      author: true,
    },
  });

  const apiUrl = getStrapiBaseUrl();
  const url = `${apiUrl}/api/blogs?${query}`;

  try {
    const res = await fetch(url, configurations());

    if (!res.ok) {
      const errorMsg = `Failed to fetch blog posts. Status: ${res.status}`;
      console.error(errorMsg);
      return { blogs: [], error: errorMsg };
    }

    const data = await res.json();
    return { blogs: data.data, error: null };
  } catch (error) {
    const errorMessage = error.message || "An unknown error occurred.";
    console.error("Error fetching blog posts:", errorMessage);
    return { blogs: [], error: errorMessage };
  }
}

const BlogPage = async () => {
  const { blogs, error } = await fetchBlogs();

  if (error) {
    return (
      <div>
        <h1>Blog Posts</h1>
        <p>Failed to load blog posts: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h2>{blog.attributes.title}</h2>
            {blog.attributes.heading && (
              <p><strong>Heading:</strong> {blog.attributes.heading}</p>
            )}
            {blog.attributes.subHeading && (
              <p><strong>Subheading:</strong> {blog.attributes.subHeading}</p>
            )}
            {blog.attributes.author?.data?.attributes?.name && (
              <p><strong>Author:</strong> {blog.attributes.author.data.attributes.name}</p>
            )}
            {blog.attributes.blog_category?.data?.attributes?.name && (
              <p><strong>Category:</strong> {blog.attributes.blog_category.data.attributes.name}</p>
            )}
            {blog.attributes.external_post_url && (
              <p>
                <strong>External Post URL:</strong>{" "}
                <a href={blog.attributes.external_post_url} target="_blank" rel="noopener noreferrer">
                  {blog.attributes.external_post_url}
                </a>
              </p>
            )}
            {blog.attributes.CoverImage?.data?.attributes?.url && (
              <div>
                <strong>Cover Image:</strong>
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${blog.attributes.CoverImage.data.attributes.url}`}
                  alt="Cover"
                  style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
