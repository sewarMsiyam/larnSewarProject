"use client";
import { useEffect, useState } from 'react';
import { fetchAll, fetchOne } from '@/app/api/dataFetch';
import { Course } from '@/app/api/interfaces';


const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCourse, setLoadingCourse] = useState<boolean>(false);
  const mainCategory = 'tawjhi';
  const endpoint = 'courses';

  useEffect(() => {
    setLoading(true);
    fetchAll(endpoint, mainCategory).then(data => {
      setCourses(data);
      setLoading(false);
    });
  }, [mainCategory, endpoint]);

  const fetchCourse = (id: string) => {
    setLoadingCourse(true);
    fetchOne(endpoint, id, mainCategory).then(data => {
      setSelectedCourse(data);
      setLoadingCourse(false);
    });
  };

  return (
    <div>
      <h1 className="text-5xl">Courses</h1>
      <ul>
        {loading ? (
          // عرض Skeleton Loading مخصص أثناء تحميل البيانات
          Array(5).fill(null).map((_, index) => (
            <li key={index} className="skeleton"></li>
          ))
        ) : (
          courses.map(course => (
            <li key={course.id} onClick={() => fetchCourse(course.id)}>
              {loadingCourse ? (
                // عرض Skeleton Loading عند تحميل دورة محددة
                <div className="skeleton"></div>
              ) : (
                <>
                  <h2>{course.name}</h2>
                  <img src={course.image} alt={course.name} width={100} />
                </>
              )}
            </li>
          ))
        )}
      </ul>

    </div>
  );
}

export default CoursesPage;
