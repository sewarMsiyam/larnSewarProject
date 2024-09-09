"use client"
import { useEffect, useState } from "react"

const ApiTestPage = () => {

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://sewaar.net/api/v1/get_courses/tawjhi');
            if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const result = await response.json();
      
            // Access the "courses" array from the result
            const courses = result.item.courses;
            console.log(courses); // Logs the array of courses
      
            // Now you can work with the courses array
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

    

  return (
    <div>
      <h1 className="text-5xl">Data from API</h1>
      <ul>
        {/* {data.map((item) => (
          <li key={item.id}>
            <Link href={`/course/${item.id}`}>{item.name}</Link>
          </li>
        ))} */}
      </ul>
    </div>
  )
}

export default ApiTestPage
