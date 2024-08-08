// CoursePage.js
import React from "react";
import { fetchCourses } from "../../lib/data"; 

const CoursePage = async () => {
  try {
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
  } catch (error) {
    return (
      <div>
        <h1>Courses</h1>
        <p>Failed to load courses: {error.message}</p>
      </div>
    );
  }
};

export default CoursePage;
