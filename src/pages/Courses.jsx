import React, { useState, useEffect } from "react";

export default function Courses({ auth }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`/courses`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Network response is NOT OK");
        return response.json();
      })
      .then((response) => {
        console.log("response", response);
        setCourses(response.courses);
      })
      .catch((err) => {
        console.log("err", err);
        setCourses([]);
      });
    fetch(`/admin`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Network response is NOT OK");
        return response.json();
      })
      .then((response) => {
        console.log("response", response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  if (!courses.length || !courses) return <p>loading...</p>;
  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  );
}
