import React from "react";
import qs from "qs";
import { configurations, getStrapiBaseUrl } from "../../lib/utils";

// Function to fetch courses data
async function fetchCourses() {
  const query = qs.stringify({
    populate: {

    },
  });

  const apiUrl = getStrapiBaseUrl();
  const url = `${apiUrl}/api/courses?${query}`; 

  try {
    const res = await fetch(url, configurations());

    if (!res.ok) {
      const errorMsg = `Failed to fetch courses. Status: ${res.status}`;
      console.error(errorMsg);
      return { courses: [], error: errorMsg };
    }

    const data = await res.json();
    return { courses: data.data, error: null };
  } catch (error) {
    const errorMessage = error.message || "An unknown error occurred.";
    console.error("Error fetching courses:", errorMessage);
    return { courses: [], error: errorMessage };
  }
}

// React component to render courses
const CoursePage = async () => {
  const { courses, error } = await fetchCourses();

  if (error) {
    return (
      <div>
        <h1>Courses</h1>
        <p>Failed to load courses: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.attributes.Title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoursePage;
