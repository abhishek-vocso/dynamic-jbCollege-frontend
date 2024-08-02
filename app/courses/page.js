import { fetchAPI } from '../../lib/api';

export default async function CoursePage() {
  const courses = await fetchAPI('/api/courses');

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.data.map((course) => (
          <li key={course.id}>{course.attributes.Title}</li>
        ))}
      </ul>
    </div>
  );
}
