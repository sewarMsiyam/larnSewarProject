// app/api/interfaces.ts
export interface Course {
    id: number;
    name: string;
    description: string;
    image: string;
    instructor_name: string;
    instructor_image: string;
    number_of_lessons: string;
    lesson_time: string;
    number_of_workingـpapers: string;
    number_of_office_time_per_week: string;
    duration:string;
    price: string;
    course_features: Array<{
        id: number;
        feature: string;
    }>;
    course_durations: Array<{
        id: number;
        day: string;
        from_time: string;
        to_time: string;
    }>;
    zoom_link: string;

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
    instructor_durations: Array<{
        id: number;
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