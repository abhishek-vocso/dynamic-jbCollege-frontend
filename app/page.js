// app/page.js
import { fetchAPI } from '../lib/api';

export default async function HomePage() {
  try {
    const blogs = await fetchAPI('/api/blogs');
    const courses = await fetchAPI('/api/courses');

    return (
      <div>
        <h1>Welcome to the Homepage</h1>
        <section>
          <h2>Blog Posts</h2>
          <ul>
            {blogs.data.map((blog) => (
              <li key={blog.id}>{blog.attributes.Title}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Courses</h2>
          <ul>
            {courses.data.map((course) => (
              <li key={course.id}>{course.attributes.Title}</li>
            ))}
          </ul>
        </section>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Error fetching data</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
