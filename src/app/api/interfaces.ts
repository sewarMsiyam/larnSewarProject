// app/api/interfaces.ts
export interface Course {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
    instructor_name: string;
    instructor_image: string;
    number_of_lessons: string;
    lesson_time: string;
    lessons_number: string;
    number_of_workingـpapers: string;
    number_of_office_time_per_week: string;
    duration:string;
    price: string;
    instructor_id: string;
    course_features: Array<{
        id: number;
        feature: string;
    }>;
    // course_appointments
    course_appointments: Array<{
        id: number;
        day: string;
        from_time: string;
        to_time: string;
    }>;
    zoom_link: string;
    introduction_video: string;
    course_result_desc: string;

}

export interface Review {
    id: number;
    customer_img: string;
    rating: number;
    comment: string;
    customer_name: string;
    customer_position: string;
}


export interface Instructors{
    id: number;
    name: string;
    image: string;
    description: string;
    qualification: string;
    experience: string;
    achievement: string;
    specialization: string;
    specialist: string;
    years_of_experience: string;
    hourly_rate_price: string;
    skills: string[];
    instructor_office_hours: Array<{
        id: number;
        date: string;
        day: string;
        from_time: string;
        to_time: string;
    }>;
    courses: Array<{
        id: number;
        name: string;
        description: string;
        instructor_name: string;
        instructor_image: string;
        lessons_number: string;
        duration: string;
        price: string;
        image: string;
        zoom_link: string;
    }>;
}
export interface InstructorDuration{
        id: number;
        day: string;
        from_time: string;
        to_time: string;
}
export interface specializations{
    id: number;
    name: string;
}

export interface Lessons {
    id: number;
    name: string;
    course_name: string;
    recorded_video_link: string;
    slug: string;
    zoom_link: string;
    status: string;
    summary_files: string;
}


export interface Checkout {
    id: number;
    name: string;
    description: string;
}



export interface OfficeHours {
    id: number;
    student_name:string;
    day: string;
    date: string;
    from_time: string;
    to_time: string;
    zoom_link:string;
}


interface Pagination {
  current_page: number;
  first_page_url: string;
  from: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page_url: string;
}

interface CourseResponse {
  courses: Course[];
  pagination: Pagination;
}

export interface Privacy {
    name: string;
    content: string;
}

export interface Snettigs {
    email: string;
    phone: string;
    whatsapp: string;
    linkedin: string;
    facebook: string;
    instagram: string;
    twitter: string;
    address: string;
}



//   export interface InstructorPrivacy {
//     name: string;
//     content: string;
//   }

  