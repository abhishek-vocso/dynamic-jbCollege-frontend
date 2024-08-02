import { fetchAPI } from '../../lib/api';

export default async function BlogPage() {
  const blogs = await fetchAPI('/api/blogs');

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {blogs.data.map((blog) => (
          <li key={blog.id}>{blog.attributes.Title}</li>
        ))}
      </ul>
    </div>
  );
}
